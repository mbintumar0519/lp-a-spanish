import React from 'react';

export default function CTAButton({ children, onClick, href, type = 'button', icon, className = '', ...props }) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 text-lg rounded-xl font-bold shadow-md hover:bg-red-700 hover:shadow-lg active:scale-[0.97] transition-all duration-200 no-underline cursor-pointer';

  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
