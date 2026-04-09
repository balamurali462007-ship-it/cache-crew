import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area,
} from 'recharts';
import countries from '../data/countries';
import './Analytics.css';

// Dynamically generate chart data from centralized countries array
const problemData = countries.map(c => ({
  country: c.name,
  visa: c.visa * 10,
  language: c.language * 10,
  cost: c.cost * 10,
  jobs: (10 - c.jobs) * 10, // Higher difficulty score means fewer opportunities
  housing: (c.costDetail ? Math.min(c.costDetail.rent / 50, 40) : 15) + (Math.random() * 10), // Estimate housing difficulty
}));

const pieData = [
  { name: 'Visa Issues', value: 30, color: '#fb7185' },
  { name: 'Language Barrier', value: 22, color: '#6366f1' },
  { name: 'Cost of Living', value: 20, color: '#fbbf24' },
  { name: 'Job Search', value: 15, color: '#34d399' },
  { name: 'Housing', value: 13, color: '#22d3ee' },
];

const trendData = [
  { month: 'Jan', queries: 1200, resolved: 980 },
  { month: 'Feb', queries: 1500, resolved: 1200 },
  { month: 'Mar', queries: 1800, resolved: 1450 },
  { month: 'Apr', queries: 2100, resolved: 1700 },
  { month: 'May', queries: 2400, resolved: 2000 },
  { month: 'Jun', queries: 2800, resolved: 2350 },
  { month: 'Jul', queries: 3100, resolved: 2700 },
  { month: 'Aug', queries: 3200, resolved: 3100 },
  { month: 'Sep', queries: 3500, resolved: 3200 },
  { month: 'Oct', queries: 3800, resolved: 3400 },
  { month: 'Nov', queries: 4200, resolved: 3800 },
  { month: 'Dec', queries: 4500, resolved: 4100 },
];

const topProblems = countries.map(c => ({
  country: c.name,
  problem: c.challenges[0], // First challenge as the "top" one
  count: Math.floor(2000 + (c.storyCount * 2) + Math.random() * 500),
  severity: c.visa > 6 || c.cost > 7 ? 'High' : c.visa > 4 ? 'Medium' : 'Low',
})).sort((a, b) => b.count - a.count);

const kpiCards = [
  { label: 'Total Queries', value: '42.8K', change: '+24%', icon: '📊', color: '#6366f1' },
  { label: 'Issues Resolved', value: '36.2K', change: '+18%', icon: '✅', color: '#34d399' },
  { label: 'Active Users', value: '15.4K', change: '+21%', icon: '👥', color: '#22d3ee' },
  { label: 'Countries Covered', value: '8', change: 'Live', icon: '🌍', color: '#fbbf24' },
];



function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <span ref={ref}>
      {isInView ? value : '0'}{suffix}
    </span>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="analytics__tooltip">
      <p className="analytics__tooltip-label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="analytics__tooltip-value">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  return (
    <div className="page-content">
      <div className="analytics section">
        <div className="container">
          <motion.div
            className="analytics__header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="section-title">Migration Analytics</h1>
            <p className="section-subtitle">
              Data-driven insights on migration trends, common challenges, and platform performance.
            </p>
          </motion.div>

          {/* KPI Cards */}
          <motion.div
            className="analytics__kpi-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {kpiCards.map((kpi) => (
              <div key={kpi.label} className="analytics__kpi glass-card">
                <div className="analytics__kpi-icon" style={{ background: `${kpi.color}20`, color: kpi.color }}>
                  {kpi.icon}
                </div>
                <div className="analytics__kpi-data">
                  <span className="analytics__kpi-value">
                    <AnimatedCounter value={kpi.value} />
                  </span>
                  <span className="analytics__kpi-label">{kpi.label}</span>
                </div>
                <span className="analytics__kpi-change" style={{ color: '#34d399' }}>{kpi.change}</span>
              </div>
            ))}
          </motion.div>

          {/* Charts Row */}
          <div className="analytics__charts-grid">
            {/* Problem Distribution Pie */}
            <motion.div
              className="analytics__chart-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="analytics__chart-title">Problem Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => <span style={{ color: '#a0a0b8', fontSize: '0.82rem' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Query Trend */}
            <motion.div
              className="analytics__chart-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="analytics__chart-title">Query Trends (2025)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="queryGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="resolvedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#6b6b80" fontSize={12} />
                  <YAxis stroke="#6b6b80" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="queries" stroke="#6366f1" fill="url(#queryGrad)" />
                  <Area type="monotone" dataKey="resolved" stroke="#34d399" fill="url(#resolvedGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Bar Chart */}
          <motion.div
            className="analytics__chart-card analytics__chart-card--wide glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="analytics__chart-title">Problems by Country (%)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={problemData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="country" stroke="#6b6b80" fontSize={12} />
                <YAxis stroke="#6b6b80" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span style={{ color: '#a0a0b8', fontSize: '0.82rem' }}>{value}</span>} />
                <Bar dataKey="visa" name="Visa" fill="#fb7185" radius={[4, 4, 0, 0]} />
                <Bar dataKey="language" name="Language" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" name="Cost" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                <Bar dataKey="jobs" name="Jobs" fill="#34d399" radius={[4, 4, 0, 0]} />
                <Bar dataKey="housing" name="Housing" fill="#22d3ee" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Problems Table */}
          <motion.div
            className="analytics__table-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="analytics__chart-title">Most Common Problem per Country</h3>
            <div className="analytics__table-wrapper">
              <table className="analytics__table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Country</th>
                    <th>Most Common Problem</th>
                    <th>Reports</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {topProblems.map((row, i) => (
                    <tr key={row.country}>
                      <td className="analytics__rank">#{i + 1}</td>
                      <td className="analytics__country">{row.country}</td>
                      <td>{row.problem}</td>
                      <td className="analytics__count">{row.count.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${row.severity === 'High' ? 'badge-rose' : row.severity === 'Medium' ? 'badge-amber' : 'badge-emerald'}`}>
                          {row.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
