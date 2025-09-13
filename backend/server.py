from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import base64
#from emergentintegrations.llm.chat import LlmChat, UserMessage
#from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Helper functions for datetime serialization
def prepare_for_mongo(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, datetime):
                data[key] = value.isoformat()
    return data

def parse_from_mongo(item):
    if isinstance(item, dict):
        for key, value in item.items():
            if isinstance(value, str) and 'T' in value:
                try:
                    item[key] = datetime.fromisoformat(value.replace('Z', '+00:00'))
                except:
                    pass
    return item

# Define Models
class Destination(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    location: str
    category: str  # eco, cultural, adventure, festivals
    images: List[str] = []
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    best_time_to_visit: str
    entry_fee: Optional[str] = None
    nearby_attractions: List[str] = []
    eco_tips: List[str] = []
    cultural_significance: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class DestinationCreate(BaseModel):
    name: str
    description: str
    location: str
    category: str
    images: List[str] = []
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    best_time_to_visit: str
    entry_fee: Optional[str] = None
    nearby_attractions: List[str] = []
    eco_tips: List[str] = []
    cultural_significance: Optional[str] = None

class Itinerary(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_name: str
    days: int
    interests: List[str]
    budget: str
    destinations: List[str]
    activities: List[str]
    accommodation_suggestions: List[str]
    transport_suggestions: List[str]
    total_cost_estimate: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ItineraryRequest(BaseModel):
    user_name: str
    days: int
    interests: List[str]
    budget: str
    special_requirements: Optional[str] = None

class LocalGuide(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    specialization: str
    location: str
    contact: str
    rating: float = 0.0
    reviews_count: int = 0
    languages: List[str] = []
    description: str
    price_per_day: str
    availability: List[str] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LocalGuideCreate(BaseModel):
    name: str
    specialization: str
    location: str
    contact: str
    languages: List[str] = []
    description: str
    price_per_day: str
    availability: List[str] = []

class Event(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    location: str
    date: str
    category: str  # festival, fair, cultural
    images: List[str] = []
    registration_required: bool = False
    registration_link: Optional[str] = None
    cultural_significance: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class EventCreate(BaseModel):
    name: str
    description: str
    location: str
    date: str
    category: str
    images: List[str] = []
    registration_required: bool = False
    registration_link: Optional[str] = None
    cultural_significance: Optional[str] = None

class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    user_message: str
    bot_response: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatRequest(BaseModel):
    session_id: str
    message: str

class SearchQuery(BaseModel):
    query: str
    category: Optional[str] = None

# Initialize LLM Chat
def get_llm_chat(session_id: str):
    api_key = os.environ.get('EMERGENT_LLM_KEY')
    if not api_key:
        raise HTTPException(status_code=500, detail="LLM API key not configured")
    
    return LlmChat(
        api_key=api_key,
        session_id=session_id,
        system_message="""You are Jharkhand Tourism Assistant, an expert guide for eco-tourism and cultural tourism in Jharkhand, India. 
        
        You have deep knowledge about:
        - Natural attractions: waterfalls (Hundru, Dassam, Jonha), forests, wildlife sanctuaries
        - Cultural heritage: tribal traditions, festivals (Karma, Sarhul), handicrafts, folk art
        - Adventure activities: trekking, rock climbing, wildlife photography
        - Local communities: tribal villages, artisan workshops, homestays
        - Sustainable tourism practices and eco-friendly travel tips
        
        Always provide helpful, accurate information about Jharkhand tourism. Suggest specific places, activities, and experiences. 
        Be enthusiastic about promoting responsible and sustainable tourism that benefits local communities."""
    ).with_model("anthropic", "claude-3-7-sonnet-20250219")

# Seed data
SAMPLE_DESTINATIONS = [
    {
        "name": "Hundru Falls",
        "description": "One of the most spectacular waterfalls in Jharkhand, cascading from a height of 98 meters",
        "location": "Ranchi",
        "category": "eco",
        "images": ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4"],
        "latitude": 23.4186,
        "longitude": 85.6081,
        "best_time_to_visit": "October to March",
        "entry_fee": "₹20 per person",
        "nearby_attractions": ["Jonha Falls", "Rock Garden"],
        "eco_tips": ["Carry reusable water bottles", "Don't litter", "Respect local wildlife"],
        "cultural_significance": "Sacred to local tribal communities"
    },
    {
        "name": "Betla National Park",
        "description": "Rich wildlife sanctuary famous for tigers, elephants, and diverse flora",
        "location": "Palamu",
        "category": "eco",
        "images": ["https://images.unsplash.com/photo-1549366021-9f761d040942"],
        "latitude": 23.9167,
        "longitude": 84.1833,
        "best_time_to_visit": "November to April",
        "entry_fee": "₹100 per person",
        "nearby_attractions": ["Palamu Fort", "Kechki"],
        "eco_tips": ["Maintain silence during safari", "Follow park guidelines", "Use eco-friendly transport"],
        "cultural_significance": "Traditional hunting grounds of local tribes"
    },
    {
        "name": "Tribal Museum Ranchi",
        "description": "Comprehensive collection showcasing rich tribal heritage and culture of Jharkhand",
        "location": "Ranchi",
        "category": "cultural",
        "images": ["https://images.unsplash.com/photo-1578662996442-48f60103fc96"],
        "latitude": 23.3441,
        "longitude": 85.3096,
        "best_time_to_visit": "Year round",
        "entry_fee": "₹30 per person",
        "nearby_attractions": ["Tagore Hill", "Kanke Dam"],
        "eco_tips": ["Support local artisans", "Respect cultural artifacts", "Learn about sustainable practices"],
        "cultural_significance": "Preserves 5000 years of tribal history and traditions"
    }
]

SAMPLE_EVENTS = [
    {
        "name": "Karma Festival",
        "description": "Major tribal festival celebrating nature, fertility, and harvest with traditional dance and music",
        "location": "Various tribal villages",
        "date": "2025-08-15",
        "category": "festival",
        "images": ["/images/cultural_heritage_1.png", "/images/cultural_heritage_4.png"],
        "registration_required": False,
        "cultural_significance": "One of the most important festivals for tribal communities in Jharkhand"
    },
    {
        "name": "Sarhul Festival",
        "description": "Spring festival celebrating the blossoming of sal trees with traditional rituals",
        "location": "Tribal areas across Jharkhand",
        "date": "2025-03-21",
        "category": "festival",
        "images": ["/images/cultural_heritage_6.png"],
        "registration_required": False,
        "cultural_significance": "Sacred festival marking the beginning of new year for tribal communities"
    },
    {
        "name": "Traditional Handicrafts Fair",
        "description": "Annual fair showcasing authentic Jharkhand handicrafts including pottery, tribal art, and bamboo crafts",
        "location": "Ranchi Cultural Center",
        "date": "2025-10-15",
        "category": "fair",
        "images": ["/images/cultural_heritage_2.png", "/images/cultural_heritage_5.png"],
        "registration_required": True,
        "registration_link": "https://jharkhandtourism.com/handicrafts-fair",
        "cultural_significance": "Promotes local artisan communities and preserves traditional craft techniques"
    },
    {
        "name": "Sohrai Art Festival",
        "description": "Celebration of traditional Sohrai and Khovar tribal wall paintings with live demonstrations",
        "location": "Hazaribagh villages",
        "date": "2025-11-20",
        "category": "cultural",
        "images": ["/images/cultural_heritage_3.png"],
        "registration_required": False,
        "cultural_significance": "Ancient art form practiced by tribal women, recognized by UNESCO"
    }
]

SAMPLE_GUIDES = [
    {
        "name": "Ramesh Munda",
        "specialization": "Tribal Culture & Heritage",
        "location": "Ranchi",
        "contact": "+91-9876543210",
        "rating": 4.8,
        "reviews_count": 45,
        "languages": ["Hindi", "English", "Mundari"],
        "description": "Expert guide with 15 years experience in tribal culture and traditional crafts",
        "price_per_day": "₹2000-3000",
        "availability": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    {
        "name": "Sunita Oraon",
        "specialization": "Eco-Tourism & Wildlife",
        "location": "Palamu",
        "contact": "+91-9876543211",
        "rating": 4.9,
        "reviews_count": 62,
        "languages": ["Hindi", "English", "Oraon"],
        "description": "Wildlife expert and eco-tourism specialist with deep forest knowledge",
        "price_per_day": "₹2500-3500",
        "availability": ["Mon", "Wed", "Fri", "Sat", "Sun"]
    }
]

# Routes
@api_router.get("/")
async def root():
    return {"message": "Jharkhand Eco-Tourism API", "version": "1.0.0"}

# Destinations Routes
@api_router.post("/destinations", response_model=Destination)
async def create_destination(destination: DestinationCreate):
    dest_dict = prepare_for_mongo(destination.dict())
    dest_obj = Destination(**dest_dict)
    await db.destinations.insert_one(prepare_for_mongo(dest_obj.dict()))
    return dest_obj

@api_router.get("/destinations", response_model=List[Destination])
async def get_destinations(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    
    destinations = await db.destinations.find(query).to_list(1000)
    return [Destination(**parse_from_mongo(dest)) for dest in destinations]

@api_router.get("/destinations/{destination_id}", response_model=Destination)
async def get_destination(destination_id: str):
    destination = await db.destinations.find_one({"id": destination_id})
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")
    return Destination(**parse_from_mongo(destination))

# Itinerary Routes
@api_router.post("/itinerary/generate", response_model=Itinerary)
async def generate_itinerary(request: ItineraryRequest):
    try:
        chat = get_llm_chat(f"itinerary_{request.user_name}")
        
        prompt = f"""Generate a detailed {request.days}-day itinerary for Jharkhand tourism.
        
        User Details:
        - Name: {request.user_name}
        - Days: {request.days}
        - Interests: {', '.join(request.interests)}
        - Budget: {request.budget}
        - Special Requirements: {request.special_requirements or 'None'}
        
        Please provide:
        1. List of destinations to visit (specific names)
        2. Daily activities
        3. Accommodation suggestions
        4. Transportation recommendations
        5. Cost estimates
        
        Focus on eco-tourism and cultural experiences. Include tribal villages, waterfalls, wildlife sanctuaries, and cultural sites.
        Format the response as a practical, day-wise itinerary."""
        
        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        # Parse AI response to create structured itinerary
        itinerary = Itinerary(
            user_name=request.user_name,
            days=request.days,
            interests=request.interests,
            budget=request.budget,
            destinations=["Hundru Falls", "Betla National Park", "Tribal Museum"],  # Would parse from AI response
            activities=["Waterfall trekking", "Wildlife safari", "Cultural tour"],
            accommodation_suggestions=["Eco-lodge", "Tribal homestay", "Budget hotel"],
            transport_suggestions=["Local taxi", "Government bus", "Private vehicle"],
            total_cost_estimate=request.budget
        )
        
        await db.itineraries.insert_one(prepare_for_mongo(itinerary.dict()))
        return itinerary
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate itinerary: {str(e)}")

@api_router.get("/itineraries", response_model=List[Itinerary])
async def get_itineraries():
    itineraries = await db.itineraries.find().to_list(1000)
    return [Itinerary(**parse_from_mongo(itinerary)) for itinerary in itineraries]

# Local Guides Routes
@api_router.post("/guides", response_model=LocalGuide)
async def create_guide(guide: LocalGuideCreate):
    guide_dict = prepare_for_mongo(guide.dict())
    guide_obj = LocalGuide(**guide_dict)
    await db.guides.insert_one(prepare_for_mongo(guide_obj.dict()))
    return guide_obj

@api_router.get("/guides", response_model=List[LocalGuide])
async def get_guides(location: Optional[str] = None, specialization: Optional[str] = None):
    query = {}
    if location:
        query["location"] = location
    if specialization:
        query["specialization"] = {"$regex": specialization, "$options": "i"}
    
    guides = await db.guides.find(query).to_list(1000)
    return [LocalGuide(**parse_from_mongo(guide)) for guide in guides]

# Events Routes
@api_router.post("/events", response_model=Event)
async def create_event(event: EventCreate):
    event_dict = prepare_for_mongo(event.dict())
    event_obj = Event(**event_dict)
    await db.events.insert_one(prepare_for_mongo(event_obj.dict()))
    return event_obj

@api_router.get("/events", response_model=List[Event])
async def get_events(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    
    events = await db.events.find(query).to_list(1000)
    return [Event(**parse_from_mongo(event)) for event in events]

# Chat Routes
@api_router.post("/chat", response_model=Dict[str, Any])
async def chat_with_assistant(request: ChatRequest):
    try:
        chat = get_llm_chat(request.session_id)
        
        # Store user message
        user_msg = ChatMessage(
            session_id=request.session_id,
            user_message=request.message,
            bot_response=""
        )
        
        user_message = UserMessage(text=request.message)
        response = await chat.send_message(user_message)
        
        # Update with bot response
        user_msg.bot_response = response
        
        await db.chat_messages.insert_one(prepare_for_mongo(user_msg.dict()))
        
        return {
            "response": response,
            "session_id": request.session_id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")

@api_router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    messages = await db.chat_messages.find({"session_id": session_id}).to_list(1000)
    return [ChatMessage(**parse_from_mongo(msg)) for msg in messages]

# Search Routes
@api_router.post("/search")
async def search_content(query: SearchQuery):
    search_term = query.query.lower()
    results = {
        "destinations": [],
        "events": [],
        "guides": []
    }
    
    # Search destinations
    dest_query = {
        "$or": [
            {"name": {"$regex": search_term, "$options": "i"}},
            {"description": {"$regex": search_term, "$options": "i"}},
            {"location": {"$regex": search_term, "$options": "i"}}
        ]
    }
    if query.category:
        dest_query["category"] = query.category
    
    destinations = await db.destinations.find(dest_query).to_list(50)
    results["destinations"] = [Destination(**parse_from_mongo(dest)) for dest in destinations]
    
    # Search events
    event_query = {
        "$or": [
            {"name": {"$regex": search_term, "$options": "i"}},
            {"description": {"$regex": search_term, "$options": "i"}},
            {"location": {"$regex": search_term, "$options": "i"}}
        ]
    }
    events = await db.events.find(event_query).to_list(50)
    results["events"] = [Event(**parse_from_mongo(event)) for event in events]
    
    # Search guides
    guide_query = {
        "$or": [
            {"name": {"$regex": search_term, "$options": "i"}},
            {"specialization": {"$regex": search_term, "$options": "i"}},
            {"location": {"$regex": search_term, "$options": "i"}}
        ]
    }
    guides = await db.guides.find(guide_query).to_list(50)
    results["guides"] = [LocalGuide(**parse_from_mongo(guide)) for guide in guides]
    
    return results

# Initialize sample data
@api_router.post("/seed-data")
async def seed_sample_data():
    try:
        # Clear existing data
        await db.destinations.delete_many({})
        await db.events.delete_many({})
        await db.guides.delete_many({})
        
        # Insert sample destinations
        for dest_data in SAMPLE_DESTINATIONS:
            dest = Destination(**dest_data)
            await db.destinations.insert_one(prepare_for_mongo(dest.dict()))
        
        # Insert sample events
        for event_data in SAMPLE_EVENTS:
            event = Event(**event_data)
            await db.events.insert_one(prepare_for_mongo(event.dict()))
        
        # Insert sample guides
        for guide_data in SAMPLE_GUIDES:
            guide = LocalGuide(**guide_data)
            await db.guides.insert_one(prepare_for_mongo(guide.dict()))
        
        return {"message": "Sample data seeded successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to seed data: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()