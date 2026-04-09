import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import countries, { countryNames, getCountryByName } from '../data/countries';
import './Tools.css';

const migrationTools = [
  { id: 'visa', icon: '🛂', title: 'Visa Checker', desc: 'Check visa requirements for your destination' },
  { id: 'cost', icon: '💰', title: 'Cost of Living Calculator', desc: 'Estimate monthly expenses in any country' },
  { id: 'checklist', icon: '📋', title: 'Migration Checklist', desc: 'Stay organized with a complete migration checklist' },
];

const travelTools = [
  { id: 'budget', icon: '🧮', title: 'Budget Estimator', desc: 'Plan your travel budget with smart estimates' },
  { id: 'currency', icon: '💱', title: 'Currency Converter', desc: 'Convert currencies in real-time' },
  { id: 'tips', icon: '💡', title: 'Travel Tips', desc: 'Essential tips for your destination' },
];

const checklistItems = [
  { cat: 'Documents', items: ['Valid passport (6+ months)', 'Visa application', 'Birth certificate', 'Marriage certificate', 'Educational transcripts', 'Police clearance'] },
  { cat: 'Finances', items: ['Open international bank account', 'Arrange foreign currency', 'Set up money transfer service', 'Budget for first 3 months', 'Value of assets statement'] },
  { cat: 'Health', items: ['Full medical check-up', 'Dental check-up', 'Vaccinations', 'Comprehensive health insurance', 'Prescription records copy'] },
  { cat: 'Housing', items: ['Neighborhood research', 'Temporary stay booking', 'Legal lease understanding', 'Utility connection setup', 'Basic furniture sourcing'] },
];

const currencyRates = {
  USD: 1, EUR: 0.92, GBP: 0.79, CAD: 1.37, AUD: 1.55, SGD: 1.34, AED: 3.67, NZD: 1.65, INR: 83.2,
};



export default function Tools() {
  const [activeTool, setActiveTool] = useState(null);
  const [visaCountry, setVisaCountry] = useState('');
  const [costCountry, setCostCountry] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const [budgetDays, setBudgetDays] = useState(7);
  const [budgetStyle, setBudgetStyle] = useState('mid');
  const [currFrom, setCurrFrom] = useState('USD');
  const [currTo, setCurrTo] = useState('EUR');
  const [currAmount, setCurrAmount] = useState(100);
  const [tipsCountry, setTipsCountry] = useState('');

  const toggleCheck = (key) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const budgetMultiplier = { budget: 40, mid: 100, luxury: 250 };
  const estimatedBudget = budgetDays * (budgetMultiplier[budgetStyle] || 100);

  const convertedAmount = currAmount * (currencyRates[currTo] / currencyRates[currFrom]);

  const renderToolContent = () => {
    switch (activeTool) {
      case 'visa': {
        const data = getCountryByName(visaCountry);
        return (
          <div className="tool-modal__content">
            <h3>🛂 Visa Checker</h3>
            <select className="tool-modal__select" value={visaCountry} onChange={(e) => setVisaCountry(e.target.value)}>
              <option value="">Select destination...</option>
              {countryNames.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {data && data.visaDetail && (
              <div className="tool-modal__result">
                <div className="tool-modal__result-grid">
                  <div className="tool-modal__result-item">
                    <span className="tool-modal__result-label">Visa Type</span>
                    <span className="tool-modal__result-value">{data.visaDetail.type}</span>
                  </div>
                  <div className="tool-modal__result-item">
                    <span className="tool-modal__result-label">Processing Time</span>
                    <span className="tool-modal__result-value">{data.visaDetail.processing}</span>
                  </div>
                  <div className="tool-modal__result-item">
                    <span className="tool-modal__result-label">Fee</span>
                    <span className="tool-modal__result-value">{data.visaDetail.fee}</span>
                  </div>
                  <div className="tool-modal__result-item">
                    <span className="tool-modal__result-label">Difficulty</span>
                    <span className="tool-modal__result-value">{data.visaDetail.difficulty}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }
      case 'cost': {
        const data = getCountryByName(costCountry);
        return (
          <div className="tool-modal__content">
            <h3>💰 Cost of Living Calculator</h3>
            <select className="tool-modal__select" value={costCountry} onChange={(e) => setCostCountry(e.target.value)}>
              <option value="">Select country...</option>
              {countryNames.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {data && data.costDetail && (
              <div className="tool-modal__result">
                <h4 className="tool-modal__result-heading">Monthly Estimate (USD)</h4>
                <div className="cost-breakdown">
                  {Object.entries(data.costDetail).map(([key, val]) => (
                    <div key={key} className={`cost-breakdown__item ${key === 'total' ? 'cost-breakdown__item--total' : ''}`}>
                      <span className="cost-breakdown__label">
                        {key === 'total' ? '💳 Total' : key === 'rent' ? '🏠 Rent' : key === 'food' ? '🍕 Food' : key === 'transport' ? '🚌 Transport' : '⚡ Utilities'}
                      </span>
                      <span className="cost-breakdown__value">${val.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }
      case 'checklist':
        return (
          <div className="tool-modal__content">
            <h3>📋 Migration Checklist</h3>
            <div className="checklist">
              {checklistItems.map((cat) => (
                <div key={cat.cat} className="checklist__category">
                  <h4 className="checklist__category-title">{cat.cat}</h4>
                  {cat.items.map((item) => {
                    const key = `${cat.cat}-${item}`;
                    return (
                      <label key={item} className="checklist__item">
                        <input type="checkbox" checked={!!checkedItems[key]} onChange={() => toggleCheck(key)} />
                        <span className={checkedItems[key] ? 'checklist__item--done' : ''}>{item}</span>
                      </label>
                    );
                  })}
                </div>
              ))}
              <div className="checklist__progress">
                <span>{Object.values(checkedItems).filter(Boolean).length} / {checklistItems.reduce((a, c) => a + c.items.length, 0)} completed</span>
              </div>
            </div>
          </div>
        );
      case 'budget':
        return (
          <div className="tool-modal__content">
            <h3>🧮 Budget Estimator</h3>
            <div className="budget-form">
              <label className="tool-modal__label">Trip Duration (days)</label>
              <input type="number" className="tool-modal__input" value={budgetDays} onChange={(e) => setBudgetDays(Number(e.target.value))} min={1} max={365} />
              <label className="tool-modal__label">Travel Style</label>
              <div className="budget-style">
                {['budget', 'mid', 'luxury'].map((s) => (
                  <button key={s} className={`budget-style__btn ${budgetStyle === s ? 'budget-style__btn--active' : ''}`} onClick={() => setBudgetStyle(s)}>
                    {s === 'budget' ? '🎒 Budget' : s === 'mid' ? '🏨 Mid-Range' : '✨ Luxury'}
                  </button>
                ))}
              </div>
              <div className="budget-result">
                <span className="budget-result__label">Estimated Total</span>
                <span className="budget-result__value">${estimatedBudget.toLocaleString()}</span>
                <span className="budget-result__daily">(~${budgetMultiplier[budgetStyle]}/day)</span>
              </div>
            </div>
          </div>
        );
      case 'currency':
        return (
          <div className="tool-modal__content">
            <h3>💱 Currency Converter</h3>
            <div className="currency-form">
              <div className="currency-form__row">
                <div className="currency-form__group">
                  <label className="tool-modal__label">Amount</label>
                  <input type="number" className="tool-modal__input" value={currAmount} onChange={(e) => setCurrAmount(Number(e.target.value))} />
                </div>
                <div className="currency-form__group">
                  <label className="tool-modal__label">From</label>
                  <select className="tool-modal__select" value={currFrom} onChange={(e) => setCurrFrom(e.target.value)}>
                    {Object.keys(currencyRates).map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="currency-form__group">
                  <label className="tool-modal__label">To</label>
                  <select className="tool-modal__select" value={currTo} onChange={(e) => setCurrTo(e.target.value)}>
                    {Object.keys(currencyRates).map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="currency-result">
                <span className="currency-result__from">{currAmount.toLocaleString()} {currFrom}</span>
                <span className="currency-result__arrow">→</span>
                <span className="currency-result__to">{convertedAmount.toFixed(2)} {currTo}</span>
              </div>
            </div>
          </div>
        );
      case 'tips': {
        const data = getCountryByName(tipsCountry);
        return (
          <div className="tool-modal__content">
            <h3>💡 Migration Challenges & Resources</h3>
            <select className="tool-modal__select" value={tipsCountry} onChange={(e) => setTipsCountry(e.target.value)}>
              <option value="">Select country...</option>
              {countryNames.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {data && (
              <div className="tips-list">
                <h4 className="tips-list__title">Top Challenges</h4>
                {data.challenges.map((challenge, i) => (
                  <div key={i} className="tips-list__item">
                    <span className="tips-list__number">{i + 1}</span>
                    <span>{challenge}</span>
                  </div>
                ))}
                <h4 className="tips-list__title" style={{ marginTop: '20px' }}>Official Resources</h4>
                {data.resources.map((res, i) => (
                  <div key={i} className="tips-list__item tips-list__item--resource">
                    <span className="tips-list__number">🔗</span>
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="page-content">
      <div className="tools section">
        <div className="container">
          <motion.div
            className="tools__header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="section-title">Smart Tools</h1>
            <p className="section-subtitle">
              Powerful tools to help you plan, calculate, and prepare for your migration or travel journey.
            </p>
          </motion.div>

          {/* Migration Tools */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="tools__category-title">🏠 Migration Tools</h2>
            <div className="tools__grid">
              {migrationTools.map((tool, i) => (
                <motion.button
                  key={tool.id}
                  className={`tool-card glass-card ${activeTool === tool.id ? 'tool-card--active' : ''}`}
                  onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <span className="tool-card__icon">{tool.icon}</span>
                  <h3 className="tool-card__title">{tool.title}</h3>
                  <p className="tool-card__desc">{tool.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Travel Tools */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="tools__category-title">✈️ Travel Tools</h2>
            <div className="tools__grid">
              {travelTools.map((tool, i) => (
                <motion.button
                  key={tool.id}
                  className={`tool-card glass-card ${activeTool === tool.id ? 'tool-card--active' : ''}`}
                  onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <span className="tool-card__icon">{tool.icon}</span>
                  <h3 className="tool-card__title">{tool.title}</h3>
                  <p className="tool-card__desc">{tool.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Tool Modal */}
          <AnimatePresence>
            {activeTool && (
              <motion.div
                className="tool-modal glass-card"
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 20, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button className="tool-modal__close" onClick={() => setActiveTool(null)}>✕</button>
                {renderToolContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
