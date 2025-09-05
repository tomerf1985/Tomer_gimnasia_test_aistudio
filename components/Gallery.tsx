
import React, { useState } from 'react';
import { Photo } from '../types';

interface GalleryProps {
  photos: Photo[];
}

const EmptyState: React.FC = () => (
  <div className="text-center py-16 px-6 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <h3 className="mt-4 text-xl font-semibold text-slate-100">הגלריה עדיין ריקה</h3>
    <p className="mt-2 text-slate-400">העלו תמונות מהתיכון בטופס הפרופיל כדי להתחיל למלא את הגלריה המשותפת!</p>
  </div>
);

const PhotoModal: React.FC<{ photo: Photo; onClose: () => void }> = ({ photo, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <img src={photo.url} alt={photo.caption} className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
        <p className="text-center text-white mt-2 bg-black/60 p-2 rounded-b-lg">{photo.caption}</p>
        <button onClick={onClose} className="absolute -top-2 -right-2 text-slate-900 bg-white rounded-full p-1 text-2xl leading-none w-8 h-8 flex items-center justify-center shadow-lg">
          &times;
        </button>
      </div>
    </div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  if (photos.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-square" onClick={() => setSelectedPhoto(photo)}>
            <img 
              src={photo.url} 
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-teal-500 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-end">
              <p className="text-white text-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 truncate">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectedPhoto && <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </>
  );
};

export default Gallery;