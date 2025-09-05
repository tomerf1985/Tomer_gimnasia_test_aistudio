
import React, { useState } from 'react';
import { UserProfile, Photo, Dedication } from './types';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import SubmittedProfiles from './components/SubmittedProfiles';
import Gallery from './components/Gallery';
import Yearbook from './components/Yearbook';
import OutputGenerator from './components/OutputGenerator';

const App: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [activeTab, setActiveTab] = useState('form');

  const addProfile = (profile: UserProfile) => {
    setProfiles([...profiles, profile]);
    setActiveTab('profiles'); // Switch tab after submission
  };

  const allPhotos: Photo[] = profiles.flatMap(p => 
    [
      p.highSchoolPhoto ? { url: p.highSchoolPhoto, caption: `תמונת תיכון של ${p.fullName}` } : null,
      p.currentPhoto ? { url: p.currentPhoto, caption: `תמונה עדכנית של ${p.fullName}` } : null,
      ...(p.galleryPhotos || []).map(photoUrl => ({ url: photoUrl, caption: `תמונה מ${p.fullName}` }))
    ].filter((photo): photo is Photo => photo !== null)
  );
  
  const allDedications: Dedication[] = profiles.map(p => ({
    author: p.fullName,
    message: p.yearbookDedication || ''
  })).filter(d => d.message.trim() !== '');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'form':
        return <ProfileForm onSubmit={addProfile} />;
      case 'profiles':
        return <SubmittedProfiles profiles={profiles} />;
      case 'gallery':
        return <Gallery photos={allPhotos} />;
      case 'yearbook':
        return <Yearbook dedications={allDedications} />;
      case 'outputs':
        return <OutputGenerator profiles={profiles} />;
      default:
        return <ProfileForm onSubmit={addProfile} />;
    }
  };

  const TabButton: React.FC<{ tabName: string; label: string }> = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      aria-pressed={activeTab === tabName}
      className={`px-3 py-2 md:px-4 text-sm md:text-base font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
        activeTab === tabName
          ? 'bg-teal-500 text-white shadow-lg'
          : 'bg-transparent text-slate-300 hover:bg-slate-700 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200">
      <div className="relative container mx-auto px-4 py-8">
        <Header />
        
        <nav className="flex flex-wrap justify-center gap-2 md:gap-4 my-8 sticky top-4 z-10 bg-slate-800/60 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-slate-700">
          <TabButton tabName="form" label="✍️ מילוי פרופיל" />
          <TabButton tabName="profiles" label="👥 פרופילים" />
          <TabButton tabName="gallery" label="🖼️ גלריה" />
          <TabButton tabName="yearbook" label="📖 ספר מחזור" />
          <TabButton tabName="outputs" label="🎬 הפקת תוצרים" />
        </nav>

        <main className="transition-opacity duration-500">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default App;