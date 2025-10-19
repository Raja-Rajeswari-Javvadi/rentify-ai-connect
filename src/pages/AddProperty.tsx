import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

// Define our type for property form data
type FormData = {
  title: string;
  description: string;
  address: string;
  houseType: string;
  bedrooms: string;
  rentPerMonth: string;
  hasWaterFacility: boolean;
  meterType: string;
  imageFile: File | null;      // new: the selected file
  imageUrl: string | null;     // new: existing url (for update mode or preview)
};

const AddOrUpdateProperty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const propertyId = params.get("id"); // if present, we are in update mode

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    address: "",
    houseType: "",
    bedrooms: "",
    rentPerMonth: "",
    hasWaterFacility: false,
    meterType: "",
    imageFile: null,
    imageUrl: null
  });

  // On mount: if propertyId exists → fetch the property and fill the form
  useEffect(() => {
    if (!propertyId) return;

    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", propertyId)
        .single();

      if (error) {
        toast.error("Failed to load property");
        setLoading(false);
        return;
      }
      const prop = data;
      setFormData({
        title: prop.title,
        description: prop.description ?? "",
        address: prop.address,
        houseType: prop.house_type,
        bedrooms: prop.bedrooms.toString(),
        rentPerMonth: prop.rent_per_month.toString(),
        hasWaterFacility: prop.has_water_facility,
        meterType: prop.meter_type ?? "",
        imageFile: null,
        imageUrl: prop.image_url ?? null
      });
      setLoading(false);
    };
    fetch();
  }, [propertyId]);

  // Handler for file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        imageFile: file,
        imageUrl: objectUrl // preview
      });
    }
  };

  // Handler to remove the selected image
  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      imageFile: null,
      imageUrl: null
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let finalImageUrl = formData.imageUrl; // might already be existing if update and no new file

      // If a new file is selected, upload it
      if (formData.imageFile) {
        const file = formData.imageFile;
        const filePath = `properties/${user.id}/${Date.now()}_${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(filePath, file, { contentType: file.type, upsert: true });

        if (uploadError) throw uploadError;

        // Getting public URL for the uploaded file
        const { data: publicData } = supabase.storage
          .from("property-images")
          .getPublicUrl(uploadData.path);

        finalImageUrl = publicData.publicUrl;
      }

      const newRecord = {
        owner_id: user.id,
        title: formData.title,
        description: formData.description,
        address: formData.address,
        house_type: formData.houseType as
          | "1BHK"
          | "2BHK"
          | "3BHK"
          | "4BHK"
          | "Studio"
          | "Villa",
        bedrooms: parseInt(formData.bedrooms),
        rent_per_month: parseFloat(formData.rentPerMonth),
        has_water_facility: formData.hasWaterFacility,
        meter_type: formData.meterType,
        image_url: finalImageUrl
      };

      if (propertyId) {
        // Update mode
        const { error } = await supabase
          .from("properties")
          .update(newRecord)
          .eq("id", propertyId);
        if (error) throw error;
        toast.success("Property updated successfully!");
      } else {
        // Add mode
        const { error } = await supabase
          .from("properties")
          .insert([newRecord]);
        if (error) throw error;
        toast.success("Property added successfully!");
      }

      navigate("/owner-dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to save property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={() => navigate("/owner-dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {propertyId ? "Update Property" : "Add New Property"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter property title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter property description"
                />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter property address"
                  required
                />
              </div>

              {/* House Type */}
              <div>
                <Label htmlFor="houseType">House Type *</Label>
                <Select
                  id="houseType"
                  value={formData.houseType}
                  onValueChange={(value) => setFormData({ ...formData, houseType: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select house type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1BHK">1BHK</SelectItem>
                    <SelectItem value="2BHK">2BHK</SelectItem>
                    <SelectItem value="3BHK">3BHK</SelectItem>
                    <SelectItem value="4BHK">4BHK</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bedrooms */}
              <div>
                <Label htmlFor="bedrooms">Number of Bedrooms *</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  placeholder="Enter number of bedrooms"
                  required
                />
              </div>

              {/* Rent Per Month */}
              <div>
                <Label htmlFor="rentPerMonth">Rent Per Month *</Label>
                <Input
                  id="rentPerMonth"
                  type="number"
                  value={formData.rentPerMonth}
                  onChange={(e) => setFormData({ ...formData, rentPerMonth: e.target.value })}
                  placeholder="Enter rent amount"
                  required
                />
              </div>

              {/* Water Facility */}
              <div className="flex items-center space-x-4">
                <Label htmlFor="hasWaterFacility">Has Water Facility</Label>
                <Switch
                  id="hasWaterFacility"
                  checked={formData.hasWaterFacility}
                  onCheckedChange={(checked) => setFormData({ ...formData, hasWaterFacility: checked })}
                />
              </div>

              {/* Meter Type */}
              <div>
                <Label htmlFor="meterType">Meter Type *</Label>
                <Select
                  id="meterType"
                  value={formData.meterType}
                  onValueChange={(value) => setFormData({ ...formData, meterType: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select meter type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Water">Water</SelectItem>
                    <SelectItem value="Gas">Gas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Upload Image *</Label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100"
                  required={!propertyId} // if adding new, it's required; if updating it's optional
                />
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="max-w-full h-auto rounded"
                    />
                    <div className="mt-2">
                      <Button variant="outline" onClick={handleRemoveImage}>
                        Remove / Re-upload
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading
                    ? (propertyId ? "Updating..." : "Adding...")
                    : (propertyId ? "Update Property" : "Add Property")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/owner-dashboard")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddOrUpdateProperty;
