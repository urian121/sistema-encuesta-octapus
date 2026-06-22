import fs from "fs";
import path from "path";
import quizData from "@/quiz.json";
import GraficasResultados from "@/components/GraficasResultados";

function procesarDatos(preguntas, respuestas) {
  return preguntas.map((q) => {
    const conteo = Object.fromEntries(q.opciones.map((op) => [op.letra, 0]));
    respuestas.forEach((r) => {
      const letra = r.respuestas?.[q.id];
      if (letra && conteo[letra] !== undefined) conteo[letra]++;
    });
    return {
      id: q.id,
      pregunta: q.pregunta,
      datos: q.opciones.map((op) => ({
        name: op.texto,
        value: conteo[op.letra],
      })),
    };
  });
}

export default function ResultadosPage() {
  const archivo = path.join(process.cwd(), "data", "respuestas.json");
  const respuestas = fs.existsSync(archivo)
    ? JSON.parse(fs.readFileSync(archivo, "utf-8"))
    : [];

  const datos = procesarDatos(quizData.preguntas, respuestas);

  return (
    <div className="min-h-screen bg-[#e6eee0]">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <h1 className="text-xl font-semibold text-zinc-900 border-b border-zinc-200 pb-2">
          Resultados de la encuesta
        </h1>
        <p className="mt-2 text-sm text-zinc-500">{respuestas.length} respuesta{respuestas.length !== 1 ? "s" : ""} registrada{respuestas.length !== 1 ? "s" : ""}</p>
        <GraficasResultados datos={datos} />
      </div>
    </div>
  );
}
