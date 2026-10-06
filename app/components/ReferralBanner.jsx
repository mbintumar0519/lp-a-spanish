import Image from "next/image";

const REFERRAL_URL = "https://denali-forms.netlify.app/referral.html";

export default function ReferralBanner({ layout = "row" }) {
  const stacked = layout === "stack";
  const headingId = stacked ? "referral-heading-thank-you" : "referral-heading";

  const card = (
    <div
      className={
        stacked
          ? "flex flex-col items-center gap-4 rounded-3xl border border-gray-200 bg-white px-5 py-7 text-center shadow-[0_6px_16px_rgba(15,23,42,0.05)] sm:px-8"
          : "flex flex-col items-center gap-5 rounded-3xl border border-gray-200 bg-white px-5 py-6 text-left shadow-[0_6px_16px_rgba(15,23,42,0.05)] sm:px-8 sm:py-6 lg:flex-row lg:gap-8 lg:px-8"
      }
    >
      <Image
        src="/referral-friends.png"
        alt=""
        width={632}
        height={543}
        className={stacked ? "h-[168px] w-auto" : "h-[168px] w-auto shrink-0 sm:h-[188px]"}
      />

      <div className={stacked ? "text-center" : "min-w-0 flex-1 text-center lg:text-left"}>
        <p className="mb-2.5 inline-flex rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-red-700 uppercase">
          Refiera a un amigo
        </p>
        <h2
          id={headingId}
          className={
            "leading-[1.15] font-bold text-gray-900 " +
            (stacked ? "text-[1.55rem] sm:text-[1.75rem]" : "text-[1.65rem] sm:text-[1.85rem] xl:whitespace-nowrap")
          }
        >
          ¿Conoce a alguien que podría calificar?
        </h2>
        <p
          className={
            "mt-2 max-w-xl text-[15px] leading-relaxed text-gray-600 " +
            (stacked ? "mx-auto" : "mx-auto lg:mx-0")
          }
        >
          Refiera a un amigo o familiar que pueda ser elegible y gane $50 por una referencia exitosa.
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M3 8.5A1.5 1.5 0 014.5 7H8V5.5A1.5 1.5 0 019.5 4h1A1.5 1.5 0 0112 5.5V7h3.5A1.5 1.5 0 0117 8.5V10H3V8.5z" />
            <path d="M3 11h6.25v5.5h-4.5A1.75 1.75 0 013 14.75V11zm7.75 0H17v3.75A1.75 1.75 0 0115.25 16.5h-4.5V11z" />
          </svg>
          $50 Recompensa por referencia
        </p>
      </div>

      {stacked ? null : <div className="hidden h-24 w-px shrink-0 bg-gray-200 lg:block" aria-hidden="true" />}

      <div className={stacked ? "flex w-full flex-col items-center gap-2.5" : "flex w-full flex-col items-center gap-2.5 lg:w-[250px] lg:shrink-0"}>
        <a
          href={REFERRAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Refiera a alguien y gane $50"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-lg font-bold text-white no-underline shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg active:scale-[0.97] sm:w-auto lg:w-full"
        >
          Referir a alguien
        </a>
        <p className="text-center text-xs leading-snug text-gray-500">
          Solo toma un minuto enviar una referencia.
        </p>
      </div>
    </div>
  );

  if (stacked) {
    return (
      <section aria-labelledby={headingId} className="mb-6 sm:mb-8">
        {card}
      </section>
    );
  }

  return (
    <section aria-labelledby={headingId} className="bg-white pt-12 pb-4 sm:pt-16 sm:pb-6">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">{card}</div>
    </section>
  );
}
