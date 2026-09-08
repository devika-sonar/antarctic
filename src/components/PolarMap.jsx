// src/components/PolarMap.jsx
import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM'; // Using standard OpenStreetMap tiles
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';

// Define the exact mathematical projection for Antarctica (EPSG:3031)
proj4.defs(
  'EPSG:3031',
  '+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs'
);
register(proj4);
const antarcticProjection = getProjection('EPSG:3031');

export default function PolarMap() {
  const mapElement = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the Map
    if (!mapRef.current) {
      mapRef.current = new Map({
        target: mapElement.current,
        layers: [
          new TileLayer({
            // OpenLayers will automatically take standard map tiles and mathematically 
            // reproject them to the South Pole view!
            source: new OSM(),
          }),
        ],
        view: new View({
          projection: antarcticProjection,
          center: [0, 0], // The exact South Pole
          zoom: 3, // Zoomed out enough to see the continent
        }),
      });
    }

    // Cleanup when component unmounts (Important for Vite's Strict Mode)
    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapElement}
      style={{ width: '100%', height: '100%', minHeight: '300px', borderRadius: '12px', overflow: 'hidden' }}
    />
  );
}