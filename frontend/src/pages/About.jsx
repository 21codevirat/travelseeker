import PageHeader from "../components/PageHeader";

function About() {
  return (
    <section className="page-section">
      <PageHeader
        eyebrow="About"
        title="A focused travel planner for Indian destinations."
        copy="Travel Seekers helps travelers compare destinations quickly and shape a practical route before booking."
      />

      <div className="content-grid">
        <article>
          <h2>Curated discovery</h2>
          <p>
            Destinations are organized by region, category, budget, best travel
            season, estimated duration, and highlights.
          </p>
        </article>
        <article>
          <h2>Planning-first design</h2>
          <p>
            The planner keeps selected stops in one place and shows estimated
            total days and budget as the route changes.
          </p>
        </article>
        <article>
          <h2>Built to expand</h2>
          <p>
            The Flask API and PostgreSQL schema are ready for real database
            integration, admin workflows, bookings, and user accounts.
          </p>
        </article>
      </div>
    </section>
  );
}

export default About;
