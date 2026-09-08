import PolarMap from './PolarMap';
import MissionOverlay from './MissionOverlay';

export default function MapSection({
  activeService,
  forecastDay,
  isCalculating,
  hasActiveMission,
  startCoord,
  destCoord,
  onOpenMissionModal,
  onRecalculate
}) {
  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
      <div style={{
        flexGrow: 1, backgroundColor: '#0b1120', borderRadius: '12px',
        padding: '4px', position: 'relative', height: '100%', minHeight: 0
      }}>
        {isCalculating && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(11, 17, 32, 0.7)',
            zIndex: 30, display: 'flex', justifyContent: 'center', alignItems: 'center',
            color: '#38bdf8', fontSize: '1rem', fontWeight: '600', letterSpacing: '0.02em'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                display: 'inline-block', width: '8px', height: '8px',
                borderRadius: '50%', backgroundColor: '#38bdf8',
                animation: 'pulseSubtle 1.5s infinite ease-in-out'
              }} />
              Running ML Inference...
            </div>
          </div>
        )}

        <MissionOverlay
          activeService={activeService}
          hasActiveMission={hasActiveMission}
          startCoord={startCoord}
          destCoord={destCoord}
          onOpenMissionModal={onOpenMissionModal}
        />

        <PolarMap activeService={activeService} forecastDay={forecastDay} />

        <button
          onClick={onRecalculate}
          disabled={isCalculating}
          style={{
            position: 'absolute', bottom: '16px', right: '16px', zIndex: 20,
            padding: '10px 18px', backgroundColor: isCalculating ? '#1e2c45' : '#0284c7',
            color: isCalculating ? '#64748b' : '#ffffff', border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px', fontWeight: '600', fontSize: '0.84rem',
            cursor: isCalculating ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.15s ease'
          }}>
          {isCalculating ? 'Computing...' : 'Recalculate Route'}
        </button>
      </div>
    </div>
  );
}
