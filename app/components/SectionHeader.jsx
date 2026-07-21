import React from 'react';

export default function SectionHeader({ title, description }) {
  return (
    <div className="text-center mb-10 lg:mb-14">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-900 mb-4 lg:mb-6 font-sans tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 text-lg lg:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
