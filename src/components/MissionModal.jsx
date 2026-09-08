export default function MissionModal({
  isOpen,
  onClose,
  onStartMission,
  modalStartCoord,
  setModalStartCoord,
  modalDestCoord,
  setModalDestCoord,
  vesselLocation
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(9, 13, 22, 0.8)',
      backdropFilter: 'blur(6px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 1000, padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px',
        padding: '24px', width: '100%', maxWidth: '440px',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.05rem', fontWeight: '600' }}>
            Create New Mission
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: 'none', color: '#64748b',
              fontSize: '1.1rem', cursor: 'pointer', padding: '4px',
              lineHeight: 1
            }}
          >
            ✕
          </button>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '18px', lineHeight: '1.4' }}>
          Enter the waypoint coordinates for your Antarctic transit route.
        </p>

        <form onSubmit={onStartMission} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '500' }}>
                Source Coordinates (Lat, Lon)
              </label>
              <button
                type="button"
                onClick={() => setModalStartCoord(`${vesselLocation.lat}, ${vesselLocation.lon}`)}
                style={{
                  background: 'transparent', border: 'none', color: '#38bdf8',
                  fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'none'
                }}
              >
                Use Current Vessel Position
              </button>
            </div>
            <input
              type="text"
              value={modalStartCoord}
              onChange={(e) => setModalStartCoord(e.target.value)}
              placeholder="e.g. -60.00, -62.00"
              required
              style={{
                width: '100%', backgroundColor: '#0b111e', border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#f8fafc', padding: '9px 12px', borderRadius: '6px',
                fontSize: '0.85rem', outline: 'none', fontFamily: 'monospace'
              }}
            />
          </div>

          <div>
            <label style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
              Destination Coordinates (Lat, Lon)
            </label>
            <input
              type="text"
              value={modalDestCoord}
              onChange={(e) => setModalDestCoord(e.target.value)}
              placeholder="e.g. -75.00, -35.00"
              required
              style={{
                width: '100%', backgroundColor: '#0b111e', border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#f8fafc', padding: '9px 12px', borderRadius: '6px',
                fontSize: '0.85rem', outline: 'none', fontFamily: 'monospace'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1, padding: '9px 14px', backgroundColor: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', borderRadius: '6px',
                fontWeight: '500', cursor: 'pointer', fontSize: '0.85rem'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 2, padding: '9px 14px', backgroundColor: '#0284c7',
                border: 'none', color: '#ffffff', borderRadius: '6px',
                fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
              }}
            >
              Start Mission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
