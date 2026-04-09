import { useState } from 'react';
import { motion } from 'framer-motion';
import stories from '../data/stories';
import './Stories.css';

const filters = ['All', 'Migration', 'Travel'];

export default function Stories() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = activeFilter === 'All'
    ? stories
    : stories.filter((s) => s.purpose === activeFilter);

  return (
    <div className="page-content">
      <div className="stories section">
        <div className="container">
          <motion.div
            className="stories__header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="section-title">Migration Stories</h1>
            <p className="section-subtitle">
              Real experiences from real people. Learn from their challenges, solutions, and tips for a successful journey.
            </p>
          </motion.div>

          <motion.div
            className="stories__filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {filters.map((f) => (
              <button
                key={f}
                className={`stories__filter-btn ${activeFilter === f ? 'stories__filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </motion.div>

          <div className="stories__grid">
            {filtered.map((story, i) => (
              <motion.div
                key={story.id}
                className="story-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                layout
              >
                <div className="story-card__header">
                  <div className="story-card__avatar">{story.avatar}</div>
                  <div>
                    <h3 className="story-card__name">{story.name}</h3>
                    <p className="story-card__route">{story.origin} → {story.destination}</p>
                  </div>
                  <span className={`badge ${story.purpose === 'Migration' ? 'badge-primary' : 'badge-emerald'}`}>
                    {story.purpose}
                  </span>
                </div>

                <div className="story-card__body">
                  <div className="story-card__section">
                    <h4 className="story-card__label">
                      <span className="story-card__label-icon">❌</span> Problem
                    </h4>
                    <p className="story-card__text">{story.problem}</p>
                  </div>

                  <div className="story-card__section">
                    <h4 className="story-card__label">
                      <span className="story-card__label-icon">✅</span> Solution
                    </h4>
                    <p className="story-card__text">
                      {expandedId === story.id
                        ? story.solution
                        : story.solution.slice(0, 120) + (story.solution.length > 120 ? '...' : '')}
                    </p>
                    {story.solution.length > 120 && (
                      <button
                        className="story-card__expand"
                        onClick={() => setExpandedId(expandedId === story.id ? null : story.id)}
                      >
                        {expandedId === story.id ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="story-card__footer">
                  <div className="story-card__rating">
                    {Array.from({ length: 5 }, (_, j) => (
                      <span key={j} className={j < story.rating ? 'star--filled' : 'star--empty'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="story-card__date">{new Date(story.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
