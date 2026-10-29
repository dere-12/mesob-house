"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { compactNumber, etb } from "@/lib/format";

export default function RevenueChart({ data }) {
  return (
    <section className="rounded-lg border p-4 sm:p-6">
      <h2 className="text-xl font-semibold">Revenue by Neighbourhood</h2>

      <p className="mt-1 text-sm text-gray-600">
        Revenue from non-cancelled orders, in Ethiopian birr (ETB).
      </p>

      {data.length === 0 ? (
        <p className="mt-6 rounded-md bg-gray-50 p-4 text-gray-700">
          No revenue data yet. Revenue will appear after orders are placed.
        </p>
      ) : (
        <>
          <div
            className="mt-5 h-80 w-full"
            role="img"
            aria-label="Bar chart showing revenue by neighbourhood in Ethiopian birr"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 12, left: 12, bottom: 12 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="neighbourhood"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={55}
                />

                <YAxis tickFormatter={(value) => compactNumber.format(value)} />

                <Tooltip
                  formatter={(value) => [etb.format(value), "Revenue"]}
                  labelFormatter={(label) => `Neighbourhood: ${label}`}
                />

                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Revenue data</h3>

            <table className="mt-2 w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Revenue by neighbourhood in Ethiopian birr
              </caption>

              <thead>
                <tr className="border-b">
                  <th scope="col" className="px-3 py-2">
                    Neighbourhood
                  </th>

                  <th scope="col" className="px-3 py-2 text-right">
                    Revenue (ETB)
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr key={item.neighbourhood} className="border-b">
                    <th scope="row" className="px-3 py-2 font-normal">
                      {item.neighbourhood}
                    </th>

                    <td className="px-3 py-2 text-right">
                      {etb.format(item.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
