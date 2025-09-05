
import React from 'react';
import { UserProfile } from '../types';

interface OutputGeneratorProps {
  profiles: UserProfile[];
}

const OutputGenerator: React.FC<OutputGeneratorProps> = ({ profiles }) => {
  
  const generateCsv = () => {
    if (profiles.length === 0) {
      alert('אין נתונים להורדה.');
      return;
    }

    const headers = [
      'שם מלא', 'תאריך לידה', 'כיתות', 'עיר מגורים', 'מקום עבודה', 'תפקיד', 
      'קישור חברתי', 'זיכרון', 'מורה משפיע', 'רגע מביך', 'שיר התקופה', 'הקדשה'
    ];
    
    const rows = profiles.map(p => [
      `"${p.fullName}"`,
      `"${p.dob}"`,
      `"${p.classNames}"`,
      `"${p.currentCity}"`,
      `"${p.workplace}"`,
      `"${p.role}"`,
      `"${p.socialLink}"`,
      `"${p.memory.replace(/"/g, '""')}"`,
      `"${p.teacher.replace(/"/g, '""')}"`,
      `"${p.embarrassingMoment.replace(/"/g, '""')}"`,
      `"${p.song.replace(/"/g, '""')}"`,
      `"${(p.yearbookDedication || '').replace(/"/g, '""')}"`
    ]);

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // \uFEFF for BOM to support Hebrew in Excel
    csvContent += headers.join(',') + '\r\n';
    csvContent += rows.map(r => r.join(',')).join('\r\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reunion_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePresentationData = () => {
     if (profiles.length === 0) {
      alert('אין פרופילים ליצירת מצגת.');
      return;
    }

    const presentationText = profiles.map(p => {
        return `
-----------------------------------------
שקופית עבור: ${p.fullName}
-----------------------------------------
תמונת תיכון: ${p.highSchoolPhoto ? 'קיימת' : 'לא קיימת'}
תמונה עדכנית: ${p.currentPhoto ? 'קיימת' : 'לא קיימת'}

ציטוט 1 (זיכרון): ${p.memory}
ציטוט 2 (רגע מביך): ${p.embarrassingMoment}
שיר התקופה: ${p.song}
        `;
    }).join('\n');

    const blob = new Blob([presentationText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'presentation_data.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-slate-800 rounded-xl shadow-2xl text-center border border-slate-700">
      <h2 className="text-3xl font-bold text-slate-100 mb-4">הפקת תוצרים</h2>
      <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
        כאן תוכלו להוריד את כל הנתונים שנאספו בפורמטים שונים כדי להכין את המצגת, הסרטון והמזכרות למפגש.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CSV Export Card */}
        <div className="p-6 bg-slate-700 rounded-lg shadow-md border border-slate-600">
          <h3 className="text-xl font-semibold text-teal-400">דו"ח נתונים (CSV)</h3>
          <p className="mt-2 mb-4 text-slate-300 text-sm">
            הורידו קובץ Excel (CSV) המרכז את כל התשובות הטקסטואליות של כולם. שימושי ליצירת ספר מחזור או כמזכרת.
          </p>
          <button 
            onClick={generateCsv}
            disabled={profiles.length === 0}
            className="w-full px-4 py-2 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-700">
            הורדת CSV
          </button>
        </div>

        {/* Presentation Data Card */}
        <div className="p-6 bg-slate-700 rounded-lg shadow-md border border-slate-600">
          <h3 className="text-xl font-semibold text-cyan-400">נתונים למצגת/סרטון</h3>
          <p className="mt-2 mb-4 text-slate-300 text-sm">
            הורידו קובץ טקסט מסודר עם הציטוטים והמידע מכל פרופיל, מוכן להעתקה והדבקה למצגת PowerPoint או לסרטון "אז והיום".
          </p>
          <button 
            onClick={generatePresentationData}
            disabled={profiles.length === 0}
            className="w-full px-4 py-2 bg-cyan-600 text-white font-bold rounded-full hover:bg-cyan-700 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-700">
            הורדת נתוני טקסט
          </button>
        </div>
      </div>
       <p className="mt-8 text-xs text-slate-500">
         הערה: הורדת התמונות אינה נתמכת ישירות מכאן. ניתן לשמור אותן ידנית מהגלריה או מלשונית הפרופילים.
       </p>
    </div>
  );
};

export default OutputGenerator;