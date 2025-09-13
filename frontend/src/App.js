import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage, searchQuery, setSearchQuery, handleSearch }) => (
  <nav className="bg-green-800 shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <h1 className="text-white text-xl font-bold cursor-pointer" onClick={() => setCurrentPage('home')}>
            🌿 Jharkhand Eco-Tourism
          </h1>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`text-white hover:text-yellow-300 px-3 py-2 ${currentPage === 'home' ? 'border-b-2 border-yellow-300' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('destinations')}
            className={`text-white hover:text-yellow-300 px-3 py-2 ${currentPage === 'destinations' ? 'border-b-2 border-yellow-300' : ''}`}
          >
            Explore
          </button>
          <button 
            onClick={() => setCurrentPage('itinerary')}
            className={`text-white hover:text-yellow-300 px-3 py-2 ${currentPage === 'itinerary' ? 'border-b-2 border-yellow-300' : ''}`}
          >
            Plan Trip
          </button>
          <button 
            onClick={() => setCurrentPage('community')}
            className={`text-white hover:text-yellow-300 px-3 py-2 ${currentPage === 'community' ? 'border-b-2 border-yellow-300' : ''}`}
          >
            Community
          </button>
          <button 
            onClick={() => setCurrentPage('events')}
            className={`text-white hover:text-yellow-300 px-3 py-2 ${currentPage === 'events' ? 'border-b-2 border-yellow-300' : ''}`}
          >
            Events
          </button>
          <button 
            onClick={() => setCurrentPage('sustainability')}
            className={`text-white hover:text-yellow-300 px-3 py-2 ${currentPage === 'sustainability' ? 'border-b-2 border-yellow-300' : ''}`}
          >
            Sustainability
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search destinations, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-white text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-2 top-2 text-gray-600 hover:text-green-600"
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

// Home Page Component
const HomePage = ({ setCurrentPage }) => {
  const heroImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    "https://images.unsplash.com/photo-1549366021-9f761d040942",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImages[currentImageIndex]}
            alt="Jharkhand Heritage"
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Discover Jharkhand's
              <span className="text-yellow-300 block">Natural Heritage</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Experience pristine waterfalls, rich tribal culture, and sustainable eco-tourism in India's hidden gem
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('itinerary')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105"
              >
                Plan Your Adventure
              </button>
              <button 
                onClick={() => setCurrentPage('destinations')}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition duration-300"
              >
                Explore Destinations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">Why Choose Jharkhand?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">Pristine Nature</h3>
              <p className="text-gray-600">Untouched forests, spectacular waterfalls, and diverse wildlife sanctuaries</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">Rich Culture</h3>
              <p className="text-gray-600">Authentic tribal traditions, colorful festivals, and ancient handicrafts</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">Community Tourism</h3>
              <p className="text-gray-600">Support local communities through responsible and sustainable tourism</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Destinations Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">Top Destinations</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
                alt="Hundru Falls"
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">Hundru Falls</h3>
                  <p>98m spectacular waterfall</p>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1549366021-9f761d040942"
                alt="Betla National Park"
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">Betla National Park</h3>
                  <p>Tigers & diverse wildlife</p>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96"
                alt="Tribal Culture"
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">Tribal Villages</h3>
                  <p>Authentic cultural experiences</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => setCurrentPage('destinations')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              View All Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Cultural Heritage Showcase */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-orange-800 mb-12">Rich Cultural Heritage</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src="/images/cultural_heritage_1.png"
                alt="Tribal Festival"
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-semibold">Vibrant Festivals</h3>
                  <p>Experience colorful tribal celebrations</p>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src="/images/cultural_heritage_2.png"
                alt="Traditional Handicrafts"
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-semibold">Traditional Crafts</h3>
                  <p>Authentic pottery, bamboo & tribal art</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-lg shadow-md">
              <img 
                src="/images/cultural_heritage_3.png"
                alt="Tribal Art"
                className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className="text-lg font-semibold">Sohrai Art</h4>
                  <p className="text-sm">Ancient wall paintings</p>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg shadow-md">
              <img 
                src="/images/cultural_heritage_5.png"
                alt="Artisan Workshop"
                className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className="text-lg font-semibold">Artisan Workshops</h4>
                  <p className="text-sm">Learn traditional crafts</p>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg shadow-md">
              <img 
                src="/images/cultural_heritage_6.png"
                alt="Cultural Performance"
                className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className="text-lg font-semibold">Folk Performances</h4>
                  <p className="text-sm">Traditional music & dance</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => setCurrentPage('events')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            >
              Explore Cultural Events
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Destinations Page Component
const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`${API}/destinations`);
      setDestinations(response.data);
      setFilteredDestinations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setLoading(false);
    }
  };

  const filterDestinations = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredDestinations(destinations);
    } else {
      setFilteredDestinations(destinations.filter(dest => dest.category === category));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-green-600">Loading destinations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">Explore Jharkhand</h1>
        
        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-md">
            {['all', 'eco', 'cultural', 'adventure', 'festivals'].map((category) => (
              <button
                key={category}
                onClick={() => filterDestinations(category)}
                className={`px-4 py-2 mx-1 rounded-md font-medium transition duration-300 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:bg-green-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <img 
                src={destination.images[0] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{destination.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    destination.category === 'eco' ? 'bg-green-100 text-green-800' :
                    destination.category === 'cultural' ? 'bg-orange-100 text-orange-800' :
                    destination.category === 'adventure' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {destination.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{destination.location}</p>
                <p className="text-gray-700 mb-4 line-clamp-3">{destination.description}</p>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <span>🕒 {destination.best_time_to_visit}</span>
                    <span>💰 {destination.entry_fee || 'Free'}</span>
                  </div>
                  
                  {destination.eco_tips && destination.eco_tips.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-green-600 font-medium">Eco Tips:</p>
                      <p className="text-xs text-gray-600">{destination.eco_tips[0]}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No destinations found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Itinerary Planner Component
const ItineraryPlanner = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    days: 3,
    interests: [],
    budget: 'Medium',
    special_requirements: ''
  });
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  const interestOptions = ['Eco-tourism', 'Cultural Heritage', 'Adventure Sports', 'Wildlife', 'Tribal Villages', 'Waterfalls', 'Handicrafts', 'Festivals'];
  const budgetOptions = ['Budget (₹5000-10000)', 'Medium (₹10000-25000)', 'Premium (₹25000+)'];

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async (e) => {
    e.preventDefault();
    if (!formData.user_name || formData.interests.length === 0) {
      alert('Please fill in your name and select at least one interest.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/itinerary/generate`, formData);
      setGeneratedItinerary(response.data);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      alert('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">AI-Powered Trip Planner</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={generateItinerary} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={formData.user_name}
                onChange={(e) => setFormData(prev => ({ ...prev, user_name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Days</label>
              <select
                value={formData.days}
                onChange={(e) => setFormData(prev => ({ ...prev, days: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(day => (
                  <option key={day} value={day}>{day} Day{day > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Interests (Select multiple)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {budgetOptions.map((budget) => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements (Optional)</label>
              <textarea
                value={formData.special_requirements}
                onChange={(e) => setFormData(prev => ({ ...prev, special_requirements: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                rows="3"
                placeholder="Any specific requirements, accessibility needs, or preferences..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Generating Your Perfect Trip...' : 'Generate My Itinerary'}
            </button>
          </form>

          {generatedItinerary && (
            <div className="mt-8 p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Your {generatedItinerary.days}-Day Jharkhand Adventure
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Destinations to Visit:</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    {generatedItinerary.destinations.map((dest, index) => (
                      <li key={index}>{dest}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Activities:</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    {generatedItinerary.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Accommodation:</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    {generatedItinerary.accommodation_suggestions.map((acc, index) => (
                      <li key={index}>{acc}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Transportation:</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    {generatedItinerary.transport_suggestions.map((transport, index) => (
                      <li key={index}>{transport}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-100 rounded">
                <p className="text-yellow-800">
                  <strong>Estimated Budget:</strong> {generatedItinerary.total_cost_estimate}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Community Page Component
const CommunityPage = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await axios.get(`${API}/guides`);
      setGuides(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching guides:', error);
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 !== 0 ? '⭐' : '');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-green-600">Loading community members...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">Local Community & Marketplace</h1>
        
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with local guides, artisans, and homestay owners. Support the community through authentic cultural experiences and traditional crafts.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Local Guides</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {guide.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-800">{guide.name}</h3>
                  <p className="text-sm text-gray-600">{guide.location}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  {guide.specialization}
                </span>
              </div>
              
              <p className="text-gray-700 text-sm mb-4">{guide.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <span>{renderStars(guide.rating)} {guide.rating}</span>
                  <span className="ml-2">({guide.reviews_count} reviews)</span>
                </div>
                <span className="font-semibold text-green-600">{guide.price_per_day}</span>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Languages:</p>
                <div className="flex flex-wrap gap-1">
                  {guide.languages.map((lang, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300">
                Contact Guide
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-orange-50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Artisan Marketplace</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <div className="text-3xl mb-3">🏺</div>
              <h3 className="text-lg font-semibold mb-2">Traditional Pottery</h3>
              <p className="text-gray-600 text-sm">Handcrafted terracotta items by local artisans</p>
              <button className="mt-3 text-orange-600 hover:text-orange-700 font-medium">View Products</button>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="text-lg font-semibold mb-2">Tribal Art</h3>
              <p className="text-gray-600 text-sm">Authentic Sohrai and Khovar paintings</p>
              <button className="mt-3 text-orange-600 hover:text-orange-700 font-medium">View Products</button>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-3xl mb-3">🧺</div>
              <h3 className="text-lg font-semibold mb-2">Bamboo Crafts</h3>
              <p className="text-gray-600 text-sm">Sustainable bamboo products and furniture</p>
              <button className="mt-3 text-orange-600 hover:text-orange-700 font-medium">View Products</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Events Page Component
const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/events`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-green-600">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">Festivals & Cultural Events</h1>
        
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the vibrant culture of Jharkhand through its colorful festivals, traditional fairs, and cultural celebrations throughout the year.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              {event.images && event.images.length > 0 ? (
                <img 
                  src={event.images[0]}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="h-48 bg-gradient-to-r from-orange-300 to-yellow-300 flex items-center justify-center">
                  <div className="text-4xl">🎉</div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.category === 'festival' ? 'bg-orange-100 text-orange-800' :
                    event.category === 'fair' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {event.category}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">📍 {event.location}</p>
                <p className="text-gray-600 text-sm mb-4">📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-700 mb-4">{event.description}</p>
                
                {event.cultural_significance && (
                  <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                    <p className="text-xs text-yellow-800 font-medium mb-1">Cultural Significance:</p>
                    <p className="text-xs text-yellow-700">{event.cultural_significance}</p>
                  </div>
                )}
                
                {event.registration_required ? (
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300">
                    Register Now
                  </button>
                ) : (
                  <p className="text-center text-sm text-gray-600 py-2">Open to all - No registration required</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No events currently scheduled.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Sustainability Hub Component
const SustainabilityPage = () => {
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [ecoPoints, setEcoPoints] = useState(150);

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">Sustainability Hub</h1>
        
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Travel responsibly and help preserve Jharkhand's natural beauty for future generations. Track your impact and earn rewards for eco-friendly choices.
          </p>
        </div>

        {/* Carbon Footprint Tracker */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">🌍 Carbon Footprint Tracker</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{carbonFootprint} kg</div>
              <p className="text-sm text-gray-600">CO₂ This Trip</p>
            </div>
            
            <div className="text-center p-4 bg-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{ecoPoints}</div>
              <p className="text-sm text-gray-600">Eco Points Earned</p>
            </div>
            
            <div className="text-center p-4 bg-yellow-100 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">Gold</div>
              <p className="text-sm text-gray-600">Eco Traveler Status</p>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">
              Calculate My Impact
            </button>
          </div>
        </div>

        {/* Eco-Friendly Travel Tips */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">🌱 Eco-Friendly Travel Tips</h2>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <div>
                  <h3 className="font-medium">Use Reusable Water Bottles</h3>
                  <p className="text-sm text-gray-600">Reduce plastic waste by carrying refillable bottles</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <div>
                  <h3 className="font-medium">Choose Local Transportation</h3>
                  <p className="text-sm text-gray-600">Use public transport or hire local guides</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <div>
                  <h3 className="font-medium">Support Local Communities</h3>
                  <p className="text-sm text-gray-600">Buy from local artisans and stay in homestays</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <div>
                  <h3 className="font-medium">Respect Wildlife</h3>
                  <p className="text-sm text-gray-600">Maintain distance and don't disturb natural habitats</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">🏆 Rewards System</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800">Eco Warrior (500+ points)</h3>
                <p className="text-sm text-gray-600">Unlock exclusive eco-lodge discounts</p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-800">Nature Guardian (300+ points)</h3>
                <p className="text-sm text-gray-600">Free guided nature walks</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800">Green Explorer (150+ points)</h3>
                <p className="text-sm text-gray-600">Priority booking for eco-tours</p>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '30%'}}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">150/500 points to Eco Warrior</p>
            </div>
          </div>
        </div>

        {/* Responsible Tourism Guidelines */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">📋 Responsible Tourism Guidelines</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Environmental Respect</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Don't litter or leave any waste behind</li>
                <li>• Stick to designated trails and paths</li>
                <li>• Don't pick flowers or disturb plants</li>
                <li>• Use biodegradable toiletries</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Cultural Sensitivity</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Respect local customs and traditions</li>
                <li>• Ask permission before photographing people</li>
                <li>• Dress modestly in religious places</li>
                <li>• Learn basic local greetings</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Community Support</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Hire local guides and services</li>
                <li>• Buy authentic local products</li>
                <li>• Eat at local restaurants</li>
                <li>• Pay fair prices for services</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// AI Chat Component
const ChatBot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        session_id: sessionId,
        message: userMessage
      });
      
      setMessages(prev => [...prev, { type: 'bot', content: response.data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { type: 'bot', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition duration-300 z-50"
      >
        💬
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl z-50 border">
      <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Jharkhand Tourism Assistant</h3>
        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
          ✕
        </button>
      </div>
      
      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-gray-500 text-sm">
            👋 Hi! I'm your Jharkhand tourism assistant. Ask me about destinations, festivals, or travel tips!
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
              Typing...
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about Jharkhand tourism..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Seed sample data on app load
    const seedData = async () => {
      try {
        await axios.post(`${API}/seed-data`);
        console.log('Sample data seeded successfully');
      } catch (error) {
        console.error('Error seeding data:', error);
      }
    };

    seedData();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.post(`${API}/search`, {
        query: searchQuery
      });
      setSearchResults(response.data);
      setCurrentPage('search');
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'destinations':
        return <DestinationsPage />;
      case 'itinerary':
        return <ItineraryPlanner />;
      case 'community':
        return <CommunityPage />;
      case 'events':
        return <EventsPage />;
      case 'sustainability':
        return <SustainabilityPage />;
      case 'search':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
              <h1 className="text-3xl font-bold text-green-800 mb-8">
                Search Results for "{searchQuery}"
              </h1>
              
              {searchResults && (
                <div className="space-y-8">
                  {searchResults.destinations.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Destinations</h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {searchResults.destinations.slice(0, 6).map((dest) => (
                          <div key={dest.id} className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold">{dest.name}</h3>
                            <p className="text-sm text-gray-600">{dest.location}</p>
                            <p className="text-sm text-gray-700 mt-2">{dest.description.substring(0, 100)}...</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {searchResults.events.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Events</h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {searchResults.events.slice(0, 6).map((event) => (
                          <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold">{event.name}</h3>
                            <p className="text-sm text-gray-600">{event.location}</p>
                            <p className="text-sm text-gray-700 mt-2">{event.description.substring(0, 100)}...</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      
      {renderPage()}
      
      <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      
      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">🌿 Jharkhand Eco-Tourism</h3>
              <p className="text-sm text-green-200">
                Discover the pristine beauty and rich cultural heritage of Jharkhand through sustainable tourism.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Explore</h4>
              <ul className="space-y-1 text-sm text-green-200">
                <li><button onClick={() => setCurrentPage('destinations')}>Destinations</button></li>
                <li><button onClick={() => setCurrentPage('events')}>Events & Festivals</button></li>
                <li><button onClick={() => setCurrentPage('community')}>Local Community</button></li>
                <li><button onClick={() => setCurrentPage('itinerary')}>Plan Your Trip</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Sustainability</h4>
              <ul className="space-y-1 text-sm text-green-200">
                <li><button onClick={() => setCurrentPage('sustainability')}>Eco Guidelines</button></li>
                <li>Carbon Footprint</li>
                <li>Responsible Travel</li>
                <li>Community Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-1 text-sm text-green-200">
                <li>📧 info@jharkhandtourism.com</li>
                <li>📞 +91-651-2345-678</li>
                <li>📍 Ranchi, Jharkhand</li>
                <li>🌐 www.jharkhandtourism.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-sm text-green-200">
            <p>&copy; 2025 Jharkhand Eco-Tourism. All rights reserved. | Built with ❤️ for sustainable tourism</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;