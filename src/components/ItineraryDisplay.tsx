import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, DollarSign, ExternalLink, Share2, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  duration: string;
  location: string;
  cost: string;
  bookingLink?: string;
  type: "sightseeing" | "dining" | "activity" | "transport" | "accommodation";
}

interface DayItinerary {
  day: number;
  date: string;
  activities: Activity[];
}

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

interface ItineraryDisplayProps {
  tripData: TripData;
  onBack: () => void;
}

// Mock data generator based on trip preferences
const generateItinerary = (tripData: TripData): DayItinerary[] => {
  const days = tripData.duration === "1-2" ? 2 : 
               tripData.duration === "3-5" ? 4 : 
               tripData.duration === "1-week" ? 7 : 5;

  const mockActivities: Activity[] = [
    {
      id: "1",
      title: "City Walking Tour",
      description: "Explore the historic downtown area with a local guide",
      time: "9:00 AM",
      duration: "3 hours",
      location: "Historic District",
      cost: "$35",
      bookingLink: "https://example.com/book-tour",
      type: "sightseeing"
    },
    {
      id: "2",
      title: "Local Food Market",
      description: "Taste authentic local cuisine and street food",
      time: "1:00 PM",
      duration: "2 hours",
      location: "Central Market",
      cost: "$25",
      type: "dining"
    },
    {
      id: "3",
      title: "Cultural Museum Visit",
      description: "Learn about local history and culture",
      time: "3:30 PM",
      duration: "2 hours",
      location: "National Museum",
      cost: "$20",
      bookingLink: "https://example.com/book-museum",
      type: "sightseeing"
    },
    {
      id: "4",
      title: "Adventure Sports",
      description: "Zip-lining through the forest canopy",
      time: "10:00 AM",
      duration: "4 hours",
      location: "Adventure Park",
      cost: "$85",
      bookingLink: "https://example.com/book-adventure",
      type: "activity"
    },
    {
      id: "5",
      title: "Fine Dining Experience",
      description: "Michelin-starred restaurant with local specialties",
      time: "7:00 PM",
      duration: "2.5 hours",
      location: "Le Gourmet",
      cost: "$120",
      bookingLink: "https://example.com/book-restaurant",
      type: "dining"
    }
  ];

  return Array.from({ length: days }, (_, index) => ({
    day: index + 1,
    date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString(),
    activities: mockActivities.slice(0, Math.min(3, mockActivities.length))
  }));
};

const getTypeColor = (type: Activity["type"]) => {
  switch (type) {
    case "sightseeing": return "bg-primary text-primary-foreground";
    case "dining": return "bg-secondary text-secondary-foreground";
    case "activity": return "bg-accent text-accent-foreground";
    case "transport": return "bg-muted text-muted-foreground";
    case "accommodation": return "bg-primary-glow text-white";
    default: return "bg-muted text-muted-foreground";
  }
};

const ItineraryDisplay = ({ tripData, onBack }: ItineraryDisplayProps) => {
  const [itinerary, setItinerary] = useState<DayItinerary[]>(generateItinerary(tripData));
  const { toast } = useToast();

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/shared-itinerary/${Math.random().toString(36).substr(2, 9)}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Itinerary Shared!",
      description: "Share link copied to clipboard",
    });
  };

  const handleEditActivity = (dayIndex: number, activityId: string) => {
    toast({
      title: "Edit Activity",
      description: "Edit functionality would open here",
    });
  };

  const handleDeleteActivity = (dayIndex: number, activityId: string) => {
    setItinerary(prev => prev.map((day, index) => 
      index === dayIndex 
        ? { ...day, activities: day.activities.filter(activity => activity.id !== activityId) }
        : day
    ));
    toast({
      title: "Activity Removed",
      description: "Activity has been removed from your itinerary",
    });
  };

  const totalCost = itinerary.reduce((total, day) => 
    total + day.activities.reduce((dayTotal, activity) => 
      dayTotal + parseFloat(activity.cost.replace('$', '')), 0
    ), 0
  );

  return (
    <div className="w-full max-w-6xl space-y-6">
      {/* Header */}
      <Card className="shadow-card-travel">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl bg-gradient-ocean bg-clip-text text-transparent">
                Your {tripData.location} Itinerary
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                {tripData.duration} • {tripData.groupSize} • {tripData.budget} budget
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="ghost" onClick={onBack}>
                Edit Plan
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {tripData.interests.slice(0, 5).map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
            {tripData.interests.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{tripData.interests.length - 5} more
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card-travel">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Duration</p>
                <p className="text-2xl font-bold">{itinerary.length} Days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card-travel">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Activities</p>
                <p className="text-2xl font-bold">
                  {itinerary.reduce((total, day) => total + day.activities.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card-travel">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Estimated Cost</p>
                <p className="text-2xl font-bold">${totalCost}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Itinerary Days */}
      <Tabs defaultValue="day-1" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
          {itinerary.map((day) => (
            <TabsTrigger key={day.day} value={`day-${day.day}`} className="text-xs">
              Day {day.day}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {itinerary.map((day) => (
          <TabsContent key={day.day} value={`day-${day.day}`} className="space-y-4">
            <Card className="shadow-card-travel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Day {day.day} - {day.date}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.activities.map((activity) => (
                  <Card key={activity.id} className="border border-border/50">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getTypeColor(activity.type)}>
                              {activity.type}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {activity.time} • {activity.duration}
                            </span>
                          </div>
                          <h4 className="font-semibold text-lg">{activity.title}</h4>
                          <p className="text-muted-foreground mb-2">{activity.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {activity.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {activity.cost}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {activity.bookingLink && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={activity.bookingLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3" />
                                Book
                              </a>
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditActivity(day.day - 1, activity.id)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteActivity(day.day - 1, activity.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ItineraryDisplay;