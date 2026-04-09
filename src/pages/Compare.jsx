import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import countries, { countryNames, getCountryByName } from '../data/countries';
import './Compare.css';

const metrics = [
  { key: 'visa', label: 'Visa Difficulty', icon: '🛂', desc: 'How hard it is to get a visa', color: '#fb7185' },
  { key: 'jobs', label: 'Job Opportunities', icon: '💼', desc: 'Job market score for migrants', color: '#34d399' },
  { key: 'cost', label: 'Cost of Living', icon: '💰', desc: 'How expensive daily life is', color: '#fbbf24' },
  { key: 'language', label: 'Language Barrier', icon: '🗣️', desc: 'Difficulty of language for English speakers', color: '#6366f1' },
];

function ScoreBar({ score, maxScore = 10, color, delay = 0 }) {
  return (
    <div className="score-bar">
      <motion.div
        className="score-bar__fill"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${(score / maxScore) * 100}%` }}
        transition={{ duration: 0.8, delay }}
      />
      <span className="score-bar__value">{score}/10</span>
    </div>
  );
}

export default function Compare() {
  const location = useLocation();
  const [countryA, setCountryA] = useState('');
  const [countryB, setCountryB] = useState('');

  useEffect(() => {
    if (location.state) {
      if (location.state.origin) setCountryA(location.state.origin);
      if (location.state.destination) setCountryB(location.state.destination);
    }
  }, [location.state]);

  const dataA = getCountryByName(countryA);
  const dataB = getCountryByName(countryB);

  return (
    <div className="page-content">
      <div className="compare section">
        <div className="container">
          <motion.div
            className="compare__header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="section-title">Country Comparison</h1>
            <p className="section-subtitle">Compare two countries side by side to make informed decisions about your migration or travel plans.</p>
          </motion.div>

          <motion.div
            className="compare__selectors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="compare__select-group">
              <label className="compare__label">🏠 Origin Country</label>
              <select
                id="compare-country-a"
                className="compare__select"
                value={countryA}
                onChange={(e) => setCountryA(e.target.value)}
              >
                <option value="">Select country...</option>
                {countryNames.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="compare__vs">VS</div>

            <div className="compare__select-group">
              <label className="compare__label">🎯 Destination Country</label>
              <select
                id="compare-country-b"
                className="compare__select"
                value={countryB}
                onChange={(e) => setCountryB(e.target.value)}
              >
                <option value="">Select country...</option>
                {countryNames.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {dataA && dataB && (
            <motion.div
              className="compare__results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Comparison Table */}
              <div className="compare__table glass-card">
                <div className="compare__table-header">
                  <div className="compare__table-cell compare__table-cell--metric">Metric</div>
                  <div className="compare__table-cell compare__table-cell--country">{countryA}</div>
                  <div className="compare__table-cell compare__table-cell--country">{countryB}</div>
                </div>
                {metrics.map((metric, i) => (
                  <div key={metric.key} className="compare__table-row">
                    <div className="compare__table-cell compare__table-cell--metric">
                      <span className="compare__metric-icon">{metric.icon}</span>
                      <div>
                        <span className="compare__metric-label">{metric.label}</span>
                        <span className="compare__metric-desc">{metric.desc}</span>
                      </div>
                    </div>
                    <div className="compare__table-cell">
                      <ScoreBar score={dataA[metric.key]} color={metric.color} delay={i * 0.1} />
                    </div>
                    <div className="compare__table-cell">
                      <ScoreBar score={dataB[metric.key]} color={metric.color} delay={i * 0.1 + 0.05} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Cards */}
              <div className="compare__summary-grid">
                <div className="compare__summary-card glass-card">
                  <h3 className="compare__summary-title">{countryA}</h3>
                  <div className="compare__summary-stats">
                    <div className="compare__summary-stat">
                      <span className="compare__summary-value" style={{ color: '#34d399' }}>{dataA.jobs}/10</span>
                      <span className="compare__summary-label">Job Score</span>
                    </div>
                    <div className="compare__summary-stat">
                      <span className="compare__summary-value" style={{ color: '#fbbf24' }}>{dataA.cost}/10</span>
                      <span className="compare__summary-label">Cost Level</span>
                    </div>
                  </div>
                  <p className="compare__summary-continent">📍 {dataA.continent}</p>
                </div>

                <div className="compare__summary-card glass-card">
                  <h3 className="compare__summary-title">{countryB}</h3>
                  <div className="compare__summary-stats">
                    <div className="compare__summary-stat">
                      <span className="compare__summary-value" style={{ color: '#34d399' }}>{dataB.jobs}/10</span>
                      <span className="compare__summary-label">Job Score</span>
                    </div>
                    <div className="compare__summary-stat">
                      <span className="compare__summary-value" style={{ color: '#fbbf24' }}>{dataB.cost}/10</span>
                      <span className="compare__summary-label">Cost Level</span>
                    </div>
                  </div>
                  <p className="compare__summary-continent">📍 {dataB.continent}</p>
                </div>
              </div>

              {/* Quick Verdict */}
              <div className="compare__verdict glass-card">
                <h3>🎯 Quick Verdict</h3>
                <div className="compare__verdict-items">
                  <div className="compare__verdict-item">
                    <span className="compare__verdict-label">Easier Visa:</span>
                    <span className="compare__verdict-value badge badge-primary">
                      {dataA.visa <= dataB.visa ? countryA : countryB}
                    </span>
                  </div>
                  <div className="compare__verdict-item">
                    <span className="compare__verdict-label">More Jobs:</span>
                    <span className="compare__verdict-value badge badge-emerald">
                      {dataA.jobs >= dataB.jobs ? countryA : countryB}
                    </span>
                  </div>
                  <div className="compare__verdict-item">
                    <span className="compare__verdict-label">Lower Cost:</span>
                    <span className="compare__verdict-value badge badge-amber">
                      {dataA.cost <= dataB.cost ? countryA : countryB}
                    </span>
                  </div>
                  <div className="compare__verdict-item">
                    <span className="compare__verdict-label">Easier Language:</span>
                    <span className="compare__verdict-value badge badge-rose">
                      {dataA.language <= dataB.language ? countryA : countryB}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {(!dataA || !dataB) && (
            <div className="compare__empty">
              <div className="compare__empty-icon">⚖️</div>
              <p>Select two countries above to see a side-by-side comparison.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
