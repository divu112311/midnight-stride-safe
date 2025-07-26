import { Button } from "@/components/ui/button";
import { Shield, MapPin, Phone, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-safety.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Women's safety during night travel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="font-outfit text-5xl md:text-7xl font-bold text-white mb-6">
            Midnight Mile
          </h1>
          <p className="font-inter text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Your trusted companion for safe night travel. AI-powered route guidance with real-time safety insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="safety" size="lg" className="text-lg px-8 py-6">
              <Link to="/login">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Link to="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-outfit text-4xl font-bold text-center mb-16 text-foreground">
            Your Safety, Our Priority
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-soft-section">
              <div className="w-16 h-16 bg-gradient-safety rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-outfit text-xl font-semibold mb-2 text-foreground">Smart Routes</h3>
              <p className="font-inter text-muted-foreground">
                AI-powered route planning with real-time safety scoring and lighting analysis.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-soft-section">
              <div className="w-16 h-16 bg-gradient-safety rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-outfit text-xl font-semibold mb-2 text-foreground">Safe Spots</h3>
              <p className="font-inter text-muted-foreground">
                Locate nearby police stations, hospitals, and 24/7 stores along your route.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-soft-section">
              <div className="w-16 h-16 bg-gradient-safety rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-outfit text-xl font-semibold mb-2 text-foreground">AI Companion</h3>
              <p className="font-inter text-muted-foreground">
                Voice companion that talks with you throughout your journey for comfort and safety.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-soft-section">
              <div className="w-16 h-16 bg-gradient-safety rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-outfit text-xl font-semibold mb-2 text-foreground">Auto Check-in</h3>
              <p className="font-inter text-muted-foreground">
                Automatic arrival detection with trusted contact notifications for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-4xl font-bold text-white mb-6">
            Ready to Walk with Confidence?
          </h2>
          <p className="font-inter text-xl text-white/90 mb-8">
            Join thousands of women who trust Midnight Mile for safe night travel.
          </p>
          <Button asChild variant="safety" size="lg" className="text-lg px-8 py-6">
            <Link to="/login">Download Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;