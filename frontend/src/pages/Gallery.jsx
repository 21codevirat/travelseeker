import PageHeader from "../components/PageHeader";

function getVideoType(url) {
  return url.endsWith(".ogv") ? "video/ogg" : "video/webm";
}

function Gallery({ destinations, loading }) {
  return (
    <section className="page-section">
      <PageHeader
        eyebrow="Gallery"
        title="Destination media library"
        copy="Every destination now has dedicated clips and images, grouped for easier browsing and a more professional customer experience."
      />

      {loading && destinations.length === 0 && (
        <p className="status">Loading destination media...</p>
      )}

      <div className="destination-media-library">
        {destinations.map((destination) => (
          <section className="destination-media-section" key={destination.id}>
            <div className="media-section-heading">
              <div>
                <p className="eyebrow">{destination.region}</p>
                <h2>{destination.name}</h2>
                <span>{destination.location}</span>
              </div>
              <strong>{destination.media?.length || 0} assets</strong>
            </div>

            <div className="gallery-grid">
              {destination.media?.map((item) => (
                <article className="gallery-card" key={`${destination.id}-${item.title}`}>
                  {item.type === "clip" ? (
                    <video controls muted playsInline poster={item.poster}>
                      <source src={item.url} type={getVideoType(item.url)} />
                    </video>
                  ) : (
                    <img src={item.url} alt={item.title} />
                  )}

                  <div className="gallery-card-body">
                    <p className="eyebrow">{item.type}</p>
                    <h2>{item.title}</h2>
                    <a href={item.source_url} rel="noreferrer" target="_blank">
                      {item.credit}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
