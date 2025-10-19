import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, MapPin, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Find Your Perfect Rental Home
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              Connect with property owners or discover your dream rental. Simple, fast, and secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                variant="accent"
                onClick={() => navigate("/auth")}
                className="text-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Find a Rental
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Home className="mr-2 h-5 w-5" />
                List Your Property
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RentalFinder?</h2>
            <p className="text-xl text-muted-foreground">Everything you need in one platform</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location-Based Search</h3>
              <p className="text-muted-foreground">
                Find properties near you with integrated Google Maps and precise location tracking.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Listing</h3>
              <p className="text-muted-foreground">
                Property owners can list rentals with photos, details, and pricing in minutes.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Verified</h3>
              <p className="text-muted-foreground">
                All users are authenticated. Direct communication between owners and renters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-accent-foreground/90 mb-8">
            Join thousands of happy renters and property owners today
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/auth")}
            className="text-lg shadow-lg"
          >
            Create Free Account
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
