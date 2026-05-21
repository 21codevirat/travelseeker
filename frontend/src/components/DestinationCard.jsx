import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/format";

function DestinationCard({
  destination,
  isInTrip,
  onDetails,
  onToggleTrip,
}) {
  const previewMedia = destination.media?.slice(0, 3) || [];
  const clipCount = destination.media?.filter((item) => item.type === "clip").length || 0;
  const imageCount = destination.media?.filter((item) => item.type === "image").length || 0;

  return (
    <article className="destination-card">
      <div className="card-media">
        <img src={destination.image_url} alt={destination.name} />
        <span>{clipCount} clip | {imageCount} images</span>
      </div>
      <div className="card-body">
        <div className="card-topline">
          <span>{destination.category}</span>
          <strong>{destination.rating.toFixed(1)}</strong>
        </div>
        <p className="location">{destination.location}</p>
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>

        <div className="facts">
          <span>{destination.duration_days} days</span>
          <span>{formatCurrency(destination.price_estimate)}</span>
          <span>{destination.budget}</span>
        </div>

        {previewMedia.length > 0 && (
          <div className="mini-media-row" aria-label={`${destination.name} media preview`}>
            {previewMedia.map((item) => (
              <img
                key={`${destination.id}-${item.title}`}
                src={item.poster || item.url}
                alt={item.title}
              />
            ))}
          </div>
        )}

        <div className="card-actions">
          <button
            className="text-button"
            type="button"
            onClick={() => onDetails(destination.id)}
          >
            Details
          </button>
          <button
            className="primary-button compact"
            type="button"
            onClick={() => onToggleTrip(destination)}
          >
            {isInTrip(destination.id) ? "Remove" : "Add"}
          </button>
          <Link className="secondary-action compact" to={`/booking/${destination.id}`}>
            Book
          </Link>
          <Link className="secondary-action compact" to={`/map/${destination.id}`}>
            Map
          </Link>
        </div>
      </div>
    </article>
  );
}

export default DestinationCard;
