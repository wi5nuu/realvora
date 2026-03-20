"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

export function BenchmarkChart({
  marginUserPct,
  marginIdealPct,
  efisiensiUserPct,
  efisiensiIdealPct,
  pertumbuhanUserPct,
  pertumbuhanIdealPct,
  channelUserPct,
  channelIdealPct,
}: {
  marginUserPct: number;
  marginIdealPct: number;
  efisiensiUserPct: number;
  efisiensiIdealPct: number;
  pertumbuhanUserPct: number;
  pertumbuhanIdealPct: number;
  channelUserPct: number;
  channelIdealPct: number;
}) {
  const data = [
    { metric: "Margin", user: marginUserPct, ideal: marginIdealPct },
    {
      metric: "Efisiensi Biaya",
      user: efisiensiUserPct,
      ideal: efisiensiIdealPct,
    },
    { metric: "Pertumbuhan", user: pertumbuhanUserPct, ideal: pertumbuhanIdealPct },
    { metric: "Channel", user: channelUserPct, ideal: channelIdealPct },
  ];

  return (
    <div className="hidden md:block rounded-lg border border-gray-100 bg-white p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap={18}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" />
          <YAxis domain={[0, "auto"]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="user" fill="#4F46E5" name="Bisnis Anda" />
          <Bar dataKey="ideal" fill="#D1D5DB" name="Rata-rata Industri" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

