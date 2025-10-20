import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, Plus } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import PropertyList from "@/components/ui/PropertyList";

const OwnerDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [housesData,setHousesData] = useState([])
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
      if (profile?.role !== "owner") {
        navigate("/finder-dashboard");
        return;
      }

      setUser(session.user);
      setLoading(false);
    };
    checkUser();
   

    // Call the function
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);
   async function fetchPropertiesForLoggedInUser() {
      // Get the currently authenticated user
      
  console.log(user,"lllllllll")
      if (!user) {
        console.log("No user is logged in.");
        return;
      }

      try {
        // Fetch properties where owner_id matches the logged-in user's id
        const { data, error } = await supabase
          .from('properties')
          .select('*') // Select all columns (you can specify the columns you want)
          .eq('owner_id', user.id); // Filter by owner_id

        if (error) {
          console.error("Error fetching properties:", error);
          return;
        }
        setHousesData(data)
        // Log the fetched properties
        console.log("Fetched properties:", data);
        return data;
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    }
    useEffect(() => {

      fetchPropertiesForLoggedInUser();
    }, [user])
    const handleUpdate = (property) => {
    // Navigate to update form or show modal
    console.log('Update clicked for:', property);
  };
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this property?');
    if (!confirmed) return;

    const { error } = await supabase.from('properties').delete().eq('id', id);

    if (error) {
      console.error('Delete error:', error);
    } else {
      setHousesData((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
    toast.success("Logged out successfully");
  };

  console.log(user,"lllllllll")
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">My Properties</h2>
            <p className="text-muted-foreground mt-1">Manage your rental listings</p>
          </div>
          <Button variant="accent" size="lg" onClick={() => navigate("/add-property")}>
            <Plus className="h-5 w-5 mr-2" />
            Add Property
          </Button>
        </div>
        <PropertyList data={housesData} onUpdate={handleUpdate} onDelete={handleDelete} />
        {/* <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No properties yet. Click "Add Property" to list your first rental!
          </p>
        </Card> */}
      </main>
    </div>
  );
};

export default OwnerDashboard;
