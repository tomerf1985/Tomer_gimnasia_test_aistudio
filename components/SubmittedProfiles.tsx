
import React from 'react';
import { UserProfile } from '../types';

interface SubmittedProfilesProps {
  profiles: UserProfile[];
}

const EmptyState: React.FC = () => (
  <div className="text-center py-16 px-6 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    <h3 className="mt-4 text-xl font-semibold text-slate-100">עדיין אין פרופילים</h3>
    <p className="mt-2 text-slate-400">היו הראשונים למלא את הפרופיל שלכם בלשונית "✍️ מילוי פרופיל"!</p>
  </div>
);

const ProfileCard: React.FC<{ profile: UserProfile }> = ({ profile }) => (
  <article className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden transition-transform transform hover:-translate-y-1 border border-slate-700">
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-teal-400">{profile.fullName}</h3>
          <p className="text-sm text-slate-400 mt-1">{profile.role}{profile.workplace && ` ב-${profile.workplace}`} | {profile.currentCity}</p>
          {profile.socialLink && (
            <a href={profile.socialLink} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline">
              פרופיל חברתי
            </a>
          )}
        </div>
        <div className="flex gap-4 shrink-0 mt-4 md:mt-0">
          {profile.highSchoolPhoto && <img src={profile.highSchoolPhoto} alt={`תמונת תיכון של ${profile.fullName}`} className="w-28 h-28 object-cover rounded-lg shadow-md border-2 border-slate-600" />}
          {profile.currentPhoto && <img src={profile.currentPhoto} alt={`תמונה עדכנית של ${profile.fullName}`} className="w-28 h-28 object-cover rounded-lg shadow-md border-2 border-slate-600" />}
        </div>
      </div>
      
      <div className="mt-6 space-y-4 text-slate-300">
        <div className="border-t border-slate-700 pt-4">
          <p className="font-semibold text-slate-200">זיכרון מהתיכון:</p>
          <p className="italic">"{profile.memory}"</p>
        </div>
        <div>
          <p className="font-semibold text-slate-200">המורה שהשפיע/ה:</p>
          <p>{profile.teacher}</p>
        </div>
        <div>
          <p className="font-semibold text-slate-200">השיר של התקופה:</p>
          <p>🎵 {profile.song}</p>
        </div>
      </div>
    </div>
  </article>
);


const SubmittedProfiles: React.FC<SubmittedProfilesProps> = ({ profiles }) => {
  if (profiles.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      {profiles.map(profile => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default SubmittedProfiles;