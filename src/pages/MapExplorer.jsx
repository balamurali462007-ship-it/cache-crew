import { useState, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from 'react-simple-maps';
import countries, { migrationRoutes, getCountryByCode, getCountryByMapId } from '../data/countries';
import './MapExplorer.css';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const MapChart = memo(function MapChart({ onCountryClick, onHover, selectedCode, hoveredCode }) {
  return (
    <ComposableMap
      projectionConfig={{ scale: 160, center: [0, 20] }}
      style={{ width: '100%', height: '100%' }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const countryData = getCountryByMapId(geo.id);
            const isSelected = countryData?.code === selectedCode;
            const isHovered = countryData?.code === hoveredCode;
            
            return (
              <Geography
                key={geo.rpiKey || geo.id}
                geography={geo}
                onMouseEnter={() => countryData && onHover(countryData.code)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onCountryClick(geo.id, geo.properties.name)}
                style={{
                  default: {
                    fill: isSelected
                      ? '#6366f1'
                      : isHovered
                      ? '#4f46e5'
                      : countryData
                      ? '#2a2a4a'
                      : '#1a1a2e',
                    stroke: isSelected ? '#a5b4fc' : '#2a2a4a',
                    strokeWidth: isSelected ? 1.5 : 0.5,
                    outline: 'none',
                    transition: 'all 0.3s ease',
                  },
                  hover: {
                    fill: '#6366f1',
                    stroke: '#8b5cf6',
                    strokeWidth: 1,
                    outline: 'none',
                    cursor: countryData ? 'pointer' : 'default',
                  },
                  pressed: {
                    fill: '#4f46e5',
                    outline: 'none',
                  },
                }}
              />
            );
          })
        }
      </Geographies>

      {/* Animated Migration Routes */}
      {migrationRoutes.map((route) => {
        const fromCountry = getCountryByCode(route.from);
        const toCountry = getCountryByCode(route.to);
        if (!fromCountry || !toCountry) return null;
        
        const isRelated = selectedCode === route.from || selectedCode === route.to;
        
        return (
          <Line
            key={route.label}
            from={[fromCountry.lng, fromCountry.lat]}
            to={[toCountry.lng, toCountry.lat]}
            stroke={isRelated ? '#6366f1' : 'rgba(99, 102, 241, 0.2)'}
            strokeWidth={isRelated ? 2 : 1}
            strokeDasharray="4 4"
            className="map-route-line"
          />
        );
      })}

      {/* Country Markers */}
      {countries.map((c) => (
        <Marker key={c.code} coordinates={[c.lng, c.lat]}>
          <motion.circle
            r={selectedCode === c.code ? 6 : 4}
            fill="#6366f1"
            stroke="#1a1a2e"
            strokeWidth={1}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.5, fill: '#8b5cf6' }}
            onClick={() => onCountryClick(c.mapId, c.name)}
            style={{ cursor: 'pointer' }}
          />
          {selectedCode === c.code && (
            <motion.circle
              r={12}
              fill="none"
              stroke="#6366f1"
              strokeWidth={1}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </Marker>
      ))}
    </ComposableMap>
  );
});

export default function MapExplorer() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCode, setSelectedCode] = useState('');
  const [hoveredCode, setHoveredCode] = useState(null);

  const handleCountryClick = (mapId, name) => {
    const countryData = getCountryByMapId(mapId);
    
    // If clicking same country, close panel
    if (countryData && selectedCode === countryData.code) {
      setSelectedCode('');
      setSelectedCountry(null);
      return;
    }

    if (countryData) {
      setSelectedCode(countryData.code);
      setSelectedCountry({ ...countryData });
    } else {
      setSelectedCode(mapId);
      setSelectedCountry({
        isPending: true,
        code: mapId,
        name: name || mapId,
      });
    }
  };

  const hoveredData = useMemo(() => 
    hoveredCode ? getCountryByCode(hoveredCode) : null
  , [hoveredCode]);

  return (
    <div className="map-explorer-page">
      <div className="map-explorer section">
        <div className="container map-explorer__container">
          <motion.div
            className="map-explorer__header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="section-title">Interactive Migration Map</h1>
            <p className="section-subtitle">
              Click a migration hub to explore demographics, challenges, and support networks.
            </p>
          </motion.div>

          <div className="map-explorer__canvas glass-card">
            <MapChart 
              onCountryClick={handleCountryClick} 
              onHover={setHoveredCode}
              selectedCode={selectedCode}
              hoveredCode={hoveredCode}
            />

            <AnimatePresence>
              {hoveredData && !selectedCountry && (
                <motion.div 
                  className="map-tooltip"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="map-tooltip__header">
                    <span className="map-tooltip__name">{hoveredData.name}</span>
                    <span className="map-tooltip__code">{hoveredData.code}</span>
                  </div>
                  <div className="map-tooltip__stat">
                    <span>{hoveredData.migrantPopulation} migrants</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="map-explorer__legend">
              <div className="map-explorer__legend-item">
                <span className="legend-marker legend-marker--hub" />
                <span>Migration Hub</span>
              </div>
              <div className="map-explorer__legend-item">
                <span className="legend-marker legend-marker--route" />
                <span>Active Route</span>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {selectedCountry && (
              <motion.aside
                className="country-panel glass-card"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <button 
                  className="country-panel__close"
                  onClick={() => { setSelectedCountry(null); setSelectedCode(''); }}
                >
                  ✕
                </button>

                {selectedCountry.isPending ? (
                  <div className="country-panel__pending">
                    <div className="pending-icon">🌍</div>
                    <h2>{selectedCountry.name}</h2>
                    <p>Detailed demographic data for this region is currently being processed. Check back soon for updates.</p>
                    <div className="pending-badge">Data Coming Soon</div>
                  </div>
                ) : (
                  <div className="country-panel__scroll">
                    <div className="country-panel__header">
                      <div className="header-top">
                        <h2 className="country-name">{selectedCountry.name}</h2>
                        <span className="country-tag">Migration Hub</span>
                      </div>
                      
                      <div className="stat-grid">
                        <div className="stat-card">
                          <span className="stat-label">Migrant Pop.</span>
                          <span className="stat-value">{selectedCountry.migrantPopulation}</span>
                        </div>
                        <div className="stat-card">
                          <span className="stat-label">Top Origin</span>
                          <span className="stat-value">{selectedCountry.topOrigins[0].split(' ')[0]}</span>
                        </div>
                      </div>

                      <div className="origins-list">
                        <h4>Top Origin Groups</h4>
                        <div className="origins-tags">
                          {selectedCountry.topOrigins.map((o, i) => (
                            <span key={i} className="origin-tag">{o}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="country-panel__section">
                      <h3>⚠️ Key Challenges</h3>
                      <div className="challenge-list">
                        {selectedCountry.challenges.map((c, i) => (
                          <div key={i} className="challenge-item">
                            <span className="challenge-icon">
                              {i === 0 ? '🛠️' : i === 1 ? '💰' : i === 2 ? '🗣️' : '🏠'}
                            </span>
                            <span className="challenge-text">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="country-panel__section">
                      <h3>🏢 Support Organizations</h3>
                      <div className="org-list">
                        {selectedCountry.organizations.map((org, i) => (
                          <a 
                            key={i} 
                            href={org.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="org-card"
                          >
                            <div className="org-content">
                              <span className="org-name">{org.name}</span>
                              <p className="org-desc">{org.description}</p>
                            </div>
                            <span className="org-link-icon">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="country-panel__footer">
                      <div className="footer-stat">
                        <span>{selectedCountry.storyCount} Platform Stories</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
