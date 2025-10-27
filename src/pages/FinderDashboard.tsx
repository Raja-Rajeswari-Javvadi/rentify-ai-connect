import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import PropertyCard from "@/components/PropertyCard";

const FinderDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role !== "finder") {
        navigate("/owner-dashboard");
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_available', true);

      if (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to load properties");
        return;
      }

      setProperties(data || []);
    };

    if (user) {
      fetchProperties();
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary">RentalFinder</h1>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Find Your Perfect Rental</h2>
          <p className="text-muted-foreground mt-1">Browse available properties</p>
        </div>

        {properties.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No properties available yet. Check back soon!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <PropertyCard
                key={property.id}
                title={property.title}
                address={property.address}
                bedrooms={property.bedrooms}
                rent={property.rent_per_month}
                imageUrl={property.image_url}
                hasWater={property.has_water_facility}
                houseType={property.house_type}
                index={index}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FinderDashboard;
