export default function Sidebar({ activeService, setActiveService, vesselLocation, onLogout }) {
  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <img 
          src="/aims-logo.png" 
          alt="AIMS" 
          style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
        />
        <h1 style={{ margin: 0, fontSize: '1.2rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px' }}>
          AIMS
        </h1>
      </div>

      <div style={{
        backgroundColor: '#0f172a', padding: '12px 15px', borderRadius: '8px',
        marginBottom: '16px', border: '1px solid #334155', flexShrink: 0
      }}>
        <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '1px' }}>
          Current Position
        </div>
        <div style={{ color: '#4ade80', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.05rem' }}>
          {vesselLocation.lat}° S
        </div>
        <div style={{ color: '#4ade80', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.05rem' }}>
          {vesselLocation.lon}° W
        </div>
      </div>

      <button
        className={`nav-button ${activeService === 'sea-ice' ? 'active' : ''}`}
        onClick={() => setActiveService('sea-ice')}
      >
        Sea-Ice Forecast
      </button>
      <button
        className={`nav-button ${activeService === 'icebergs' ? 'active' : ''}`}
        onClick={() => setActiveService('icebergs')}
      >
        Iceberg Trajectories
      </button>
      <button
        className={`nav-button ${activeService === 'navigation' ? 'active' : ''}`}
        onClick={() => setActiveService('navigation')}
      >
        Mission Planner
      </button>
      <button
        className={`nav-button ${activeService === 'alerts' ? 'active' : ''}`}
        onClick={() => setActiveService('alerts')}
      >
        Alerts
      </button>
      <button
        className={`nav-button ${activeService === 'history' ? 'active' : ''}`}
        onClick={() => setActiveService('history')}
      >
        History
      </button>
      <button
        className={`nav-button ${activeService === 'help' ? 'active' : ''}`}
        onClick={() => setActiveService('help')}
      >
        Help
      </button>

      <button
        onClick={onLogout}
        style={{
          marginTop: 'auto', width: '100%', padding: '12px', backgroundColor: 'transparent',
          color: '#ef4444', border: '1px solid #ef4444', borderRadius: '8px',
          cursor: 'pointer', fontWeight: 'bold', flexShrink: 0, minHeight: '42px',
          transition: 'background-color 0.2s'
        }}>
        Logout
      </button>
    </aside>
  );
}
