const COMMONS_FILE_BASE = "https://commons.wikimedia.org/wiki/Special:Redirect/file/";
const COMMONS_PAGE_BASE = "https://commons.wikimedia.org/wiki/File:";
const UNSPLASH_SOURCE_URL = "https://unsplash.com/";

function commonsFile(fileName) {
  return `${COMMONS_FILE_BASE}${encodeURIComponent(fileName)}`;
}

function commonsPage(fileName) {
  return `${COMMONS_PAGE_BASE}${encodeURIComponent(fileName).replaceAll("%20", "_")}`;
}

function commonsClip(title, fileName, poster, credit) {
  return {
    type: "clip",
    title,
    url: commonsFile(fileName),
    poster,
    credit,
    source_url: commonsPage(fileName),
  };
}

function commonsImage(title, fileName, credit) {
  return {
    type: "image",
    title,
    url: commonsFile(fileName),
    credit,
    source_url: commonsPage(fileName),
  };
}

function unsplashImage(title, url) {
  return {
    type: "image",
    title,
    url,
    credit: "Unsplash",
    source_url: UNSPLASH_SOURCE_URL,
  };
}

export const SAMPLE_DESTINATIONS = [
  {
    id: 1,
    name: "Goa",
    location: "Goa, India",
    coordinates: { lat: 15.2993, lng: 74.124 },
    region: "West India",
    category: "Beach",
    budget: "Moderate",
    rating: 4.7,
    duration_days: 4,
    price_estimate: 18000,
    best_time: "November to February",
    description: "Golden beaches, Portuguese heritage, seafood, and relaxed coastal nightlife.",
    highlights: ["Baga Beach", "Fontainhas", "Dudhsagar Falls"],
    image_url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    media: [
      commonsClip(
        "Aguada Beach shoreline motion",
        "Aguada beach, Goa.webm",
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Goa_beautiful_beach.JPG",
        "Subhashish Panigrahi / Wikimedia Commons"
      ),
      commonsImage(
        "Goa beach escape",
        "Goa beautiful beach.JPG",
        "Hemant meena / Wikimedia Commons"
      ),
      commonsImage("Goa sunset coast", "Sunset in Goa Beach.jpg", "Bobby9030 / Wikimedia Commons"),
    ],
  },
  {
    id: 2,
    name: "Manali",
    location: "Himachal Pradesh, India",
    coordinates: { lat: 32.2396, lng: 77.1887 },
    region: "North India",
    category: "Mountain",
    budget: "Moderate",
    rating: 4.8,
    duration_days: 5,
    price_estimate: 22000,
    best_time: "October to June",
    description: "Snowy peaks, pine forests, adventure sports, and peaceful Himalayan views.",
    highlights: ["Solang Valley", "Hadimba Temple", "Rohtang Pass"],
    image_url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
    media: [
      commonsClip(
        "Himachal cultural welcome",
        "Folk Dance Natti.webm",
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
        "Hippiefromhills / Wikimedia Commons"
      ),
      unsplashImage(
        "Snowy Himalayan valley",
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80"
      ),
      unsplashImage(
        "Mountain road escape",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
      ),
    ],
  },
  {
    id: 3,
    name: "Jaipur",
    location: "Rajasthan, India",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    region: "North India",
    category: "Heritage",
    budget: "Affordable",
    rating: 4.6,
    duration_days: 3,
    price_estimate: 14000,
    best_time: "October to March",
    description: "Royal palaces, colorful markets, historic forts, and classic Rajasthani culture.",
    highlights: ["Amber Fort", "Hawa Mahal", "City Palace"],
    image_url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=80",
    media: [
      commonsClip(
        "Jaipur street performance",
        "Snake charmer in Jaipur, Rajasthan.webm",
        "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=80",
        "Wikimedia Commons"
      ),
      unsplashImage(
        "Jaipur palace detail",
        "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80"
      ),
      unsplashImage(
        "Rajasthan heritage facade",
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80"
      ),
    ],
  },
  {
    id: 4,
    name: "Kerala Backwaters",
    location: "Alleppey, Kerala, India",
    coordinates: { lat: 9.4981, lng: 76.3388 },
    region: "South India",
    category: "Nature",
    budget: "Premium",
    rating: 4.9,
    duration_days: 4,
    price_estimate: 26000,
    best_time: "September to March",
    description: "Houseboats, palm-lined canals, calm lagoons, and slow village life by the water.",
    highlights: ["Houseboat stay", "Vembanad Lake", "Kumarakom"],
    image_url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    media: [
      commonsClip(
        "Alappuzha canal boat glide",
        "A boat sailing in Alappuzha canal, Alappuzha, Kerala.webm",
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
        "Wikimedia Commons"
      ),
      unsplashImage(
        "Kerala houseboat",
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80"
      ),
      unsplashImage(
        "Backwater palms",
        "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=80"
      ),
    ],
  },
  {
    id: 5,
    name: "Varanasi",
    location: "Uttar Pradesh, India",
    coordinates: { lat: 25.3176, lng: 82.9739 },
    region: "North India",
    category: "Spiritual",
    budget: "Affordable",
    rating: 4.5,
    duration_days: 3,
    price_estimate: 12000,
    best_time: "November to February",
    description: "Ancient ghats, sunrise boat rides, temple lanes, and evening Ganga aarti.",
    highlights: ["Dashashwamedh Ghat", "Kashi Vishwanath", "Sarnath"],
    image_url: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=900&q=80",
    media: [
      commonsClip(
        "Varanasi Ganga aarti",
        "Maha Aarti in Dasaswamedh Ghat (Varanasi india).ogv",
        "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=900&q=80",
        "Wikimedia Commons"
      ),
      unsplashImage(
        "Varanasi ghats",
        "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80"
      ),
      commonsImage(
        "Ganga morning light",
        "Varanasi - sunrise over the Ganges (5317982296).jpg",
        "Patrick Barry / Wikimedia Commons"
      ),
    ],
  },
  {
    id: 6,
    name: "Munnar",
    location: "Kerala, India",
    coordinates: { lat: 10.0889, lng: 77.0595 },
    region: "South India",
    category: "Hill Station",
    budget: "Moderate",
    rating: 4.7,
    duration_days: 4,
    price_estimate: 17000,
    best_time: "September to May",
    description: "Tea gardens, misty hills, waterfalls, and quiet viewpoints across the Western Ghats.",
    highlights: ["Tea Museum", "Eravikulam National Park", "Mattupetty Dam"],
    image_url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=80",
    media: [
      commonsClip(
        "Kerala hill country journey",
        "Kerala - India's Paradise Found.webm",
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=80",
        "Wikimedia Commons"
      ),
      unsplashImage(
        "Munnar tea gardens",
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80"
      ),
      unsplashImage(
        "Western Ghats mist",
        "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=80"
      ),
    ],
  },
  {
    id: 7,
    name: "Udaipur",
    location: "Rajasthan, India",
    coordinates: { lat: 24.5854, lng: 73.7125 },
    region: "West India",
    category: "Heritage",
    budget: "Premium",
    rating: 4.8,
    duration_days: 3,
    price_estimate: 24000,
    best_time: "October to March",
    description: "Lake palaces, rooftop dining, boat rides, and elegant old-city lanes.",
    highlights: ["Lake Pichola", "City Palace", "Sajjangarh Fort"],
    image_url: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=80",
    media: [
      unsplashImage(
        "Udaipur palace view",
        "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1200&q=80"
      ),
      commonsImage("Lake Pichola gold water", "Lake Pichola Udaipur.jpg", "Wikimedia Commons"),
      commonsImage("Udaipur lake panorama", "Udaipur, India, Lake Pichola.jpg", "Wikimedia Commons"),
    ],
  },
  {
    id: 8,
    name: "Rishikesh",
    location: "Uttarakhand, India",
    coordinates: { lat: 30.0869, lng: 78.2676 },
    region: "North India",
    category: "Adventure",
    budget: "Affordable",
    rating: 4.6,
    duration_days: 3,
    price_estimate: 11000,
    best_time: "September to June",
    description: "River rafting, yoga stays, cafe trails, and Ganga views beneath forested hills.",
    highlights: ["River rafting", "Laxman Jhula", "Beatles Ashram"],
    image_url: commonsFile("Ganga, Rishikesh.jpg"),
    media: [
      commonsClip(
        "Evening Ganga at Rishikesh",
        "Ganga at Rishikesh.webm",
        commonsFile("Ganga, Rishikesh.jpg"),
        "Kanishkapant98 / Wikimedia Commons"
      ),
      commonsClip(
        "Ganga Aarti at Triveni Ghat",
        "Ganga Aarti at Rishikesh.webm",
        commonsFile("Aarti at Triveni Ghat Rishikesh.jpg"),
        "Wikimedia Commons"
      ),
      commonsClip(
        "Beatles Ashram meditation domes",
        "Garitas de meditación del ashram de The Beatles (Rishikesh, India).webm",
        commonsFile("The Ganga at Rishikesh.jpg"),
        "José Luis Filpo Cabana / Wikimedia Commons"
      ),
      commonsImage(
        "Rishikesh river valley",
        "Ganga, Rishikesh.jpg",
        "Wikimedia Commons"
      ),
      commonsImage(
        "Ganga bridge and foothills",
        "The Ganga at Rishikesh.jpg",
        "Kanishka Sharma / Wikimedia Commons"
      ),
      commonsImage(
        "Yoga capital evening light",
        "Triveni Ghat, Rishikesh.jpg",
        "Puranastudy / Wikimedia Commons"
      ),
    ],
  },
  {
    id: 9,
    name: "Andaman Islands",
    location: "Andaman and Nicobar Islands, India",
    coordinates: { lat: 11.9761, lng: 93.0047 },
    region: "Island India",
    category: "Beach",
    budget: "Premium",
    rating: 4.9,
    duration_days: 5,
    price_estimate: 36000,
    best_time: "October to May",
    description: "Turquoise water, scuba diving, white-sand beaches, and quiet island stays.",
    highlights: ["Radhanagar Beach", "Scuba diving", "Cellular Jail"],
    image_url: "https://images.unsplash.com/photo-1586053226626-febc8817962f?auto=format&fit=crop&w=900&q=80",
    media: [
      commonsClip(
        "Havelock mangrove ride",
        "Ride along Mangrove Forest, Havelock Island 2 vrvbaan042k24.webm",
        "https://images.unsplash.com/photo-1586053226626-febc8817962f?auto=format&fit=crop&w=900&q=80",
        "Vinayaraj / Wikimedia Commons"
      ),
      unsplashImage(
        "Island beach water",
        "https://images.unsplash.com/photo-1586053226626-febc8817962f?auto=format&fit=crop&w=1200&q=80"
      ),
      commonsImage("Havelock Island beach", "Havelock Island.jpg", "Yoginipatil / Wikimedia Commons"),
    ],
  },
  {
    id: 10,
    name: "Leh Ladakh",
    location: "Ladakh, India",
    coordinates: { lat: 34.1526, lng: 77.5771 },
    region: "North India",
    category: "Mountain",
    budget: "Premium",
    rating: 4.9,
    duration_days: 6,
    price_estimate: 38000,
    best_time: "May to September",
    description: "High-altitude roads, monasteries, clear lakes, and dramatic Himalayan landscapes.",
    highlights: ["Pangong Lake", "Nubra Valley", "Thiksey Monastery"],
    image_url: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=900&q=80",
    media: [
      commonsClip(
        "Pangong Lake cinematic sweep",
        "PANGONG LAKE , LEH LADAKH.webm",
        "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=900&q=80",
        "Tseringangchuk502 / Wikimedia Commons"
      ),
      unsplashImage(
        "Ladakh mountain road",
        "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80"
      ),
      unsplashImage(
        "Pangong Lake blue hour",
        "https://images.unsplash.com/photo-1536295243470-d7cba4efab7b?auto=format&fit=crop&w=1200&q=80"
      ),
    ],
  },
  {
    id: 11,
    name: "Agra",
    location: "Uttar Pradesh, India",
    coordinates: { lat: 27.1767, lng: 78.0081 },
    region: "North India",
    category: "Heritage",
    budget: "Affordable",
    rating: 4.6,
    duration_days: 2,
    price_estimate: 9000,
    best_time: "October to March",
    description: "Taj Mahal sunrise views, Mughal forts, marble craft, and classic short-trip comfort.",
    highlights: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
    image_url: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Taj_Mahal_9853.jpg",
    media: [
      commonsClip(
        "Taj Mahal cinematic parallax",
        "Taj Mahal.webm",
        "https://upload.wikimedia.org/wikipedia/commons/2/2b/Taj_Mahal_9853.jpg",
        "Jwslubbock / Wikimedia Commons"
      ),
      commonsImage("Taj Mahal heritage", "Taj Mahal 9853.jpg", "Vengolis / Wikimedia Commons"),
      commonsImage("Taj Mahal garden axis", "Taj Mahal with Central Water Tank - South Facade - Agra 2014-05-14 3775.JPG", "Wikimedia Commons"),
    ],
  },
  {
    id: 12,
    name: "Darjeeling",
    location: "West Bengal, India",
    coordinates: { lat: 27.041, lng: 88.2663 },
    region: "East India",
    category: "Hill Station",
    budget: "Moderate",
    rating: 4.5,
    duration_days: 4,
    price_estimate: 19000,
    best_time: "March to May and October to December",
    description: "Tea estates, toy train charm, cool viewpoints, and Kanchenjunga morning light.",
    highlights: ["Tiger Hill", "Batasia Loop", "Tea estates"],
    image_url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    media: [
      commonsClip(
        "Darjeeling toy train in motion",
        "Darjeeling toy train.webm",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
        "Gannu03 / Wikimedia Commons"
      ),
      unsplashImage(
        "Darjeeling mountain view",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
      ),
      commonsImage("Darjeeling toy train", "DARJEELING TOY TRAIN.jpg", "LesBleusSoumya / Wikimedia Commons"),
    ],
  },
];
