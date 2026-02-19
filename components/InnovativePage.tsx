import React, { useEffect, useState } from 'react';
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-trigger').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [data]);

  const colors = {
    bg: isDark ? 'bg-slate-950' : 'bg-white',
    text: isDark ? 'text-white' : 'text-slate-900',
    subText: isDark ? 'text-slate-400' : 'text-slate-600',
    accent: isDark ? 'text-emerald-400' : 'text-emerald-700',
    accentBg: isDark ? 'bg-emerald-500' : 'bg-emerald-600',
    border: isDark ? 'border-white/10' : 'border-slate-200',
    card: isDark ? 'bg-white/[0.03] border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm',
  };

  return (
    <div className={`min-h-screen ${colors.bg} ${colors.text} selection:bg-emerald-500/30 overflow-x-hidden transition-colors duration-500`}>
      <style>{`
        .reveal-trigger { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-active { opacity: 1; transform: translateY(0); }
        @keyframes subtle-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }
        .pulse-glow { animation: subtle-pulse 4s ease-in-out infinite; }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 ${isDark ? 'bg-emerald-500' : 'bg-emerald-400'}`} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          {/* Profile Image with Glow */}
          <div className="relative mb-12 reveal-trigger">
            <div className={`absolute inset-[-20px] rounded-full blur-3xl opacity-30 ${colors.accentBg} pulse-glow`} />
            <div className={`relative w-44 h-44 md:w-60 md:h-60 rounded-full p-1.5 border-4 ${colors.border} bg-white/5`}>
              <img 
                src={data.primaryImage} 
                alt={data.name} 
                className="w-full h-full object-cover rounded-full shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          <div className="reveal-trigger" style={{ transitionDelay: '200ms' }}>
            <span className={`inline-block px-5 py-2 mb-8 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] ${isDark ? 'bg-white/5 text-emerald-400 border border-white/10' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
              Available for New Initiatives
            </span>
            <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-[0.85] mb-10 uppercase italic">
              {data.name}
            </h1>
            <p className={`text-xl md:text-3xl font-medium ${colors.subText} max-w-3xl mx-auto leading-relaxed`}>
              {data.roleTitle}
            </p>
          </div>

          <div className="mt-16 flex gap-4 reveal-trigger" style={{ transitionDelay: '400ms' }}>
            <div className={`h-[1px] w-12 self-center ${isDark ? 'bg-white/20' : 'bg-slate-300'}`} />
            <p className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-50">Discovery Phase</p>
            <div className={`h-[1px] w-12 self-center ${isDark ? 'bg-white/20' : 'bg-slate-300'}`} />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-40 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-4 reveal-trigger">
            <h2 className={`text-xs font-bold uppercase tracking-[0.5em] ${colors.accent} mb-6`}>01 // Profile</h2>
            <h3 className="text-5xl font-display font-black uppercase italic leading-none tracking-tighter">Strategic<br/>Vision</h3>
          </div>
          <div className="md:col-span-8 reveal-trigger">
            <p className="text-2xl md:text-4xl leading-[1.15] font-light tracking-tight italic">
              "{data.summary}"
            </p>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${colors.subText} mb-3`}>Communications</p>
                <p className="text-xl font-bold">{data.contact.email}</p>
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${colors.subText} mb-3`}>Current Base</p>
                <p className="text-xl font-bold">{data.contact.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className={`py-40 px-6 ${isDark ? 'bg-white/[0.01]' : 'bg-slate-50'} border-y ${colors.border}`}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-24 reveal-trigger text-center">
            <h2 className={`text-xs font-bold uppercase tracking-[0.5em] ${colors.accent} mb-6`}>02 // Capabilities</h2>
            <h3 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter">Tech Infrastructure</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.skills.map((skill, i) => (
              <div key={skill.id} className={`reveal-trigger group p-10 rounded-[2.5rem] ${colors.card} transition-all duration-500 hover:-translate-y-3 hover:border-emerald-500/30`} style={{ transitionDelay: `${i * 50}ms` }}>
                <span className="text-[10px] font-mono opacity-30 block mb-6">MODULE_0{i+1}</span>
                <h4 className="text-2xl font-bold uppercase mb-8 tracking-tighter">{skill.name}</h4>
                <div className={`h-[4px] w-full ${isDark ? 'bg-white/5' : 'bg-slate-200'} rounded-full overflow-hidden`}>
                  <div className={`h-full ${colors.accentBg} transition-all duration-1000 ease-out`} style={{ width: `${skill.level}%` }} />
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="text-[10px] font-bold uppercase opacity-40 tracking-widest">{skill.category}</span>
                  <span className={`text-[10px] font-bold ${colors.accent}`}>{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="py-40 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="reveal-trigger text-left">
            <h2 className={`text-xs font-bold uppercase tracking-[0.5em] ${colors.accent} mb-6`}>03 // Case Studies</h2>
            <h3 className="text-6xl md:text-9xl font-display font-black uppercase italic tracking-tighter leading-[0.8]">Selected<br/>Operations</h3>
          </div>
          <p className={`max-w-xs text-base font-medium ${colors.subText} text-left md:text-right reveal-trigger`}>
            A demonstration of complex problem-solving across decentralized networks and scalable architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {data.projects.map((project, i) => (
            <div key={project.id} className="reveal-trigger group space-y-10">
              <div className={`relative aspect-[4/3] overflow-hidden rounded-[3rem] border-2 ${colors.border} shadow-2xl`}>
                <img 
                  src={project.imageUrl} 
                  className="w-full min-h-[300px] max-h-[300px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  alt={project.title}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-slate-950/90' : 'from-white/40'} via-transparent to-transparent opacity-80`} />
                <div className="absolute top-10 left-10">
                  <span className={`px-6 py-2 rounded-full backdrop-blur-xl border ${colors.border} text-[10px] font-bold uppercase tracking-widest ${isDark ? 'bg-white/5 text-white' : 'bg-white/80 text-slate-900'}`}>
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="px-6">
                <h4 className="text-4xl md:text-5xl font-display font-black uppercase italic mb-6 group-hover:text-emerald-500 transition-colors tracking-tighter">{project.title}</h4>
                <div className="flex flex-wrap gap-4 mb-8">
                  {project.tech.split(',').map((t, idx) => (
                    <span key={idx} className={`text-[11px] font-mono uppercase tracking-widest opacity-50`}>{t.trim()}</span>
                  ))}
                </div>
                <p className={`${colors.subText} text-xl leading-relaxed font-medium`}>{project.bullets[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className={`py-40 px-6 ${isDark ? 'bg-white/[0.01]' : 'bg-slate-50'} border-y ${colors.border}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-xs font-bold uppercase tracking-[0.5em] ${colors.accent} mb-24 text-center reveal-trigger`}>04 // Timeline</h2>
          
          <div className="space-y-24">
            {data.experience.map((exp, i) => (
              <div key={exp.id} className="reveal-trigger grid grid-cols-1 md:grid-cols-12 gap-10 items-start group">
                <div className="md:col-span-3">
                  <span className={`text-sm font-bold font-mono tracking-[0.2em] ${colors.accent}`}>{exp.duration}</span>
                </div>
                <div className="md:col-span-9">
                  <h4 className="text-4xl font-display font-black uppercase italic mb-3 tracking-tighter group-hover:translate-x-2 transition-transform">{exp.company}</h4>
                  <p className={`text-xs font-bold uppercase tracking-[0.3em] ${colors.subText} mb-8`}>{exp.role}</p>
                  <ul className="space-y-6">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className={`flex gap-6 text-lg md:text-xl leading-relaxed ${colors.subText}`}>
                        <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-3 ${colors.accentBg}`} />
                        <p>{bullet}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <footer className="py-60 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,emerald_500,transparent_70%)] blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-20 reveal-trigger">
          <h2 className="text-7xl md:text-[10rem] font-display font-black uppercase italic leading-[0.8] tracking-[ -0.05em]">
            Scale the<br/><span className={colors.accent}>Next Layer</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a 
              href={`mailto:${data.contact.email}`} 
              className={`group relative px-16 py-7 overflow-hidden rounded-full ${colors.accentBg} text-white font-bold uppercase tracking-[0.4em] text-xs transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(16,185,129,0.3)]`}
            >
              <span className="relative z-10">Initiate Contact</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <a 
              href={`https://${data.contact.linkedin}`} 
              target="_blank" 
              className={`px-16 py-7 rounded-full border-2 ${colors.border} ${colors.text} font-bold uppercase tracking-[0.4em] text-xs hover:bg-emerald-500/10 transition-all hover:scale-105 active:scale-95`}
            >
              Network Access
            </a>
          </div>

          <div className="pt-32 opacity-30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-[0.6em]">
              <span>{data.name} // SYSTEM_v2.5</span>
              <span>Noida Node // IN</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InnovativePage;