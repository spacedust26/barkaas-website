import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup 
} from 'react-leaflet';
import { Icon } from 'leaflet';
import L from 'leaflet';

// Custom gold marker for Barkaas
const barkaasIcon = new Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png`,
  shadowUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png`,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40]
});

const restaurantLocations = [
  {
    id: "marathahalli-blr",
    name: "Marathahalli",
    city: "Bengaluru",
    state: "Karnataka",
    lat: 12.951244864093034,
    lng: 77.69943776441791,
    gmap: "https://maps.app.goo.gl/Mmii2uviqT5N9xz26",
  },
  {
    id: "whitefield-blr",
    name: "Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    lat: 12.97572728125544,
    lng: 77.72684785334371,
    gmap: "https://maps.app.goo.gl/Dj89dc1L9fTETf5k6",
  },
  {
    id: "mullickbazar-kol",
    name: "Mullick Bazar",
    city: "Kolkata",
    state: "West Bengal",
    lat: 22.54630463858092,
    lng: 88.36251169661766,
    gmap: "https://maps.app.goo.gl/yWFtnKD3hYA5G7Vn8",
  },
  {
    id: "chinarpark-kol",
    name: "Chinar Park",
    city: "Kolkata",
    state: "West Bengal",
    lat: 22.622345933347592,
    lng: 88.4451553101118,
    gmap: "https://maps.app.goo.gl/S2pmsDS3giz5jrXM6",
  },
  {
    id: "maheshtala-kol",
    name: "Maheshtala",
    city: "Kolkata",
    state: "West Bengal",
    lat: 22.54902551292249,
    lng: 88.2804088101103,
    gmap: "https://maps.app.goo.gl/bt8uDZfHjj8SSRpi8",
  },
  {
    id: "aligarh-up",
    name: "Aligarh",
    city: "Aligarh",
    state: "Uttar Pradesh",
    lat: 27.931463750337127,
    lng: 78.09171186164401,
    gmap: "https://maps.app.goo.gl/AaJ6yZNM4LbHfTrp7",
  },
  {
    id: "hazratganj-up",
    name: "Hazratganj",
    city: "Lucknow",
    state: "Uttar Pradesh",
    lat: 26.88328546271052,
    lng: 80.97644018949754,
    gmap: "https://maps.app.goo.gl/Xk8ypqkZKXLR8hmN9",
  },
  {
    id: "aliganj-up",
    name: "Aliganj",
    city: "Lucknow",
    state: "Uttar Pradesh",
    lat: 26.917576861335718,
    lng: 80.92700171415677,
    gmap: "https://maps.app.goo.gl/8362Q1AEDYXaD98M8",
  },
  {
    id: "kanpur-up",
    name: "Kanpur",
    city: "Kanpur",
    state: "Uttar Pradesh",
    lat: 26.529971510540644,
    lng: 80.33099342810426,
    gmap: "https://maps.app.goo.gl/nibPyXmitVvEZwXS8",
  },
  {
    id: "gomtinagar-up",
    name: "Gomtinagar",
    city: "Lucknow",
    state: "Uttar Pradesh",
    lat: 26.888184871362267,
    lng: 80.99566626324116,
    gmap: "https://maps.app.goo.gl/jbZQ6zeAiPfJxrqLA",
  },
  {
    id: "patna-bih",
    name: "Patna",
    city: "Patna",
    state: "Bihar",
    lat: 25.611045473061754,
    lng: 85.13778713901065,
    gmap: "https://maps.app.goo.gl/s9DjoSC5MQKqJNEy9",
  },
  {
    id: "tirupati-ap",
    name: "Tirupati",
    city: "Tirupati",
    state: "Andhra Pradesh",
    lat: 13.772110471321964,
    lng: 79.38869497181894,
    gmap: "https://maps.app.goo.gl/xDRQSuTkr4hRybyG6",
  },
  {
    id: "moghalrajpuram-ap",
    name: "Moghalrajpuram",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    lat: 16.78157743605752,
    lng: 80.66310900282521,
    gmap: "https://maps.app.goo.gl/1v1asTg4FGu3qEPTA",
  },
  {
    id: "chinnakakani-ap",
    name: "Chinnakakani",
    city: "Chinnakakani",
    state: "Andhra Pradesh",
    lat: 16.686887873786343,
    lng: 80.54225939643668,
    gmap: "https://maps.app.goo.gl/acr7ySzRuoQDEmg79",
  },
  {
    id: "visakhapatnam-ap",
    name: "Visakhapatnam",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    lat: 17.788617765871667,
    lng: 83.20095073698425,
    gmap: "https://maps.app.goo.gl/23Td1kA9CxeUwVSg8",
  },
  {
    id: "nellore-ap",
    name: "Nellore",
    city: "Nellore",
    state: "Andhra Pradesh",
    lat: 14.634790335724153,
    lng: 80.10280628229658,
    gmap: "https://maps.app.goo.gl/FctjiNZuvmUt6Epr9",
  },
  {
    id: "bhimavaram-ap",
    name: "Bhimavaram",
    city: "Bhimavaram",
    state: "Andhra Pradesh",
    lat: 16.750019477936203,
    lng: 81.44313828042387,
    gmap: "https://maps.app.goo.gl/5vmdJwmEPrQ7BEkn7",
  },
  {
    id: "vijayawada-ap",
    name: "Vijayawada",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    lat: 16.72897793186955,
    lng: 80.79494493706724,
    gmap: "https://maps.app.goo.gl/yDvBqFxiLu1c14gG6",
  },
  {
    id: "kavali-ap",
    name: "Kavali",
    city: "Kavali",
    state: "Andhra Pradesh",
    lat: 15.1338203374795,
    lng: 79.95998402020106,
    gmap: "https://maps.app.goo.gl/Uz5owpYrJ3vBTobc9",
  },
  {
    id: "kompally-hyd",
    name: "Kompally",
    city: "Hyderabad",
    state: "Telangana",
    lat: 17.705676350324516,
    lng: 78.53161177464759,
    gmap: "https://maps.app.goo.gl/JYB4ec1i7tK3vksK6",
  },
  {
    id: "kukatpally-hyd",
    name: "Kukatpally",
    city: "Hyderabad",
    state: "Telangana",
    lat: 17.71614196556111,
    lng: 78.41076216825905,
    gmap: "https://maps.app.goo.gl/3f3PtT8pxZSC5XT37",
  },
  {
    id: "srnagar-hyd",
    name: "SR Nagar",
    city: "Hyderabad",
    state: "Telangana",
    lat: 17.663807789240074,
    lng: 78.41076216825905,
    gmap: "https://maps.app.goo.gl/CnKcqBE4i6msbh4b7",
  },
  {
    id: "gachibowli-hyd",
    name: "Gachibowli",
    city: "Hyderabad",
    state: "Telangana",
    lat: 17.65333912550355,
    lng: 78.30089888972402,
    gmap: "https://maps.app.goo.gl/FU5GwUqUASLcSVYk8",
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
            <p className="text-muted-foreground leading-relaxed mt-4">
              Welcome to India's Largest Indo-Arabic Chain of Restaurants. 
              Think Mandi, think Barkaas.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-gold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-gold shrink-0" />
                <span>+91 84949 45678 | +91 83096 44799</span>
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
                  <p>Mon-Thu: 12PM - 11PM</p>
                  <p>Fri-Sun: 12PM - 12AM</p>
                </div>
              </li>
            </ul>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-gold hover:scale-110 transition-all duration-300" aria-label="Instagram">
                <Instagram size={22} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold hover:scale-110 transition-all duration-300" aria-label="Facebook">
                <Facebook size={22} />
              </a>
            </div>
          </div>

          {/* React Leaflet Map */}
         <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gold/20 border border-gold/20 hover:border-gold/50 transition-all duration-300">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              style={{ height: '340px', width: '100%' }}
              scrollWheelZoom="center"  // Smooth zoom on cursor
              zoomControl={true}
              doubleClickZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
              />
              {restaurantLocations.map((location) => (
                <Marker 
                  key={location.id} 
                  position={[location.lat, location.lng]} 
                  icon={barkaasIcon}
                >
                  <Popup className="!p-0 shadow-2xl min-w-[280px]">
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gold rounded-full" />
                        <h3 className="font-heading font-bold text-xl text-burgundy">
                          {location.name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">
                        {location.city}, {location.state}
                      </p>
                      <Button 
                        variant="gold" 
                        size="sm" 
                        asChild 
                        className="w-full"
                      >
                        <a 
                          href={location.gmap} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <MapPin className="mr-2 h-4 w-4" />
                          Open in Google Maps
                        </a>
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{' '}
            Designed & Developed by{' '}
            <a 
              href="https://madtalesai.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-gold hover:text-gold/80 transition-colors"
            >
              Madtales AI Pvt Ltd.
            </a>{' '}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
