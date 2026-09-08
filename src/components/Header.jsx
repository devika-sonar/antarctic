export default function Header({ activeService, forecastDay, setForecastDay, isCalculating }) {
  return (
    <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>
        {activeService === 'sea-ice' && <span style={{ color: '#f8fafc' }}>Sea-Ice Concentration (SIC)</span>}
        {activeService === 'icebergs' && <span style={{ color: '#22d3ee' }}>Iceberg Collision Avoidance</span>}
        {activeService === 'navigation' && <span style={{ color: '#4ade80' }}>Multi-Objective Route Planner</span>}
        {activeService === 'alerts' && <span style={{ color: '#f87171' }}>System Alerts & Hazards</span>}
        {activeService === 'history' && <span style={{ color: '#a78bfa' }}> Mission History</span>}
        {activeService === 'help' && <span style={{ color: '#38bdf8' }}>Operator Manual & Help Guide</span>}
      </h2>

      {(activeService === 'sea-ice' || activeService === 'icebergs' || activeService === 'navigation') && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#1e293b', padding: '10px 20px', borderRadius: '8px' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Forecast: <strong>{forecastDay === 0 ? 'Today' : `+${forecastDay} Days`}</strong>
          </label>
          <input
            type="range" min="0" max="7" value={forecastDay}
            onChange={(e) => setForecastDay(parseInt(e.target.value))}
            disabled={isCalculating}
            style={{ cursor: isCalculating ? 'not-allowed' : 'pointer' }}
          />
        </div>
      )}
    </header>
  );
}
