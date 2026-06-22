"use client";
import React from "react";

export default function QuizSummary() {
  return (
    <div className="mt-8 rounded-3xl bg-white p-8 text-center">
      <div className="text-4xl mb-4">🎉</div>
      <h2 className="text-2xl font-semibold text-zinc-900">¡Gracias por completar la encuesta!</h2>
      <p className="mt-3 text-zinc-500 text-base leading-relaxed">
        Tu opinión es muy importante para nosotros y nos ayuda a mejorar el portal para ofrecerte una mejor experiencia.
      </p>
    </div>
  );
}
