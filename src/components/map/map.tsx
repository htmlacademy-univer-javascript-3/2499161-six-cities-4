import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';

import useMap from '../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { URL_MARKER_DEFAULT } from '../constants';

type MapComponentProps = {
  city: City;
  points: Offer[];
};

const standartIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

export default function MapComponent(props: MapComponentProps): JSX.Element {
  const {city, points} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.city.location.latitude,
          lng: point.city.location.longitude
        });

        marker
          .setIcon(standartIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}
