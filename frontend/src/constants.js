export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api";

export const DEFAULT_FILTERS = {
  q: "",
  category: "All",
  region: "All",
  budget: "All",
  min_rating: "0",
  sort: "rating",
};

// Replace these demo values with your verified business contact details.
export const CONTACT_INFO = {
  primaryEmail: "hello@travelseekers.com",
  supportEmail: "support@travelseekers.com",
  phone: "+91 98765 43210",
  phoneHref: "+919876543210",
  whatsappHref: "919876543210",
  address: "Travel Seekers Travel Desk, Connaught Place, New Delhi, India",
  businessHours: "Monday to Saturday, 10:00 AM - 7:00 PM IST",
  instagramUrl: "https://www.instagram.com/travelseekers",
  facebookUrl: "https://www.facebook.com/travelseekers",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Connaught+Place+New+Delhi",
};

export const MEDIA_ASSETS = {
  heroVideo: {
    title: "Goa beach shoreline",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Aguada_beach%2C_Goa.webm",
    poster: "https://upload.wikimedia.org/wikipedia/commons/4/48/Goa_beautiful_beach.JPG",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Aguada_beach,_Goa.webm",
    credit: "Subhashish Panigrahi / Wikimedia Commons",
  },
  featuredVideo: {
    title: "Taj Mahal cinematic motion",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Taj_Mahal.webm",
    poster: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Taj_Mahal_9853.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Taj_Mahal.webm",
    credit: "Jwslubbock / Wikimedia Commons",
  },
  gallery: [
    {
      id: 1,
      type: "video",
      title: "Aguada Beach, Goa",
      location: "Goa",
      src: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Aguada_beach%2C_Goa.webm",
      poster: "https://upload.wikimedia.org/wikipedia/commons/4/48/Goa_beautiful_beach.JPG",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Aguada_beach,_Goa.webm",
      credit: "Subhashish Panigrahi / Wikimedia Commons",
    },
    {
      id: 2,
      type: "video",
      title: "Taj Mahal View",
      location: "Agra",
      src: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Taj_Mahal.webm",
      poster: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Taj_Mahal_9853.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Taj_Mahal.webm",
      credit: "Jwslubbock / Wikimedia Commons",
    },
    {
      id: 3,
      type: "image",
      title: "Goa Beach Escape",
      location: "Goa",
      src: "https://upload.wikimedia.org/wikipedia/commons/4/48/Goa_beautiful_beach.JPG",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Goa_beautiful_beach.JPG",
      credit: "Hemant meena / Wikimedia Commons",
    },
    {
      id: 4,
      type: "image",
      title: "Sunset in Goa",
      location: "Goa",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/28/Sunset_in_Goa_Beach.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sunset_in_Goa_Beach.jpg",
      credit: "Bobby9030 / Wikimedia Commons",
    },
    {
      id: 5,
      type: "image",
      title: "Taj Mahal Heritage",
      location: "Agra",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Taj_Mahal_9853.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Taj_Mahal_9853.jpg",
      credit: "Vengolis / Wikimedia Commons",
    },
    {
      id: 6,
      type: "image",
      title: "Kerala Waters",
      location: "Kerala",
      src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      sourceUrl: "https://unsplash.com/",
      credit: "Unsplash",
    },
  ],
};
