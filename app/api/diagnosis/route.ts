import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getDiagnosisPrompt } from "@/lib/prompts";
import { getBenchmarkText } from "@/lib/benchmark";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 2. Rate limit check (5 per IP per day)
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const limitResult = await checkRateLimit(ip);
    if (!limitResult.allowed) {
      return Response.json(
        {
          error: "RATE_LIMIT",
          message: `Anda sudah melakukan 5 diagnosis hari ini. Kembali lagi besok!`,
          resetAt: limitResult.resetAt,
        },
        { status: 429 },
      );
    }

    // 3. Validate input (camelCase from front-end)
    const requiredFields = [
      "namaUsaha",
      "jenisUsaha",
      "omset",
      "biayaOperasional",
      "channelPenjualan",
      "kendalaUtama",
    ];
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === "") {
        return Response.json(
          {
            error: "VALIDATION",
            message: `Field ${field} wajib diisi`,
          },
          { status: 400 },
        );
      }
    }

    // 4. Get benchmark data
    const benchmark = getBenchmarkText(body.jenisUsaha);

    // 5. Build prompt
    const prompt = getDiagnosisPrompt(body, benchmark);

    // 6. Call Gemini API with timeout
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000); // 45s timeout

    let result: any;
    try {
      result = await model.generateContent(prompt, { signal: controller.signal });
      clearTimeout(timeout);
    } catch (geminiError: any) {
      clearTimeout(timeout);
      if (
        geminiError?.name === "AbortError" ||
        geminiError?.message?.includes("aborted")
      ) {
        return Response.json(
          {
            error: "TIMEOUT",
            message: "Analisis AI memakan waktu terlalu lama. Silakan coba lagi.",
          },
          { status: 408 },
        );
      }
      throw geminiError;
    }

    // 7. Parse Gemini response
    const responseText = result.response.text();
    let parsedResult: any;

    const tryParse = (text: string) => {
      const cleaned = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      return JSON.parse(cleaned);
    };

    try {
      parsedResult = tryParse(responseText);
    } catch {
      const retryResult = await model.generateContent(
        prompt + "\n\nPENTING: Balas dengan JSON valid saja, tanpa markdown.",
      );
      const retryText = retryResult.response.text();
      try {
        parsedResult = tryParse(retryText);
      } catch {
        return Response.json(
          {
            error: "PARSE_ERROR",
            message: "Gagal memproses hasil analisis. Coba lagi.",
          },
          { status: 500 },
        );
      }
    }

    // 8. Save to Supabase (best-effort)
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: savedDiagnosis, error: dbError } = await supabase
      .from("diagnoses")
      .insert({
        user_id: user?.id ?? null,

        // Inputs
        nama_usaha: body.namaUsaha,
        jenis_usaha: body.jenisUsaha,
        usia_usaha: body.usiaUsaha,
        lokasi: body.lokasi,
        jumlah_karyawan: body.jumlahKaryawan,
        omset: Number(body.omset ?? 0),
        biaya_operasional: Number(body.biayaOperasional ?? 0),
        modal_awal: Number(body.modalAwal ?? 0),
        sudah_profit: Boolean(body.sudahProfit),
        hutang_usaha: Number(body.hutangUsaha ?? 0),
        channel_penjualan: body.channelPenjualan,
        transaksi_per_hari: Number(body.transaksiPerHari ?? 0),
        ada_pencatatan: body.adaPencatatan,
        kendala_utama: body.kendalaUtama,
        target: body.target,
        skor_kepuasan: Number(body.skorKepuasan ?? 5),

        // AI outputs
        skor_total: parsedResult.skorTotal,
        skor_keuangan: parsedResult.skorKeuangan,
        skor_pertumbuhan: parsedResult.skorPertumbuhan,
        skor_operasional: parsedResult.skorOperasional,
        skor_penjualan: parsedResult.skorPenjualan,
        status_kesehatan: parsedResult.statusKesehatan,
        ringkasan: parsedResult.ringkasan,
        diagnosis: parsedResult.diagnosis,
        rekomendasi: parsedResult.rekomendasi,
        kalimat_motivasi: parsedResult.kalimatMotivasi,

        ip_address: ip,
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB save error:", dbError);
      return Response.json({
        success: true,
        saved: false,
        id: "unsaved",
        omset: Number(body.omset ?? 0),
        biaya_operasional: Number(body.biayaOperasional ?? 0),
        nama_usaha: body.namaUsaha,
        jenis_usaha: body.jenisUsaha,
        ...parsedResult,
      });
    }

    return Response.json({
      success: true,
      saved: true,
      id: savedDiagnosis.id,
      ...parsedResult,
    });
  } catch (error) {
    console.error("Diagnosis API error:", error);
    return Response.json(
      {
        error: "INTERNAL",
        message: "Terjadi kesalahan. Coba lagi dalam beberapa saat.",
      },
      { status: 500 },
    );
  }
}

