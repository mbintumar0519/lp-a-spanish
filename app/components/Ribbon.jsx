export default function Ribbon() {
  return (
    <div 
      role="note" 
      aria-label="Study information ribbon" 
      className="w-full text-white text-sm sm:text-base" 
      style={{ 
        background: 'linear-gradient(90deg, #dc2626 0%, #f97316 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        width: '100%'
      }}
    >
      <div className="container mx-auto px-4 py-2 text-center">
        <span className="font-medium">Lp(a) Heart Health</span>
        <span className="mx-2" aria-hidden>•</span>
        <span>No Insurance Required</span>
        <span className="mx-2" aria-hidden>•</span>
        <span>$100 per visit</span>
        <span className="mx-2" aria-hidden>•</span>
        <span>Travel reimbursed</span>
      </div>
    </div>
  );
}


