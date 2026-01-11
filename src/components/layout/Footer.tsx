import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import indiaMapImage from "@/assets/map.png"; 

const restaurantLocations = [
  {
    id: "bangalore",
    name: "Barkaas Bangalore",
    state: "Karnataka",
    coords: { x: 25, y: 55 }, 
    address: "Marathahalli, Bengaluru",
    gmap: "https://maps.app.goo.gl/barkaas-bangalore"
  },
  {
    id: "mysuru",
    name: "Barkaas Mysuru", 
    state: "Karnataka",
    coords: { x: 24, y: 58 },
    address: "Mysuru, Karnataka",
    gmap: "https://maps.app.goo.gl/barkaas-mysuru"
  },
  {
    id: "hyderabad",
    name: "Barkaas Hyderabad",
    state: "Telangana", 
    coords: { x: 38, y: 45 },
    address: "Multiple locations",
    gmap: "https://maps.app.goo.gl/barkaas-hyderabad"
  },
  {
    id: "vijayawada", 
    name: "Barkaas Vijayawada",
    state: "Andhra Pradesh",
    coords: { x: 42, y: 52 },
    address: "Tikkle Road, Vijayawada",
    gmap: "https://maps.app.goo.gl/barkaas-vijayawada"
  },
  {
    id: "kolkata",
    name: "Barkaas Kolkata",
    state: "West Bengal",
    coords: { x: 75, y: 22 },
    address: "Kolkata locations", 
    gmap: "https://maps.app.goo.gl/barkaas-kolkata"
  },
];

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-heading font-bold text-gradient-gold">
                <img
                  src="src/assets/logo-navbar.png"
                  alt="Barkaas Logo"
                  className="h-16 w-16"
                />
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to India’s Largest Indo-Arabic Chain of Restaurants. Think Mandi, think Barkaas. 
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-gold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              {/* <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="text-gold mt-1 shrink-0" />
                <span>123 Arabian Way, Dubai Marina, UAE</span>
              </li> */}
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-gold shrink-0" />
                <span>+91 84949 45678</span>
                <span>+91 83096 44799</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-gold shrink-0" />
                <span>info@barkaas.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours + Social */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-gold mb-4">
              Opening Hours
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Clock size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p>Mon - Thu: 12:00 PM - 11:00 PM</p>
                  <p>Fri - Sun: 12:00 PM - 12:00 AM</p>
                </div>
              </li>
            </ul>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors duration-300" aria-label="Instagram">
                <Instagram size={22} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold transition-colors duration-300" aria-label="Facebook">
                <Facebook size={22} />
              </a>
            </div>
          </div>

          {/* Our Locations - Image Map */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-gold mb-6">
              Our Locations
            </h4>
            <div className="relative group cursor-pointer">
              {/* Your India map image */}
              <img 
                src={indiaMapImage}
                alt="Barkaas restaurant locations across India"
                className="w-full h-64 md:h-80 rounded-lg shadow-lg object-cover border-4 border-gold/20 hover:border-gold/50 transition-all duration-300"
              />
              
              {/* Interactive pins matching your map */}
              {restaurantLocations.map((location) => (
                <button
                  key={location.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full border-3 border-white shadow-lg hover:scale-125 hover:shadow-2xl transition-all duration-300 z-20 group-hover:animate-pulse"
                  style={{
                    left: `${location.coords.x}%`,
                    top: `${location.coords.y}%`,
                    backgroundColor: location.id === 'bangalore' || location.id === 'mysuru' ? '#10B981' : '#F59E0B', // green/orange
                  }}
                  onClick={() => window.open(location.gmap, '_blank')}
                  title={`${location.name} - ${location.address}`}
                  aria-label={`${location.name}`}
                >
                  <MapPin size={12} className="text-white m-auto" />
                </button>
              ))}
              
              {/* Hover overlay with tooltip style */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 rounded-lg transition-all duration-300 flex items-end justify-center pointer-events-none">
                <div className="bg-gold/90 text-foreground px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
                  Click pins for Google Maps
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Multiple outlets across India
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Designed & Developed by Madtales AI Pvt LTd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
