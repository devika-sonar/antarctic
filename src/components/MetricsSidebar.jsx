import MetricCard from './MetricCard';
import DataTable from './DataTable';

export default function MetricsSidebar({ activeService, forecastDay }) {
  return (
    <aside style={{
      width: '400px',
      minWidth: '360px',
      maxWidth: '430px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      overflowY: 'auto',
      paddingRight: '2px',
      height: '100%'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flexShrink: 0 }}>
        {activeService === 'sea-ice' && (
          <>
            <MetricCard title="Avg Ice Conc." value={78 + forecastDay} unit="%" status="warning" />
            <MetricCard title="Confidence" value={92 - (forecastDay * 2)} unit="%" status={forecastDay > 4 ? 'warning' : 'good'} />
          </>
        )}

        {activeService === 'icebergs' && (
          <>
            <MetricCard title="Tracked Icebergs" value="4" unit="Targets" status="neutral" />
            <MetricCard title="Collision Threat" value={forecastDay > 2 ? 'High' : 'Elevated'} unit="" status={forecastDay > 2 ? 'danger' : 'warning'} />
          </>
        )}

        {activeService === 'navigation' && (
          <>
            <MetricCard title="Fuel Saved" value="14.5" unit="tons" status="good" />
            <MetricCard title="Safety Score" value={98 - forecastDay} unit="/100" status="good" />
          </>
        )}
      </div>

      <div style={{ flexGrow: 1, minHeight: 0 }}>
        <DataTable activeService={activeService} />
      </div>
    </aside>
  );
}
