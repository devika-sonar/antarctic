// src/components/AlertsView.jsx
import { useState } from 'react';

const INITIAL_ALERTS = [
  {
    id: 'ALT-8821',
    severity: 'critical',
    title: 'Severe Pack-Ice Convergence Warning',
    location: '68°14\'S, 65°20\'W (Marguerite Bay)',
    timestamp: '12 mins ago',
    source: 'Sentinel-1 SAR Satellite',
    description: 'Rapid ice convergence detected. Ridge compression pressure increasing rapidly. Immediate diversion recommended for vessels under Ice Class 1A.',
    acknowledged: false,
    recommendedAction: 'Shift heading 045° to avoid pressure ridge pinch-point.',
  },
  {
    id: 'ALT-8819',
    severity: 'critical',
    title: 'Accelerated Iceberg Drift Tracked (A-76A fragment)',
    location: '62°30\'S, 58°45\'W (Bransfield Strait)',
    timestamp: '34 mins ago',
    source: 'Doppler Radar & MODIS Thermal',
    description: 'Drift velocity increased to 2.4 knots due to subsurface katabatic currents. Projected CPA (Closest Point of Approach) is 1.1 NM in 3 hours.',
    acknowledged: false,
    recommendedAction: 'Reduce speed to 8 knots and maintain minimum 3.0 NM standoff.',
  },
 
  
  {
    id: 'ALT-8740',
    severity: 'info',
    title: 'Rothera Research Station Port Advisory',
    location: '67°34\'S, 68°08\'W (Adelaide Island)',
    timestamp: '4 hours ago',
    source: 'BAS Station Dispatch',
    description: 'Wharf crane maintenance in progress until 08:00 UTC. Berthing fairway clear with minor brash ice accumulation.',
    acknowledged: true,
    recommendedAction: 'Standard approach speed. Contact BAS Harbor Control on VHF Ch 16.',
  }
];

export default function AlertsView() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [filterSeverity] = useState('all');
  const [filterStatus] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [searchQuery] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleToggleAcknowledge = (id) => {
    setAlerts(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.acknowledged;
        showToast(nextState ? `Alert ${id} acknowledged` : `Alert ${id} marked active`);
        return { ...item, acknowledged: nextState };
      }
      return item;
    }));
  };

  const handleDismiss = (id) => {
    setAlerts(prev => prev.filter(item => item.id !== id));
    if (selectedAlert?.id === id) {
      setSelectedAlert(null);
    }
    showToast(`Alert ${id} cleared`);
  };

  const handleSimulateNewAlert = () => {
    const randomId = `ALT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAlert = {
      id: randomId,
      severity: 'critical',
      title: 'Sudden Katabatic Gale Detected (>55 kts)',
      location: '65°10\'S, 64°05\'W (Lemaire Channel)',
      timestamp: 'Just now',
      source: 'Autonomous Weather Buoy #19',
      description: 'Sudden katabatic wind surge descending from Antarctic Peninsula plateau. Severe visibility reduction and ice floe compaction imminent.',
      acknowledged: false,
      recommendedAction: 'Abort narrow passage transit; seek sheltered anchorage immediately.',
    };
    setAlerts([newAlert, ...alerts]);
    showToast('🚨 New critical alert triggered!');
  };

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity !== 'all' && a.severity !== filterSeverity) return false;
    if (filterStatus === 'active' && a.acknowledged) return false;
    if (filterStatus === 'acknowledged' && !a.acknowledged) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return { bg: 'rgba(248, 113, 113, 0.1)', border: 'rgba(248, 113, 113, 0.3)', text: '#f87171', label: 'CRITICAL' };
      case 'warning':
        return { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.3)', text: '#fbbf24', label: 'WARNING' };
      default:
        return { bg: 'rgba(56, 189, 248, 0.1)', border: 'rgba(56, 189, 248, 0.3)', text: '#38bdf8', label: 'INFO' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toastMsg && (
        <div style={{
          position: 'absolute', top: '-10px', right: '10px', zIndex: 100,
          backgroundColor: '#0284c7', color: '#fff', padding: '8px 16px',
          borderRadius: '6px', fontSize: '0.82rem', fontWeight: '600',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)',
          animation: 'fadeIn 0.2s ease-in'
        }}>
          {toastMsg}
        </div>
      )}

      {/* Top Controls Bar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center',
        justifyContent: 'space-between', backgroundColor: '#111827',
        padding: '12px 18px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.07)'
      }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
         
        </div>

        <button
          onClick={handleSimulateNewAlert}
          style={{
            backgroundColor: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)',
            color: '#f87171', padding: '8px 14px', borderRadius: '6px',
            fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <span>⚡</span> Simulate Live Sensor Threat
        </button>
      </div>

      {/* Main Alert List & Detail View */}
      <div style={{ display: 'flex', gap: '16px', flexGrow: 1, minHeight: '480px' }}>
        
        {/* Alerts Feed */}
        <div style={{
          flex: selectedAlert ? '1 1 55%' : '1 1 100%',
          display: 'flex', flexDirection: 'column', gap: '10px',
          overflowY: 'auto', maxHeight: 'calc(100vh - 220px)', paddingRight: '4px'
        }}>
          {filteredAlerts.length === 0 ? (
            <div style={{
              backgroundColor: '#111827', borderRadius: '10px', padding: '40px',
              textAlign: 'center', color: '#64748b', border: '1px dashed rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🛡️</div>
              <div style={{ fontWeight: '600', color: '#94a3b8', fontSize: '0.92rem' }}>No alerts match your current filter</div>
              <div style={{ fontSize: '0.82rem', marginTop: '4px', color: '#64748b' }}>All Antarctic navigational sectors are clear within chosen criteria.</div>
            </div>
          ) : (
            filteredAlerts.map(alert => {
              const badge = getSeverityBadge(alert.severity);
              const isSelected = selectedAlert?.id === alert.id;

              return (
                <div 
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  style={{
                    backgroundColor: isSelected ? '#152136' : '#111827',
                    borderRadius: '8px',
                    padding: '14px 18px',
                    border: isSelected ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.07)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    opacity: alert.acknowledged ? 0.7 : 1,
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        backgroundColor: badge.bg, color: badge.text,
                        border: `1px solid ${badge.border}`,
                        padding: '2px 8px', borderRadius: '4px',
                        fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.04em'
                      }}>
                        {badge.label}
                      </span>
                      <span style={{ color: '#94a3b8', fontSize: '0.78rem', fontFamily: 'monospace' }}>
                        {alert.id}
                      </span>
                      {alert.acknowledged && (
                        <span style={{ color: '#34d399', fontSize: '0.72rem', backgroundColor: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.2)', padding: '2px 6px', borderRadius: '4px', fontWeight: '500' }}>
                          ✓ Acknowledged
                        </span>
                      )}
                    </div>
                    <span style={{ color: '#64748b', fontSize: '0.78rem' }}>{alert.timestamp}</span>
                  </div>

                  <div style={{ color: '#f8fafc', fontWeight: '600', fontSize: '0.92rem', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                    {alert.title}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#94a3b8' }}>
                    <span>📍 {alert.location}</span>
                    <span>📡 {alert.source}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Alert Detailed Drawer */}
        {selectedAlert && (
          <div style={{
            flex: '1 1 45%', backgroundColor: '#111827',
            borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '20px', display: 'flex', flexDirection: 'column',
            gap: '14px', height: 'fit-content', boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px' }}>
              <div>
                <span style={{
                  ...getSeverityBadge(selectedAlert.severity),
                  padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700',
                  letterSpacing: '0.04em', display: 'inline-block', marginBottom: '6px'
                }}>
                  {selectedAlert.severity.toUpperCase()}
                </span>
                <h3 style={{ color: '#f8fafc', fontSize: '1.05rem', fontWeight: '600', margin: 0 }}>{selectedAlert.title}</h3>
                <span style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '2px', display: 'inline-block' }}>Identifier: {selectedAlert.id} • {selectedAlert.timestamp}</span>
              </div>
              <button 
                onClick={() => setSelectedAlert(null)}
                style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '1.1rem', cursor: 'pointer', padding: '4px', lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            <div>
              <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.04em', marginBottom: '4px' }}>Location Coordinates</div>
              <div style={{ color: '#38bdf8', fontFamily: 'monospace', fontWeight: '600', fontSize: '0.88rem' }}>
                📍 {selectedAlert.location}
              </div>
            </div>

            <div>
              <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.04em', marginBottom: '4px' }}>Telemetry Source</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>
                📡 {selectedAlert.source}
              </div>
            </div>

            <div style={{ backgroundColor: '#0b111e', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
              <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.04em', marginBottom: '4px' }}>Detailed Hazard Analysis</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5' }}>
                {selectedAlert.description}
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.06)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
              <div style={{ color: '#38bdf8', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '4px', fontWeight: '600', letterSpacing: '0.04em' }}>Recommended Bridge Protocol</div>
              <div style={{ color: '#f8fafc', fontSize: '0.85rem', fontWeight: '500', lineHeight: '1.4' }}>
                ⚠️ {selectedAlert.recommendedAction}
              </div> 
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button
                onClick={() => handleToggleAcknowledge(selectedAlert.id)}
                style={{
                  flexGrow: 1, padding: '9px 14px', borderRadius: '6px',
                  backgroundColor: selectedAlert.acknowledged ? '#1e2c45' : '#0284c7',
                  color: 'white', border: 'none', fontWeight: '600',
                  cursor: 'pointer', fontSize: '0.82rem',
                  transition: 'all 0.15s ease'
                }}
              >
                {selectedAlert.acknowledged ? 'Mark Unacknowledged' : '✓ Acknowledge Alert'}
              </button>
              <button
                onClick={() => handleDismiss(selectedAlert.id)}
                style={{
                  padding: '9px 14px', borderRadius: '6px',
                  backgroundColor: 'transparent', color: '#f87171',
                  border: '1px solid rgba(248, 113, 113, 0.3)', fontWeight: '600',
                  cursor: 'pointer', fontSize: '0.82rem',
                  transition: 'all 0.15s ease'
                }}
              >
                Dismiss / Resolve
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
