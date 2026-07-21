export default function Ribbon() {
  return (
    <div 
      role="complementary" 
      aria-label="Información del estudio" 
      className="w-full h-10 text-white text-sm sm:text-base fixed top-0 left-0 z-50 flex items-center bg-[linear-gradient(90deg,#dc2626_0%,#f97316_100%)]" 
    >
      <div className="container mx-auto px-4 text-center">
        <span className="font-medium">Salud Cardíaca Lp(a)</span>
        <span className="mx-2" aria-hidden>•</span>
        <span>Sin Seguro Requerido</span>
        <span className="mx-2" aria-hidden>•</span>
        <span>$100 por visita</span>
        <span className="mx-2" aria-hidden>•</span>
        <span>Viaje reembolsado</span>
    </div>
    </div>
  );
}
