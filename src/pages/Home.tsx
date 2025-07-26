import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Shield, 
  Navigation, 
  Phone, 
  Hospital, 
  Store,
  AlertTriangle,
  CheckCircle,
  Menu,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [destination, setDestination] = useState("");
  const [showRoute, setShowRoute] = useState(false);
  const [safetyScore, setSafetyScore] = useState(85);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!destination.trim()) return;
    setShowRoute(true);
    setSafetyScore(Math.floor(Math.random() * 30) + 70); // Random score 70-100
  };

  const startCompanion = () => {
    navigate("/companion");
  };

  const nearbySpots = [
    { type: "Police", icon: Shield, distance: "0.2 mi", color: "primary" },
    { type: "Hospital", icon: Hospital, distance: "0.4 mi", color: "trusted-coral" },
    { type: "24/7 Store", icon: Store, distance: "0.1 mi", color: "safety-amber" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="font-outfit text-xl font-semibold text-foreground">Midnight Mile</h1>
        </div>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Where to? (SF or Delhi only)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 h-12 text-lg"
          />
        </div>
        
        {destination && (
          <Button onClick={handleSearch} variant="safety" className="w-full h-12 text-lg">
            Find Safe Route
          </Button>
        )}
      </div>

      {/* Map Area */}
      <div className="mx-4 mb-4">
        <Card className="h-96 relative overflow-hidden">
          <CardContent className="p-0 h-full">
            {/* Simulated Map */}
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 text-primary mx-auto" />
                <p className="font-inter text-muted-foreground">
                  {showRoute ? "Showing safe route to " + destination : "Your current location"}
                </p>
              </div>
              
              {/* Safe Spots Overlay */}
              {showRoute && (
                <>
                  <div className="absolute top-4 left-4 bg-primary text-white p-2 rounded-full">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="absolute top-12 right-8 bg-trusted-coral text-white p-2 rounded-full">
                    <Hospital className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-8 left-8 bg-safety-amber text-white p-2 rounded-full">
                    <Store className="w-4 h-4" />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Route Info */}
      {showRoute && (
        <div className="px-4 space-y-4">
          {/* Safety Score */}
          <Card className="bg-soft-section">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-outfit font-semibold text-foreground">Safety Score</h3>
                  <p className="text-sm text-muted-foreground">Based on lighting, traffic, and crime data</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${safetyScore >= 80 ? 'text-green-600' : safetyScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {safetyScore}%
                  </div>
                  <Badge variant={safetyScore >= 80 ? "default" : safetyScore >= 60 ? "secondary" : "destructive"}>
                    {safetyScore >= 80 ? "Safe" : safetyScore >= 60 ? "Caution" : "High Risk"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nearby Safe Spots */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-outfit font-semibold text-foreground mb-4">Nearby Safe Spots</h3>
              <div className="space-y-3">
                {nearbySpots.map((spot, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${spot.color}`}>
                      <spot.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-inter font-medium text-foreground">{spot.type}</p>
                      <p className="text-sm text-muted-foreground">{spot.distance} away</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Start Journey */}
          <div className="space-y-3 pb-8">
            <Button onClick={startCompanion} variant="safety" className="w-full h-14 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Activate AI Companion
            </Button>
            <Button variant="outline" className="w-full">
              <Navigation className="w-4 h-4 mr-2" />
              Start Navigation Only
            </Button>
          </div>
        </div>
      )}

      {/* Quick Actions (when no route) */}
      {!showRoute && (
        <div className="px-4 pb-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-outfit font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12">
                  <Shield className="w-4 h-4 mr-2" />
                  Find Safe Spots
                </Button>
                <Button variant="coral" className="h-12">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Home;