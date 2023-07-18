"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type Props = {
  ratings: {
    score: number;
    date: string;
  }[];
};

export function Overview({ ratings }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={ratings}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          ticks={[0, 2, 4, 6, 8, 10]}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#14b8a6"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
