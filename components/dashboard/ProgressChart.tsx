"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
} from "recharts";

export function ProgressChart({
  data,
}: {
  data: Array<{ date: string; skor: number; nama_usaha?: string }>;
}) {
  return (
    <div className="hidden md:block rounded-lg shadow-sm border border-gray-200 bg-white p-5">
      <div className="text-sm font-semibold text-gray-900 mb-3">
        Perkembangan Business Health Score
      </div>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="skor"
              stroke="none"
              fill="#4F46E51A"
            />
            <Line type="monotone" dataKey="skor" stroke="#4F46E5" dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

