import { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FileText } from "lucide-react";
import { Document, Page } from "react-pdf";
import { Button } from "@/components/ui/button";
import foodPdf from "@/assets/menu/food.pdf";
import drinksPdf from "@/assets/menu/drinks.pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type TabKey = "food" | "beverage";

const useFlipbookSize = () => {
  const [size, setSize] = useState({ width: 650, height: 900, pageWidth: 520 });

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let width = Math.min(850, vw - 32);
      let height = Math.min(1100, vh - 200);

      if (vw < 640) {
        width = vw - 32;
        height = vh - 220;
      } else if (vw < 1024) {
        width = Math.min(800, vw - 64);
        height = Math.min(1000, vh - 220);
      }

      const pageWidth = vw < 640 ? width * 0.95 : width * 0.55;

      setSize({
        width: Math.max(380, width),
        height: Math.max(500, height),
        pageWidth,
      });
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return size;
};

/**
 * MenuViewer: Simple viewer with page curl animation on arrow clicks and pinch-to-zoom
 */
const MenuViewer = ({ pdfUrl, title }: { pdfUrl: string; title: string }) => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"left" | "right">("right");
  const [scale, setScale] = useState(1);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const { pageWidth } = useFlipbookSize();
  const lastDistance = useRef<number | null>(null);
  const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const minScale = 0.8;
  const maxScale = 3;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  // Track mount state and cleanup
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
        flipTimeoutRef.current = null;
      }
    };
  }, []);

  const changePage = (direction: "next" | "prev") => {
    // Strict checks to prevent double execution
    if (isFlipping || !isMountedRef.current || flipTimeoutRef.current !== null) {
      return;
    }

    const targetPage = direction === "next" ? currentPage + 1 : currentPage - 1;

    if (direction === "next" && currentPage < numPages) {
      setFlipDirection("left");
      setSwipeProgress(1);
      setIsFlipping(true);
      
      flipTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        
        setCurrentPage(targetPage);
        setSwipeProgress(0);
        setIsFlipping(false);
        flipTimeoutRef.current = null;
      }, 700);
    } else if (direction === "prev" && currentPage > 1) {
      setFlipDirection("right");
      setSwipeProgress(1);
      setIsFlipping(true);
      
      flipTimeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        
        setCurrentPage(targetPage);
        setSwipeProgress(0);
        setIsFlipping(false);
        flipTimeoutRef.current = null;
      }, 700);
    }
  };

  // Touch events for pinch-to-zoom only
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      lastDistance.current = distance;
    }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && lastDistance.current !== null) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      const delta = distance - lastDistance.current;
      const scaleChange = delta * 0.01;
      
      setScale((prevScale) => {
        const newScale = prevScale + scaleChange;
        return Math.max(minScale, Math.min(maxScale, newScale));
      });
      
      lastDistance.current = distance;
    }
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) {
      lastDistance.current = null;
    }
  };

  // Mouse wheel zoom
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      setScale((prevScale) => {
        const newScale = prevScale + delta;
        return Math.max(minScale, Math.min(maxScale, newScale));
      });
    }
  };

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < numPages;

  // Calculate curl effect
  const curlAngle = swipeProgress * 180;
  const shadowOpacity = swipeProgress * 0.5;

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className="relative flex items-center justify-center py-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
        style={{ 
          touchAction: scale > 1 ? "auto" : "pan-y",
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          perspective: "2500px",
          minHeight: "60vh",
          overflow: "hidden",
        }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(err) => console.error("PDF load error:", err)}
          onSourceError={(err) => console.error("PDF source error:", err)}
          loading={
            <div className="flex items-center justify-center" style={{ minHeight: "60vh" }}>
              <FileText className="w-14 h-14 animate-spin text-gold" />
            </div>
          }
        >
          {numPages > 0 && (
            <div 
              className="relative"
              style={{
                transformStyle: "preserve-3d",
                maxWidth: "100%",
              }}
            >
              <div style={{ position: "relative" }}>
                {/* Current page with curl effect */}
                <div
                  style={{
                    transform: flipDirection === "left" 
                      ? `rotateY(-${curlAngle}deg)`
                      : `rotateY(${curlAngle}deg)`,
                    transformOrigin: flipDirection === "left" ? "right center" : "left center",
                    transition: (isFlipping && swipeProgress >= 1) ? "transform 0.7s ease-in-out" : swipeProgress === 0 ? "transform 0.3s ease-out" : "none",
                    backfaceVisibility: "hidden",
                    visibility: curlAngle >= 90 ? "hidden" : "visible",
                    filter: `brightness(${1 - shadowOpacity * 0.3})`,
                  }}
                >
                  <Page
                    pageNumber={currentPage}
                    width={Math.min(pageWidth * 1.2 * scale, (window.innerWidth - 32) * scale)}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                  
                  {/* Curl shadow overlay */}
                  {swipeProgress > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: flipDirection === "left" ? "auto" : 0,
                        right: flipDirection === "left" ? 0 : "auto",
                        width: `${swipeProgress * 50}%`,
                        height: "100%",
                        background: `linear-gradient(to ${flipDirection === "left" ? "left" : "right"}, rgba(0,0,0,${shadowOpacity}), transparent)`,
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>

                {/* Next/Previous page (revealed during curl) */}
                {swipeProgress > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      transform: flipDirection === "left"
                        ? `rotateY(${180 - curlAngle}deg)`
                        : `rotateY(${-180 + curlAngle}deg)`,
                      transformOrigin: flipDirection === "left" ? "left center" : "right center",
                      transition: (isFlipping && swipeProgress >= 1) ? "transform 0.7s ease-in-out" : "none",
                      backfaceVisibility: "hidden",
                      opacity: curlAngle >= 90 ? 1 : 0,
                    }}
                  >
                    <Page
                      pageNumber={flipDirection === "left" ? Math.min(currentPage + 1, numPages) : Math.max(currentPage - 1, 1)}
                      width={Math.min(pageWidth * 1.2 * scale, (window.innerWidth - 32) * scale)}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </Document>
      </div>

      {/* Page navigation below the menu */}
      {numPages > 0 && (
        <div className="flex items-center justify-center gap-3 mt-6 mb-4">
          <button
            onClick={() => changePage("prev")}
            disabled={!canGoPrev || isFlipping}
            className="bg-black/10 backdrop-blur-sm text-gold p-2.5 rounded-full transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none enabled:hover:bg-black/20 enabled:hover:scale-110"
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="bg-black/10 backdrop-blur-sm px-6 py-2.5 rounded-full">
            <span className="text-sm text-gold font-medium">
              {currentPage} / {numPages}
            </span>
          </div>

          <button
            onClick={() => changePage("next")}
            disabled={!canGoNext || isFlipping}
            className="bg-black/10 backdrop-blur-sm text-gold p-2.5 rounded-full transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none enabled:hover:bg-black/20 enabled:hover:scale-110"
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

const Menu = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("food");

  const menus: Record<TabKey, { title: string; pdfUrl: string }> = {
    food: {
      title: "Food Menu",
      pdfUrl: foodPdf,
    },
    beverage: {
      title: "Beverage Menu",
      pdfUrl: drinksPdf,
    },
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-16 bg-pattern-arabesque">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold tracking-[0.25em] uppercase mb-2">
            Discover
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gradient-gold mb-4">
            Our Menu
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Authentic Arabian dishes prepared with the finest ingredients
          </p>
        </div>
      </section>

      {/* Menu Tabs + viewers */}
      <section className="py-2 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6 md:mb-8">
            <Button
              variant={activeTab === "food" ? "gold" : "outline"}
              size="xl"
              className="px-10 py-4 md:px-12 md:py-6 text-base md:text-lg font-heading rounded-full transition-transform duration-200 hover:scale-[1.02]"
              onClick={() => setActiveTab("food")}
            >
              Food
            </Button>

            <Button
              variant={activeTab === "beverage" ? "gold" : "outline"}
              size="xl"
              className="px-10 py-4 md:px-12 md:py-6 text-base md:text-lg font-heading rounded-full transition-transform duration-200 hover:scale-[1.02]"
              onClick={() => setActiveTab("beverage")}
            >
              Beverages
            </Button>
          </div>

          {activeTab === "food" && (
            <MenuViewer
              key="food-menu"
              pdfUrl={menus.food.pdfUrl}
              title={menus.food.title}
            />
          )}

          {activeTab === "beverage" && (
            <MenuViewer
              key="beverage-menu"
              pdfUrl={menus.beverage.pdfUrl}
              title={menus.beverage.title}
            />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
