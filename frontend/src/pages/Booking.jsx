import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { formatCurrency } from "../utils/format";

const PACKAGE_OPTIONS = [
  { label: "Essential", multiplier: 1 },
  { label: "Comfort", multiplier: 1.18 },
  { label: "Premium", multiplier: 1.4 },
];

const BOOKING_TYPES = {
  packages: {
    eyebrow: "Reserve your package",
    title: "Package Booking",
    copy: "Book a complete dream package with stay, activities, support, and local experiences.",
    optionLabel: "Package",
    options: PACKAGE_OPTIONS,
  },
  hotels: {
    eyebrow: "Reserve your stay",
    title: "Hotel Booking",
    copy: "Book verified hotels with room preferences, easy cancellation, and customer support.",
    optionLabel: "Stay type",
    options: [
      { label: "Standard Room", multiplier: 0.62 },
      { label: "Deluxe Room", multiplier: 0.82 },
      { label: "Suite Stay", multiplier: 1.08 },
    ],
  },
  flights: {
    eyebrow: "Reserve your flight",
    title: "Flight Booking",
    copy: "Request flexible flight fares for your dream destination with traveler details.",
    optionLabel: "Fare type",
    options: [
      { label: "Saver Fare", multiplier: 0.32 },
      { label: "Flexi Fare", multiplier: 0.42 },
      { label: "Premium Fare", multiplier: 0.58 },
    ],
  },
};

function getBookingType(value) {
  return BOOKING_TYPES[value] ? value : "packages";
}

function Booking({ bookings, currentUser, destinations, onSubmit }) {
  const { destinationId } = useParams();
  const location = useLocation();
  const bookingState = location.state || {};
  const initialDestinationId = destinationId || destinations[0]?.id?.toString() || "";
  const [selectedDestinationId, setSelectedDestinationId] = useState(initialDestinationId);
  const [bookingType, setBookingType] = useState(getBookingType(bookingState.bookingType));
  const [packageType, setPackageType] = useState(
    BOOKING_TYPES[getBookingType(bookingState.bookingType)].options[1]?.label ||
      BOOKING_TYPES[getBookingType(bookingState.bookingType)].options[0].label
  );
  const [travelers, setTravelers] = useState(Number(bookingState.travelers || 2));
  const [rooms, setRooms] = useState(Number(bookingState.rooms || 1));
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (destinationId) {
      setSelectedDestinationId(destinationId);
    }
  }, [destinationId]);

  const selectedDestination = useMemo(() => {
    return destinations.find(
      (destination) => destination.id.toString() === selectedDestinationId
    );
  }, [destinations, selectedDestinationId]);

  const activeBooking = BOOKING_TYPES[bookingType];
  const selectedPackage =
    activeBooking.options.find((option) => option.label === packageType) ||
    activeBooking.options[0];

  const estimate = useMemo(() => {
    if (!selectedDestination) {
      return 0;
    }

    if (bookingType === "hotels") {
      const nightlyRate = selectedDestination.price_estimate / selectedDestination.duration_days;
      return Math.round(nightlyRate * rooms * selectedPackage.multiplier);
    }

    if (bookingType === "flights") {
      return Math.round(selectedDestination.price_estimate * travelers * selectedPackage.multiplier);
    }

    return Math.round(selectedDestination.price_estimate * travelers * selectedPackage.multiplier);
  }, [bookingType, rooms, selectedDestination, selectedPackage.multiplier, travelers]);

  function changeBookingType(nextType) {
    const normalizedType = getBookingType(nextType);
    setBookingType(normalizedType);
    setPackageType(
      BOOKING_TYPES[normalizedType].options[1]?.label ||
        BOOKING_TYPES[normalizedType].options[0].label
    );
  }

  function submitBooking(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const booking = {
      id: `TS-${Date.now().toString().slice(-6)}`,
      bookingType,
      destinationId: selectedDestination.id,
      destinationName: selectedDestination.name,
      email: formData.get("email"),
      estimate,
      fromLocation: formData.get("fromLocation"),
      name: formData.get("name"),
      notes: formData.get("notes"),
      packageType,
      phone: formData.get("phone"),
      returnDate: formData.get("returnDate"),
      rooms,
      status: "Pending confirmation",
      submittedAt: new Date().toLocaleString("en-IN"),
      travelers,
      travelDate: formData.get("travelDate"),
    };

    onSubmit(booking);
    setStatus(`Booking request ${booking.id} created for ${booking.destinationName}.`);
    event.currentTarget.reset();
    setTravelers(Number(bookingState.travelers || 2));
    setRooms(Number(bookingState.rooms || 1));
    changeBookingType(bookingType);
  }

  return (
    <section className="page-section booking-page">
      <PageHeader
        eyebrow={activeBooking.eyebrow}
        title={activeBooking.title}
        copy={
          currentUser
            ? `Signed in as ${currentUser.name}. ${activeBooking.copy}`
            : activeBooking.copy
        }
      />

      <div className="booking-layout">
        <form className="booking-form" onSubmit={submitBooking}>
          <label className="message-field">
            <span>Destination</span>
            <select
              required
              value={selectedDestinationId}
              onChange={(event) => setSelectedDestinationId(event.target.value)}
            >
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {destination.name} - {destination.location}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Book</span>
            <select
              value={bookingType}
              onChange={(event) => changeBookingType(event.target.value)}
            >
              <option value="packages">Package</option>
              <option value="hotels">Hotel</option>
              <option value="flights">Flight</option>
            </select>
          </label>

          <label>
            <span>Name</span>
            <input
              required
              defaultValue={currentUser?.name || ""}
              name="name"
              type="text"
              placeholder="Customer name"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              required
              defaultValue={currentUser?.email || ""}
              name="email"
              type="email"
              placeholder="you@example.com"
            />
          </label>
          <label>
            <span>Phone</span>
            <input
              required
              defaultValue={currentUser?.phone || ""}
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
            />
          </label>
          <label>
            <span>Travel date</span>
            <input
              required
              defaultValue={bookingState.departDate || ""}
              name="travelDate"
              type="date"
            />
          </label>
          <label>
            <span>{bookingType === "flights" ? "Return date" : "Checkout date"}</span>
            <input defaultValue={bookingState.returnDate || ""} name="returnDate" type="date" />
          </label>
          <label>
            <span>{bookingType === "flights" ? "From airport/city" : "Pickup city"}</span>
            <input
              defaultValue={bookingState.fromLocation || ""}
              name="fromLocation"
              placeholder="Mumbai"
              type="text"
            />
          </label>
          <label>
            <span>Travelers</span>
            <input
              required
              min="1"
              name="travelers"
              type="number"
              value={travelers}
              onChange={(event) => setTravelers(Number(event.target.value))}
            />
          </label>
          {bookingType !== "flights" && (
            <label>
              <span>Rooms</span>
              <input
                required
                min="1"
                name="rooms"
                type="number"
                value={rooms}
                onChange={(event) => setRooms(Number(event.target.value))}
              />
            </label>
          )}
          <label>
            <span>{activeBooking.optionLabel}</span>
            <select
              value={packageType}
              onChange={(event) => setPackageType(event.target.value)}
            >
              {activeBooking.options.map((option) => (
                <option key={option.label}>{option.label}</option>
              ))}
            </select>
          </label>

          <label className="message-field">
            <span>Preferences</span>
            <textarea
              name="notes"
              placeholder="Seat preference, hotel type, pickup city, food preference, special requests..."
            />
          </label>

          <div className="booking-total">
            <span>Estimated total</span>
            <strong>{formatCurrency(estimate)}</strong>
          </div>

          <button className="primary-button" disabled={!selectedDestination} type="submit">
            Request Booking
          </button>
          {!currentUser && (
            <p className="form-hint">
              <Link to="/login">Login</Link> or <Link to="/signup">sign up</Link> to
              save customer details for future bookings.
            </p>
          )}
          {status && <p className="form-status">{status}</p>}
        </form>

        <aside className="booking-summary">
          {selectedDestination ? (
            <>
              <img src={selectedDestination.image_url} alt={selectedDestination.name} />
              <div>
                <p className="eyebrow">{selectedDestination.category}</p>
                <h2>{selectedDestination.name}</h2>
                <p>{selectedDestination.description}</p>
                <div className="facts">
                  <span>{bookingType.slice(0, -1)}</span>
                  <span>{selectedDestination.duration_days} days</span>
                  <span>{selectedDestination.budget}</span>
                  <span>{selectedDestination.rating.toFixed(1)} rated</span>
                </div>
              </div>
            </>
          ) : (
            <p className="empty-state">No destination selected.</p>
          )}
        </aside>
      </div>

      <section className="booking-history" aria-label="Booking requests">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your requests</p>
            <h2>Booking History</h2>
          </div>
          <Link className="text-button" to="/destinations">
            Add another trip
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-panel">
            <p className="empty-state">No booking requests yet.</p>
          </div>
        ) : (
          <div className="booking-list">
            {bookings.map((booking) => (
              <article className="booking-item" key={booking.id}>
                <div>
                  <span>{booking.id}</span>
                  <h3>{booking.destinationName}</h3>
                  <p>
                    {(booking.bookingType || "packages").slice(0, -1)} |{" "}
                    {booking.travelers} travelers | {booking.packageType} |{" "}
                    {booking.travelDate}
                  </p>
                </div>
                <strong>{formatCurrency(booking.estimate)}</strong>
                <em>{booking.status}</em>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default Booking;
