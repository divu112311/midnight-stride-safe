import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, MapPin, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const requestLocationPermission = async () => {
    try {
      const permission = await navigator.geolocation.getCurrentPosition(
        () => {
          setLocationGranted(true);
          toast({
            title: "Location Access Granted",
            description: "We can now provide you with accurate safety routes.",
          });
        },
        (error) => {
          toast({
            title: "Location Access Required",
            description: "Please enable location services for safety features to work.",
            variant: "destructive",
          });
        }
      );
    } catch (error) {
      toast({
        title: "Location Error",
        description: "Unable to access location services.",
        variant: "destructive",
      });
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome to Midnight Mile!",
      });
      navigate("/home");
    }, 2000);
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful", 
        description: "Welcome to Midnight Mile!",
      });
      navigate("/home");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-safety rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-outfit text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="font-inter text-muted-foreground">Sign in to continue your safe journey</p>
        </div>

        {/* Location Permission Card */}
        {!locationGranted && (
          <Card className="border-safety-amber/30 bg-safety-amber/5">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-safety-amber mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-inter font-medium text-foreground">Location Access Required</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    We need your location to provide accurate safety routes and emergency features.
                  </p>
                  <Button onClick={requestLocationPermission} variant="warning" size="sm">
                    Enable Location
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="font-outfit">Sign In</CardTitle>
            <CardDescription>Choose your preferred sign-in method</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-4">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-inter">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" variant="safety" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In with Email"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="phone" className="space-y-4">
                <form onSubmit={handlePhoneLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-inter">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" variant="safety" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending Code..." : "Send Verification Code"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="bg-soft-section">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-inter text-foreground mb-1">Your Privacy Matters</p>
                <p className="text-muted-foreground">
                  We only use your location data to provide safety features. All data is encrypted and never shared.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Landing */}
        <div className="text-center">
          <Button asChild variant="ghost" className="font-inter">
            <Link to="/">← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;