import React, { useState, useEffect } from 'react';
import { PortfolioData, Project, Experience, Skill, Education, Theme } from '../types';

interface CanvasPageProps {
  data: PortfolioData;
  onDataUpdate: (newData: Partial<PortfolioData>) => void;
  theme: Theme;
}

const CanvasPage: React.FC<CanvasPageProps> = ({ data, onDataUpdate, theme }) => {
  const isDark = theme === 'dark';
  const [syncing, setSyncing] = useState(false);
  const [fileHandle, setFileHandle] = useState<any>(null);

  const colors = {
    accent: isDark ? 'text-emerald-400' : 'text-emerald-700',
    text: isDark ? 'text-slate-400' : 'text-slate-900',
    subText: isDark ? 'text-slate-400' : 'text-slate-500',
    inputText: isDark ? 'text-black' : 'text-slate-900',
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const updateContact = (key: keyof PortfolioData['contact'], value: string) => {
    onDataUpdate({ contact: { ...data.contact, [key]: value } });
  };

  const updateItemInList = <T extends { id: string }>(
    listName: keyof PortfolioData,
    id: string,
    updates: Partial<T>
  ) => {
    const list = (data[listName] as any) || [];
    const newList = list.map((item: T) => item.id === id ? { ...item, ...updates } : item);
    onDataUpdate({ [listName]: newList });
  };

  const addItemToList = (listName: keyof PortfolioData) => {
    const id = generateId();
    let newItem: any;

    switch (listName) {
      case 'experience':
        newItem = { id, role: 'New Role', company: 'New Company', duration: '2024 - Present', bullets: ['Key responsibility or achievement'] };
        break;
      case 'projects':
        newItem = { id, title: 'New Project', category: 'Development', tech: 'Solidity, React', bullets: ['Key project feature'], imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop', accentColor: '#10b981' };
        break;
      case 'education':
        newItem = { id, degree: 'Degree Name', institution: 'University Name', duration: '2020-2024' };
        break;
      case 'skills':
        newItem = { id, name: 'New Skill', category: 'Technology', level: 80 };
        break;
      default:
        return;
    }

    const currentList = (data[listName] || []) as any[];
    onDataUpdate({ [listName]: [...currentList, newItem] });
  };

  const removeItemFromList = (listName: keyof PortfolioData, id: string) => {
    if (confirm("Are you sure you want to remove this item?")) {
      const currentList = (data[listName] || []) as any[];
      onDataUpdate({ [listName]: currentList.filter(item => item.id !== id) });
    }
  };

  const addBullet = (listName: 'projects' | 'experience', id: string) => {
    const list = (data[listName] as any[]) || [];
    const newList = list.map(item => {
      if (item.id === id) {
        return { ...item, bullets: [...item.bullets, ''] };
      }
      return item;
    });
    onDataUpdate({ [listName]: newList });
  };

  const removeBullet = (listName: 'projects' | 'experience', id: string, index: number) => {
    const list = (data[listName] as any[]) || [];
    const newList = list.map(item => {
      if (item.id === id) {
        const newBullets = [...item.bullets];
        newBullets.splice(index, 1);
        return { ...item, bullets: newBullets };
      }
      return item;
    });
    onDataUpdate({ [listName]: newList });
  };

  const handleImageUpload = (id: string | null, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (id) {
          updateItemInList<Project>('projects', id, { imageUrl: result, imageFile: file });
        } else {
          onDataUpdate({ primaryImage: result, primaryImageFile: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const linkLocalFile = async () => {
    try {
      // @ts-ignore
      const [handle] = await window.showOpenFilePicker({
        types: [{
          description: 'TypeScript File',
          accept: { 'text/typescript': ['.tsx'] },
        }],
      });
      setFileHandle(handle);
      alert("✅ Direct Sync Link Established!");
    } catch (err) {
      console.error("User cancelled or API not supported", err);
    }
  };

  const pushToSource = async () => {
    if (!fileHandle) {
      await linkLocalFile();
      return;
    }

    setSyncing(true);
    try {
      const cleanData = JSON.stringify(data, null, 2);
      const fileContent = `import { PortfolioData } from './types';\n\nexport const INITIAL_DATA: PortfolioData = ${cleanData};`;
      
      // @ts-ignore
      const writable = await fileHandle.createWritable();
      await writable.write(fileContent);
      await writable.close();
      
      alert("🚀 Push Successful! Source code updated.");
    } catch (err) {
      console.error("Direct write failed", err);
      alert("❌ Write permission denied. Please re-link your file.");
      setFileHandle(null);
    } finally {
      setSyncing(false);
    }
  };

  const sectionHeadingClass = `text-sm font-bold uppercase tracking-[0.3em] mb-8 ${colors.accent}`;
  
  const cardClass = `p-10 rounded-[2.5rem] border transition-all duration-300 relative group ${
    isDark ? 'bg-white/[0.02] border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/40'
  }`;

  const inputClass = `w-full px-6 py-5 rounded-2xl border transition-all duration-300 outline-none font-medium text-base focus:ring-4 focus:ring-emerald-500/10 ${
    isDark ? `bg-slate-900/50 border-white/10 ${colors.inputText} focus:border-emerald-500` : `bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-600`
  }`;

  const labelClass = `text-[11px] font-bold uppercase tracking-widest mb-3 block ${colors.subText}`;

  const deleteBtnClass = `absolute top-8 right-8 p-3 rounded-full transition-all duration-300 z-10 ${
    isDark ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'
  }`;

  const addBtnClass = `px-8 py-3 rounded-full text-[11px] uppercase font-bold border transition-all ${
    isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white' : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-700 hover:text-white'
  }`;

  return (
    <div className={`min-h-screen pt-32 pb-48 px-4 md:px-12 max-w-6xl mx-auto ${colors.text}`}>
      <div className="space-y-24">
        
        {/* HEADER TOOLBAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 rounded-[3rem] border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-3xl">
           <div className="flex items-center gap-8">
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${fileHandle ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : (isDark ? 'bg-slate-800' : 'bg-slate-200')}`}>
                 <svg className={`w-8 h-8 ${fileHandle ? 'text-white' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                 </svg>
              </div>
              <div className="text-left">
                 <h3 className="text-2xl font-display font-black uppercase tracking-tight">
                    {fileHandle ? 'Live Sync Active' : 'Offline Mode'}
                 </h3>
                 <p className={`text-sm font-medium ${colors.subText}`}>
                    {fileHandle ? `Editing ${fileHandle.name}` : 'Connect local file to persist changes instantly.'}
                 </p>
              </div>
           </div>
           {!fileHandle && (
              <button onClick={linkLocalFile} className="px-10 py-5 rounded-full bg-slate-900 text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-2xl">
                Initialize File Link
              </button>
           )}
        </div>

        {/* SECTION: PERSONAL INFORMATION */}
        <section>
          <h2 className={sectionHeadingClass}>Core Profile</h2>
          <div className={cardClass}>
            <div className="flex flex-col lg:flex-row gap-16">
                <div className="relative group/hero w-full lg:w-64 h-64 rounded-[2.5rem] overflow-hidden flex-shrink-0 border-4 border-dashed border-emerald-500/20 bg-emerald-500/5">
                  <img src={data.primaryImage} className="w-full h-full object-cover transition-transform group-hover/hero:scale-105" />
                  <label className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover/hero:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity">
                      <svg className="w-10 h-10 text-emerald-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      <span className="text-[11px] font-bold uppercase text-white tracking-widest">Swap Identity Image</span>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(null, e)} />
                  </label>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <label className={labelClass}>Legal Name</label>
                        <input value={data.name} onChange={e => onDataUpdate({ name: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Professional Designation</label>
                        <input value={data.roleTitle} onChange={e => onDataUpdate({ roleTitle: e.target.value })} className={inputClass} />
                    </div>
                  </div>
                  <div>
                      <label className={labelClass}>Primary Email</label>
                      <input value={data.contact.email} onChange={e => updateContact('email', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                      <label className={labelClass}>Contact Number</label>
                      <input value={data.contact.phone} onChange={e => updateContact('phone', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                      <label className={labelClass}>Geographic Location</label>
                      <input value={data.contact.location} onChange={e => updateContact('location', e.target.value)} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>GitHub Handle</label>
                      <input value={data.contact.github} onChange={e => updateContact('github', e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>LinkedIn ID</label>
                      <input value={data.contact.linkedin} onChange={e => updateContact('linkedin', e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* SECTION: SUMMARY */}
        <section>
           <h2 className={sectionHeadingClass}>Professional Objective</h2>
           <div className={cardClass}>
             <textarea 
                value={data.summary} 
                onChange={e => onDataUpdate({ summary: e.target.value })} 
                className={`${inputClass} min-h-[200px] leading-relaxed text-lg`} 
                placeholder="Detail your career path, technical expertise, and mission statement..." 
             />
           </div>
        </section>

        {/* SECTION: EXPERIENCE */}
        <section className="space-y-10">
           <div className="flex justify-between items-center">
              <h2 className={sectionHeadingClass}>Career History</h2>
              <button onClick={() => addItemToList('experience')} className={addBtnClass}>+ Log New Role</button>
           </div>
           {data.experience.map(exp => (
             <div key={exp.id} className={cardClass}>
                <button onClick={() => removeItemFromList('experience', exp.id)} className={deleteBtnClass}>×</button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                   <div>
                     <label className={labelClass}>Role Title</label>
                     <input value={exp.role} onChange={e => updateItemInList<Experience>('experience', exp.id, { role: e.target.value })} className={inputClass} />
                   </div>
                   <div>
                     <label className={labelClass}>Company Name</label>
                     <input value={exp.company} onChange={e => updateItemInList<Experience>('experience', exp.id, { company: e.target.value })} className={inputClass} />
                   </div>
                   <div>
                     <label className={labelClass}>Period</label>
                     <input value={exp.duration} onChange={e => updateItemInList<Experience>('experience', exp.id, { duration: e.target.value })} className={inputClass} />
                   </div>
                </div>
                <div className="space-y-8">
                   <label className={labelClass}>Strategic Accomplishments</label>
                   <div className="grid gap-5">
                     {exp.bullets.map((b, i) => (
                       <div key={i} className="flex gap-5">
                         <textarea 
                            value={b} 
                            onChange={e => {
                              const nb = [...exp.bullets]; nb[i] = e.target.value;
                              updateItemInList<Experience>('experience', exp.id, { bullets: nb });
                            }} 
                            className={`${inputClass} text-sm py-4 min-h-[60px]`} 
                         />
                         <button onClick={() => removeBullet('experience', exp.id, i)} className="p-3 text-slate-400 hover:text-red-500 transition-colors">×</button>
                       </div>
                     ))}
                   </div>
                   <button onClick={() => addBullet('experience', exp.id)} className={`text-xs font-bold uppercase tracking-widest ${colors.accent} hover:underline`}>+ Add Performance Bullet</button>
                </div>
             </div>
           ))}
        </section>

        {/* SECTION: PROJECTS */}
        <section className="space-y-10">
           <div className="flex justify-between items-center">
              <h2 className={sectionHeadingClass}>Project Portfolio</h2>
              <button onClick={() => addItemToList('projects')} className={addBtnClass}>+ Add Deployment</button>
           </div>
           <div className="grid grid-cols-1 gap-10">
             {data.projects.map(proj => (
               <div key={proj.id} className={cardClass}>
                  <button onClick={() => removeItemFromList('projects', proj.id)} className={deleteBtnClass}>×</button>
                  <div className="flex flex-col lg:flex-row gap-12">
                    <div className="w-full lg:w-72 h-48 rounded-3xl overflow-hidden flex-shrink-0 border border-emerald-500/10 bg-emerald-500/5 relative">
                      <img src={proj.imageUrl} className="w-full h-full object-cover" />
                      <label className="absolute inset-0 bg-slate-900/70 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                          <span className="text-[11px] font-bold uppercase text-white tracking-widest">Upload Frame</span>
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(proj.id, e)} />
                      </label>
                    </div>
                    <div className="flex-1 space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div>
                          <label className={labelClass}>Project Designation</label>
                          <input value={proj.title} onChange={e => updateItemInList<Project>('projects', proj.id, { title: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Focus Category</label>
                          <input value={proj.category} onChange={e => updateItemInList<Project>('projects', proj.id, { category: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>Visual Accent</label>
                          <div className="flex gap-4 items-center">
                            <input type="color" value={proj.accentColor} onChange={e => updateItemInList<Project>('projects', proj.id, { accentColor: e.target.value })} className="w-12 h-12 p-1.5 rounded-2xl bg-transparent border-none cursor-pointer" />
                            <input value={proj.accentColor} onChange={e => updateItemInList<Project>('projects', proj.id, { accentColor: e.target.value })} className={inputClass} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Technological Integration</label>
                        <input value={proj.tech} onChange={e => updateItemInList<Project>('projects', proj.id, { tech: e.target.value })} className={inputClass} />
                      </div>
                      <div className="space-y-6">
                        <label className={labelClass}>Outcome Description</label>
                        <div className="grid gap-4">
                          {proj.bullets.map((b, i) => (
                            <div key={i} className="flex gap-4">
                              <textarea 
                                value={b} 
                                onChange={e => {
                                  const nb = [...proj.bullets]; nb[i] = e.target.value;
                                  updateItemInList<Project>('projects', proj.id, { bullets: nb });
                                }} 
                                className={`${inputClass} text-sm py-4 min-h-[60px]`} 
                              />
                              <button onClick={() => removeBullet('projects', proj.id, i)} className="p-3 text-slate-400 hover:text-red-500">×</button>
                            </div>
                          ))}
                        </div>
                        <button onClick={() => addBullet('projects', proj.id)} className={`text-xs font-bold uppercase tracking-widest ${colors.accent} hover:underline`}>+ Add Impact Point</button>
                      </div>
                    </div>
                  </div>
               </div>
             ))}
           </div>
        </section>

        {/* SECTION: SKILLS */}
        <section className="space-y-10">
           <div className="flex justify-between items-center">
              <h2 className={sectionHeadingClass}>Core Expertise</h2>
              <button onClick={() => addItemToList('skills')} className={addBtnClass}>+ Add Capability</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {data.skills.map(skill => (
               <div key={skill.id} className={cardClass}>
                 <button onClick={() => removeItemFromList('skills', skill.id)} className={deleteBtnClass}>×</button>
                 <div className="space-y-8">
                   <div>
                     <label className={labelClass}>Technology / Language</label>
                     <input value={skill.name} onChange={e => updateItemInList<Skill>('skills', skill.id, { name: e.target.value })} className={inputClass} />
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                     <div>
                       <label className={labelClass}>Classification</label>
                       <select value={skill.category} onChange={e => updateItemInList<Skill>('skills', skill.id, { category: e.target.value as any })} className={inputClass}>
                         <option value="Language">Language</option>
                         <option value="Technology">Technology</option>
                         <option value="Spoken">Spoken</option>
                       </select>
                     </div>
                     <div>
                       <label className={labelClass}>Proficiency Level ({skill.level}%)</label>
                       <input type="range" min="0" max="100" value={skill.level} onChange={e => updateItemInList<Skill>('skills', skill.id, { level: parseInt(e.target.value) })} className="w-full mt-6 h-2 rounded-lg appearance-none bg-emerald-500/10 cursor-pointer accent-emerald-500" />
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </section>

        {/* SECTION: EDUCATION */}
        <section className="space-y-10">
           <div className="flex justify-between items-center">
              <h2 className={sectionHeadingClass}>Academic History</h2>
              <button onClick={() => addItemToList('education')} className={addBtnClass}>+ Log Academic Entry</button>
           </div>
           <div className="grid gap-8">
             {data.education.map(edu => (
               <div key={edu.id} className={cardClass}>
                  <button onClick={() => removeItemFromList('education', edu.id)} className={deleteBtnClass}>×</button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                     <div>
                       <label className={labelClass}>Degree Earned</label>
                       <input value={edu.degree} onChange={e => updateItemInList<Education>('education', edu.id, { degree: e.target.value })} className={inputClass} />
                     </div>
                     <div>
                       <label className={labelClass}>Institution</label>
                       <input value={edu.institution} onChange={e => updateItemInList<Education>('education', edu.id, { institution: e.target.value })} className={inputClass} />
                     </div>
                     <div>
                       <label className={labelClass}>Duration</label>
                       <input value={edu.duration} onChange={e => updateItemInList<Education>('education', edu.id, { duration: e.target.value })} className={inputClass} />
                     </div>
                  </div>
               </div>
             ))}
           </div>
        </section>

      </div>

      {/* FLOATING ACTION BUTTON */}
      <div className="fixed bottom-12 right-12 z-50">
        <button 
          onClick={pushToSource}
          disabled={syncing}
          className={`${syncing ? 'bg-slate-600' : (fileHandle ? 'bg-emerald-600 hover:bg-emerald-700 shadow-[0_20px_60px_rgba(16,185,129,0.3)]' : 'bg-indigo-600 hover:bg-indigo-700 shadow-2xl')} text-white px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-5 transition-all hover:scale-105 active:scale-95 group`}
        >
          {syncing ? (
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={fileHandle ? "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" : "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"} />
            </svg>
          )}
          {syncing ? 'UPDATING...' : (fileHandle ? 'COMMIT UPDATES' : 'LINK SOURCE')}
        </button>
      </div>
    </div>
  );
};

export default CanvasPage;