import { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DestinationModal from "./components/DestinationModal";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { API_BASE_URL, DEFAULT_FILTERS } from "./constants";
import { SAMPLE_DESTINATIONS } from "./data/destinations";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Destinations from "./pages/Destinations";
import Disclaimer from "./pages/Disclaimer";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Planner from "./pages/Planner";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const BOOKING_STORAGE_KEY = "travel-seekers-bookings";
const CURRENT_USER_STORAGE_KEY = "travel-seekers-current-user";
const USERS_STORAGE_KEY = "travel-seekers-users";

function getUniqueValues(destinations, key) {
  return [...new Set(destinations.map((destination) => destination[key]))].sort();
}

function getFallbackFilterOptions() {
  return {
    budgets: getUniqueValues(SAMPLE_DESTINATIONS, "budget"),
    categories: getUniqueValues(SAMPLE_DESTINATIONS, "category"),
    regions: getUniqueValues(SAMPLE_DESTINATIONS, "region"),
  };
}

function destinationMatches(destination, filters) {
  const query = filters.q.trim().toLowerCase();
  const minRating = Number(filters.min_rating || 0);
  const searchableText = [
    destination.name,
    destination.location,
    destination.region,
    destination.category,
    destination.budget,
    destination.best_time,
    destination.description,
    ...(destination.highlights || []),
  ]
    .join(" ")
    .toLowerCase();

  if (query && !searchableText.includes(query)) {
    return false;
  }

  if (filters.category !== "All" && destination.category !== filters.category) {
    return false;
  }

  if (filters.region !== "All" && destination.region !== filters.region) {
    return false;
  }

  if (filters.budget !== "All" && destination.budget !== filters.budget) {
    return false;
  }

  return destination.rating >= minRating;
}

function sortDestinations(destinations, sortBy) {
  const sortedDestinations = [...destinations];

  if (sortBy === "price_low") {
    return sortedDestinations.sort((a, b) => a.price_estimate - b.price_estimate);
  }

  if (sortBy === "price_high") {
    return sortedDestinations.sort((a, b) => b.price_estimate - a.price_estimate);
  }

  if (sortBy === "duration") {
    return sortedDestinations.sort((a, b) => a.duration_days - b.duration_days);
  }

  if (sortBy === "name") {
    return sortedDestinations.sort((a, b) => a.name.localeCompare(b.name));
  }

  return sortedDestinations.sort((a, b) => b.rating - a.rating);
}

function getFallbackDestinations(filters) {
  return sortDestinations(
    SAMPLE_DESTINATIONS.filter((destination) => destinationMatches(destination, filters)),
    filters.sort
  );
}

function enrichDestinationMedia(destination) {
  const fallbackDestination = SAMPLE_DESTINATIONS.find(
    (sampleDestination) => sampleDestination.id === destination.id
  );

  if (!fallbackDestination) {
    return destination;
  }

  return {
    ...fallbackDestination,
    ...destination,
    highlights: destination.highlights?.length
      ? destination.highlights
      : fallbackDestination.highlights,
    image_url: destination.image_url || fallbackDestination.image_url,
    media:
      (fallbackDestination.media?.length || 0) >= (destination.media?.length || 0)
        ? fallbackDestination.media
        : destination.media,
  };
}

function App() {
  const [allDestinations, setAllDestinations] = useState(SAMPLE_DESTINATIONS);
  const [destinations, setDestinations] = useState(
    getFallbackDestinations(DEFAULT_FILTERS)
  );
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filterOptions, setFilterOptions] = useState(getFallbackFilterOptions);
  const [plannedTrip, setPlannedTrip] = useState([]);
  const [bookings, setBookings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(BOOKING_STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CURRENT_USER_STORAGE_KEY));
    } catch {
      return null;
    }
  });
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [contactStatus, setContactStatus] = useState("");

  useEffect(() => {
    async function loadAllDestinations() {
      try {
        // Keep unfiltered destination media available for Home and Gallery pages.
        const response = await fetch(`${API_BASE_URL}/destinations?sort=name`);

        if (!response.ok) {
          throw new Error("Unable to load destination media");
        }

        const data = await response.json();
        setAllDestinations(data.destinations.map(enrichDestinationMedia));
      } catch (err) {
        setAllDestinations(SAMPLE_DESTINATIONS);
      }
    }

    async function loadFilterOptions() {
      try {
        // Pull filter options from Flask so the UI stays in sync with API data.
        const response = await fetch(`${API_BASE_URL}/filters`);
        const data = await response.json();
        setFilterOptions(data);
      } catch {
        setFilterOptions(getFallbackFilterOptions());
      }
    }

    loadAllDestinations();
    loadFilterOptions();
  }, []);

  useEffect(() => {
    async function loadDestinations() {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE_URL}/destinations?${params}`);

        if (!response.ok) {
          throw new Error("Unable to load destinations");
        }

        const data = await response.json();
        setDestinations(data.destinations.map(enrichDestinationMedia));
      } catch (err) {
        setDestinations(getFallbackDestinations(filters));
      } finally {
        setLoading(false);
      }
    }

    loadDestinations();
  }, [filters]);

  const tripSummary = useMemo(() => {
    return plannedTrip.reduce(
      (summary, destination) => ({
        days: summary.days + destination.duration_days,
        price: summary.price + destination.price_estimate,
      }),
      { days: 0, price: 0 }
    );
  }, [plannedTrip]);

  useEffect(() => {
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(currentUser));
      return;
    }

    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  }, [currentUser]);

  function getStoredUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveStoredUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  function toggleDestinationInTrip(destination) {
    setPlannedTrip((currentTrip) => {
      const exists = currentTrip.some((item) => item.id === destination.id);

      if (exists) {
        return currentTrip.filter((item) => item.id !== destination.id);
      }

      return [...currentTrip, destination];
    });
  }

  function isInTrip(destinationId) {
    return plannedTrip.some((destination) => destination.id === destinationId);
  }

  function createBooking(booking) {
    setBookings((currentBookings) => [
      {
        ...booking,
        userEmail: currentUser?.email || booking.email,
      },
      ...currentBookings,
    ]);
  }

  function signupUser(credentials) {
    const users = getStoredUsers();
    const exists = users.some((user) => user.email === credentials.email);

    if (exists) {
      return { ok: false, message: "An account already exists for this email." };
    }

    const user = {
      email: credentials.email,
      name: credentials.name,
      password: credentials.password,
      phone: credentials.phone,
    };

    saveStoredUsers([...users, user]);
    setCurrentUser({
      email: user.email,
      name: user.name,
      phone: user.phone,
    });

    return { ok: true, message: "Account created successfully." };
  }

  function loginUser(credentials) {
    const user = getStoredUsers().find(
      (storedUser) =>
        storedUser.email === credentials.email &&
        storedUser.password === credentials.password
    );

    if (!user) {
      return { ok: false, message: "Invalid email or password." };
    }

    setCurrentUser({
      email: user.email,
      name: user.name,
      phone: user.phone,
    });

    return { ok: true, message: "Logged in successfully." };
  }

  function logoutUser() {
    setCurrentUser(null);
  }

  async function openDestinationDetails(destinationId) {
    try {
      // Fetch the detail route so the modal uses the backend's single-item API.
      const response = await fetch(`${API_BASE_URL}/destinations/${destinationId}`);

      if (!response.ok) {
        throw new Error("Unable to load destination details");
      }

      setSelectedDestination(enrichDestinationMedia(await response.json()));
    } catch (err) {
      const fallbackDestination = SAMPLE_DESTINATIONS.find(
        (destination) => destination.id === destinationId
      );

      if (fallbackDestination) {
        setSelectedDestination(fallbackDestination);
        return;
      }

      setError(err.message);
    }
  }

  function submitContactForm(event) {
    event.preventDefault();
    setContactStatus("Thanks. Your travel request has been noted locally.");
    event.currentTarget.reset();
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar
          currentUser={currentUser}
          menuOpen={menuOpen}
          onLogout={logoutUser}
          setMenuOpen={setMenuOpen}
        />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  destinations={allDestinations.length ? allDestinations : destinations}
                  plannedTrip={plannedTrip}
                  setFilters={setFilters}
                />
              }
            />
            <Route
              path="/destinations"
              element={
                <Destinations
                  destinations={destinations}
                  error={error}
                  filterOptions={filterOptions}
                  filters={filters}
                  isInTrip={isInTrip}
                  loading={loading}
                  onDetails={openDestinationDetails}
                  onToggleTrip={toggleDestinationInTrip}
                  setFilters={setFilters}
                />
              }
            />
            <Route
              path="/planner"
              element={
                <Planner
                  destinations={allDestinations.length ? allDestinations : destinations}
                  plannedTrip={plannedTrip}
                  tripSummary={tripSummary}
                  onToggleTrip={toggleDestinationInTrip}
                />
              }
            />
            <Route
              path="/booking"
              element={
                <Booking
                  bookings={bookings}
                  currentUser={currentUser}
                  destinations={allDestinations.length ? allDestinations : destinations}
                  onSubmit={createBooking}
                />
              }
            />
            <Route
              path="/booking/:destinationId"
              element={
                <Booking
                  bookings={bookings}
                  currentUser={currentUser}
                  destinations={allDestinations.length ? allDestinations : destinations}
                  onSubmit={createBooking}
                />
              }
            />
            <Route
              path="/gallery"
              element={
                <Gallery
                  destinations={allDestinations.length ? allDestinations : destinations}
                  loading={loading}
                />
              }
            />
            <Route
              path="/search/:type"
              element={
                <Search
                  allDestinations={allDestinations.length ? allDestinations : destinations}
                  destinations={destinations}
                  error={error}
                  filterOptions={filterOptions}
                  filters={filters}
                  isInTrip={isInTrip}
                  loading={loading}
                  onDetails={openDestinationDetails}
                  onToggleTrip={toggleDestinationInTrip}
                  setFilters={setFilters}
                />
              }
            />
            <Route
              path="/map"
              element={
                <Map
                  destinations={allDestinations.length ? allDestinations : destinations}
                />
              }
            />
            <Route
              path="/map/:destinationId"
              element={
                <Map
                  destinations={allDestinations.length ? allDestinations : destinations}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />
            <Route
              path="/login"
              element={
                <Auth
                  currentUser={currentUser}
                  mode="login"
                  onLogin={loginUser}
                  onSignup={signupUser}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Auth
                  currentUser={currentUser}
                  mode="signup"
                  onLogin={loginUser}
                  onSignup={signupUser}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <Contact
                  contactStatus={contactStatus}
                  onSubmit={submitContactForm}
                />
              }
            />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route
              path="*"
              element={
                <Home
                  destinations={allDestinations.length ? allDestinations : destinations}
                  plannedTrip={plannedTrip}
                  setFilters={setFilters}
                />
              }
            />
          </Routes>
        </main>

        <Footer />

        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
