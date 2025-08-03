import { useState } from "react";
import { Button } from "@/components/ui/button";
import TripPlanningForm from "@/components/TripPlanningForm";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import heroImage from "@/assets/travel-hero.jpg";
import { Plane, Globe, Calendar, Users } from "lucide-react";

interface TripData {
  ageRange: string;
  groupSize: string;
  location: string;
  duration: string;
  interests: string[];
  mobility: string;
  budget: string;
  additionalNotes: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'planning' | 'itinerary'>('welcome');
  const [tripData, setTripData] = useState<TripData | null>(null);

  const handleFormSubmit = (data: TripData) => {
    setTripData(data);
    setCurrentStep('itinerary');
  };

  const handleBackToPlanning = () => {
    setCurrentStep('planning');
  };

  const handleStartPlanning = () => {
    setCurrentStep('planning');
  };

  if (currentStep === 'itinerary' && tripData) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <ItineraryDisplay tripData={tripData} onBack={handleBackToPlanning} />
        </div>
      </div>
    );
  }

  if (currentStep === 'planning') {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('welcome')}
              className="mb-4"
            >
              ← Back to Home
            </Button>
          </div>
          <TripPlanningForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-70"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Plan Your Perfect
            <span className="block bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Create personalized itineraries, discover amazing destinations, and share your travel plans with friends and family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleStartPlanning}
              className="text-lg px-8 py-4"
            >
              Start Planning
              <Plane className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
              Why Choose TripCraft?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make travel planning effortless with intelligent recommendations and collaborative tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-ocean rounded-xl flex items-center justify-center shadow-travel group-hover:shadow-glow transition-smooth">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-muted-foreground">
                AI-powered suggestions based on your preferences, budget, and travel style.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-sunset rounded-xl flex items-center justify-center shadow-travel group-hover:shadow-glow transition-smooth">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Scheduling</h3>
              <p className="text-muted-foreground">
                Drag-and-drop itinerary builder with real-time availability and booking.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-nature rounded-xl flex items-center justify-center shadow-travel group-hover:shadow-glow transition-smooth">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Group Collaboration</h3>
              <p className="text-muted-foreground">
                Share plans with your travel group and collaborate on the perfect itinerary.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-xl flex items-center justify-center shadow-travel group-hover:shadow-glow transition-smooth">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">One-Click Booking</h3>
              <p className="text-muted-foreground">
                Direct booking links for flights, hotels, activities, and restaurants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-ocean text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Plan Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of travelers who trust TripCraft to create unforgettable experiences.
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleStartPlanning}
            className="text-lg px-8 py-4"
          >
            Get Started for Free
            <Plane className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
