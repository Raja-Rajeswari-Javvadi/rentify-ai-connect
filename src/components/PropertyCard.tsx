import { motion } from "framer-motion";
import { MapPin, Bed, DollarSign, Droplet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  title: string;
  address: string;
  bedrooms: number;
  rent: number;
  imageUrl: string;
  hasWater: boolean;
  houseType: string;
  index: number;
}

const PropertyCard = ({
  title,
  address,
  bedrooms,
  rent,
  imageUrl,
  hasWater,
  houseType,
  index,
}: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full group cursor-pointer glass-card hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-accent text-accent-foreground font-semibold shadow-lg">
              {houseType}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5 space-y-4">
          {/* Title */}
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">{address}</span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-primary" />
              <span className="font-medium">{bedrooms} Bed</span>
            </div>
            {hasWater && (
              <div className="flex items-center gap-1.5 text-primary">
                <Droplet className="h-4 w-4" />
                <span className="text-xs font-medium">Water</span>
              </div>
            )}
          </div>

          {/* Rent */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-baseline gap-1">
              <DollarSign className="h-5 w-5 text-accent" />
              <span className="text-2xl font-bold text-foreground">{rent}</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
