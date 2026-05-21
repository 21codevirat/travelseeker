import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DEFAULT_FILTERS, MEDIA_ASSETS } from "../constants";
import { formatCurrency } from "../utils/format";

const CATEGORY_OPTIONS = [
  { label: "All", value: "All" },
  { label: "Beach", value: "Beach" },
  { label: "Mountain", value: "Mountain" },
  { label: "Heritage", value: "Heritage" },
  { label: "Spiritual", value: "Spiritual" },
  { label: "Nature", value: "Nature" },
  { label: "Hill Station", value: "Hill Station" },
  { label: "Adventure", value: "Adventure" },
];

const BOOKING_TABS = ["Packages", "Hotels", "Flights"];

function Home({ destinations = [], plannedTrip = [], setFilters }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("Packages");
  const filteredByTab = destinations.filter((place) => {

  if (activeTab === "Hotels")
    return ["Premium", "Moderate", "Affordable"].includes(place.budget);

  return true;

});

  useEffect(() => {

  if (searchQuery.trim() === "") {
    setSearchResults([]);
    return;
  }

  const filtered = destinations.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  setSearchResults(filtered);

}, [searchQuery, destinations]);

  const filteredDestinations = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          destination.name,
          destination.location,
          destination.category,
          destination.best_time,
          destination.budget,
          destination.description,
        ]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedSearch));

      const matchesCategory =
        activeCategory === "All" || destination.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, destinations, searchTerm]);

  const visibleDestinations = filteredByTab.slice(0, 9);

  const [fromLocation, setFromLocation] = useState("Mumbai");
  const [toLocation, setToLocation] = useState("Goa");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [rooms, setRooms] = useState(1);

  function showDestination(destinationName) {
    setFilters?.({
      ...DEFAULT_FILTERS,
      q: destinationName,
    });
  }

  function searchDestinations(event) {
    event.preventDefault();

    setFilters?.({
      ...DEFAULT_FILTERS,
      q: searchQuery.trim() || searchTerm.trim() || toLocation,
      category: activeCategory,
    });

    navigate(`/search/${activeTab.toLowerCase()}`, {
      state: {
        fromLocation,
        toLocation: searchQuery.trim() || toLocation,
        departDate,
        returnDate,
        travelers,
        rooms,
      },
    });
  }

  return (
    <>
      <section className="premium-hero">

  <div className="hero-left">
    <p className="hero-tag">TRAVEL BOOKINGS MADE EASY</p>

    <h1>
      Book flights,
      hotels,
      packages
      and more
    </h1>

    <p className="hero-description">
      Discover premium destinations, smart AI itineraries,
      flexible fares, and trusted stays across India.
    </p>

    <div className="hero-buttons">

  <Link to="/destinations">
    <button className="primary-btn">
      Explore Trips
    </button>
  </Link>

  <Link to="/planner">
    <button className="secondary-btn">
      AI Planner
    </button>
  </Link>

</div>

    <div className="hero-stats">
      <div>
        <h2>20K+</h2>
        <p>Happy Travelers</p>
      </div>

      <div>
        <h2>100+</h2>
        <p>Verified Destinations</p>
      </div>

      <div>
        <h2>24/7</h2>
        <p>Support</p>
      </div>
    </div>
  </div>

  <div className="hero-right">

    <div className="booking-card">
      <p className="search-label">QUICK SEARCH</p>

      <h2>Find the right option for your travel plan</h2>

      <div className="booking-tabs">

  {BOOKING_TABS.map((tab) => (
    <button
      key={tab}
      className={activeTab === tab ? "active-tab" : ""}
      type="button"
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </button>
  ))}

</div>

      <div className="booking-grid">

        <input
          placeholder="From"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
      />
        <input
          type="text"
          placeholder={activeTab === "Flights" ? "To city or destination" : `Search ${activeTab}`}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setToLocation(e.target.value);
          }}
  />

  {searchResults.length > 0 && (

  <div className="search-results">

    {searchResults.map((place) => (

      <div
        key={place.id}
        className="search-item"
        role="button"
        tabIndex="0"
        onClick={() => {
          setSearchQuery(place.name);
          setToLocation(place.name);
          setSearchResults([]);
        }}
      >
        <img src={place.image_url} alt={place.name} />

        <div>
          <h4>{place.name}</h4>
          <p>{place.location}</p>
        </div>

      </div>

    ))}

  </div>

)}

        <input
          aria-label="Depart date"
          type="date"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
        />
        <input
          aria-label="Return date"
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />

        <input
          placeholder="Travelers"
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
      />
        <input
          placeholder="Rooms"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
        />

      </div>

      <button
        className="search-trip-btn"
        type="button"
        onClick={searchDestinations}
     >
        Search {activeTab}
     </button>
    </div>

  </div>

</section>

      <section className="offers-section">
        <div className="section-intro">
          <p className="eyebrow">Best deals</p>
          <h2>Popular holiday packages and hot offers</h2>
        </div>

        <div className="offers-grid">
          {visibleDestinations.slice(0, 4).map((place) => (
            <article className="offer-card" key={place.id}>
              <img src={place.image_url} alt={place.name} />
              <div className="offer-content">
                <p className="offer-tag">{place.category}</p>
                <h3>{place.name}</h3>
                <p>{place.location}</p>
                <div className="offer-meta">
                  <span>{place.duration_days} days</span>
                  <strong>{formatCurrency(place.price_estimate)}</strong>
                </div>
                <Link
                  className="text-button"
                  to="/destinations"
                  onClick={() => showDestination(place.name)}
                >
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="destinations-list">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Trending journeys</p>
            <h2>Top destinations for your next trip</h2>
          </div>
          <Link className="text-button" to="/destinations">
            View all
          </Link>
        </div>

        {visibleDestinations.length === 0 ? (
          <p className="empty-state">No destinations match your search.</p>
        ) : (
          <div className="home-destination-grid">
            {visibleDestinations.map((place) => (
              <article className="home-destination-card" key={place.id}>
                <div className="home-card-image">
                  <img src={place.image_url} alt={place.name} />
                  <span>{place.category}</span>
                </div>

                <div className="home-card-content">
                  <div>
                    <p className="location">{place.location}</p>
                    <h3>{place.name}</h3>
                  </div>
                  <p>{place.description}</p>

                  <div className="home-card-meta">
                    <span>{place.duration_days} days</span>
                    <span>{place.budget}</span>
                    <strong>{formatCurrency(place.price_estimate)}</strong>
                  </div>

                  <div className="home-card-actions">
                    <Link
                      className="view-btn"
                      to="/destinations"
                      onClick={() => showDestination(place.name)}
                    >
                      View trip
                    </Link>
                    <Link className="book-btn" to={`/booking/${place.id}`}>
                      Book now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="why-choose-us">
        <div className="section-intro">
          <p className="eyebrow">Why choose us</p>
          <h2>Your trusted travel partner</h2>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">✈️</div>
            <h3>Best Prices</h3>
            <p>Guaranteed lowest fares and exclusive deals on flights, hotels, and packages.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🛡️</div>
            <h3>Secure Booking</h3>
            <p>Safe and secure payments with 24/7 customer support for peace of mind.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Wide Selection</h3>
            <p>Thousands of destinations, hotels, and activities to choose from.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📱</div>
            <h3>Easy to Use</h3>
            <p>Simple booking process with instant confirmations and flexible cancellations.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-intro">
          <p className="eyebrow">What travelers say</p>
          <h2>Real experiences from our customers</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Amazing service! Booked a Goa package in minutes and had the best vacation ever."</p>
            <cite>- Priya Sharma</cite>
          </div>
          <div className="testimonial-card">
            <p>"Great deals on flights and hotels. Highly recommend for budget travelers."</p>
            <cite>- Rajesh Kumar</cite>
          </div>
          <div className="testimonial-card">
            <p>"The planner tool helped us customize our Kerala trip perfectly."</p>
            <cite>- Anjali Patel</cite>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to start your journey?</h2>
          <p>Join thousands of happy travelers who trust us for their dream vacations.</p>
          <Link className="primary-button" to="/search/packages">
            Start Booking Now
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
