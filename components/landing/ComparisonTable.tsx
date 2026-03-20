export function ComparisonTable() {
  const rows = [
    ["Harga", "🟢 Gratis", "🔴 Rp500rb-2jt/jam", "🟡 Berlangganan"],
    ["Waktu", "🟢 5 menit", "🔴 Berhari-hari", "🔴 Mingguan"],
    ["Bahasa", "🟢 Indonesia", "🟢 Indonesia", "🔴 Inggris"],
    ["Untuk UMKM kecil", "🟢 Ya", "🟡 Tergantung", "🔴 Tidak"],
    ["Rekomendasi AI", "🟢 Ya", "🔴 Tidak", "🔴 Tidak"],
    ["Bisa diakses kapanpun", "🟢 24/7", "🔴 Jam kerja", "🟡 Terbatas"],
    ["Perlu keahlian akuntansi", "🟢 Tidak", "🔴 Ya", "🔴 Ya"],
  ];

  return (
    <section className="bg-gray-50 py-20 px-4" aria-label="Comparison table">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-4xl font-bold text-center">
          Kenapa Pilih Realvora?
        </h2>

        <div className="mt-10 overflow-x-auto scroll-hidden">
          <table className="min-w-[820px] w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="px-4 py-4 text-sm font-semibold text-gray-700">
                  Fitur
                </th>
                <th className="px-4 py-4 text-sm font-semibold text-white bg-indigo-600 border-2 border-indigo-500">
                  <div className="flex flex-col gap-1">
                    <span>Realvora</span>
                    <span className="text-xs font-medium bg-white/10 border border-white/20 rounded-full px-3 py-1 text-center">
                      Pilihan Terbaik
                    </span>
                  </div>
                </th>
                <th className="px-4 py-4 text-sm font-semibold text-gray-700">
                  Konsultan Bisnis
                </th>
                <th className="px-4 py-4 text-sm font-semibold text-gray-700">
                  Software Akuntansi
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-t border-gray-100">
                  <td className="px-4 py-4 text-sm text-gray-700">{r[0]}</td>
                  <td className="px-4 py-4 text-sm bg-indigo-50 border-2 border-indigo-500/50 font-medium text-gray-900">
                    {r[1]}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">{r[2]}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

