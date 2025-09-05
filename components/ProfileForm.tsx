
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { UserProfile } from '../types';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const InputField: React.FC<{ id: string; label: string; type?: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; required?: boolean; placeholder?: string; isTextArea?: boolean }> = ({ id, label, type = 'text', value, onChange, required = false, placeholder, isTextArea = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-2">{label}</label>
    {isTextArea ? (
      <textarea id={id} name={id} value={value} onChange={onChange} required={required} placeholder={placeholder} rows={4} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-slate-200" />
    ) : (
      <input type={type} id={id} name={id} value={value} onChange={onChange} required={required} placeholder={placeholder} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-slate-200" />
    )}
  </div>
);

const FileInputField: React.FC<{ id: string; name: string; label: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; required?: boolean; multiple?: boolean }> = ({ id, name, label, onChange, required = false, multiple = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-2">{label}</label>
        <input 
          type="file" 
          id={id} 
          name={name} 
          onChange={onChange} 
          required={required} 
          multiple={multiple}
          accept="image/*"
          className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600 transition-colors cursor-pointer" 
        />
    </div>
);


const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<UserProfile, 'id'>>({
    fullName: '',
    dob: '',
    classNames: '',
    currentCity: '',
    workplace: '',
    role: '',
    socialLink: '',
    highSchoolPhoto: undefined,
    currentPhoto: undefined,
    memory: '',
    teacher: '',
    embarrassingMoment: '',
    song: '',
    galleryPhotos: [],
    yearbookDedication: '',
  });
  
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      try {
        const base64 = await fileToBase64(files[0]);
        setFormData(prev => ({ ...prev, [name]: base64 }));
      } catch (error) {
        console.error("Error converting file to base64", error);
      }
    }
  };
  
  const handleMultipleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
        try {
            const filePromises = Array.from(files).map(file => fileToBase64(file));
            const base64Files = await Promise.all(filePromises);
            setFormData(prev => ({ ...prev, galleryPhotos: [...(prev.galleryPhotos || []), ...base64Files] }));
            setGalleryPreviews(prev => [...prev, ...base64Files]);
        } catch (error) {
            console.error("Error converting files to base64", error);
        }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newProfile: UserProfile = {
      id: new Date().toISOString() + Math.random(),
      ...formData,
    };
    onSubmit(newProfile);
  };
  
  const ImagePreview: React.FC<{src?: string; alt: string}> = ({src, alt}) => {
      if (!src) return null;
      return <img src={src} alt={alt} className="mt-3 w-32 h-32 object-cover rounded-lg shadow-lg border-2 border-slate-600" />
  };
  
  const FormSection: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="space-y-6 border-t border-slate-700 pt-8">
        <h3 className="text-xl font-semibold text-teal-400">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children}
        </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
      <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">ספרו לנו על עצמכם</h2>
      <form onSubmit={handleSubmit} className="space-y-10">
        
        <div className="space-y-6">
             <h3 className="text-xl font-semibold text-teal-400">פרטים אישיים ומקצועיים</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField id="fullName" label="שם מלא" value={formData.fullName} onChange={handleChange} required placeholder="ישראל ישראלי" />
                <InputField id="dob" label="תאריך לידה" type="date" value={formData.dob} onChange={handleChange} required />
                <InputField id="classNames" label="כיתה/כיתות (הפרד בפסיק)" value={formData.classNames} onChange={handleChange} required placeholder="י'1, יא'2, יב'2" />
                <InputField id="currentCity" label="עיר מגורים נוכחית" value={formData.currentCity} onChange={handleChange} required />
                <InputField id="workplace" label="מקום עבודה" value={formData.workplace} onChange={handleChange} />
                <InputField id="role" label="תפקיד" value={formData.role} onChange={handleChange} />
                <div className="md:col-span-2">
                    <InputField id="socialLink" label="קישור לרשת חברתית" type="url" value={formData.socialLink} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
                </div>
             </div>
        </div>
        
        <div className="space-y-6 border-t border-slate-700 pt-8">
            <h3 className="text-xl font-semibold text-teal-400">תמונות של אז והיום</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FileInputField id="highSchoolPhoto" name="highSchoolPhoto" label="תמונה מהתיכון" onChange={handleFileChange} required />
                  <ImagePreview src={formData.highSchoolPhoto} alt="תצוגה מקדימה של תמונת תיכון" />
                </div>
                <div>
                  <FileInputField id="currentPhoto" name="currentPhoto" label="תמונה עדכנית" onChange={handleFileChange} required />
                  <ImagePreview src={formData.currentPhoto} alt="תצוגה מקדימה של תמונה עדכנית" />
                </div>
            </div>
        </div>

        <div className="space-y-6 border-t border-slate-700 pt-8">
            <h3 className="text-xl font-semibold text-teal-400">קצת נוסטלגיה...</h3>
            <div className="grid grid-cols-1 gap-6">
                <InputField id="memory" label="מהו הזיכרון הכי חזק שלך מהתיכון?" value={formData.memory} onChange={handleChange} isTextArea />
                <InputField id="teacher" label="מיהו המורה שהכי השפיע עליך?" value={formData.teacher} onChange={handleChange} />
                <InputField id="embarrassingMoment" label="מהו הדבר הכי מביך שעשית בתיכון?" value={formData.embarrassingMoment} onChange={handleChange} isTextArea />
                <InputField id="song" label="איזה שיר מזוהה איתך מתקופת התיכון?" value={formData.song} onChange={handleChange} />
            </div>
        </div>
        
        <div className="space-y-6 border-t border-slate-700 pt-8">
             <h3 className="text-xl font-semibold text-teal-400">תוספות למזכרת</h3>
             <div className="grid grid-cols-1 gap-6">
                <div>
                    <FileInputField id="galleryPhotos" name="galleryPhotos" label="העלאת תמונות נוספות לגלריה המשותפת" onChange={handleMultipleFileChange} multiple />
                    {galleryPreviews.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                            {galleryPreviews.map((src, index) => (
                                <img key={index} src={src} alt={`תמונה מהגלריה ${index + 1}`} className="w-24 h-24 object-cover rounded-md shadow-sm border-2 border-slate-600" />
                            ))}
                        </div>
                    )}
                 </div>
                 <InputField id="yearbookDedication" label="כתבו הקדשה קצרה לספר המחזור" value={formData.yearbookDedication || ''} onChange={handleChange} isTextArea placeholder="לכל החברים, מאחל לכם..." />
             </div>
        </div>

        <div className="text-center pt-6">
          <button type="submit" className="px-10 py-3 bg-teal-500 text-white font-bold rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-800 transition-transform transform hover:scale-105 shadow-lg">
            שליחת פרופיל
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;