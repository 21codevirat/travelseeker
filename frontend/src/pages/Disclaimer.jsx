import PageHeader from "../components/PageHeader";

function Disclaimer() {
  return (
    <section className="page-section">
      <PageHeader
        eyebrow="Disclaimer"
        title="Travel information should be verified before booking."
        copy="Travel Seekers is a planning aid. It does not replace official travel, safety, health, or booking guidance."
      />

      <div className="policy-panel">
        <h2>Estimates</h2>
        <p>
          Prices, durations, ratings, and seasonal recommendations are sample
          planning estimates and may change based on dates, availability,
          weather, local rules, and personal preferences.
        </p>

        <h2>Bookings and safety</h2>
        <p>
          Confirm hotel, transport, attraction, permit, and safety details with
          official providers before making payments or starting a trip.
        </p>

        <h2>Content and images</h2>
        <p>
          Destination descriptions and image URLs are used for demo purposes in
          this project. Replace them with licensed assets and verified content
          before production use.
        </p>
      </div>
    </section>
  );
}

export default Disclaimer;
