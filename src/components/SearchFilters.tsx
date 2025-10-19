import { useState } from "react";
import { Search, MapPin, DollarSign, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const SearchFilters = () => {
  const [location, setLocation] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = () => {
    console.log({ location, minRent, maxRent, bedrooms });
    // Add search logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 shadow-xl max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12 bg-background"
          />
        </div>

        {/* Min Rent */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="number"
            placeholder="Min rent"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value)}
            className="pl-10 h-12 bg-background"
          />
        </div>

        {/* Max Rent */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="number"
            placeholder="Max rent"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            className="pl-10 h-12 bg-background"
          />
        </div>

        {/* Bedrooms */}
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger className="h-12 bg-background">
            <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Bedroom</SelectItem>
            <SelectItem value="2">2 Bedrooms</SelectItem>
            <SelectItem value="3">3 Bedrooms</SelectItem>
            <SelectItem value="4">4+ Bedrooms</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        variant="accent"
        size="lg"
        className="w-full mt-4 h-12 text-base shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Search className="mr-2 h-5 w-5" />
        Search Properties
      </Button>
    </motion.div>
  );
};

export default SearchFilters;
