import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  MapPin, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Heart,
  Volume2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Companion = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [companionMessage, setCompanionMessage] = useState("Hi! I'm here to walk with you. Let's get you home safely.");
  const [lastCheckIn, setLastCheckIn] = useState<Date | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulated companion messages
  const companionMessages = [
    "How are you feeling? The route looks clear ahead.",
    "You're doing great! About halfway through your journey.",
    "I can see a well-lit area coming up. You're almost there!",
    "Everything looks good. Let me know if you need anything.",
    "Just a few more blocks to go. You've got this!",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      // Update progress
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsActive(false);
            navigate("/checkin");
            return 100;
          }
          return prev + 2;
        });
      }, 1000);

      // Random companion messages
      const messageInterval = setInterval(() => {
        const randomMessage = companionMessages[Math.floor(Math.random() * companionMessages.length)];
        setCompanionMessage(randomMessage);
        setLastCheckIn(new Date());
      }, 15000);

      return () => {
        clearInterval(interval);
        clearInterval(messageInterval);
      };
    }
  }, [isActive, navigate]);

  const toggleCompanion = () => {
    if (!isActive) {
      // Start companion
      setIsActive(true);
      setProgress(0);
      setLastCheckIn(new Date());
      toast({
        title: "Companion Activated",
        description: "I'm here to walk with you. Stay safe!",
      });
    } else {
      // Stop companion
      setIsActive(false);
      setProgress(0);
      toast({
        title: "Companion Ended",
        description: "Take care! Let me know when you arrive.",
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Voice Enabled" : "Voice Muted",
      description: isMuted ? "You can now hear your companion" : "Companion voice is muted",
    });
  };

  const emergencyCall = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Your trusted contacts have been notified!",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-safety text-white">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/home")}
            className="text-white hover:bg-white/20"
          >
            <MapPin className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-outfit text-lg font-semibold">AI Companion</h1>
            <p className="text-sm text-white/80">
              {isActive ? "Walking with you..." : "Ready to accompany you"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="text-white hover:bg-white/20"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Journey Progress */}
      {isActive && (
        <div className="p-4 bg-soft-section">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-inter text-foreground">Journey Progress</span>
              <span className="font-inter text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Estimated arrival: {new Date(Date.now() + (100 - progress) * 600).toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}

      {/* Companion Interface */}
      <div className="p-4 space-y-4">
        {/* Main Call Button */}
        <Card className={`${isActive ? 'bg-gradient-safety text-white' : 'bg-card'} transition-all duration-300`}>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="relative">
                <Button
                  onClick={toggleCompanion}
                  size="lg"
                  variant={isActive ? "secondary" : "safety"}
                  className={`w-24 h-24 rounded-full ${isActive ? 'bg-white/20 hover:bg-white/30' : ''}`}
                >
                  {isActive ? (
                    <PhoneOff className="w-8 h-8" />
                  ) : (
                    <Phone className="w-8 h-8" />
                  )}
                </Button>
                {isActive && (
                  <div className="absolute -inset-2 rounded-full border-2 border-white/30 animate-pulse"></div>
                )}
              </div>
              
              <div>
                <h2 className="font-outfit text-xl font-semibold">
                  {isActive ? "Connected" : "Start Walking"}
                </h2>
                <p className={`font-inter ${isActive ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {isActive ? "Your companion is active" : "Tap to activate your AI companion"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Companion Message */}
        <Card className="bg-soft-section">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-safety rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-inter font-medium text-foreground">Your Companion</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  "{companionMessage}"
                </p>
                {lastCheckIn && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Last check-in: {lastCheckIn.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Status */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-outfit font-semibold text-foreground mb-4">Safety Status</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-inter text-foreground">Route is well-lit</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-inter text-foreground">Safe zones nearby</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-inter text-foreground">Background monitoring active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12">
            <Mic className="w-4 h-4 mr-2" />
            {isMuted ? "Unmute" : "Mute"}
          </Button>
          <Button variant="destructive" onClick={emergencyCall} className="h-12">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Emergency
          </Button>
        </div>

        {/* Instructions */}
        <Card className="bg-safety-amber/10 border-safety-amber/30">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-safety-amber mt-0.5" />
              <div className="text-sm">
                <p className="font-inter font-medium text-foreground">How it works:</p>
                <ul className="text-muted-foreground mt-1 space-y-1">
                  <li>• Your companion will talk with you throughout the journey</li>
                  <li>• Regular check-ins ensure you're safe</li>
                  <li>• If you don't respond, trusted contacts are notified</li>
                  <li>• Background monitoring detects unusual sounds</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Fix for VolumeX icon
const VolumeX = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
  </svg>
);

export default Companion;