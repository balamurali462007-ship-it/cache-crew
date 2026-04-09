import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import './Home.css';

const features = [
  { icon: '🤖', title: 'AI Assistant', desc: 'Get personalized migration guidance from our AI-powered chatbot anytime.', color: '#6366f1' },
  { icon: '⚖️', title: 'Country Comparison', desc: 'Compare visa difficulty, jobs, cost of living across 8 key countries.', color: '#8b5cf6' },
  { icon: '🗺️', title: 'Interactive Map', desc: 'Explore migration routes and country-specific resources visually.', color: '#22d3ee' },
  { icon: '📖', title: 'Real Stories', desc: 'Learn from real migration experiences shared by our community.', color: '#34d399' },
  { icon: '🛠️', title: 'Smart Tools', desc: 'Visa checker, budget calculator, currency converter and more.', color: '#f97316' },
  { icon: '📊', title: 'Analytics', desc: 'Data-driven insights on migration trends and common challenges.', color: '#fb7185' },
];

const stats = [
  { value: '10K+', label: 'Migrants Helped' },
  { value: '8', label: 'Countries Covered' },
  { value: '1.2K', label: 'Success Stories' },
  { value: '24/7', label: 'AI Support' },
];



function AnimatedSection({ children, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
          <div className="hero__grid-overlay" />
        </div>

        <div className="container hero__content">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="hero__badge-dot" />
            AI-Powered Migration Platform
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Migration Made<br />
            <span className="hero__title-gradient">Simple</span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Navigate your journey to a new country with AI-powered guidance,
            smart tools, and real community stories. From visa applications to settling in — we've got you covered.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/journey" className="btn-primary" id="start-journey-btn">
              🚀 Start Journey
            </Link>
            <Link to="/stories" className="btn-secondary" id="explore-stories-btn">
              📖 Explore Stories
            </Link>
          </motion.div>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="features__header">
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-subtitle">
              Comprehensive tools and AI support to make your migration or travel journey smooth and stress-free.
            </p>
          </AnimatedSection>

          <div className="features__grid">
            {features.map((feat, i) => (
              <AnimatedSection key={feat.title}>
                <motion.div
                  className="feature-card glass-card"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="feature-card__icon" style={{ background: `${feat.color}20`, color: feat.color }}>
                    {feat.icon}
                  </div>
                  <h3 className="feature-card__title">{feat.title}</h3>
                  <p className="feature-card__desc">{feat.desc}</p>
                  <div className="feature-card__glow" style={{ background: feat.color }} />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <div className="cta-card__content">
                <h2 className="cta-card__title">Ready to Start Your Journey?</h2>
                <p className="cta-card__desc">
                  Join thousands who have successfully migrated with our AI guidance. Get personalized advice, connect with the community, and access powerful tools.
                </p>
                <div className="cta-card__actions">
                  <Link to="/journey" className="btn-primary">Begin Now →</Link>
                  <Link to="/tools" className="btn-secondary">Explore Tools</Link>
                </div>
              </div>
              <div className="cta-card__visual">
                <span className="cta-card__emoji">🌍</span>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
