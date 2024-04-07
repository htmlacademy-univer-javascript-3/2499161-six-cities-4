import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../../types/city';

export default function useLeafletMap(
  mapContainerRef: MutableRefObject<HTMLElement | null>,
  selectedCity: City
): Map | null {
  const [leafletMap, setLeafletMap] = useState<Map | null>(null);
  const hasMapBeenInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (mapContainerRef.current && !hasMapBeenInitialized.current) {
      const mapInstance = new Map(mapContainerRef.current, {
        center: {
          lat: selectedCity.location.latitude,
          lng: selectedCity.location.longitude
        },
        zoom: selectedCity.location.zoom
      });

      const baseLayer = new TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      mapInstance.addLayer(baseLayer);
      setLeafletMap(mapInstance);
      hasMapBeenInitialized.current = true;
    }
  }, [mapContainerRef, selectedCity.location]);

  return leafletMap;
}
