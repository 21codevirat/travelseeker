import { Link, useLocation, useParams } from "react-router-dom";
import Destinations from "./Destinations";
import { formatCurrency } from "../utils/format";

const SEARCH_METADATA = {
  flights: {
    eyebrow: "Flight deals",
    title: "Search flights with flexible fares and quick booking",
    copy:
      "Compare top flight paths across popular destinations and choose the plan that fits your schedule.",
  },
  hotels: {
    eyebrow: "Hotel stays",
    title: "Find comfortable hotels and premium stays",
    copy:
      "Book stays with verified reviews, easy cancellation, and best-in-class amenities.",
  },
  packages: {
    eyebrow: "Holiday packages",
    title: "Explore curated packages for every traveler",
    copy:
      "Discover ready-to-book tour packages with hotels, activities, and local experiences included.",
  },
  homestays: {
    eyebrow: "Homestays",
    title: "Stay in local homestays for a more authentic trip",
    copy:
      "Choose cozy homestays near scenic routes and enjoy local hospitality at great prices.",
  },
  cabs: {
    eyebrow: "Cab services",
    title: "Book cabs and airport transfers seamlessly",
    copy:
      "Get reliable local transport options for every leg of your journey, from pickup to sightseeing.",
  },
};

function getServicePrice(destination, type, details) {
  const travelers = Number(details.travelers || 1);
  const rooms = Number(details.rooms || 1);

  if (type === "flights") {
    return Math.round(destination.price_estimate * 0.32 * travelers);
  }

  if (type === "hotels") {
    return Math.round((destination.price_estimate / destination.duration_days) * rooms * 0.62);
  }

  return Math.round(destination.price_estimate * travelers);
}

function getServiceMeta(destination, type, details) {
  if (type === "flights") {
    return {
      badge: "Flight",
      button: "Book Flight",
      detail: `${details.fromLocation || "Your city"} to ${destination.name}`,
      note: "Flexible fare, cabin baggage, instant request",
    };
  }

  if (type === "hotels") {
    return {
      badge: "Hotel",
      button: "Book Hotel",
      detail: `${details.rooms || 1} room stay in ${destination.location}`,
      note: "Verified stays, breakfast options, easy cancellation",
    };
  }

  return {
    badge: "Package",
    button: "Book Package",
    detail: `${destination.duration_days} day curated dream trip`,
    note: "Hotel, activities, support, and local experiences included",
  };
}

function matchesServiceQuery(destination, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [
    destination.name,
    destination.location,
    destination.region,
    destination.category,
    destination.budget,
    destination.best_time,
    destination.description,
    ...(destination.highlights || []),
  ]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(normalizedQuery));
}

function Search({
  allDestinations = [],
  destinations,
  error,
  filterOptions,
  filters,
  isInTrip,
  loading,
  onDetails,
  onToggleTrip,
  setFilters,
}) {
  const { type } = useParams();
  const location = useLocation();
  const details = location.state || {};
  const activeType = SEARCH_METADATA[type] ? type : "packages";
  const searchMeta = SEARCH_METADATA[activeType];
  const routeSummary =
    details.fromLocation || details.toLocation
      ? `${details.fromLocation || "Anywhere"} to ${details.toLocation || "India"} | ${details.departDate || "Flexible dates"}`
      : "Browse package, hotel, and flight results.";
  const serviceQuery = details.toLocation || filters.q || "";
  const serviceSource = allDestinations.length ? allDestinations : destinations;
  const matchingServiceDestinations = serviceSource.filter((destination) =>
    matchesServiceQuery(destination, serviceQuery)
  );
  const serviceDestinations =
    matchingServiceDestinations.length > 0 ? matchingServiceDestinations : serviceSource;
  const destinationResults =
    destinations.length > 0 || activeType === "packages" ? destinations : serviceDestinations;

  return (
    <>
      <section className="page-section search-header-section">
        <div className="page-header search-page-header">
          <p className="eyebrow">{searchMeta.eyebrow}</p>
          <h1>{searchMeta.title}</h1>
          <p>{searchMeta.copy}</p>
          <p className="search-route-summary">{routeSummary}</p>
        </div>
      </section>

      <section className="service-results-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Ready to book</p>
            <h2>
              {activeType === "flights"
                ? "Available flight options"
                : activeType === "hotels"
                  ? "Available hotel stays"
                  : "Available dream packages"}
            </h2>
          </div>
          <Link className="text-button" to="/booking">
            View booking form
          </Link>
        </div>

        <div className="service-results-grid">
          {serviceDestinations.slice(0, 6).map((destination) => {
            const service = getServiceMeta(destination, activeType, details);
            const price = getServicePrice(destination, activeType, details);

            return (
              <article className="service-result-card" key={destination.id}>
                <img src={destination.image_url} alt={destination.name} />
                <div>
                  <span className="service-badge">{service.badge}</span>
                  <h3>{destination.name}</h3>
                  <p>{service.detail}</p>
                  <p>{service.note}</p>
                  <div className="service-card-footer">
                    <strong>{formatCurrency(price)}</strong>
                    <Link
                      className="primary-button compact"
                      to={`/booking/${destination.id}`}
                      state={{
                        bookingType: activeType,
                        departDate: details.departDate,
                        fromLocation: details.fromLocation,
                        returnDate: details.returnDate,
                        rooms: details.rooms,
                        travelers: details.travelers,
                      }}
                    >
                      {service.button}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Destinations
        destinations={destinationResults}
        error={error}
        filterOptions={filterOptions}
        filters={filters}
        isInTrip={isInTrip}
        loading={loading}
        onDetails={onDetails}
        onToggleTrip={onToggleTrip}
        setFilters={setFilters}
      />
    </>
  );
}

export default Search;
