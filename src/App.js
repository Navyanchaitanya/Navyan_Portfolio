import React, { useEffect, useRef, useState } from 'react';
import './index.css';

// Custom cursor
function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX - 18) * 0.12;
      ringY += (mouseY - ringY - 18) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animate);
    };

    const onEnter = () => { cursor.classList.add('expanded'); ring.classList.add('expanded'); };
    const onLeave = () => { cursor.classList.remove('expanded'); ring.classList.remove('expanded'); };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, .fact-card, .skill-group, .project-card, .cert-card, .contact-link').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    animate();
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}

// Scroll reveal hook
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Nav component
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#hero" className="nav-logo">N<span>.</span></a>
      <ul className="nav-links">
        {['About', 'Skills', 'Projects', 'Contact'].map(item => (
          <li key={item}><a href={`#${item.toLowerCase()}`}>{item}</a></li>
        ))}
      </ul>
    </nav>
  );
}

// Hero
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-eyebrow">Available for opportunities</div>
        <h1 className="hero-name">
          Navyan
          <span className="line2">Chaitanya.</span>
        </h1>
        <p className="hero-title">
          <strong>Full Stack Developer</strong> & AI/ML Engineer
        </p>
        <p className="hero-desc">
          Building production-ready web applications and intelligent systems. Passionate
          about transforming complex problems into elegant, scalable solutions.
        </p>
        <div className="hero-ctas">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-secondary">Let's Connect</a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-ring"></div>
        <div className="hero-ring-2"></div>
        <div className="hero-core">
          <div className="hero-core-text">
            <div className="highlight">Python · Java</div>
            <div>React · Node.js</div>
            <div className="highlight">AI · ML · IoT</div>
          </div>
        </div>
      </div>

      <div className="tech-float tf1">React.js</div>
      <div className="tech-float tf2">Python</div>
      <div className="tech-float tf3">Node.js</div>
      <div className="tech-float tf4">PostgreSQL</div>
    </section>
  );
}

// Marquee
function Marquee() {
  const items = ['Python', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'MongoDB', 'Flask', 'Git', 'Figma', 'REST API', 'Machine Learning'];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            {item}<div className="marquee-dot"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// About
function About() {
  return (
    <section id="about">
      <div className="section-label">About Me</div>
      <h2 className="section-title reveal">Who I <em>Am</em></h2>
      <div className="about-grid">
        <div className="about-text reveal">
          <p>
            I'm a <strong>motivated full-stack developer and AI & ML student</strong> at Aditya
            Engineering College, graduating in 2026. I specialize in building production-ready
            web applications that are fast, scalable, and solve real problems.
          </p>
          <p>
            My expertise spans the entire stack — from crafting pixel-perfect React frontends
            to architecting robust Node.js backends with PostgreSQL databases. I've also worked
            hands-on with <strong>machine learning and IoT systems</strong>, bridging the gap
            between intelligent algorithms and real-world hardware.
          </p>
          <p>
            With <strong>300+ DSA problems solved</strong> across LeetCode and HackerRank, I
            bring strong algorithmic thinking to every project I build.
          </p>
        </div>
        <div className="about-facts reveal reveal-delay-2">
          {[
            { icon: '🎓', title: 'Education', value: 'B.Tech AI & ML — Aditya Engineering College, CGPA: 7.60' },
            { icon: '📍', title: 'Location', value: 'Kakinada, Andhra Pradesh, India' },
            { icon: '📧', title: 'Email', value: 'navyanchaitanya@gmail.com' },
            { icon: '📱', title: 'Phone', value: '+91 6281776363' },
            { icon: '⚡', title: 'Status', value: 'Open to Full-time & Internship Roles' },
          ].map((fact, i) => (
            <div key={i} className="fact-card">
              <div className="fact-icon">{fact.icon}</div>
              <div>
                <div className="fact-title">{fact.title}</div>
                <div className="fact-value">{fact.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Skills
function Skills() {
  const skillGroups = [
    {
      label: 'Languages',
      skills: ['Python', 'Java', 'JavaScript'],
      tagClass: 'tag-purple',
    },
    {
      label: 'Frameworks',
      skills: ['React.js', 'Node.js', 'Express', 'Flask', 'REST API'],
      tagClass: 'tag-green',
    },
    {
      label: 'Tools & Platforms',
      skills: ['Git', 'GitHub', 'Docker', 'Figma', 'AWS', 'Render', 'CI/CD'],
      tagClass: 'tag-red',
    },
    {
      label: 'Databases',
      skills: ['PostgreSQL', 'MongoDB'],
      tagClass: 'tag-yellow',
    },
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="section-label">Technical Skills</div>
      <h2 className="section-title reveal">My <em>Stack</em></h2>
      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <div key={i} className={`skill-group reveal reveal-delay-${i + 1}`}>
            <div className="skill-group-label">{group.label}</div>
            <div className="skill-tags">
              {group.skills.map((s, j) => (
                <span key={j} className={`skill-tag ${group.tagClass}`}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Projects
function Projects() {
  const projects = [
    {
      num: '01',
      title: 'ATS Resume Analyzer',
      subtitle: 'ResumeIQ',
      tech: ['Node.js', 'Express', 'React', 'PostgreSQL', 'Render'],
      desc: 'Full-stack ATS Resume Checker that analyzes resumes against job descriptions, delivering compatibility scores and auto-generated optimized resumes.',
      highlights: [
        'ATS compatibility score, keyword gap analysis & auto-generated resumes',
        'RESTful APIs with Node.js & Express backed by PostgreSQL',
        'Deployed on Render with CI/CD pipelines',
        'Helped 200+ users with 90% ATS match accuracy',
      ],
      link: 'https://ats-resume-checker-ae7j.onrender.com',
      linkLabel: 'Live Demo →',
    },
    {
      num: '02',
      title: 'Smart Water Quality',
      subtitle: 'Monitoring System',
      tech: ['Python', 'ESP32', 'AWS', 'Scikit-learn', 'MQTT', 'HTML/CSS/JS'],
      desc: 'IoT-ML pipeline collecting real-time water quality data via ESP32 sensors and classifying potability using a Random Forest Classifier trained on 20,000+ records.',
      highlights: [
        'Real-time data: pH, TDS, turbidity, temperature via ESP32',
        'Random Forest Classifier trained on 20,000 records',
        'AWS Cloud deployment via MQTT protocol',
        'Live web dashboard with threshold-based alerting',
      ],
      link: null,
      linkLabel: null,
    },
    {
      num: '03',
      title: 'Drowsy Driver Detection',
      subtitle: 'Computer Vision System',
      tech: ['Python', 'OpenCV', 'Dlib', 'Machine Learning'],
      desc: 'Real-time fatigue detection system using computer vision, built as part of a 4-member Agile team during internship at Aditya University.',
      highlights: [
        'Eye-closure, yawning, and head-pose detection pipeline',
        'Reduced false positives by streamlining detection algorithms',
        'Collaborated across full SDLC in Agile environment',
        'Implemented with Dlib & OpenCV for real-time accuracy',
      ],
      link: null,
      linkLabel: null,
    },
  ];

  return (
    <section id="projects">
      <div className="section-label">Featured Work</div>
      <h2 className="section-title reveal">My <em>Projects</em></h2>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <div key={i} className={`project-card reveal reveal-delay-${(i % 2) + 1}`}>
            <div className="project-num">{project.num}</div>
            <div className="project-title">{project.title}</div>
            <div className="project-subtitle">{project.subtitle}</div>
            <p className="project-desc">{project.desc}</p>
            <ul className="project-highlights">
              {project.highlights.map((h, j) => <li key={j}>{h}</li>)}
            </ul>
            <div className="project-tech">
              {project.tech.map((t, j) => <span key={j} className="tech-pill">{t}</span>)}
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                {project.linkLabel}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// Certifications
function Certifications() {
  const certs = [
    { name: 'Python', issuer: 'HackerRank' },
    { name: 'Java', issuer: 'HackerRank' },
    { name: 'Google Advanced Data Analytics', issuer: 'Coursera' },
    { name: "Cognizant's Artificial Intelligence", issuer: 'Forage' },
    { name: 'Meta Front-End Developer', issuer: 'Coursera' },
    { name: 'Google UX Design', issuer: 'Coursera' },
  ];

  return (
    <section id="certifications">
      <div className="section-label">Credentials</div>
      <h2 className="section-title reveal">Certifi<em>cations</em></h2>
      <div className="certs-grid">
        {certs.map((cert, i) => (
          <div key={i} className={`cert-card reveal reveal-delay-${(i % 3) + 1}`}>
            <div className="cert-dot"></div>
            <div>
              <div className="cert-name">{cert.name}</div>
              <div className="cert-issuer">{cert.issuer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Contact
function Contact() {
  const links = [
    { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/navyan-chaitanya-887462272/' },
    { icon: '🐙', label: 'GitHub', href: 'https://github.com/Navyanchaitanya' },
    { icon: '⚔️', label: 'LeetCode', href: 'https://leetcode.com/u/avyanchaitanya/' },
    { icon: '🟢', label: 'HackerRank', href: 'https://www.hackerrank.com/profile/navyanchaitanya' },
    { icon: '🔵', label: 'CodeChef', href: 'https://www.codechef.com/users/navyan' },
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="section-label">Let's Talk</div>
      <h2 className="contact-big reveal">
        Get In
        <em>Touch.</em>
      </h2>
      <p className="contact-sub reveal">
        Looking for a full-stack developer or ML engineer? I'm currently open to
        internships and full-time opportunities.
      </p>
      <div className="contact-links reveal">
        {links.map((l, i) => (
          <a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className="contact-link">
            <span className="icon">{l.icon}</span>
            {l.label}
          </a>
        ))}
      </div>
      <div className="contact-email reveal">navyanchaitanya@gmail.com</div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer>
      <div className="footer-text">© 2025 <span>Navyan Chaitanya Raj Kotikalapudi</span></div>
    </footer>
  );
}

// Main App
export default function App() {
  useReveal();

  return (
    <>
      <Cursor />
      <div className="noise"></div>
      <div className="grid-bg"></div>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="main-wrapper">
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </>
  );
}