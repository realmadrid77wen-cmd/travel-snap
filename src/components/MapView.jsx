import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

export default function MapView({ entries }) {
  const entriesWithLocation = entries.filter((e) => e.latitude && e.longitude);

  const center =
    entriesWithLocation.length > 0
      ? [entriesWithLocation[0].latitude, entriesWithLocation[0].longitude]
      : [51.505, -0.09];

  return (
    <MapContainer
      center={center}
      zoom={entriesWithLocation.length > 0 ? 10 : 3}
      className="w-full h-full rounded-lg"
      style={{ minHeight: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {entriesWithLocation.map((entry) => (
        <Marker key={entry.id} position={[entry.latitude, entry.longitude]}>
          <Popup>
            <div className="text-center">
              {entry.photo && (
                <img
                  src={entry.photo}
                  alt={entry.title}
                  className="w-32 h-20 object-cover rounded mb-1"
                />
              )}
              <p className="font-semibold text-sm">{entry.title}</p>
              <Link to={`/entry/${entry.id}`} className="text-xs text-blue-600">
                View Details →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
