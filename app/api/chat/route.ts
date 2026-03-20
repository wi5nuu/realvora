import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { message, diagnosisId, chatHistory } = await req.json();

  // Rate limit: 10 messages per diagnosis
  if (chatHistory?.length >= 10) {
    return Response.json(
      {
        error: "CHAT_LIMIT",
        message: "Anda sudah menggunakan 10 pesan untuk sesi ini.",
      },
      { status: 429 },
    );
  }

  // Get diagnosis context from Supabase
  const supabase = await createClient();
  const { data: diagnosis } = await supabase
    .from("diagnoses")
    .select("nama_usaha, jenis_usaha, ringkasan, skor_total, rekomendasi")
    .eq("id", diagnosisId)
    .single();

  const systemPrompt = `
Anda adalah Realvora AI, asisten bisnis personal yang hangat, helpful, 
dan to-the-point. Anda sudah menganalisis bisnis berikut:

Bisnis: ${diagnosis?.nama_usaha} (${diagnosis?.jenis_usaha})
Business Health Score: ${diagnosis?.skor_total}/100
Kondisi: ${diagnosis?.ringkasan}

Jawab pertanyaan user berdasarkan konteks bisnis SPESIFIK mereka.
Bahasa: Indonesia natural, tidak formal, tidak menggurui.
Panjang: maksimal 120 kata per jawaban.
Selalu berikan 1-2 langkah konkret yang bisa dilakukan segera.
`;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const chat = model.startChat({
    history: [
      { role: "user", parts: [{ text: systemPrompt }] },
      {
        role: "model",
        parts: [{ text: "Siap! Saya Realvora AI. Ada yang bisa saya bantu terkait bisnis Anda?" }],
      },
      ...(chatHistory ?? []).map((msg: any) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    ],
  });

  const result = await chat.sendMessage(message);
  const response = result.response.text();

  await supabase.from("chat_messages").insert([
    { diagnosis_id: diagnosisId, role: "user", content: message },
    { diagnosis_id: diagnosisId, role: "assistant", content: response },
  ]);

  return Response.json({ response });
}

