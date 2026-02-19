import React, { useState, useEffect } from 'react';
import { PortfolioData, Project, Experience, Skill, Education, CustomSection, Theme } from '../types';

interface CanvasPageProps {
  data: PortfolioData;
  onDataUpdate: (newData: Partial<PortfolioData>) => void;
  theme: Theme;
}

const CanvasPage: React.FC<CanvasPageProps> = ({ data, onDataUpdate, theme }) => {
  const isDark = theme === 'dark';
  const [syncing, setSyncing] = useState(false);
  const [fileHandle, setFileHandle] = useState<any>(null);

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
        newItem = { id, title: 'New Project', category: 'Blockchain', tech: 'Solidity, React', bullets: ['Key project feature'], imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop', accentColor: '#10b981' };
        break;
      case 'education':
        newItem = { id, degree: 'Degree Name', institution: 'University Name', duration: '2020-2024' };
        break;
      case 'skills':
        newItem = { id, name: 'New Skill', category: 'Technology', level: 80 };
        break;
      case 'customSections':
        newItem = { id, title: 'Additional Section', content: 'Enter your custom content here...' };
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
      alert("✅ Direct Sync Link Established!\nNow you can click 'Push to Source' to update your constants file instantly.");
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
      
      alert("🚀 Push Successful!\nYour 'constants.tsx' file has been updated directly.");
    } catch (err) {
      console.error("Direct write failed", err);
      alert("❌ Write permission denied or session expired. Please re-link your file.");
      setFileHandle(null);
    } finally {
      setSyncing(false);
    }
  };

  const cardClass = `p-8 rounded-3xl border transition-all duration-500 relative group overflow-hidden ${
    isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'
  }`;

  const inputClass = `w-full p-3 rounded-xl border transition-all duration-300 outline-none focus:ring-2 focus:ring-emerald-500/20 ${
    isDark ? 'bg-slate-950 border-white/5 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-600'
  }`;

  const labelClass = `text-[10px] font-mono uppercase tracking-widest mb-2 block ${isDark ? 'text-emerald-500' : 'text-emerald-700'}`;

  const deleteBtnClass = `absolute top-4 right-4 p-2 rounded-full transition-all duration-300 z-10 ${
    isDark ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white opacity-0 group-hover:opacity-100'
  }`;

  const addBtnClass = `px-4 py-2 rounded-full text-[10px] uppercase font-mono border transition-all ${
    isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20' : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
  }`;

  return (
    <div className="min-h-screen pt-32 pb-40 px-4 md:px-12 bg-transparent">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* SYNC INDICATOR & LINK BUTTON */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl">
           <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${fileHandle ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                 <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 14.535a9.235 9.235 0 00.184 5.006c.11.272.31.49.562.61a4.852 4.852 0 012.354 2.108c.109.201.316.33.541.33h10.726c.225 0 .432-.129.54-.33a4.852 4.852 0 012.354-2.108c.252-.12.452-.338.562-.61a9.235 9.235 0 00.184-5.006l-.382-8.551z" />
                 </svg>
              </div>
              <div>
                 <h3 className={`text-lg font-bold uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {fileHandle ? 'Direct Source Linked' : 'Source Disconnected'}
                 </h3>
                 <p className="text-[10px] font-mono uppercase text-slate-500">
                    {fileHandle ? `Linked to: ${fileHandle.name}` : 'Connect to constants.tsx for zero-work sync'}
                 </p>
              </div>
           </div>
           {!fileHandle && (
              <button onClick={linkLocalFile} className="px-6 py-3 rounded-full bg-slate-900 text-white font-mono text-[10px] uppercase hover:bg-slate-800 transition-all">
                Link constants.tsx
              </button>
           )}
        </div>

        {/* IDENTITY */}
        <section className="space-y-4">
          <h2 className={labelClass}>01 // Core Protocol Identity</h2>
          <div className={cardClass}>
            <div className="flex flex-col md:flex-row gap-8">
                <div className={`relative group/hero w-40 h-40 rounded-3xl overflow-hidden flex-shrink-0 border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-slate-100 border-slate-200 shadow-inner'}`}>
                  <img src={data.primaryImage} className="w-full h-full object-cover" />
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/hero:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                      <span className="text-[10px] font-mono uppercase text-emerald-400">Update Avatar</span>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(null, e)} />
                  </label>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <label className={labelClass}>Legal Alias</label>
                      <input value={data.name} onChange={e => onDataUpdate({ name: e.target.value })} className={inputClass} placeholder="Full Name" />
                  </div>
                  <div>
                      <label className={labelClass}>Primary Designation</label>
                      <input value={data.roleTitle} onChange={e => onDataUpdate({ roleTitle: e.target.value })} className={inputClass} placeholder="Role" />
                  </div>
                  <div>
                      <label className={labelClass}>Transmission Email</label>
                      <input value={data.contact.email} onChange={e => updateContact('email', e.target.value)} className={inputClass} placeholder="Email" />
                  </div>
                  <div>
                      <label className={labelClass}>Communication Line</label>
                      <input value={data.contact.phone} onChange={e => updateContact('phone', e.target.value)} className={inputClass} placeholder="Phone" />
                  </div>
                  <div>
                      <label className={labelClass}>Geospatial Coordinates</label>
                      <input value={data.contact.location} onChange={e => updateContact('location', e.target.value)} className={inputClass} placeholder="City, Country" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={labelClass}>GitHub Handle</label>
                      <input value={data.contact.github} onChange={e => updateContact('github', e.target.value)} className={inputClass} placeholder="github.com/..." />
                    </div>
                    <div>
                      <label className={labelClass}>LinkedIn ID</label>
                      <input value={data.contact.linkedin} onChange={e => updateContact('linkedin', e.target.value)} className={inputClass} placeholder="linkedin.com/in/..." />
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="space-y-4">
           <h2 className={labelClass}>02 // Executive Brief</h2>
           <div className={cardClass}>
             <textarea value={data.summary} onChange={e => onDataUpdate({ summary: e.target.value })} className={`${inputClass} min-h-[160px] leading-relaxed font-light`} placeholder="Brief overview of your career and technical focus..." />
           </div>
        </section>

        {/* EXPERIENCE */}
        <section className="space-y-6">
           <div className="flex justify-between items-center px-4">
              <h2 className={labelClass}>03 // Career Ledger</h2>
              <button onClick={() => addItemToList('experience')} className={addBtnClass}>+ Add Experience Module</button>
           </div>
           {data.experience.map(exp => (
             <div key={exp.id} className={cardClass}>
                <button onClick={() => removeItemFromList('experience', exp.id)} className={deleteBtnClass}>×</button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                   <div>
                     <label className={labelClass}>Role Designation</label>
                     <input value={exp.role} onChange={e => updateItemInList<Experience>('experience', exp.id, { role: e.target.value })} className={inputClass} placeholder="Role" />
                   </div>
                   <div>
                     <label className={labelClass}>Enterprise/Protocol</label>
                     <input value={exp.company} onChange={e => updateItemInList<Experience>('experience', exp.id, { company: e.target.value })} className={inputClass} placeholder="Company" />
                   </div>
                   <div>
                     <label className={labelClass}>Timeframe</label>
                     <input value={exp.duration} onChange={e => updateItemInList<Experience>('experience', exp.id, { duration: e.target.value })} className={inputClass} placeholder="Duration" />
                   </div>
                </div>
                <div className="space-y-4">
                   <label className={labelClass}>Key Transmissions</label>
                   {exp.bullets.map((b, i) => (
                     <div key={i} className="flex gap-2">
                       <textarea value={b} onChange={e => {
                         const nb = [...exp.bullets]; nb[i] = e.target.value;
                         updateItemInList<Experience>('experience', exp.id, { bullets: nb });
                       }} className={`${inputClass} text-sm py-2 min-h-[44px]`} />
                       <button onClick={() => removeBullet('experience', exp.id, i)} className="p-2 text-slate-400 hover:text-red-500">×</button>
                     </div>
                   ))}
                   <button onClick={() => addBullet('experience', exp.id)} className="text-[10px] font-mono text-emerald-500 hover:underline">+ Add Bullet Point</button>
                </div>
             </div>
           ))}
        </section>

        {/* PROJECTS */}
        <section className="space-y-6">
           <div className="flex justify-between items-center px-4">
              <h2 className={labelClass}>04 // Project Repositories</h2>
              <button onClick={() => addItemToList('projects')} className={addBtnClass}>+ Initialize New Deployment</button>
           </div>
           {data.projects.map(proj => (
             <div key={proj.id} className={cardClass}>
                <button onClick={() => removeItemFromList('projects', proj.id)} className={deleteBtnClass}>×</button>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className={`relative group/proj w-full md:w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0 border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                    <img src={proj.imageUrl} className="w-full h-full object-cover" />
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/proj:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                        <span className="text-[10px] font-mono uppercase text-emerald-400">Change Image</span>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(proj.id, e)} />
                    </label>
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="lg:col-span-2">
                        <label className={labelClass}>Deployment Name</label>
                        <input value={proj.title} onChange={e => updateItemInList<Project>('projects', proj.id, { title: e.target.value })} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Sub-Sector</label>
                        <input value={proj.category} onChange={e => updateItemInList<Project>('projects', proj.id, { category: e.target.value })} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Accent Color</label>
                        <div className="flex gap-2 items-center">
                          <input type="color" value={proj.accentColor} onChange={e => updateItemInList<Project>('projects', proj.id, { accentColor: e.target.value })} className="w-10 h-10 p-1 rounded-lg bg-transparent border-none cursor-pointer" />
                          <input value={proj.accentColor} onChange={e => updateItemInList<Project>('projects', proj.id, { accentColor: e.target.value })} className={inputClass} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Technology Stack</label>
                      <input value={proj.tech} onChange={e => updateItemInList<Project>('projects', proj.id, { tech: e.target.value })} className={inputClass} placeholder="Solidity, React, IPFS..." />
                    </div>
                    <div className="space-y-4">
                      <label className={labelClass}>Project Documentation</label>
                      {proj.bullets.map((b, i) => (
                        <div key={i} className="flex gap-2">
                          <textarea value={b} onChange={e => {
                            const nb = [...proj.bullets]; nb[i] = e.target.value;
                            updateItemInList<Project>('projects', proj.id, { bullets: nb });
                          }} className={`${inputClass} text-sm py-2 min-h-[44px]`} />
                          <button onClick={() => removeBullet('projects', proj.id, i)} className="p-2 text-slate-400 hover:text-red-500">×</button>
                        </div>
                      ))}
                      <button onClick={() => addBullet('projects', proj.id)} className="text-[10px] font-mono text-emerald-500 hover:underline">+ Add Project Insight</button>
                    </div>
                  </div>
                </div>
             </div>
           ))}
        </section>

        {/* SKILLS */}
        <section className="space-y-6">
           <div className="flex justify-between items-center px-4">
              <h2 className={labelClass}>05 // Skill Proficiency Matrix</h2>
              <button onClick={() => addItemToList('skills')} className={addBtnClass}>+ Add Skill Node</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {data.skills.map(skill => (
               <div key={skill.id} className={cardClass}>
                 <button onClick={() => removeItemFromList('skills', skill.id)} className={deleteBtnClass}>×</button>
                 <div className="space-y-4">
                   <div>
                     <label className={labelClass}>Skill Name</label>
                     <input value={skill.name} onChange={e => updateItemInList<Skill>('skills', skill.id, { name: e.target.value })} className={inputClass} />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className={labelClass}>Classification</label>
                       <select value={skill.category} onChange={e => updateItemInList<Skill>('skills', skill.id, { category: e.target.value as any })} className={inputClass}>
                         <option value="Language">Language</option>
                         <option value="Technology">Technology</option>
                         <option value="Spoken">Spoken</option>
                       </select>
                     </div>
                     <div>
                       <label className={labelClass}>Level ({skill.level}%)</label>
                       <input type="range" min="0" max="100" value={skill.level} onChange={e => updateItemInList<Skill>('skills', skill.id, { level: parseInt(e.target.value) })} className="w-full mt-4 h-2 rounded-lg appearance-none bg-slate-700 cursor-pointer accent-emerald-500" />
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </section>

        {/* EDUCATION */}
        <section className="space-y-6">
           <div className="flex justify-between items-center px-4">
              <h2 className={labelClass}>06 // Academic Background</h2>
              <button onClick={() => addItemToList('education')} className={addBtnClass}>+ Add Education Module</button>
           </div>
           {data.education.map(edu => (
             <div key={edu.id} className={cardClass}>
                <button onClick={() => removeItemFromList('education', edu.id)} className={deleteBtnClass}>×</button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div>
                     <label className={labelClass}>Degree / Certificate</label>
                     <input value={edu.degree} onChange={e => updateItemInList<Education>('education', edu.id, { degree: e.target.value })} className={inputClass} />
                   </div>
                   <div>
                     <label className={labelClass}>Institution</label>
                     <input value={edu.institution} onChange={e => updateItemInList<Education>('education', edu.id, { institution: e.target.value })} className={inputClass} />
                   </div>
                   <div>
                     <label className={labelClass}>Timeframe</label>
                     <input value={edu.duration} onChange={e => updateItemInList<Education>('education', edu.id, { duration: e.target.value })} className={inputClass} />
                   </div>
                </div>
             </div>
           ))}
        </section>

      </div>

      {/* SYNC/GENERATE TOOL */}
      <div className="fixed bottom-10 right-10 z-50">
        <button 
          onClick={pushToSource}
          disabled={syncing}
          className={`${syncing ? 'bg-slate-600' : (fileHandle ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500')} text-white px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group`}
        >
          {syncing ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={fileHandle ? "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" : "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"} />
            </svg>
          )}
          {syncing ? 'Pushing Data...' : (fileHandle ? 'Push to Source' : 'Link & Sync')}
        </button>
      </div>
    </div>
  );
};

export default CanvasPage;