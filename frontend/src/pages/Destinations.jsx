import DestinationCard from "../components/DestinationCard";
import PageHeader from "../components/PageHeader";
import { DEFAULT_FILTERS } from "../constants";

function Destinations({
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
  function updateFilter(name, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  }

  return (
    <section className="page-section">
      <PageHeader
        eyebrow="Find your fit"
        title="Destinations"
        copy="Filter Indian getaways by category, region, budget, rating, and travel duration."
      />

      <form className="filter-bar" aria-label="Destination filters">
        <label className="search-field">
          <span>Search</span>
          <input
            type="search"
            placeholder="Goa, forts, beaches..."
            value={filters.q}
            onChange={(event) => updateFilter("q", event.target.value)}
          />
        </label>

        <label>
          <span>Category</span>
          <select
            value={filters.category}
            onChange={(event) => updateFilter("category", event.target.value)}
          >
            <option>All</option>
            {filterOptions.categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Region</span>
          <select
            value={filters.region}
            onChange={(event) => updateFilter("region", event.target.value)}
          >
            <option>All</option>
            {filterOptions.regions.map((region) => (
              <option key={region}>{region}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Budget</span>
          <select
            value={filters.budget}
            onChange={(event) => updateFilter("budget", event.target.value)}
          >
            <option>All</option>
            {filterOptions.budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Rating</span>
          <select
            value={filters.min_rating}
            onChange={(event) => updateFilter("min_rating", event.target.value)}
          >
            <option value="0">Any</option>
            <option value="4.5">4.5+</option>
            <option value="4.7">4.7+</option>
            <option value="4.8">4.8+</option>
          </select>
        </label>

        <label>
          <span>Sort</span>
          <select
            value={filters.sort}
            onChange={(event) => updateFilter("sort", event.target.value)}
          >
            <option value="rating">Top rated</option>
            <option value="price_low">Lowest price</option>
            <option value="price_high">Highest price</option>
            <option value="duration">Shortest trip</option>
            <option value="name">Name</option>
          </select>
        </label>

        <button
          className="clear-button"
          type="button"
          onClick={() => setFilters(DEFAULT_FILTERS)}
        >
          Clear
        </button>
      </form>

      {loading && <p className="status">Loading destinations...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && destinations.length === 0 && (
        <p className="empty-state">No destinations match the selected filters.</p>
      )}

      <div className="destination-grid">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            isInTrip={isInTrip}
            onDetails={onDetails}
            onToggleTrip={onToggleTrip}
          />
        ))}
      </div>
    </section>
  );
}

export default Destinations;
