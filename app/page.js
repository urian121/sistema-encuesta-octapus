"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import logoImg from "@/public/logo.png";
import quizData from "@/quiz.json";
import QuizSummary from "@/components/QuizSummary";

export default function QuizPage() {
  const preguntas = useMemo(() => quizData?.preguntas ?? [], []);
  const total = preguntas.length;
  const [index, setIndex] = useState(0);
  const [selecciones, setSelecciones] = useState({});
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("encuesta_completada")) setTerminado(true);
  }, []);

  const actual = preguntas[index] ?? null;
  const seleccionActual = actual ? selecciones[actual.id] : undefined;

  const handleSelect = (id, letra) => {
    setSelecciones((prev) => ({ ...prev, [id]: letra }));
  };

  const handleNext = () => {
    if (index < total - 1) setIndex((i) => i + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const handleFinish = async () => {
    await fetch("/api/respuestas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selecciones),
    });
    localStorage.setItem("encuesta_completada", "1");
    setTerminado(true);
  };


  return (
    <div className="min-h-screen bg-[#e6eee0]">
      <div className="mx-auto max-w-3xl px-6 pt-4 pb-8">
        <div className="relative flex flex-col sm:flex-row sm:items-center border-b border-zinc-200 pb-2">
          <Image src={logoImg} alt="Octapus.io" placeholder="empty" className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 sm:absolute sm:left-0" />
          <h1 className="text-xl font-semibold text-zinc-900 text-center w-full mt-2 sm:mt-0">Encuesta Octapus.io</h1>
        </div>
        <p className="mt-2">
          Queremos conocer tu opinión sobre el portal web de 
          <a
            href="https://Octapus.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover underline mx-1 underline-offset-2 transition-colors">
              Octapus.io
          </a>.
          Por favor, responde las siguientes preguntas para ayudarnos a identificar oportunidades de mejora.
        </p>


        <div className="mt-6 flex w-full items-center justify-around">
          {Array.from({ length: total }).map((_, i) => {
            const isDone = i < index;
            const isCurrent = i === index;
            const color = isCurrent ? "bg-[#FF578F]" : isDone ? "bg-[#FF578F]" : "bg-[#FF578F]/30";
            return <div key={i} className={`h-3 w-full mx-1 rounded-full ${color}`} />;
          })}
        </div>

        {!terminado && actual && (
          <div className="mt-6">
            <div className="flex items-baseline gap-3">
              <span className="text-zinc-500">{index + 1}.</span>
              <h2 className="text-xl font-normal text-zinc-900">
                {actual.url
                  ? actual.pregunta.split(actual.url).map((parte, i, arr) => (
                      <span key={i}>
                        {parte}
                        {i < arr.length - 1 && (
                          <a href={actual.url} target="_blank" rel="noopener noreferrer"
                            className="text-[#FF578F] underline underline-offset-2 hover:text-[#e04a7d] transition-colors">
                            {actual.url}
                          </a>
                        )}
                      </span>
                    ))
                  : actual.pregunta}
              </h2>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {actual.opciones?.map((op) => {
                const letra = (op.letra ?? "").toUpperCase();
                const seleccionada = selecciones[actual.id] === op.letra;
                return (
                  <button
                    key={op.letra}
                    type="button"
                    onClick={() => handleSelect(actual.id, op.letra)}
                    className={`flex items-center gap-4 rounded-2xl px-4 py-4 text-left transition-colors hover:cursor-pointer ${
                      seleccionada ? "bg-[#FF578F] text-white" : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-normal ${
                        seleccionada ? "bg-white/20 text-white" : "bg-zinc-200 text-zinc-700"
                      }`}
                    >
                      {letra}
                    </span>
                    <span className="text-base font-normal">{op.texto ?? ""}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={index === 0}
                className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-zinc-700 disabled:opacity-50 hover:cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Atrás
              </button>
              {index === total - 1 ? (
                <button
                  onClick={handleFinish}
                  disabled={!seleccionActual}
                  className="flex items-center gap-2 rounded-full bg-[#FF578F] px-5 py-2 text-white hover:bg-[#e04a7d] disabled:opacity-50 disabled:cursor-not-allowed  hover:cursor-pointer"
                  aria-disabled={!seleccionActual}
                >
                  Finalizar
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!seleccionActual}
                  className="flex items-center gap-2 rounded-full bg-[#FF578F] px-5 py-2 text-white hover:bg-[#e04a7d] disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
                  aria-disabled={!seleccionActual}
                >
                  Siguiente
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              )}
            </div>
          </div>
        )}

        {terminado && (
          <QuizSummary />
        )}
      </div>
    </div>
  );
}
