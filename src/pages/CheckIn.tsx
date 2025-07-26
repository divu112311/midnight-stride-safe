import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, Clock, Users, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CheckIn = () => {
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds countdown
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (hasCheckedIn) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Auto-notify contacts when timer expires
          notifyContacts();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasCheckedIn]);

  const markSafe = () => {
    setHasCheckedIn(true);
    toast({
      title: "Marked as Safe!",
      description: "Your trusted contacts have been notified of your safe arrival.",
    });
  };

  const notifyContacts = () => {
    if (!hasCheckedIn) {
      toast({
        title: "Contacts Notified",
        description: "No response detected. Your emergency contacts have been alerted.",
        variant: "destructive",
      });
    }
  };

  const goHome = () => {
    navigate("/home");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasCheckedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-outfit text-3xl font-bold text-foreground">You're Safe!</h1>
            <p className="font-inter text-muted-foreground">
              Great job! Your journey is complete and your contacts have been notified.
            </p>
          </div>

          <Card className="bg-soft-section">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="font-inter font-medium text-foreground">Journey Summary</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Arrival Time</p>
                    <p className="font-medium text-foreground">{new Date().toLocaleTimeString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Safety Score</p>
                    <p className="font-medium text-green-600">Safe ✓</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={goHome} variant="safety" className="w-full">
              Plan Another Journey
            </Button>
            <Button variant="outline" className="w-full">
              Share Feedback
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 bg-gradient-safety text-white">
        <div className="flex items-center space-x-3">
          <MapPin className="w-6 h-6" />
          <div>
            <h1 className="font-outfit text-xl font-semibold">Destination Reached</h1>
            <p className="text-sm text-white/80">Please confirm your safe arrival</p>
          </div>
        </div>
      </div>

      {/* Auto Check-in Countdown */}
      <div className="p-4">
        <Card className="bg-safety-amber/10 border-safety-amber/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-safety-amber rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h2 className="font-outfit text-2xl font-bold text-foreground">
                  {formatTime(timeLeft)}
                </h2>
                <p className="font-inter text-muted-foreground">
                  Auto check-in in {formatTime(timeLeft)}
                </p>
              </div>

              {timeLeft <= 30 && (
                <div className="text-sm text-safety-amber-foreground bg-safety-amber/20 p-3 rounded-lg">
                  <p className="font-medium">⚠️ Almost out of time!</p>
                  <p>Your contacts will be notified soon if you don't check in.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Check-in Button */}
      <div className="p-4">
        <Button 
          onClick={markSafe} 
          variant="safety" 
          className="w-full h-16 text-xl"
          disabled={hasCheckedIn}
        >
          <CheckCircle className="w-6 h-6 mr-3" />
          Mark as Safe
        </Button>
      </div>

      {/* Trusted Contacts Info */}
      <div className="p-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-inter font-medium text-foreground">Trusted Contacts</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  If you don't check in within the time limit, we'll automatically notify:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Emergency Contact 1: Mom (***) ***-1234</li>
                  <li>• Emergency Contact 2: Sarah (***) ***-5678</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Options */}
      <div className="p-4 space-y-3">
        <h3 className="font-outfit font-semibold text-foreground">Need Help?</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12">
            <Users className="w-4 h-4 mr-2" />
            Call Contact
          </Button>
          <Button variant="destructive" className="h-12">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Emergency
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4">
        <Card className="bg-soft-section">
          <CardContent className="pt-6">
            <div className="text-sm space-y-2">
              <p className="font-inter font-medium text-foreground">What happens next?</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Click "Mark as Safe" to confirm your arrival</li>
                <li>• Your trusted contacts will receive a notification</li>
                <li>• If no response, automatic alert will be sent</li>
                <li>• Emergency services can be contacted if needed</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckIn;