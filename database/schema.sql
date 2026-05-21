-- PostgreSQL schema for the Travel Seekers app.
-- Run this file with: psql -U postgres -d travel_tourism -f database/schema.sql

DROP TABLE IF EXISTS destination_media;
DROP TABLE IF EXISTS destination_highlights;
DROP TABLE IF EXISTS destinations;

CREATE TABLE destinations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(150) NOT NULL,
    region VARCHAR(80) NOT NULL,
    category VARCHAR(80) NOT NULL,
    budget VARCHAR(40) NOT NULL,
    rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
    duration_days INTEGER NOT NULL CHECK (duration_days > 0),
    price_estimate INTEGER NOT NULL CHECK (price_estimate >= 0),
    best_time VARCHAR(120) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE destination_highlights (
    id SERIAL PRIMARY KEY,
    destination_id INTEGER NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    highlight VARCHAR(120) NOT NULL
);

CREATE TABLE destination_media (
    id SERIAL PRIMARY KEY,
    destination_id INTEGER NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('image', 'clip')),
    title VARCHAR(140) NOT NULL,
    media_url TEXT NOT NULL,
    poster_url TEXT,
    credit VARCHAR(160) NOT NULL,
    source_url TEXT NOT NULL
);

-- Sample Indian destinations used by the app.
INSERT INTO destinations (
    name,
    location,
    region,
    category,
    budget,
    rating,
    duration_days,
    price_estimate,
    best_time,
    description,
    image_url
)
VALUES
    (
        'Goa',
        'Goa, India',
        'West India',
        'Beach',
        'Moderate',
        4.7,
        4,
        18000,
        'November to February',
        'Golden beaches, Portuguese heritage, seafood, and relaxed coastal nightlife.',
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80'
    ),
    (
        'Manali',
        'Himachal Pradesh, India',
        'North India',
        'Mountain',
        'Moderate',
        4.8,
        5,
        22000,
        'October to June',
        'Snowy peaks, pine forests, adventure sports, and peaceful Himalayan views.',
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80'
    ),
    (
        'Jaipur',
        'Rajasthan, India',
        'North India',
        'Heritage',
        'Affordable',
        4.6,
        3,
        14000,
        'October to March',
        'Royal palaces, colorful markets, historic forts, and classic Rajasthani culture.',
        'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=80'
    ),
    (
        'Kerala Backwaters',
        'Alleppey, Kerala, India',
        'South India',
        'Nature',
        'Premium',
        4.9,
        4,
        26000,
        'September to March',
        'Houseboats, palm-lined canals, calm lagoons, and slow village life by the water.',
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80'
    ),
    (
        'Varanasi',
        'Uttar Pradesh, India',
        'North India',
        'Spiritual',
        'Affordable',
        4.5,
        3,
        12000,
        'November to February',
        'Ancient ghats, sunrise boat rides, temple lanes, and evening Ganga aarti.',
        'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=900&q=80'
    ),
    (
        'Munnar',
        'Kerala, India',
        'South India',
        'Hill Station',
        'Moderate',
        4.7,
        4,
        17000,
        'September to May',
        'Tea gardens, misty hills, waterfalls, and quiet viewpoints across the Western Ghats.',
        'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=80'
    ),
    (
        'Udaipur',
        'Rajasthan, India',
        'West India',
        'Heritage',
        'Premium',
        4.8,
        3,
        24000,
        'October to March',
        'Lake palaces, rooftop dining, boat rides, and elegant old-city lanes.',
        'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=80'
    ),
    (
        'Rishikesh',
        'Uttarakhand, India',
        'North India',
        'Adventure',
        'Affordable',
        4.6,
        3,
        11000,
        'September to June',
        'River rafting, yoga stays, cafe trails, and Ganga views beneath forested hills.',
        'https://images.unsplash.com/photo-1584732200355-486c3e6e3fb0?auto=format&fit=crop&w=900&q=80'
    ),
    (
        'Andaman Islands',
        'Andaman and Nicobar Islands, India',
        'Island India',
        'Beach',
        'Premium',
        4.9,
        5,
        36000,
        'October to May',
        'Turquoise water, scuba diving, white-sand beaches, and quiet island stays.',
        'https://images.unsplash.com/photo-1586053226626-febc8817962f?auto=format&fit=crop&w=900&q=80'
    ),
    (
        'Leh Ladakh',
        'Ladakh, India',
        'North India',
        'Mountain',
        'Premium',
        4.9,
        6,
        38000,
        'May to September',
        'High-altitude roads, monasteries, clear lakes, and dramatic Himalayan landscapes.',
        'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=900&q=80'
    ),
    (
        'Agra',
        'Uttar Pradesh, India',
        'North India',
        'Heritage',
        'Affordable',
        4.6,
        2,
        9000,
        'October to March',
        'Taj Mahal sunrise views, Mughal forts, marble craft, and classic short-trip comfort.',
        'https://upload.wikimedia.org/wikipedia/commons/2/2b/Taj_Mahal_9853.jpg'
    ),
    (
        'Darjeeling',
        'West Bengal, India',
        'East India',
        'Hill Station',
        'Moderate',
        4.5,
        4,
        19000,
        'March to May and October to December',
        'Tea estates, toy train charm, cool viewpoints, and Kanchenjunga morning light.',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80'
    );

INSERT INTO destination_highlights (destination_id, highlight)
VALUES
    (1, 'Baga Beach'),
    (1, 'Fontainhas'),
    (1, 'Dudhsagar Falls'),
    (2, 'Solang Valley'),
    (2, 'Hadimba Temple'),
    (2, 'Rohtang Pass'),
    (3, 'Amber Fort'),
    (3, 'Hawa Mahal'),
    (3, 'City Palace'),
    (4, 'Houseboat stay'),
    (4, 'Vembanad Lake'),
    (4, 'Kumarakom'),
    (5, 'Dashashwamedh Ghat'),
    (5, 'Kashi Vishwanath'),
    (5, 'Sarnath'),
    (6, 'Tea Museum'),
    (6, 'Eravikulam National Park'),
    (6, 'Mattupetty Dam'),
    (7, 'Lake Pichola'),
    (7, 'City Palace'),
    (7, 'Sajjangarh Fort'),
    (8, 'River rafting'),
    (8, 'Laxman Jhula'),
    (8, 'Beatles Ashram'),
    (9, 'Radhanagar Beach'),
    (9, 'Scuba diving'),
    (9, 'Cellular Jail'),
    (10, 'Pangong Lake'),
    (10, 'Nubra Valley'),
    (10, 'Thiksey Monastery'),
    (11, 'Taj Mahal'),
    (11, 'Agra Fort'),
    (11, 'Mehtab Bagh'),
    (12, 'Tiger Hill'),
    (12, 'Batasia Loop'),
    (12, 'Tea estates');

INSERT INTO destination_media (
    destination_id,
    media_type,
    title,
    media_url,
    poster_url,
    credit,
    source_url
)
VALUES
    (1, 'clip', 'Aguada Beach motion view', 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Aguada_beach%2C_Goa.webm', 'https://upload.wikimedia.org/wikipedia/commons/4/48/Goa_beautiful_beach.JPG', 'Subhashish Panigrahi / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Aguada_beach,_Goa.webm'),
    (1, 'image', 'Goa beach escape', 'https://upload.wikimedia.org/wikipedia/commons/4/48/Goa_beautiful_beach.JPG', NULL, 'Hemant meena / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Goa_beautiful_beach.JPG'),
    (1, 'image', 'Goa sunset', 'https://upload.wikimedia.org/wikipedia/commons/2/28/Sunset_in_Goa_Beach.jpg', NULL, 'Bobby9030 / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Sunset_in_Goa_Beach.jpg'),
    (2, 'clip', 'Manali winter carnival culture', 'https://upload.wikimedia.org/wikipedia/commons/6/66/Folk_Dance_Natti.webm', 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80', 'Hippiefromhills / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Folk_Dance_Natti.webm'),
    (2, 'image', 'Snowy Himalayan valley', 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (2, 'image', 'Mountain road escape', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (3, 'clip', 'Jaipur street performance', 'https://upload.wikimedia.org/wikipedia/commons/7/71/Snake_charmer_in_Jaipur%2C_Rajasthan.webm', 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=80', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Snake_charmer_in_Jaipur,_Rajasthan.webm'),
    (3, 'image', 'Jaipur palace detail', 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (3, 'image', 'Rajasthan heritage facade', 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (4, 'clip', 'Alappuzha canal boat', 'https://upload.wikimedia.org/wikipedia/commons/1/16/A_boat_sailing_in_Alappuzha_canal%2C_Alappuzha%2C_Kerala.webm', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:A_boat_sailing_in_Alappuzha_canal,_Alappuzha,_Kerala.webm'),
    (4, 'image', 'Kerala houseboat', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (4, 'image', 'Backwater palms', 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (5, 'clip', 'Varanasi Ganga aarti', 'https://upload.wikimedia.org/wikipedia/commons/7/74/Maha_Aarti_in_Dasaswamedh_Ghat_%28Varanasi_india%29.ogv', 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=900&q=80', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Maha_Aarti_in_Dasaswamedh_Ghat_(Varanasi_india).ogv'),
    (5, 'image', 'Varanasi ghats', 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (5, 'image', 'Ganga morning light', 'https://upload.wikimedia.org/wikipedia/commons/2/25/Varanasi_-_sunrise_over_the_Ganges_%285317982296%29.jpg', NULL, 'Patrick Barry / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Varanasi_-_sunrise_over_the_Ganges_(5317982296).jpg'),
    (6, 'clip', 'Kerala and Munnar journey', 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Kerala_-_India%27s_Paradise_Found.webm', 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=80', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Kerala_-_India%27s_Paradise_Found.webm'),
    (6, 'image', 'Munnar tea gardens', 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (6, 'image', 'Western Ghats mist', 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (7, 'image', 'Udaipur palace view', 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (8, 'image', 'Rishikesh river valley', 'https://images.unsplash.com/photo-1584732200355-486c3e6e3fb0?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (9, 'image', 'Island beach water', 'https://images.unsplash.com/photo-1586053226626-febc8817962f?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (10, 'image', 'Ladakh mountain road', 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/'),
    (11, 'image', 'Taj Mahal heritage', 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Taj_Mahal_9853.jpg', NULL, 'Vengolis / Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:Taj_Mahal_9853.jpg'),
    (12, 'image', 'Darjeeling mountain view', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80', NULL, 'Unsplash', 'https://unsplash.com/');
