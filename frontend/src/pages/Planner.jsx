import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { formatCurrency } from "../utils/format";

const WEATHER_BY_CATEGORY = {
  Adventure: {
    condition: "Fast-changing mountain weather",
    advice: "Keep river and trail activities before lunch.",
    temp: 21,
    rain: 38,
  },
  Beach: {
    condition: "Warm coastal breeze",
    advice: "Use sunrise starts and keep afternoons flexible.",
    temp: 30,
    rain: 22,
  },
  Heritage: {
    condition: "Clear city touring window",
    advice: "Plan forts and monuments early to avoid harsh light.",
    temp: 29,
    rain: 14,
  },
  "Hill Station": {
    condition: "Cool mist and light showers",
    advice: "Carry a light jacket and leave buffer time for viewpoints.",
    temp: 18,
    rain: 34,
  },
  Mountain: {
    condition: "Crisp high-altitude day",
    advice: "Start drives early and avoid late-night transfers.",
    temp: 16,
    rain: 28,
  },
  Nature: {
    condition: "Humid green-season comfort",
    advice: "Keep boat rides in the calm morning window.",
    temp: 27,
    rain: 32,
  },
  Spiritual: {
    condition: "Pleasant morning rituals",
    advice: "Keep temple visits and ghats before the midday rush.",
    temp: 28,
    rain: 16,
  },
};

const DEFAULT_WEATHER = {
  condition: "Comfortable travel conditions",
  advice: "Keep one open slot each day for delays or local finds.",
  temp: 26,
  rain: 20,
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function addDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function formatTripDate(date) {
  if (!date) {
    return "Flexible";
  }

  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;
}

function getDistance(first, second) {
  if (!first?.coordinates || !second?.coordinates) {
    return Number.POSITIVE_INFINITY;
  }

  const latGap = first.coordinates.lat - second.coordinates.lat;
  const lngGap = first.coordinates.lng - second.coordinates.lng;
  return Math.sqrt(latGap * latGap + lngGap * lngGap);
}

function buildSmartRoute(stops) {
  if (stops.length < 3) {
    return stops;
  }

  const remaining = stops.slice(1);
  const route = [stops[0]];

  while (remaining.length) {
    const current = route[route.length - 1];
    const nextIndex = remaining.reduce((bestIndex, destination, index) => {
      return getDistance(current, destination) < getDistance(current, remaining[bestIndex])
        ? index
        : bestIndex;
    }, 0);

    route.push(remaining[nextIndex]);
    remaining.splice(nextIndex, 1);
  }

  return route;
}

function getWeatherForecast(destination, date, index) {
  const baseline = WEATHER_BY_CATEGORY[destination.category] || DEFAULT_WEATHER;
  const month = date?.getMonth() ?? new Date().getMonth();
  const monsoonBoost = month >= 5 && month <= 8 ? 18 : 0;
  const summerBoost = month >= 3 && month <= 5 ? 4 : 0;
  const hillCooling = ["Mountain", "Hill Station"].includes(destination.category) ? -5 : 0;
  const rain = Math.min(88, baseline.rain + monsoonBoost + ((index * 7) % 13));
  const temp = Math.round(baseline.temp + summerBoost + hillCooling + ((index % 3) - 1));

  return {
    ...baseline,
    rain,
    temp,
    alert:
      rain > 55
        ? "Weather-aware plan: keep indoor cafes, museums, or short transfers ready."
        : "Weather-aware plan: good window for outdoor sightseeing.",
  };
}

function getPricePrediction(destination, travelers, startDate, index) {
  const leadDays = startDate
    ? Math.max(0, Math.ceil((new Date(startDate) - new Date()) / 86400000))
    : 30;
  const demandFactor = destination.rating >= 4.8 ? 1.16 : 1.04;
  const leadFactor = leadDays < 14 ? 1.18 : leadDays > 60 ? 0.92 : 1;
  const indexFactor = 1 + index * 0.025;
  const base = destination.price_estimate * demandFactor * leadFactor * indexFactor;
  const flight = Math.round((base * 0.34 * travelers) / 100) * 100;
  const hotel = Math.round((base / Math.max(1, destination.duration_days) * 0.58) / 100) * 100;
  const confidence = leadDays < 7 ? "Medium" : "High";
  const trend = leadDays < 21 || demandFactor > 1.1 ? "Book now" : "Watch 3 days";
  const change = trend === "Book now" ? "+8-14%" : "-3-6%";

  return { change, confidence, flight, hotel, trend };
}

function getGoogleRouteUrl(origin, routeStops) {
  const destinationNames = routeStops.map((stop) => stop.location || stop.name);
  const routeOrigin = origin.trim() || "Mumbai, India";
  const destination = destinationNames[destinationNames.length - 1] || routeOrigin;
  const waypoints = destinationNames.slice(0, -1).join("|");
  const params = new URLSearchParams({
    api: "1",
    origin: routeOrigin,
    destination,
    travelmode: "driving",
  });

  if (waypoints) {
    params.set("waypoints", waypoints);
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function getGooglePreviewUrl(routeStops) {
  const firstStop = routeStops.find((stop) => stop.coordinates);

  if (!firstStop) {
    return "";
  }

  const { lat, lng } = firstStop.coordinates;
  return `https://www.google.com/maps?q=${lat},${lng}&z=6&output=embed`;
}

function buildItinerary(routeStops, startDate) {
  let dayOffset = 0;

  return routeStops.flatMap((destination, destinationIndex) => {
    return Array.from({ length: destination.duration_days }, (_, dayIndex) => {
      const date = startDate ? addDays(new Date(startDate), dayOffset) : null;
      const weather = getWeatherForecast(destination, date, destinationIndex + dayIndex);
      const title =
        dayIndex === 0
          ? `Arrive in ${destination.name}`
          : dayIndex === destination.duration_days - 1
            ? `${destination.name} slow finish`
            : `${destination.name} highlights`;
      const activity =
        destination.highlights?.[dayIndex % destination.highlights.length] ||
        destination.description;

      dayOffset += 1;

      return {
        activity,
        date,
        destination,
        title,
        weather,
      };
    });
  });
}

function getAssistantReply(routeStops, tripSummary, prompt, startDate) {
  if (!routeStops.length) {
    return "Add a few destinations and I will build a weather-aware route, day cards, Google Maps directions, and price timing signals.";
  }

  const routeNames = routeStops.map((stop) => stop.name).join(" -> ");
  const firstDate = startDate ? formatTripDate(new Date(startDate)) : "flexible dates";
  const focus = prompt.trim() || "balanced sightseeing, transfers, and comfort";
  const topWeather = getWeatherForecast(routeStops[0], startDate ? new Date(startDate) : null, 0);

  return `Building your plan for ${routeNames}. I would start on ${firstDate}, keep the route in this order to reduce backtracking, and tune the pace around ${focus}. Expected first-stop weather is ${topWeather.condition.toLowerCase()} around ${topWeather.temp}C, so the itinerary keeps outdoor sightseeing early and leaves flexible indoor backup slots. Estimated trip scope is ${tripSummary.days} days with a package baseline near ${formatCurrency(tripSummary.price)} before live booking changes.`;
}

function Planner({ destinations = [], plannedTrip, tripSummary, onToggleTrip }) {
  const [origin, setOrigin] = useState("Mumbai, India");
  const [startDate, setStartDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [assistantPrompt, setAssistantPrompt] = useState(
    "Plan a relaxed route with good weather windows and fair prices."
  );
  const [streamedReply, setStreamedReply] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("Voice ready");
  const streamTimerRef = useRef(null);

  const suggestedTrip = useMemo(() => {
    if (plannedTrip.length) {
      return plannedTrip;
    }

    return destinations.slice(0, 3);
  }, [destinations, plannedTrip]);

  const routeStops = useMemo(() => buildSmartRoute(suggestedTrip), [suggestedTrip]);
  const effectiveSummary = useMemo(() => {
    if (plannedTrip.length) {
      return tripSummary;
    }

    return routeStops.reduce(
      (summary, destination) => ({
        days: summary.days + destination.duration_days,
        price: summary.price + destination.price_estimate,
      }),
      { days: 0, price: 0 }
    );
  }, [plannedTrip.length, routeStops, tripSummary]);
  const itineraryDays = useMemo(() => buildItinerary(routeStops, startDate), [routeStops, startDate]);
  const googleRouteUrl = useMemo(() => getGoogleRouteUrl(origin, routeStops), [origin, routeStops]);
  const googlePreviewUrl = useMemo(() => getGooglePreviewUrl(routeStops), [routeStops]);

  useEffect(() => {
    return () => window.clearInterval(streamTimerRef.current);
  }, []);

  function streamAssistantReply(nextReply) {
    window.clearInterval(streamTimerRef.current);
    setStreamedReply("");
    setIsStreaming(true);

    let cursor = 0;
    streamTimerRef.current = window.setInterval(() => {
      cursor += 4;
      setStreamedReply(nextReply.slice(0, cursor));

      if (cursor >= nextReply.length) {
        window.clearInterval(streamTimerRef.current);
        setIsStreaming(false);
      }
    }, 28);
  }

  function generatePlan() {
    streamAssistantReply(
      getAssistantReply(routeStops, effectiveSummary, assistantPrompt, startDate)
    );
  }

  function startVoiceAssistant() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceStatus("Voice is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setVoiceStatus("Listening...");

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setAssistantPrompt(transcript);
      setVoiceStatus("Voice captured");
      streamAssistantReply(getAssistantReply(routeStops, effectiveSummary, transcript, startDate));
    };

    recognition.onerror = () => {
      setVoiceStatus("Could not capture voice. Try typing the request.");
    };

    recognition.onend = () => {
      setVoiceStatus((currentStatus) =>
        currentStatus === "Listening..." ? "Voice ready" : currentStatus
      );
    };

    recognition.start();
  }

  return (
    <section className="page-section planner-page ai-planner-page">
      <PageHeader
        eyebrow="AI travel command center"
        title="Weather-aware AI Trip Planner"
        copy="Generate smarter routes, day cards, Google Maps directions, voice prompts, price signals, and streaming AI-style responses from your selected stops."
      />

      <div className="ai-planner-layout">
        <aside className="planner-summary ai-planner-summary">
          <span>{plannedTrip.length ? "Selected trip" : "Suggested starter plan"}</span>
          <strong>{routeStops.length} stops</strong>
          <strong>{effectiveSummary.days} days</strong>
          <strong>{formatCurrency(effectiveSummary.price)}</strong>
          <Link className="primary-button compact" to="/booking">
            Book Trip
          </Link>
        </aside>

        <div className="ai-planner-main">
          <div className="ai-control-panel">
            <label>
              <span>Origin</span>
              <input
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
                placeholder="Mumbai, India"
              />
            </label>

            <label>
              <span>Start date</span>
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </label>

            <label>
              <span>Travelers</span>
              <input
                min="1"
                type="number"
                value={travelers}
                onChange={(event) => setTravelers(Number(event.target.value) || 1)}
              />
            </label>

            <label className="ai-prompt-field">
              <span>Ask the voice AI assistant</span>
              <textarea
                value={assistantPrompt}
                onChange={(event) => setAssistantPrompt(event.target.value)}
                placeholder="Example: keep rainy days light and avoid expensive flights"
              />
            </label>

            <div className="ai-control-actions">
              <button className="primary-button" type="button" onClick={generatePlan}>
                {isStreaming ? "Streaming..." : "Generate AI Plan"}
              </button>
              <button className="secondary-action" type="button" onClick={startVoiceAssistant}>
                Voice Assistant
              </button>
              <span>{voiceStatus}</span>
            </div>
          </div>

          <div className="streaming-panel">
            <div>
              <p className="eyebrow">Streaming response</p>
              <h2>AI planning brief</h2>
            </div>
            <p className="streaming-copy">
              {streamedReply || "Click Generate AI Plan or use the voice assistant to stream a trip brief here."}
              {isStreaming && <span className="typing-caret" />}
            </p>
          </div>

          {routeStops.length === 0 ? (
            <div className="empty-panel">
              <p className="empty-state">Add destinations to start a plan.</p>
              <Link className="primary-button" to="/destinations">
                Browse Destinations
              </Link>
            </div>
          ) : (
            <>
              <div className="route-map-panel">
                <div className="route-map-copy">
                  <p className="eyebrow">AI route on Google Maps</p>
                  <h2>{routeStops.map((stop) => stop.name).join(" -> ")}</h2>
                  <p>
                    Route order is optimized locally from your selected stops, then exported to
                    Google Maps for live directions and traffic.
                  </p>
                  <a
                    className="primary-button compact"
                    href={googleRouteUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Open Google Route
                  </a>
                </div>

                {googlePreviewUrl && (
                  <iframe
                    title="Google Maps route preview"
                    src={googlePreviewUrl}
                    loading="lazy"
                  />
                )}
              </div>

              <div className="ai-section-heading">
                <div>
                  <p className="eyebrow">Day-by-day cards</p>
                  <h2>Weather-aware itinerary</h2>
                </div>
              </div>

              <div className="itinerary-grid">
                {itineraryDays.map((day, index) => (
                  <article className="itinerary-card" key={`${day.destination.id}-${index}`}>
                    <div className="itinerary-card-top">
                      <span>Day {index + 1}</span>
                      <strong>{formatTripDate(day.date)}</strong>
                    </div>
                    <h3>{day.title}</h3>
                    <p>{day.activity}</p>
                    <div className="weather-strip">
                      <span>{day.weather.temp}C</span>
                      <span>{day.weather.rain}% rain risk</span>
                    </div>
                    <p className="weather-advice">{day.weather.alert}</p>
                  </article>
                ))}
              </div>

              <div className="ai-section-heading">
                <div>
                  <p className="eyebrow">Forecasted booking signals</p>
                  <h2>Hotel and flight price predictions</h2>
                </div>
              </div>

              <div className="prediction-grid">
                {routeStops.map((destination, index) => {
                  const prediction = getPricePrediction(destination, travelers, startDate, index);
                  const weather = getWeatherForecast(
                    destination,
                    startDate ? addDays(new Date(startDate), index) : null,
                    index
                  );

                  return (
                    <article className="prediction-card" key={destination.id}>
                      <div>
                        <p className="eyebrow">{destination.category}</p>
                        <h3>{destination.name}</h3>
                      </div>
                      <div className="prediction-values">
                        <span>
                          Flight
                          <strong>{formatCurrency(prediction.flight)}</strong>
                        </span>
                        <span>
                          Hotel/night
                          <strong>{formatCurrency(prediction.hotel)}</strong>
                        </span>
                      </div>
                      <div className="prediction-footer">
                        <strong>{prediction.trend}</strong>
                        <span>{prediction.change} expected movement</span>
                        <span>{prediction.confidence} confidence</span>
                      </div>
                      <p>{weather.condition}. {weather.advice}</p>
                    </article>
                  );
                })}
              </div>

              <div className="planner-list enhanced-planner-list">
                {routeStops.map((destination, index) => (
                  <article className="planner-item" key={destination.id}>
                    <span>{index + 1}</span>
                    <div>
                      <h3>{destination.name}</h3>
                      <p>
                        {destination.duration_days} days |{" "}
                        {formatCurrency(destination.price_estimate)}
                      </p>
                    </div>
                    {plannedTrip.some((item) => item.id === destination.id) ? (
                      <button
                        className="text-button"
                        type="button"
                        onClick={() => onToggleTrip(destination)}
                      >
                        Remove
                      </button>
                    ) : (
                      <Link className="text-button" to="/destinations">
                        Add more
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Planner;
