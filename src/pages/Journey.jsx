import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { countryNames } from '../data/countries';
import './Journey.css';

const steps = [
  { id: 1, title: 'Origin Country', subtitle: 'Where are you coming from?', icon: '📍' },
  { id: 2, title: 'Destination Country', subtitle: 'Where do you want to go?', icon: '🎯' },
  { id: 3, title: 'Purpose', subtitle: 'What is your goal?', icon: '🧭' },
];

export default function Journey() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');
  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDest, setSearchDest] = useState('');

  const filteredOrigins = countryNames.filter((c) =>
    c.toLowerCase().includes(searchOrigin.toLowerCase())
  );

  const filteredDests = countryNames.filter((c) =>
    c.toLowerCase().includes(searchDest.toLowerCase())
  );

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    navigate('/compare', { state: { origin, destination, purpose } });
  };

  const canProceed =
    (currentStep === 1 && origin) ||
    (currentStep === 2 && destination) ||
    (currentStep === 3 && purpose);

  return (
    <div className="page-content">
      <div className="journey">
        <div className="journey__bg">
          <div className="journey__orb journey__orb--1" />
          <div className="journey__orb journey__orb--2" />
        </div>

        <div className="container">
          <motion.div
            className="journey__header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="section-title">Plan Your Journey</h1>
            <p className="section-subtitle">Tell us about your migration or travel plans and we'll guide you every step of the way.</p>
          </motion.div>

          {/* Progress Bar */}
          <div className="journey__progress">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`journey__step-indicator ${currentStep >= step.id ? 'journey__step-indicator--active' : ''} ${currentStep === step.id ? 'journey__step-indicator--current' : ''}`}
              >
                <div className="journey__step-dot">
                  {currentStep > step.id ? '✓' : step.icon}
                </div>
                <span className="journey__step-label">{step.title}</span>
              </div>
            ))}
            <div className="journey__progress-bar">
              <motion.div
                className="journey__progress-fill"
                animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="journey__card glass-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="journey__card-header">
                <span className="journey__card-icon">{steps[currentStep - 1].icon}</span>
                <div>
                  <h2 className="journey__card-title">{steps[currentStep - 1].title}</h2>
                  <p className="journey__card-subtitle">{steps[currentStep - 1].subtitle}</p>
                </div>
              </div>

              {currentStep === 1 && (
                <div className="journey__country-select">
                  <input
                    className="journey__search"
                    type="text"
                    placeholder="Search country..."
                    value={searchOrigin}
                    onChange={(e) => setSearchOrigin(e.target.value)}
                  />
                  <div className="journey__country-grid">
                    {filteredOrigins.map((country) => (
                      <button
                        key={country}
                        className={`journey__country-btn ${origin === country ? 'journey__country-btn--selected' : ''}`}
                        onClick={() => setOrigin(country)}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="journey__country-select">
                  <input
                    className="journey__search"
                    type="text"
                    placeholder="Search country..."
                    value={searchDest}
                    onChange={(e) => setSearchDest(e.target.value)}
                  />
                  <div className="journey__country-grid">
                    {filteredDests.map((country) => (
                      <button
                        key={country}
                        className={`journey__country-btn ${destination === country ? 'journey__country-btn--selected' : ''}`}
                        onClick={() => setDestination(country)}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="journey__purpose-select">
                  <button
                    className={`journey__purpose-card ${purpose === 'Migration' ? 'journey__purpose-card--selected' : ''}`}
                    onClick={() => setPurpose('Migration')}
                  >
                    <span className="journey__purpose-icon">🏠</span>
                    <h3>Migration</h3>
                    <p>I want to permanently relocate to another country for work, study, or family.</p>
                  </button>
                  <button
                    className={`journey__purpose-card ${purpose === 'Travel' ? 'journey__purpose-card--selected' : ''}`}
                    onClick={() => setPurpose('Travel')}
                  >
                    <span className="journey__purpose-icon">✈️</span>
                    <h3>Travel</h3>
                    <p>I'm planning a trip for tourism, short-term work, or exploration.</p>
                  </button>
                </div>
              )}

              <div className="journey__actions">
                {currentStep > 1 && (
                  <button className="btn-secondary" onClick={handleBack}>← Back</button>
                )}
                {currentStep < 3 ? (
                  <button className="btn-primary" onClick={handleNext} disabled={!canProceed}>
                    Continue →
                  </button>
                ) : (
                  <button className="btn-primary" onClick={handleComplete} disabled={!canProceed}>
                    🚀 Start Exploring
                  </button>
                )}
              </div>

              {(origin || destination || purpose) && (
                <div className="journey__summary">
                  {origin && <span className="badge badge-primary">From: {origin}</span>}
                  {destination && <span className="badge badge-emerald">To: {destination}</span>}
                  {purpose && <span className="badge badge-amber">{purpose}</span>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
