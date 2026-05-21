import { formatCurrency } from "../utils/format";

function getVideoType(url) {
  return url.endsWith(".ogv") ? "video/ogg" : "video/webm";
}

function DestinationModal({ destination, onClose }) {
  if (!destination) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="destination-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="destination-modal-title"
      >
        <button
          className="modal-close"
          type="button"
          aria-label="Close details"
          onClick={onClose}
        >
          x
        </button>
        <img src={destination.image_url} alt={destination.name} />
        <div className="modal-content">
          <p className="eyebrow">{destination.category}</p>
          <h2 id="destination-modal-title">{destination.name}</h2>
          <p>{destination.description}</p>
          <dl className="detail-grid">
            <div>
              <dt>Best time</dt>
              <dd>{destination.best_time}</dd>
            </div>
            <div>
              <dt>Region</dt>
              <dd>{destination.region}</dd>
            </div>
            <div>
              <dt>Budget</dt>
              <dd>{destination.budget}</dd>
            </div>
            <div>
              <dt>Estimate</dt>
              <dd>{formatCurrency(destination.price_estimate)}</dd>
            </div>
          </dl>
          <div className="highlight-list">
            {destination.highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>

          {destination.media?.length > 0 && (
            <div className="modal-media-wall">
              <h3>Destination media</h3>
              <div className="modal-media-grid">
                {destination.media.map((item) => (
                  <article key={item.title}>
                    {item.type === "clip" ? (
                      <video controls muted playsInline poster={item.poster}>
                        <source src={item.url} type={getVideoType(item.url)} />
                      </video>
                    ) : (
                      <img src={item.url} alt={item.title} />
                    )}
                    <a href={item.source_url} rel="noreferrer" target="_blank">
                      {item.credit}
                    </a>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default DestinationModal;
