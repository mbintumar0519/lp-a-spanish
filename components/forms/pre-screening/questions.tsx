import type { ReactNode } from "react";
import type { PreScreeningAnswers } from "@/lib/validations/lead";

export type PreScreeningQuestion = {
  id: keyof PreScreeningAnswers;
  question: ReactNode;
  icon: string;
  subtext?: ReactNode;
  guidanceMessage: string;
};

export const PRE_SCREENING_QUESTIONS: PreScreeningQuestion[] = [
  {
    id: "age_50_plus",
    question: (
      <>
        ¿Tiene más de <span className="key-term">50</span> años?
      </>
    ),
    icon: "📅",
    guidanceMessage: "Este estudio busca participantes de 50 años o más.",
  },
  {
    id: "can_travel",
    question: (
      <>
        ¿Puede viajar a <span className="key-term">Plant City, FL</span> para visitas regulares del estudio?
      </>
    ),
    icon: "🚗",
    subtext: <em>Se proporcionará transporte.</em>,
    guidanceMessage: "Se proporcionará transporte. Si viajar es difícil, déjenos saber — nuestro equipo puede ayudar.",
  },
];
