import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { formatCurrency } from "../utils/format";

function getMapEmbedUrl(destination) {
  const { lat, lng } = destination.coordinates;

  return `https://www.google.com/maps?q=${lat},${lng}&z=12&output=embed`;
}

function getMapExternalUrl(destination) {
  const { lat, lng } = destination.coordinates;

  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

function Map({ destinations }) {
  const { destinationId } = useParams();
  const mappedDestinations = destinations.filter((destination) => destination.coordinates);
  const initialDestination =
    mappedDestinations.find((destination) => destination.id.toString() === destinationId) ||
    mappedDestinations[0];
  const [selectedDestinationId, setSelectedDestinationId] = useState(
    initialDestination?.id?.toString() || ""
  );

  useEffect(() => {
    if (destinationId) {
      setSelectedDestinationId(destinationId);
    }
  }, [destinationId]);

  const selectedDestination = useMemo(() => {
    return (
      mappedDestinations.find(
        (destination) => destination.id.toString() === selectedDestinationId
      ) || mappedDestinations[0]
    );
  }, [mappedDestinations, selectedDestinationId]);

  return (
    <section className="page-section map-page">
      <PageHeader
        eyebrow="Explore by location"
        title="Google Travel Map"
        copy="Preview each destination on Google Maps before choosing your route, booking, or planner stops."
      />

      <div className="map-layout">
        <aside className="map-sidebar">
          <label>
            <span>Destination</span>
            <select
              value={selectedDestination?.id || ""}
              onChange={(event) => setSelectedDestinationId(event.target.value)}
            >
              {mappedDestinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {destination.name}
                </option>
              ))}
            </select>
          </label>

          <div className="map-destination-list">
            {mappedDestinations.map((destination) => (
              <button
                key={destination.id}
                className={selectedDestination?.id === destination.id ? "active" : ""}
                type="button"
                onClick={() => setSelectedDestinationId(destination.id.toString())}
              >
                <span>{destination.region}</span>
                <strong>{destination.name}</strong>
              </button>
            ))}
          </div>
        </aside>

        {selectedDestination && (
          <div className="map-panel">
            <iframe
              title={`${selectedDestination.name} map`}
              src={getMapEmbedUrl(selectedDestination)}
              loading="lazy"
            />

            <div className="map-details">
              <div>
                <p className="eyebrow">{selectedDestination.category}</p>
                <h2>{selectedDestination.name}</h2>
                <p>{selectedDestination.location}</p>
              </div>
              <div className="facts">
                <span>{selectedDestination.duration_days} days</span>
                <span>{selectedDestination.budget}</span>
                <span>{formatCurrency(selectedDestination.price_estimate)}</span>
              </div>
              <div className="map-actions">
                <a
                  className="primary-button"
                  href={getMapExternalUrl(selectedDestination)}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open Map
                </a>
                <Link className="secondary-action" to={`/booking/${selectedDestination.id}`}>
                  Book
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Map;
