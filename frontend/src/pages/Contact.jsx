import ContactInfo from "../components/ContactInfo";
import PageHeader from "../components/PageHeader";
import { CONTACT_INFO } from "../constants";

function Contact({ contactStatus, onSubmit }) {
  return (
    <section className="page-section">
      <PageHeader
        eyebrow="Travel desk"
        title="Contact Travel Seekers"
        copy="Reach us by email, phone, WhatsApp, or the enquiry form below."
      />

      <ContactInfo />

      <div className="contact-layout">
        <form className="contact-form" onSubmit={onSubmit}>
          <label>
            <span>Name</span>
            <input required type="text" placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input required type="email" placeholder="you@example.com" />
          </label>
          <label>
            <span>Travel month</span>
            <input required type="month" />
          </label>
          <label className="message-field">
            <span>Preferences</span>
            <textarea
              required
              rows="4"
              placeholder="Beaches, mountains, culture, budget..."
            />
          </label>
          <button className="primary-button" type="submit">
            Send Request
          </button>
          {contactStatus && <p className="form-status">{contactStatus}</p>}
        </form>

        <aside className="contact-aside">
          <p className="eyebrow">Fastest response</p>
          <h2>Planning a trip soon?</h2>
          <p>
            Email{" "}
            <a href={`mailto:${CONTACT_INFO.primaryEmail}`}>
              {CONTACT_INFO.primaryEmail}
            </a>{" "}
            or call <a href={`tel:${CONTACT_INFO.phoneHref}`}>{CONTACT_INFO.phone}</a>
            . For quick clarifications, WhatsApp is usually fastest.
          </p>
          <div className="social-links">
            <a href={CONTACT_INFO.instagramUrl} rel="noreferrer" target="_blank">
              Instagram
            </a>
            <a href={CONTACT_INFO.facebookUrl} rel="noreferrer" target="_blank">
              Facebook
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Contact;
