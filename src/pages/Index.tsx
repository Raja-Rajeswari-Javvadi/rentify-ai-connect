import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Home, MapPin, Shield, Star, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";

const Index = () => {
  const navigate = useNavigate();

  // Sample featured properties
  const featuredProperties = [
    {
      title: "Modern Downtown Apartment",
      address: "123 Main St, Downtown",
      bedrooms: 2,
      rent: 1500,
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      hasWater: true,
      houseType: "2BHK",
    },
    {
      title: "Cozy Suburban Home",
      address: "456 Oak Avenue, Suburbia",
      bedrooms: 3,
      rent: 2000,
      imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      hasWater: true,
      houseType: "3BHK",
    },
    {
      title: "Luxury Penthouse Suite",
      address: "789 Skyline Blvd, Uptown",
      bedrooms: 4,
      rent: 3500,
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      hasWater: true,
      houseType: "4BHK",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero text-primary-foreground pt-16">
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Find Your Perfect
              <br />
              <span className="text-accent">Rental Home</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              Discover thousands of verified properties. Connect directly with owners. 
              Your dream home is just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                variant="accent"
                onClick={() => navigate("/finder-dashboard")}
                className="text-lg px-8 h-14 shadow-2xl hover:shadow-accent/50 transition-all duration-300"
              >
                <Search className="mr-2 h-6 w-6" />
                Browse Properties
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/add-property")}
                className="text-lg px-8 h-14 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                <Home className="mr-2 h-6 w-6" />
                List Your Property
              </Button>
            </div>
          </motion.div>

          {/* Search Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            <SearchFilters />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Home, value: "10K+", label: "Properties" },
              { icon: Users, value: "50K+", label: "Happy Renters" },
              { icon: Star, value: "4.9", label: "Average Rating" },
              { icon: TrendingUp, value: "98%", label: "Success Rate" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Featured Properties
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground"
            >
              Handpicked homes just for you
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <PropertyCard key={index} {...property} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => navigate("/finder-dashboard")}
              variant="outline"
              size="lg"
              className="shadow-md hover:shadow-lg transition-all duration-300"
            >
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Why Choose RentalFinder?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground"
            >
              Everything you need in one platform
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Location-Based Search",
                description: "Find properties near you with integrated maps and precise location tracking.",
                color: "primary",
              },
              {
                icon: Home,
                title: "Easy Listing",
                description: "Property owners can list rentals with photos, details, and pricing in minutes.",
                color: "accent",
              },
              {
                icon: Shield,
                title: "Secure & Verified",
                description: "All users are authenticated. Direct communication between owners and renters.",
                color: "primary",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="glass-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-${feature.color}/10 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`h-7 w-7 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-overlay opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-accent-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl text-accent-foreground/90 max-w-2xl mx-auto">
              Join thousands of happy renters and property owners today
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/auth")}
              className="text-lg h-14 px-10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              Create Free Account
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
