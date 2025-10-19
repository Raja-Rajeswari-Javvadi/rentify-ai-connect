-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user roles enum
CREATE TYPE user_role AS ENUM ('owner', 'finder');

-- Create house types enum  
CREATE TYPE house_type AS ENUM ('1BHK', '2BHK', '3BHK', '4BHK', 'Studio', 'Villa');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create properties table
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,  -- Property description (optional)
  address TEXT NOT NULL,  -- Property address (required)
  latitude DECIMAL(10, 8),  -- Latitude for geolocation
  longitude DECIMAL(11, 8),  -- Longitude for geolocation
  house_type house_type NOT NULL,  -- Enum type for house type (e.g., 1BHK, Studio, etc.)
  bedrooms INTEGER NOT NULL,  -- Number of bedrooms
  rent_per_month DECIMAL(10, 2) NOT NULL,  -- Rent price per month
  has_water_facility BOOLEAN DEFAULT FALSE,  -- Boolean flag for water facility
  meter_type TEXT,  -- Meter type (e.g., Electric, Gas)
  image_url TEXT,  -- URL for the property image
  is_available BOOLEAN DEFAULT TRUE,  -- Property availability (True/False)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),  -- Timestamp for record creation
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  -- Timestamp for last update
);

-- Enable RLS on properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "Anyone can view available properties"
  ON public.properties FOR SELECT
  USING (is_available = TRUE);

CREATE POLICY "Owners can view their own properties"
  ON public.properties FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can insert their own properties"
  ON public.properties FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their own properties"
  ON public.properties FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their own properties"
  ON public.properties FOR DELETE
  USING (auth.uid() = owner_id);

-- Create property_images table
CREATE TABLE public.property_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on property_images
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;

-- Property images policies
CREATE POLICY "Anyone can view property images"
  ON public.property_images FOR SELECT
  USING (TRUE);

CREATE POLICY "Owners can insert images for their properties"
  ON public.property_images FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.properties
      WHERE id = property_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Owners can delete their property images"
  ON public.property_images FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.properties
      WHERE id = property_id AND owner_id = auth.uid()
    )
  );

-- Create booking_requests table
CREATE TABLE public.booking_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  finder_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on booking_requests
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

-- Booking requests policies
CREATE POLICY "Finders can view their own requests"
  ON public.booking_requests FOR SELECT
  USING (auth.uid() = finder_id);

CREATE POLICY "Owners can view requests for their properties"
  ON public.booking_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.properties
      WHERE id = property_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Finders can create booking requests"
  ON public.booking_requests FOR INSERT
  WITH CHECK (auth.uid() = finder_id);

CREATE POLICY "Owners can update requests for their properties"
  ON public.booking_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.properties
      WHERE id = property_id AND owner_id = auth.uid()
    )
  );

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('property-images', 'property-images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for property images
CREATE POLICY "Anyone can view property images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'property-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can delete their own property images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'property-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();