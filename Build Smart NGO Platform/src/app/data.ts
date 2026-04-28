export const IMAGES = {
  map: "https://images.unsplash.com/photo-1750969185331-e03829f72c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwd29ybGQlMjBtYXAlMjBhYnN0cmFjdCUyMG5ldHdvcmt8ZW58MXx8fHwxNzc3MzgyMjM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  food: "https://images.unsplash.com/photo-1632560957516-913e4bf9ddcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kJTIwZGlzdHJpYnV0aW9uJTIwY2hhcml0eXxlbnwxfHx8fDE3NzczODIyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  children: "https://images.unsplash.com/photo-1757877203307-585dabb4e41a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBuZ28lMjBjaGlsZHJlbiUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzczODIyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  dog: "https://images.unsplash.com/photo-1741154449714-89f4c1a885e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHN0cmVldCUyMHJlc2N1ZSUyMGRvZ3xlbnwxfHx8fDE3NzczODIyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
};

export interface NGO {
  id: number;
  name: string;
  location: string;
  category: string;
  urgency: string;
  funding: number;
  volunteers: number;
  trust: number;
  description: string;
}

export interface Campaign {
  id: number;
  title: string;
  ngo: string;
  location: string;
  category: string;
  urgency: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  description: string;
}

export interface Volunteer {
  id: number;
  name: string;
  location: string;
  skills: string[];
  availability: string;
  matchScore: number;
}

export interface Donor {
  id: number;
  name: string;
  totalDonated: number;
  favoriteNGOs: number[];
  recentCampaigns: number[];
  preferences: string[];
}

export const DEMO_DATA = {
  stats: {
    donated: 8450000,
    volunteers: 1250,
    ngos: 142
  },
  aiDemand: [
    { location: "Chennai Coastal", percentage: 98, level: "CRITICAL" },
    { location: "Assam Rural", percentage: 92, level: "CRITICAL" },
    { location: "Kerala Backwaters", percentage: 89, level: "CRITICAL" },
    { location: "Bhopal Rural", percentage: 87, level: "HIGH" },
    { location: "Delhi Air Quality", percentage: 85, level: "HIGH" },
    { location: "Mumbai Slums", percentage: 81, level: "MEDIUM" },
    { location: "Delhi Urban", percentage: 76, level: "MEDIUM" },
    { location: "Hyderabad Tribal", percentage: 74, level: "LOW" },
    { location: "Pune Outskirts", percentage: 68, level: "LOW" },
    { location: "Bangalore Outskirts", percentage: 65, level: "LOW" }
  ],
  ngos: [
    { id: 1, name: "DisasterAlert Response", location: "Chennai", category: "Disaster", urgency: "CRITICAL", funding: 85, volunteers: 42, trust: 98, description: "Rapid response teams for coastal floods and cyclones." },
    { id: 2, name: "FeedIndia Foundation", location: "Mumbai", category: "Food", urgency: "HIGH", funding: 65, volunteers: 120, trust: 95, description: "Providing daily nutritious meals to underserved communities." },
    { id: 3, name: "CleanWater Mission", location: "Bhopal", category: "Water", urgency: "MEDIUM", funding: 40, volunteers: 15, trust: 92, description: "Installing water purifiers and building borewells in rural areas." },
    { id: 4, name: "WomenRise Collective", location: "Kolkata", category: "Women", urgency: "HIGH", funding: 55, volunteers: 30, trust: 96, description: "Empowering women through skill development and micro-loans." },
    { id: 5, name: "GreenEarth NGO", location: "Delhi", category: "Environment", urgency: "MEDIUM", funding: 30, volunteers: 200, trust: 90, description: "Tree plantation drives and urban waste management solutions." },
    { id: 6, name: "Tech For All", location: "Bangalore", category: "Education", urgency: "MEDIUM", funding: 70, volunteers: 85, trust: 94, description: "Bringing digital literacy to underprivileged schools." },
    { id: 7, name: "StrayCare", location: "Pune", category: "Animal", urgency: "HIGH", funding: 45, volunteers: 60, trust: 89, description: "Vaccination, neutering, and rescue of street animals." },
    { id: 8, name: "MediReach", location: "Hyderabad", category: "Medical", urgency: "CRITICAL", funding: 25, volunteers: 110, trust: 97, description: "Mobile health clinics for remote tribal regions." },
    { id: 9, name: "Flood Relief Assam", location: "Guwahati", category: "Disaster", urgency: "CRITICAL", funding: 15, volunteers: 250, trust: 93, description: "Emergency rescue and relief materials for flood-affected families." },
    { id: 10, name: "Ocean Rescue Network", location: "Kochi", category: "Environment", urgency: "MEDIUM", funding: 50, volunteers: 40, trust: 91, description: "Clearing plastic waste from coastal lines and marine life rescue." },
    { id: 11, name: "Smile Foundation", location: "Delhi", category: "Education", urgency: "MEDIUM", funding: 60, volunteers: 300, trust: 96, description: "Promoting education for underprivileged children across India." },
    { id: 12, name: "Goonj", location: "Pan India", category: "Disaster", urgency: "HIGH", funding: 75, volunteers: 500, trust: 99, description: "Providing clothing and basic amenities to rural areas and disaster victims." },
    { id: 13, name: "HelpAge India", location: "Chennai", category: "Elderly", urgency: "HIGH", funding: 45, volunteers: 150, trust: 95, description: "Care and support for disadvantaged elderly citizens." },
    { id: 14, name: "Wildlife SOS", location: "Agra", category: "Animal", urgency: "MEDIUM", funding: 80, volunteers: 90, trust: 94, description: "Rescuing and rehabilitating wildlife in distress." },
    { id: 15, name: "Akshaya Patra", location: "Bangalore", category: "Food", urgency: "CRITICAL", funding: 90, volunteers: 1000, trust: 98, description: "Implementing the mid-day meal scheme in government schools." },
    { id: 16, name: "Katha", location: "Delhi", category: "Education", urgency: "MEDIUM", funding: 55, volunteers: 120, trust: 92, description: "Transforming the lives of children living in poverty through education." },
    { id: 17, name: "SNEHA", location: "Mumbai", category: "Women", urgency: "HIGH", funding: 65, volunteers: 200, trust: 97, description: "Working on maternal and newborn health in urban slums." },
    { id: 18, name: "Pratham", location: "Mumbai", category: "Education", urgency: "HIGH", funding: 85, volunteers: 800, trust: 99, description: "Improving the quality of education in India." },
    { id: 19, name: "Uday Foundation", location: "Delhi", category: "Medical", urgency: "CRITICAL", funding: 40, volunteers: 75, trust: 91, description: "Health, support, and dignity for patients and their families." },
    { id: 20, name: "Navdanya", location: "Dehradun", category: "Environment", urgency: "MEDIUM", funding: 50, volunteers: 60, trust: 93, description: "Earth democracy, organic farming, and seed saving." }
  ],
  campaigns: [
    { id: 1, title: "Cyclone Relief Tamil Nadu", ngo: "DisasterAlert Response", location: "Tamil Nadu", category: "Disaster", urgency: "CRITICAL", raised: 234000, goal: 1000000, donors: 1240, daysLeft: 5, description: "Emergency relief kits for families affected by the recent cyclone." },
    { id: 2, title: "1 Million Meals by Diwali", ngo: "FeedIndia Foundation", location: "Pan India", category: "Food", urgency: "HIGH", raised: 412000, goal: 500000, donors: 850, daysLeft: 12, description: "Help us reach our goal of providing 1 million meals this festive season." },
    { id: 3, title: "Clean Water for 50 Villages", ngo: "CleanWater Mission", location: "Madhya Pradesh", category: "Water", urgency: "MEDIUM", raised: 189000, goal: 600000, donors: 420, daysLeft: 20, description: "Building sustainable water infrastructure in drought-prone villages." },
    { id: 4, title: "Mobile Medical Camps", ngo: "MediReach", location: "Telangana", category: "Medical", urgency: "HIGH", raised: 345000, goal: 750000, donors: 630, daysLeft: 8, description: "Fully equipped mobile clinics reaching remote tribal areas." },
    { id: 5, title: "Street Dog Rescue", ngo: "StrayCare", location: "Maharashtra", category: "Animal", urgency: "MEDIUM", raised: 98000, goal: 200000, donors: 215, daysLeft: 15, description: "Medical treatment and sheltering for injured street animals." },
    { id: 6, title: "Laptops for Rural Kids", ngo: "Tech For All", location: "Karnataka", category: "Education", urgency: "MEDIUM", raised: 150000, goal: 300000, donors: 310, daysLeft: 25, description: "Providing refurbished laptops to students in government schools." },
    { id: 7, title: "Assam Flood Rescue Teams", ngo: "Flood Relief Assam", location: "Assam", category: "Disaster", urgency: "CRITICAL", raised: 45000, goal: 500000, donors: 890, daysLeft: 3, description: "Boats and rescue personnel deployment to stranded villages." },
    { id: 8, title: "Winter Blankets Drive", ngo: "Goonj", location: "North India", category: "Disaster", urgency: "HIGH", raised: 850000, goal: 1200000, donors: 1540, daysLeft: 10, description: "Providing warm clothing and blankets to the homeless before winter peaks." },
    { id: 9, title: "Save the Elephants", ngo: "Wildlife SOS", location: "Kerala", category: "Animal", urgency: "CRITICAL", raised: 540000, goal: 800000, donors: 720, daysLeft: 14, description: "Rescue operations for captive elephants requiring immediate medical care." },
    { id: 10, title: "Mid-day Meals Expansion", ngo: "Akshaya Patra", location: "Uttar Pradesh", category: "Food", urgency: "HIGH", raised: 1200000, goal: 2000000, donors: 3100, daysLeft: 30, description: "Expanding our kitchen capacity to serve an additional 50,000 children daily." },
    { id: 11, title: "Maternal Health Clinics", ngo: "SNEHA", location: "Dharavi, Mumbai", category: "Women", urgency: "HIGH", raised: 320000, goal: 500000, donors: 450, daysLeft: 22, description: "Setting up 5 new pop-up clinics for maternal health checkups in slums." },
    { id: 12, title: "Read India Campaign", ngo: "Pratham", location: "Bihar", category: "Education", urgency: "MEDIUM", raised: 670000, goal: 1000000, donors: 980, daysLeft: 45, description: "Distributing early reading materials to 500 remote villages." },
    { id: 13, title: "Elderly Winter Care", ngo: "HelpAge India", location: "Delhi", category: "Elderly", urgency: "HIGH", raised: 210000, goal: 400000, donors: 340, daysLeft: 18, description: "Providing medical kits and heaters to old age homes." },
    { id: 14, title: "Organic Seed Bank", ngo: "Navdanya", location: "Uttarakhand", category: "Environment", urgency: "MEDIUM", raised: 150000, goal: 300000, donors: 190, daysLeft: 60, description: "Establishing a community seed bank for indigenous farmers." }
  ],
  volunteers: [
    { id: 1, name: "Priya Sharma", location: "Mumbai", skills: ["Teaching", "Counseling"], availability: "Weekends", matchScore: 92 },
    { id: 2, name: "Rahul Verma", location: "Delhi", skills: ["Medical", "First Aid"], availability: "Full-time", matchScore: 88 },
    { id: 3, name: "Aditya Menon", location: "Chennai", skills: ["Logistics", "Driving"], availability: "Evenings", matchScore: 95 },
    { id: 4, name: "Sneha Patel", location: "Ahmedabad", skills: ["Fundraising", "Social Media"], availability: "Weekends", matchScore: 85 },
    { id: 5, name: "John Doe", location: "Bangalore", skills: ["IT Support", "Data Entry"], availability: "Part-time", matchScore: 78 }
  ],
  requests: [
    { id: 1, ngo: "FeedIndia Foundation", title: "Food Distribution Drive", needed: 10, matched: 4, urgency: "HIGH", location: "Mumbai Slums", date: "Tomorrow, 8 AM" },
    { id: 2, ngo: "DisasterAlert Response", title: "Relief Kit Packing", needed: 25, matched: 12, urgency: "CRITICAL", location: "Chennai Coastal", date: "Today, 4 PM" },
    { id: 3, ngo: "Tech For All", title: "Computer Mentors Needed", needed: 5, matched: 1, urgency: "MEDIUM", location: "Bangalore Outskirts", date: "Next Mon, 10 AM" },
    { id: 4, ngo: "Flood Relief Assam", title: "Boat Operators Wanted", needed: 8, matched: 2, urgency: "CRITICAL", location: "Guwahati", date: "Today, 1 PM" }
  ],
  leaderboard: [
    { rank: 1, name: "DisasterAlert Response", type: "NGO", score: 9850, badge: "🥇" },
    { rank: 2, name: "FeedIndia Foundation", type: "NGO", score: 9200, badge: "🥈" },
    { rank: 3, name: "Rahul Verma", type: "Volunteer", score: 8750, badge: "🥉" },
    { rank: 4, name: "Priya Sharma", type: "Volunteer", score: 8100, badge: "🌟" },
    { rank: 5, name: "CleanWater Mission", type: "NGO", score: 7900, badge: "" },
    { rank: 6, name: "MediReach", type: "NGO", score: 7400, badge: "❤️" },
    { rank: 7, name: "Sneha Patel", type: "Volunteer", score: 7100, badge: "" }
  ],
  recentActivity: [
    { id: 1, user: "Anonymous", action: "donated $500", target: "Cyclone Relief Tamil Nadu", time: "2 mins ago" },
    { id: 2, user: "Rahul V.", action: "completed 10 hours of volunteering", target: "MediReach", time: "15 mins ago" },
    { id: 3, user: "Tech For All", action: "reached 50% of funding goal", target: "Laptops for Rural Kids", time: "1 hour ago" },
    { id: 4, user: "Priya S.", action: "shared campaign", target: "1 Million Meals by Diwali", time: "2 hours ago" },
    { id: 5, user: "Flood Relief Assam", action: "dispatched 500 emergency kits", target: "Guwahati region", time: "4 hours ago" }
  ]
};

export const recommendNGOsForDonor = (donor: Donor | null | undefined, ngos: NGO[], campaigns: Campaign[]): NGO[] => {
  if (!donor) return ngos.slice(0, 3);
  return ngos.filter(ngo => 
    donor.preferences?.includes(ngo.category) || 
    donor.favoriteNGOs?.includes(ngo.id)
  ).slice(0, 3);
};

export const getPriorityNGOs = (ngos: NGO[]): NGO[] => {
  return ngos.filter(ngo => ngo.urgency === 'critical' || ngo.urgency === 'high');
};

export const predictHighDemandZones = (ngos: NGO[]) => {
  return [
    { city: "Chennai Coastal", demand: 98, category: "Disaster" },
    { city: "Bhopal Rural", demand: 87, category: "Water" },
    { city: "Mumbai Slums", demand: 81, category: "Food" },
    { city: "Hyderabad Tribal", demand: 74, category: "Medical" }
  ];
};

export const calculateMatchScore = (volunteer: Volunteer | null, ngo: NGO | null): number => {
  if (!volunteer || !ngo) return 0;
  return Math.floor(Math.random() * 40) + 60; // Mock score between 60 and 100
};

export interface Request {
  id: string | number;
  ngoId: number;
  type: string;
  description: string;
  quantity: number;
  urgency: number | string;
  skills?: string[];
  status: string;
  createdAt?: string;
  acceptedBy?: number | string;
  // Fallbacks for the demo requests
  ngo?: string;
  title?: string;
  needed?: number;
  matched?: number;
  location?: string;
  date?: string;
}

export interface Notification {
  id: string;
  type: 'match' | 'donation' | 'request' | string;
  read: boolean;
  message: string;
  timestamp: string | number;
}

export const mockNGOs = DEMO_DATA.ngos;
export const mockVolunteers = DEMO_DATA.volunteers;

export const parseNLPRequest = (text: string) => {
  return {
    type: 'volunteers',
    quantity: 5,
    urgency: 80,
    skills: ['Medical', 'Logistics']
  };
};

