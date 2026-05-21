import os

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def image_media(title, url, credit="Unsplash", source_url="https://unsplash.com/"):
    return [
        {
            "type": "image",
            "title": title,
            "url": url,
            "credit": credit,
            "source_url": source_url,
        }
    ]


DESTINATIONS = [
    {
        "id": 1,
        "name": "Goa",
        "location": "Goa, India",
        "coordinates": {"lat": 15.2993, "lng": 74.124},
        "region": "West India",
        "category": "Beach",
        "budget": "Moderate",
        "rating": 4.7,
        "duration_days": 4,
        "price_estimate": 18000,
        "best_time": "November to February",
        "description": "Golden beaches, Portuguese heritage, seafood, and relaxed coastal nightlife.",
        "highlights": ["Baga Beach", "Fontainhas", "Dudhsagar Falls"],
        "image_url": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
        "media": image_media(
            "Goa beach escape",
            "https://upload.wikimedia.org/wikipedia/commons/4/48/Goa_beautiful_beach.JPG",
            "Hemant meena / Wikimedia Commons",
            "https://commons.wikimedia.org/wiki/File:Goa_beautiful_beach.JPG",
        ),
    },
    {
        "id": 2,
        "name": "Manali",
        "location": "Himachal Pradesh, India",
        "coordinates": {"lat": 32.2396, "lng": 77.1887},
        "region": "North India",
        "category": "Mountain",
        "budget": "Moderate",
        "rating": 4.8,
        "duration_days": 5,
        "price_estimate": 22000,
        "best_time": "October to June",
        "description": "Snowy peaks, pine forests, adventure sports, and peaceful Himalayan views.",
        "highlights": ["Solang Valley", "Hadimba Temple", "Rohtang Pass"],
        "image_url": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
        "media": image_media(
            "Snowy Himalayan valley",
            "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
        ),
    },
    {
        "id": 3,
        "name": "Jaipur",
        "location": "Rajasthan, India",
        "coordinates": {"lat": 26.9124, "lng": 75.7873},
        "region": "North India",
        "category": "Heritage",
        "budget": "Affordable",
        "rating": 4.6,
        "duration_days": 3,
        "price_estimate": 14000,
        "best_time": "October to March",
        "description": "Royal palaces, colorful markets, historic forts, and classic Rajasthani culture.",
        "highlights": ["Amber Fort", "Hawa Mahal", "City Palace"],
        "image_url": "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=80",
        "media": image_media(
            "Rajasthan heritage facade",
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
        ),
    },
    {
        "id": 4,
        "name": "Kerala Backwaters",
        "location": "Alleppey, Kerala, India",
        "coordinates": {"lat": 9.4981, "lng": 76.3388},
        "region": "South India",
        "category": "Nature",
        "budget": "Premium",
        "rating": 4.9,
        "duration_days": 4,
        "price_estimate": 26000,
        "best_time": "September to March",
        "description": "Houseboats, palm-lined canals, calm lagoons, and slow village life by the water.",
        "highlights": ["Houseboat stay", "Vembanad Lake", "Kumarakom"],
        "image_url": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
        "media": image_media(
            "Kerala houseboat",
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
        ),
    },
    {
        "id": 5,
        "name": "Varanasi",
        "location": "Uttar Pradesh, India",
        "coordinates": {"lat": 25.3176, "lng": 82.9739},
        "region": "North India",
        "category": "Spiritual",
        "budget": "Affordable",
        "rating": 4.5,
        "duration_days": 3,
        "price_estimate": 12000,
        "best_time": "November to February",
        "description": "Ancient ghats, sunrise boat rides, temple lanes, and evening Ganga aarti.",
        "highlights": ["Dashashwamedh Ghat", "Kashi Vishwanath", "Sarnath"],
        "image_url": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=900&q=80",
        "media": image_media(
            "Ganga morning light",
            "https://upload.wikimedia.org/wikipedia/commons/2/25/Varanasi_-_sunrise_over_the_Ganges_%285317982296%29.jpg",
            "Patrick Barry / Wikimedia Commons",
            "https://commons.wikimedia.org/wiki/File:Varanasi_-_sunrise_over_the_Ganges_(5317982296).jpg",
        ),
    },
    {
        "id": 6,
        "name": "Munnar",
        "location": "Kerala, India",
        "coordinates": {"lat": 10.0889, "lng": 77.0595},
        "region": "South India",
        "category": "Hill Station",
        "budget": "Moderate",
        "rating": 4.7,
        "duration_days": 4,
        "price_estimate": 17000,
        "best_time": "September to May",
        "description": "Tea gardens, misty hills, waterfalls, and quiet viewpoints across the Western Ghats.",
        "highlights": ["Tea Museum", "Eravikulam National Park", "Mattupetty Dam"],
        "image_url": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=80",
        "media": image_media(
            "Munnar tea gardens",
            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
        ),
    },
    {
        "id": 7,
        "name": "Udaipur",
        "location": "Rajasthan, India",
        "coordinates": {"lat": 24.5854, "lng": 73.7125},
        "region": "West India",
        "category": "Heritage",
        "budget": "Premium",
        "rating": 4.8,
        "duration_days": 3,
        "price_estimate": 24000,
        "best_time": "October to March",
        "description": "Lake palaces, rooftop dining, boat rides, and elegant old-city lanes.",
        "highlights": ["Lake Pichola", "City Palace", "Sajjangarh Fort"],
        "image_url": "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=80",
        "media": image_media(
            "Udaipur palace view",
            "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1200&q=80",
        ),
    },
    {
        "id": 8,
        "name": "Rishikesh",
        "location": "Uttarakhand, India",
        "coordinates": {"lat": 30.0869, "lng": 78.2676},
        "region": "North India",
        "category": "Adventure",
        "budget": "Affordable",
        "rating": 4.6,
        "duration_days": 3,
        "price_estimate": 11000,
        "best_time": "September to June",
        "description": "River rafting, yoga stays, cafe trails, and Ganga views beneath forested hills.",
        "highlights": ["River rafting", "Laxman Jhula", "Beatles Ashram"],
        "image_url": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ganga%2C%20Rishikesh.jpg",
        "media": image_media(
            "Rishikesh river valley",
            "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ganga%2C%20Rishikesh.jpg",
            "Wikimedia Commons",
            "https://commons.wikimedia.org/wiki/File:Ganga,_Rishikesh.jpg",
        ),
    },
    {
        "id": 9,
        "name": "Andaman Islands",
        "location": "Andaman and Nicobar Islands, India",
        "coordinates": {"lat": 11.9761, "lng": 93.0047},
        "region": "Island India",
        "category": "Beach",
        "budget": "Premium",
        "rating": 4.9,
        "duration_days": 5,
        "price_estimate": 36000,
        "best_time": "October to May",
        "description": "Turquoise water, scuba diving, white-sand beaches, and quiet island stays.",
        "highlights": ["Radhanagar Beach", "Scuba diving", "Cellular Jail"],
        "image_url": "https://images.unsplash.com/photo-1586053226626-febc8817962f?auto=format&fit=crop&w=900&q=80",
        "media": image_media(
            "Island beach water",
            "https://images.unsplash.com/photo-1586053226626-febc8817962f?auto=format&fit=crop&w=1200&q=80",
        ),
    },
    {
        "id": 10,
        "name": "Leh Ladakh",
        "location": "Ladakh, India",
        "coordinates": {"lat": 34.1526, "lng": 77.5771},
        "region": "North India",
        "category": "Mountain",
        "budget": "Premium",
        "rating": 4.9,
        "duration_days": 6,
        "price_estimate": 38000,
        "best_time": "May to September",
        "description": "High-altitude roads, monasteries, clear lakes, and dramatic Himalayan landscapes.",
        "highlights": ["Pangong Lake", "Nubra Valley", "Thiksey Monastery"],
        "image_url": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=900&q=80",
        "media": image_media(
            "Ladakh mountain road",
            "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
        ),
    },
    {
        "id": 11,
        "name": "Agra",
        "location": "Uttar Pradesh, India",
        "coordinates": {"lat": 27.1767, "lng": 78.0081},
        "region": "North India",
        "category": "Heritage",
        "budget": "Affordable",
        "rating": 4.6,
        "duration_days": 2,
        "price_estimate": 9000,
        "best_time": "October to March",
        "description": "Taj Mahal sunrise views, Mughal forts, marble craft, and classic short-trip comfort.",
        "highlights": ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Taj_Mahal_9853.jpg",
        "media": image_media(
            "Taj Mahal heritage",
            "https://upload.wikimedia.org/wikipedia/commons/2/2b/Taj_Mahal_9853.jpg",
            "Vengolis / Wikimedia Commons",
            "https://commons.wikimedia.org/wiki/File:Taj_Mahal_9853.jpg",
        ),
    },
    {
        "id": 12,
        "name": "Darjeeling",
        "location": "West Bengal, India",
        "coordinates": {"lat": 27.041, "lng": 88.2663},
        "region": "East India",
        "category": "Hill Station",
        "budget": "Moderate",
        "rating": 4.5,
        "duration_days": 4,
        "price_estimate": 19000,
        "best_time": "March to May and October to December",
        "description": "Tea estates, toy train charm, cool viewpoints, and Kanchenjunga morning light.",
        "highlights": ["Tiger Hill", "Batasia Loop", "Tea estates"],
        "image_url": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
        "media": image_media(
            "Darjeeling mountain view",
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
        ),
    },
]


def get_unique_values(key):
    return sorted({destination[key] for destination in DESTINATIONS})


def destination_matches(destination, query, category, region, budget, min_rating):
    searchable_text = " ".join(
        [
            destination["name"],
            destination["location"],
            destination["region"],
            destination["category"],
            destination["budget"],
            destination["best_time"],
            destination["description"],
            *destination["highlights"],
        ]
    ).lower()

    if query and query.lower() not in searchable_text:
        return False
    if category != "All" and destination["category"] != category:
        return False
    if region != "All" and destination["region"] != region:
        return False
    if budget != "All" and destination["budget"] != budget:
        return False

    return destination["rating"] >= min_rating


def sort_destinations(destinations, sort_by):
    sorted_destinations = list(destinations)

    if sort_by == "price_low":
        return sorted(sorted_destinations, key=lambda destination: destination["price_estimate"])
    if sort_by == "price_high":
        return sorted(
            sorted_destinations,
            key=lambda destination: destination["price_estimate"],
            reverse=True,
        )
    if sort_by == "duration":
        return sorted(sorted_destinations, key=lambda destination: destination["duration_days"])
    if sort_by == "name":
        return sorted(sorted_destinations, key=lambda destination: destination["name"].lower())

    return sorted(sorted_destinations, key=lambda destination: destination["rating"], reverse=True)


@app.get("/")
def health_check():
    return jsonify({"message": "Travel Seekers API is running"})


@app.get("/api/destinations")
def get_destinations():
    query = request.args.get("q", "").strip()
    category = request.args.get("category", "All")
    region = request.args.get("region", "All")
    budget = request.args.get("budget", "All")
    sort_by = request.args.get("sort", "rating")

    try:
        min_rating = float(request.args.get("min_rating", 0))
    except ValueError:
        min_rating = 0

    filtered_destinations = [
        destination
        for destination in DESTINATIONS
        if destination_matches(destination, query, category, region, budget, min_rating)
    ]

    return jsonify(
        {
            "count": len(filtered_destinations),
            "destinations": sort_destinations(filtered_destinations, sort_by),
        }
    )


@app.get("/api/destinations/<int:destination_id>")
def get_destination(destination_id):
    destination = next(
        (item for item in DESTINATIONS if item["id"] == destination_id),
        None,
    )

    if destination is None:
        return jsonify({"message": "Destination not found"}), 404

    return jsonify(destination)


@app.get("/api/filters")
def get_filters():
    return jsonify(
        {
            "budgets": get_unique_values("budget"),
            "categories": get_unique_values("category"),
            "regions": get_unique_values("region"),
        }
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port, use_reloader=False)
