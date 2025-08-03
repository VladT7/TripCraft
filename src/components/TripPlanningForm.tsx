import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Users, Calendar, DollarSign, Heart, Accessibility } from "lucide-react";

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

interface TripPlanningFormProps {
  onSubmit: (data: TripData) => void;
}

const interestOptions = [
  "Adventure Sports", "Cultural Sites", "Museums", "Food & Dining", 
  "Nightlife", "Shopping", "Nature & Hiking", "Beaches", 
  "Photography", "Local Markets", "Historical Sites", "Art Galleries"
];

const TripPlanningForm = ({ onSubmit }: TripPlanningFormProps) => {
  const [formData, setFormData] = useState<TripData>({
    ageRange: "",
    groupSize: "",
    location: "",
    duration: "",
    interests: [],
    mobility: "",
    budget: "",
    additionalNotes: ""
  });

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl shadow-card-travel">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-ocean bg-clip-text text-transparent">
          Plan Your Perfect Trip
        </CardTitle>
        <CardDescription className="text-lg">
          Tell us about your travel preferences and we'll create a personalized itinerary
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age Range */}
            <div className="space-y-2">
              <Label htmlFor="ageRange" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Age Range
              </Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, ageRange: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-25">18-25</SelectItem>
                  <SelectItem value="26-35">26-35</SelectItem>
                  <SelectItem value="36-50">36-50</SelectItem>
                  <SelectItem value="51-65">51-65</SelectItem>
                  <SelectItem value="65+">65+</SelectItem>
                  <SelectItem value="mixed">Mixed Ages</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Group Size */}
            <div className="space-y-2">
              <Label htmlFor="groupSize" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Group Size
              </Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, groupSize: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Number of travelers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Solo (1)</SelectItem>
                  <SelectItem value="couple">Couple (2)</SelectItem>
                  <SelectItem value="small">Small Group (3-6)</SelectItem>
                  <SelectItem value="large">Large Group (7+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Destination
            </Label>
            <Input
              id="location"
              placeholder="Where are you traveling to?"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              required
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Trip Duration
            </Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="How long is your trip?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 days</SelectItem>
                <SelectItem value="3-5">3-5 days</SelectItem>
                <SelectItem value="1-week">1 week</SelectItem>
                <SelectItem value="2-weeks">2 weeks</SelectItem>
                <SelectItem value="3-weeks">3 weeks</SelectItem>
                <SelectItem value="1-month">1 month+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              Interests (select all that apply)
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                  />
                  <Label htmlFor={interest} className="text-sm">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Mobility */}
          <div className="space-y-2">
            <Label htmlFor="mobility" className="flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-primary" />
              Mobility Requirements
            </Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, mobility: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select mobility level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High mobility - lots of walking/hiking</SelectItem>
                <SelectItem value="moderate">Moderate mobility - some walking</SelectItem>
                <SelectItem value="low">Low mobility - minimal walking</SelectItem>
                <SelectItem value="wheelchair">Wheelchair accessible required</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Budget Range (per person)
            </Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget ($0-$50/day)</SelectItem>
                <SelectItem value="mid">Mid-range ($51-$150/day)</SelectItem>
                <SelectItem value="luxury">Luxury ($151-$300/day)</SelectItem>
                <SelectItem value="ultra">Ultra-luxury ($300+/day)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any special requests, dietary restrictions, or other preferences?"
              value={formData.additionalNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            variant="default"
            disabled={!formData.location || !formData.duration}
          >
            Create My Itinerary
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TripPlanningForm;