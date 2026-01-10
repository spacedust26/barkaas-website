import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { ArrowRight, Utensils, Star, Clock } from "lucide-react";
import heroImage1 from "@/assets/ambience/_RON3054.jpg";
import heroImage2 from "@/assets/ambience/_DSC1109.jpg";
import heroImage3 from "@/assets/ambience/_RON3068.jpg";
import heroImage4 from "@/assets/ambience/_RON3063.jpg";
import img1 from "@/assets/mainpage-1.png";
import img2 from "@/assets/mainpage-2.png";
import img3 from "@/assets/mainpage-3.png";
import img4 from "@/assets/mainpage-4.png";

const storyBlocks = [
  {
    title: "The Mandi Story",
    subtitle: "A Legacy",
    description:
      "At Barkaas, the heart of our kitchen beats to the aroma of mandi. Slow cooked, fire kissed, and deeply spiced, our mandi collection is one of the most extensive you’ll find; each variety rooted in tradition, perfected with care, and served as a true celebration of Indo-Arabian heritage.",
    image: img1,
  },
  {
    title: "Beyond Mandi, A World of Flavours",
    subtitle: "A Tradition",
    description:
      "Our story doesn’t end with mandi. Begin with irresistible starters and soul-warming shorbas, then explore smoky charcoal-grilled and tandoori delights crafted to perfection. From rich Indian gravies paired with freshly baked Indian breads to generous platters and aromatic kabsa, Barkaas brings together the best of Arabian and Indian cuisines under one roof. Our biryanis are a story of their own - fragrant basmati rice, rich masalas, and layers of flavor that unfold with every bite.",
    image: img2,
  },
  {
    title: "Sweet Endings Worth Remembering",
    subtitle: "A Celebration",
    description:
      "Every great feast deserves a memorable finale. Indulge in our desserts, from crispy, molten kunafa to soft gulab jamun, royal shahi tukda, and comforting kaddu ki kheer. Each sweet is a perfect balance of richness and nostalgia.",
    image: img3,
  },
  {
    title: "A Glass for Every Mood",
    subtitle: "A Refreshment",
    description:
      "Complete your experience with our wide range of drinks - fresh juices, vibrant mocktails, creamy faloodas, refreshing mojitos, classic lassi and buttermilk, indulgent milkshakes and thick shakes, exotic fruit blends, sundaes, sodas, ice blends, and Barkaas special mixes crafted to refresh and delight.",
    image: img4,
  },
];

const featuredDishes = [
  { name: "Mezze Platter", description: "A selection of traditional appetizers", image: img1 },
  { name: "Lamb Chops", description: "Grilled to perfection with herbs", image: img2 },
  { name: "Saffron Rice", description: "Aromatic basmati with almonds", image: img3 },
];
const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4];

const Index = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [visibleBlocks, setVisibleBlocks] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-story-block') || '0');
          if (entry.isIntersecting && !visibleBlocks.includes(index)) {
            setVisibleBlocks((prev) => [...prev, index]);
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: "-20% 0px 0px 0px" 
      }
    );
    
    const elements = document.querySelectorAll('[data-story-block]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [visibleBlocks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`
                absolute inset-0 bg-cover bg-center transition-opacity duration-1000
                ${index === currentHeroIndex ? "opacity-100" : "opacity-0"}
              `}
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
            </div>
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <p className="text-gold font-medium tracking-[0.3em] uppercase mb-4">
              Welcome
            </p>
            <h1 className="text-3xl md:text-7xl lg:text-5xl font-heading font-bold text-gradient-gold mb-6">
              Think Mandi, Think Barkaas.
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-4 font-light">
              India's Largest Indo-Arabic Chain of Restaurants
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A Journey Through Arabian Flavors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="xl" asChild>
                <Link to="/book">
                  Reserve Your Table
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="gold-outline" size="xl" asChild>
                <Link to="/menu">Explore Menu</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </div>
      </section>

      {/* Story Section - SLOWER ANIMATION */}
     <section className="py-24 bg-pattern-arabesque">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-gold font-medium tracking-[0.2em] uppercase mb-2">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              The Barkaas Story
            </h2>
          </div>

          <div className="space-y-8 md:space-y-12 max-w-5xl mx-auto">
            {storyBlocks.map((block, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={block.title}
                  className={`
                    flex flex-col items-center gap-6 md:gap-12
                    md:flex-row ${isEven ? "" : "md:flex-row-reverse"}
                    max-w-4xl mx-auto px-6
                    opacity-0 translate-y-8 animate-story-reveal-slow
                  `}
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  {/* Text */}
                  <div className="md:w-1/2 text-center md:text-left">
                    <p className="text-gold font-medium tracking-[0.2em] uppercase mb-3">
                      {block.subtitle}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
                      {block.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg max-w-md">
                      {block.description}
                    </p>
                  </div>

                  {/* SCROLL-TRIGGERED ROTATION */}
                  <div className="md:w-1/2 flex justify-center">
                    <div
                      data-story-block={index}
                      className={`
                        relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96
                        rounded-full overflow-hidden
                        bg-background/50 backdrop-blur-sm
                        shadow-2xl shadow-gold/40
                        ${visibleBlocks.includes(index)
                          ? "animate-story-reveal-rotate"
                          : "opacity-0"
                        }
                      `}
                    >
                      <img
                        src={block.image}
                        alt={block.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-20 pt-4">
            <Button variant="gold" size="xl" asChild className="group">
              <Link to="/about">
                Explore Our Legacy
                <ArrowRight className="ml-3 size-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Featured Dishes */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-gold font-medium tracking-[0.2em] uppercase mb-2">
              Our Specialties
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Signature Dishes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, index) => (
              <div
                key={dish.name}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                    {dish.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="gold-outline" size="lg" asChild>
              <Link to="/menu">
                View Full Menu
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-burgundy/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Ready for an Unforgettable Dining Experience?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Join us for a culinary journey through the rich flavors of Arabia.
              Reserve your table today and create memories that last a lifetime.
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/book">
                Book Your Table Now
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
