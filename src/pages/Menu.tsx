import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("food");

  // PDF menu configurations
  const menus = {
    food: {
      title: "Food Menu",
      pdfUrl: "src/assets/menu/food.pdf",
    },
    beverage: {
      title: "Beverage Menu",
      pdfUrl: "src/assets/menu/drinks.pdf",
    }
  };

  const FlipBook = ({ pdfUrl, title }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(8); // Update based on your PDF

    return (
      <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        {/* PDF Viewer Container */}
        <div className="relative bg-background aspect-[3/4] flex items-center justify-center">
          <iframe
            src={`${pdfUrl}#page=${currentPage}`}
            className="w-full h-full"
            title={title}
          />
          
          {/* Page overlay for flip effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-y-0 left-0 w-1/2 border-r-2 border-gold/20"></div>
          </div>
        </div>

      </div>
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-pattern-arabesque">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase mb-2">
            Discover
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient-gold mb-4">
            Our Menu
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A carefully curated selection of authentic Arabian dishes, prepared with
            the finest ingredients and traditional cooking methods.
          </p>
        </div>
      </section>

      {/* Menu Flipbooks */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Tab Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("food")}
              className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "food"
                  ? "bg-gold text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-gold/20 hover:text-foreground"
              }`}
            >
              <span>{menus.food.title}</span>
            </button>
            <button
              onClick={() => setActiveTab("beverage")}
              className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "beverage"
                  ? "bg-gold text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-gold/20 hover:text-foreground"
              }`}
            >
              <span>{menus.beverage.title}</span>
            </button>
          </div>

          {/* Flipbook Display */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "food" && (
              <FlipBook 
                pdfUrl={menus.food.pdfUrl} 
                title={menus.food.title}
              />
            )}
            {activeTab === "beverage" && (
              <FlipBook 
                pdfUrl={menus.beverage.pdfUrl} 
                title={menus.beverage.title}
              />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Menu;