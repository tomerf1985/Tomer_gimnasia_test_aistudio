
import React from 'react';
import { Dedication } from '../types';

interface YearbookProps {
  dedications: Dedication[];
}

const EmptyState: React.FC = () => (
  <div className="text-center py-16 px-6 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
    <h3 className="mt-4 text-xl font-semibold text-slate-100">ספר המחזור ריק</h3>
    <p className="mt-2 text-slate-400">כתבו הקדשה לחברים בטופס הפרופיל כדי למלא את ספר המחזור הדיגיטלי!</p>
  </div>
);

const Yearbook: React.FC<YearbookProps> = ({ dedications }) => {
  if (dedications.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
        <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">הקדשות בספר המחזור</h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {dedications.map((dedication, index) => (
                <div key={index} className="p-5 bg-slate-700 rounded-lg shadow-md break-inside-avoid border border-slate-600">
                    <p className="text-slate-200 italic">"{dedication.message}"</p>
                    <p className="text-right mt-3 font-semibold text-teal-400">- {dedication.author}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Yearbook;