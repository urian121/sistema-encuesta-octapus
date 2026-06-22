"use client";
import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from "recharts";

const COLORES = ["#FF578F", "#ff8ab4", "#ffb3cc", "#ffd6e5", "#ffe8f0", "#ffc0d6", "#ff9dc2", "#ff7aae", "#ff579a", "#ff3486"];

export default function GraficasResultados({ datos }) {
  const [preguntaActiva, setPreguntaActiva] = useState(datos[0]?.id ?? 1);
  const pregunta = datos.find((d) => d.id === preguntaActiva);

  return (
    <div className="mt-8 space-y-8">
      <div className="flex flex-wrap gap-2">
        {datos.map((d) => (
          <button
            key={d.id}
            onClick={() => setPreguntaActiva(d.id)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              d.id === preguntaActiva
                ? "bg-[#FF578F] text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            Pregunta {d.id}
          </button>
        ))}
      </div>

      {pregunta && (
        <>
          <p className="text-sm text-zinc-600">{pregunta.pregunta}</p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6">
              <h2 className="mb-4 text-sm font-medium text-zinc-700">Gráfica de barras</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={pregunta.datos} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="value" name="Votos" radius={[0, 6, 6, 0]}>
                    {pregunta.datos.map((_, i) => (
                      <Cell key={i} fill={COLORES[i % COLORES.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl bg-white p-6">
              <h2 className="mb-4 text-sm font-medium text-zinc-700">Gráfica de torta</h2>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={pregunta.datos}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) =>
                      percent > 0 ? `${(percent * 100).toFixed(0)}%` : ""
                    }
                  >
                    {pregunta.datos.map((_, i) => (
                      <Cell key={i} fill={COLORES[i % COLORES.length]} />
                    ))}
                  </Pie>
                  <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
