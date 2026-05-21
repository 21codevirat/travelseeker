import { CONTACT_INFO } from "../constants";

function ContactInfo({ compact = false }) {
  return (
    <div className={compact ? "contact-info compact-info" : "contact-info"}>
      <article>
        <span>Email</span>
        <a href={`mailto:${CONTACT_INFO.primaryEmail}`}>
          {CONTACT_INFO.primaryEmail}
        </a>
        <small>General travel planning and itinerary requests.</small>
      </article>

      <article>
        <span>Support</span>
        <a href={`mailto:${CONTACT_INFO.supportEmail}`}>
          {CONTACT_INFO.supportEmail}
        </a>
        <small>Existing enquiries, follow-ups, and customer help.</small>
      </article>

      <article>
        <span>Call</span>
        <a href={`tel:${CONTACT_INFO.phoneHref}`}>{CONTACT_INFO.phone}</a>
        <small>{CONTACT_INFO.businessHours}</small>
      </article>

      <article>
        <span>WhatsApp</span>
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsappHref}`}
          rel="noreferrer"
          target="_blank"
        >
          Message on WhatsApp
        </a>
        <small>Best for quick questions and trip preferences.</small>
      </article>

      {!compact && (
        <article className="wide-contact-card">
          <span>Office</span>
          <a href={CONTACT_INFO.mapsUrl} rel="noreferrer" target="_blank">
            {CONTACT_INFO.address}
          </a>
          <small>Open in Google Maps for directions.</small>
        </article>
      )}
    </div>
  );
}

export default ContactInfo;
