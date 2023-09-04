"use client";

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  ratings: {
    score: number;
    date: string;
  }[];
};

export function RatingsGraphClient({ ratings }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={ratings}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `${value}`}
          ticks={[0, 2, 4, 6, 8, 10]}
          tickLine={true}
          axisLine={true}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#14b8a6"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="submissions"
          stroke="#f59e0b"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
