import React, { useEffect } from 'react';
import { PortfolioData, Theme } from '../types';

interface InnovativePageProps {
  data: PortfolioData;
  theme: Theme;
}

const InnovativePage: React.FC<InnovativePageProps> = ({ data, theme }) => {
  const isDark = theme === 'dark';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-20');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, [data]);

  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subTextColor = isDark ? 'text-slate-400' : 'text-slate-500';
  const accentColor = isDark ? 'text-emerald-400' : 'text-emerald-600';
  const bgColor = isDark ? 'bg-[#020617]' : 'bg-white';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';

  const featuredProjects = data.projects.slice(0, 4);
  const secondaryProjects = data.projects.slice(4);

  return (
    <div className={`${bgColor} transition-colors duration-500 selection:bg-emerald-500 min-h-screen font-sans`}>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`, 
          backgroundSize: '60px 60px' 
        }}></div>
      </div>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-4">
           <div className="reveal-on-scroll opacity-0 translate-y-20 transition-all duration-1000 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className={`${accentColor} font-mono text-[10px] uppercase tracking-[0.3em]`}>Currently Encrypted // Noida, IN</span>
              </div>
              
              <h1 className={`text-6xl md:text-[10rem] font-display font-black leading-none uppercase italic tracking-tighter ${textColor}`}>
                 {data.name.split(' ')[0]}<br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-indigo-500">
                    {data.name.split(' ').slice(1).join(' ')}
                 </span>
              </h1>
              
              <div className="max-w-3xl mx-auto space-y-4">
                <p className={`${subTextColor} font-mono text-sm uppercase tracking-[0.4em] leading-relaxed`}>
                   {data.roleTitle}
                </p>
                <div className="h-[1px] w-24 bg-emerald-500/30 mx-auto"></div>
              </div>
           </div>
        </section>

        {/* SUMMARY BRIEF */}
        <section className="py-32 px-6 md:px-24">
           <div className="max-w-4xl mx-auto text-center reveal-on-scroll opacity-0 translate-y-20 transition-all duration-1000">
              <h2 className={`text-[10px] font-mono uppercase tracking-[0.6em] mb-12 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>01 // Executive Intent</h2>
              <p className={`text-xl md:text-3xl font-light leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {data.summary}
              </p>
           </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="py-32 px-6 md:px-24 space-y-32">
           <div className="text-center space-y-4 mb-24">
             <h2 className={`text-[10px] font-mono uppercase tracking-[0.6em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>02 // Active Deployments</h2>
             <div className={`text-4xl md:text-6xl font-display font-bold uppercase italic ${textColor}`}>Project Portfolio</div>
           </div>

           {featuredProjects.map((project, i) => (
              <div key={project.id} className="reveal-on-scroll opacity-0 translate-y-20 transition-all duration-1000 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className={`group relative rounded-[3rem] overflow-hidden bg-slate-900 border ${isDark ? 'border-white/10' : 'border-slate-200'} aspect-[16/10] shadow-2xl`}>
                       <img src={project.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                       <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                          <div className="space-y-2">
                             <div className="flex gap-2">
                                {project.tech.split(',').map((t, idx) => (
                                   <span key={idx} className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase">
                                      {t.trim()}
                                   </span>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div className="space-y-2">
                       <span className={`${accentColor} font-mono text-xs uppercase tracking-[0.3em]`}>{project.category}</span>
                       <h3 className={`text-5xl md:text-7xl font-display font-black uppercase italic leading-none ${textColor}`}>{project.title}</h3>
                    </div>
                    <div className="space-y-4">
                       {project.bullets.map((bullet, idx) => (
                          <p key={idx} className={`${subTextColor} text-lg font-light leading-relaxed flex gap-4`}>
                             <span className={accentColor}>—</span> {bullet}
                          </p>
                       ))}
                    </div>
                 </div>
              </div>
           ))}
        </section>

        {/* SECONDARY PROJECTS GRID */}
        {secondaryProjects.length > 0 && (
          <section className="py-32 px-6 md:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {secondaryProjects.map((project) => (
                 <div key={project.id} className={`reveal-on-scroll opacity-0 translate-y-20 transition-all duration-700 p-8 rounded-[2.5rem] border group transition-all duration-500 ${
                    isDark ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]' : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-xl'
                 }`}>
                    <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                       <img src={project.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="space-y-4">
                       <div className="flex flex-wrap gap-2">
                          {project.tech.split(',').map((t, idx) => (
                             <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-500/5 border border-emerald-500/10 text-emerald-500/70 font-mono text-[8px] uppercase">
                                {t.trim()}
                             </span>
                          ))}
                       </div>
                       <h4 className={`text-2xl font-bold uppercase italic ${textColor}`}>{project.title}</h4>
                       <p className={`text-sm ${subTextColor} font-light leading-relaxed line-clamp-3`}>{project.bullets[0]}</p>
                    </div>
                 </div>
               ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE LEDGER */}
        <section className={`py-40 px-6 md:px-24 transition-colors duration-500 ${isDark ? 'bg-white/[0.01]' : 'bg-slate-50'}`}>
           <div className="max-w-5xl mx-auto">
              <h2 className={`text-[10px] font-mono uppercase tracking-[0.6em] mb-24 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>03 // Career Protocol</h2>
              <div className="space-y-32">
                 {data.experience.map((exp) => (
                    <div key={exp.id} className="reveal-on-scroll opacity-0 translate-y-20 transition-all duration-1000 grid grid-cols-1 md:grid-cols-3 gap-12 group">
                       <div className="space-y-4">
                          <span className={`${accentColor} font-mono text-[10px] uppercase tracking-widest`}>{exp.duration}</span>
                          <h3 className={`text-4xl font-display font-black uppercase italic leading-none transition-colors ${textColor} group-hover:text-emerald-500`}>
                             {exp.company}
                          </h3>
                          <p className={`${subTextColor} font-mono text-xs uppercase tracking-[0.2em]`}>{exp.role}</p>
                       </div>
                       <div className={`md:col-span-2 space-y-6 border-l pl-12 relative transition-colors ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                          <div className={`absolute -left-[6px] top-0 w-3 h-3 rounded-full transition-transform duration-500 group-hover:scale-150 ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`}></div>
                          {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                             <p key={idx} className={`text-lg font-light leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {bullet}
                             </p>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* SKILLS MATRIX */}
        <section className="py-40 px-6 md:px-24">
           <h2 className={`text-[10px] font-mono uppercase tracking-[0.6em] mb-24 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>04 // Proficiency Matrix</h2>
           <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-16">
              {data.skills.map((skill) => (
                 <div key={skill.id} className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 text-center group">
                    <div className={`text-[10px] font-mono uppercase mb-4 tracking-widest transition-colors ${subTextColor} group-hover:text-emerald-400`}>{skill.name}</div>
                    <div className={`relative h-[2px] w-full rounded-full overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
                       <div className={`h-full transition-all duration-1000 ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`} style={{ width: `${skill.level}%` }}></div>
                    </div>
                    <div className={`${accentColor} font-mono text-[9px] mt-4 opacity-0 group-hover:opacity-100 transition-opacity`}>{skill.level}% CAPACITY</div>
                 </div>
              ))}
           </div>
        </section>

        {/* CTA FOOTER */}
        <section className="py-64 text-center px-4 relative overflow-hidden">
           <div className="reveal-on-scroll opacity-0 translate-y-20 transition-all duration-1000 space-y-12 relative z-10">
              <h2 className={`text-6xl md:text-[8rem] font-display font-black uppercase italic leading-none tracking-tighter ${textColor}`}>
                 Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500 underline decoration-emerald-500/20 underline-offset-8">Build</span>
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a href={`mailto:${data.contact.email}`} className={`px-12 py-6 font-black uppercase tracking-widest rounded-full transition-all duration-500 transform hover:scale-105 shadow-2xl ${
                  isDark ? 'bg-white text-black hover:bg-emerald-500 hover:text-white' : 'bg-slate-900 text-white hover:bg-emerald-600 shadow-emerald-500/20'
                }`}>
                   Email Transmission
                </a>
                <a href={`https://${data.contact.linkedin}`} target="_blank" className={`px-12 py-6 font-black uppercase tracking-widest rounded-full transition-all duration-500 transform hover:scale-105 border ${
                  isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-900 text-slate-900 hover:bg-slate-50'
                }`}>
                   LinkedIn Signal
                </a>
              </div>
           </div>
           
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[150px] rounded-full opacity-10 pointer-events-none transition-colors ${
             isDark ? 'bg-emerald-500' : 'bg-emerald-200'
           }`}></div>
        </section>
      </main>
    </div>
  );
};

export default InnovativePage;