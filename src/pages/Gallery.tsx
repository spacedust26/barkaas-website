import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<{ id: number; src: string; alt: string; category: string } | null>(null);
  const [galleryImages, setGalleryImages] = useState<{ id: number; src: string; alt: string; category: string }[]>([]);

  useEffect(() => {
     const ambienceModules = import.meta.glob<{ default: string }>('/src/assets/ambience/*.{jpg,jpeg,png,webp}', { eager: true });
    const foodModules = import.meta.glob<{ default: string }>('/src/assets/food/*.{jpg,jpeg,png,webp}', { eager: true });

    const ambienceImages = Object.entries(ambienceModules).map(([path, mod], index) => {
      const fileName = path.split('/').pop()?.split('.')[0] || `ambience-${index}`;
      const url = (mod as { default: string }).default;
      return {
        id: index + 1,
        src: url,
        alt: `${fileName.charAt(0).toUpperCase() + fileName.slice(1)} - Restaurant Interior`,
        category: "Ambiance" as const
      };
    });

    const foodImages = Object.entries(foodModules).map(([path, mod], index) => {
      const fileName = path.split('/').pop()?.split('.')[0] || `food-${index}`;
      const url = (mod as { default: string }).default;
      return {
        id: ambienceImages.length + index + 1,
        src: url,
        alt: `${fileName.charAt(0).toUpperCase() + fileName.slice(1)} Dish`,
        category: "Food" as const
      };
    });

    setGalleryImages([...ambienceImages, ...foodImages]);
  }, []);

  const categories = ["All", "Food", "Ambiance"];

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-pattern-arabesque">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase mb-2">
            Visual Journey
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient-gold mb-4">
            Our Gallery
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the beauty of our restaurant, from our elegant interiors
            to our exquisite culinary creations.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-2">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === category
                    ? "bg-gold text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-gold/20 hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={cn(
                  "group relative overflow-hidden rounded-lg cursor-pointer",
                  index === 0 && "sm:col-span-2 sm:row-span-2"
                )}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={cn(
                    "w-full object-cover transition-transform duration-500 group-hover:scale-110",
                    index === 0 ? "h-full min-h-[400px]" : "aspect-square"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-foreground font-medium">{image.alt}</p>
                  <p className="text-gold text-sm">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-foreground hover:text-gold transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
