import { useState, useEffect } from 'react';
import { 
  Bus, 
  MapPin, 
  Clock, 
  Smartphone, 
  Menu, 
  X, 
  Bell, 
  Navigation
} from 'lucide-react';
import { getBusInfo } from './Services/API';


/**
 * Interactive Mock Phone Component
 * Simulates the app interface with a moving bus animation
 */
const MockPhoneApp = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[500px] w-[280px] shadow-xl flex flex-col overflow-hidden">
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-50 relative flex flex-col">
        
        {/* Mock App Header */}
        <div className="bg-blue-600 p-4 pt-8 text-white z-10 relative shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bus size={18} />
              <span className="font-bold text-sm">RideForYou</span>
            </div>
            <div className="text-xs bg-blue-500 px-2 py-1 rounded-full">Line 42</div>
          </div>
          <div className="mt-4">
            <p className="text-xs opacity-80">Arriving in</p>
            <p className="text-2xl font-bold">4 mins</p>
          </div>
        </div>

        {/* Mock Map Area */}
        <div className="relative h-full w-full bg-slate-200 flex-grow">
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Route Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-blue-200 -translate-x-1/2"></div>
          <div className="absolute left-1/2 top-[10%] bottom-[10%] w-1 bg-blue-500 -translate-x-1/2 rounded-full"></div>

          {/* Stops */}
          <div className="absolute left-1/2 top-[20%] -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10"></div>
          <div className="absolute left-1/2 top-[50%] -translate-x-1/2 w-4 h-4 bg-white border-4 border-slate-400 rounded-full z-10"></div>
          <div className="absolute left-1/2 top-[80%] -translate-x-1/2 w-4 h-4 bg-white border-4 border-slate-400 rounded-full z-10"></div>

          {/* Moving Bus */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 z-20 transition-all duration-75 shadow-lg"
            style={{ top: `${20 + (progress * 0.6)}%` }}
          >
            <div className="bg-blue-600 text-white p-2 rounded-full ring-4 ring-white/50">
              <Bus size={20} fill="currentColor" />
            </div>
            {/* Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded shadow-md text-[10px] font-bold text-slate-700 whitespace-nowrap">
              Next Stop: Downtown
            </div>
          </div>
        </div>
        
        {/* Bottom Sheet */}
        <div className="absolute bottom-0 w-full bg-white rounded-t-2xl p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm shadow-lg shadow-blue-200">
            Track My Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [backendData, setBackendData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Test backend connection
  useEffect(() => {
    getBusInfo()
      .then((data) => {
        console.log('✅ Backend connected:', data);
        setBackendData(data);
        setIsConnected(true);
      })
      .catch((err) => {
        console.error('❌ Backend connection failed:', err);
        setIsConnected(false);
      });
  }, []);

  const features = [
    {
      icon: <MapPin className="text-blue-600" size={28} />,
      title: "Real-Time GPS",
      description: "Watch your bus move on the map in real-time. No more ghost buses or phantom delays."
    },
    {
      icon: <Clock className="text-blue-600" size={28} />,
      title: "Accurate ETAs",
      description: "AI-powered prediction algorithms provide arrival times you can actually trust."
    },
    {
      icon: <Bell className="text-blue-600" size={28} />,
      title: "Smart Alerts",
      description: "Get notified when your bus is 5 minutes away so you never have to run for it."
    },
    {
      icon: <Navigation className="text-blue-600" size={28} />,
      title: "Trip Planner",
      description: "Find the fastest route combining bus, subway, and walking directions seamlessly."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-800">
      
      {/* Backend Connection Status (Dev Only) */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className={`px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2 ${
          isConnected ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isConnected ? 'bg-green-300' : 'bg-red-300'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${
              isConnected ? 'bg-green-200' : 'bg-red-200'
            }`}></span>
          </span>
          {isConnected ? 'Backend Connected' : 'Backend Offline'}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Bus size={24} />
            </div>
            <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-900 lg:text-slate-800'}`}>
              RideForYou
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Reviews</a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-200">
              Download App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
            <a href="#features" className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded" onClick={() => setIsMenuOpen(false)}>How it Works</a>
            <a href="#testimonials" className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded" onClick={() => setIsMenuOpen(false)}>Reviews</a>
            <button className="bg-blue-600 text-white w-full py-3 rounded-lg font-semibold">Download App</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Live in 250+ Cities
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Never miss your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">bus again.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Join 2 million commuters who save time every day. Get accurate arrival times, live map tracking, and service alerts right in your pocket.
              </p>

              {/* Show backend data if connected */}
              {isConnected && backendData && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-left">
                  <p className="text-sm font-semibold text-green-800 mb-2">🚀 Live from Backend:</p>
                  <p className="text-xs text-green-700">Route {backendData.route} • ETA: {backendData.eta}</p>
                  <p className="text-xs text-green-700">Next: {backendData.nextStop}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
                  <Smartphone size={20} />
                  Get the App
                </button>
                <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  View Web Map
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                      U{i}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-500">
                  <span className="font-bold text-slate-900">4.9/5</span> rating from active users
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:w-1/2 relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 via-blue-50/50 to-blue-50/0 rounded-full blur-2xl transform scale-90"></div>
              <MockPhoneApp />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to commute smarter</h2>
            <p className="text-slate-600 text-lg">We don't just show you where the bus is. We help you plan your entire journey from door to door.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-3xl bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-100 hover:border-blue-100 group">
                <div className="mb-6 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div>
              <div className="text-5xl font-bold mb-2 text-blue-400">2M+</div>
              <div className="text-slate-400">Daily Active Users</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-5xl font-bold mb-2 text-blue-400">12k+</div>
              <div className="text-slate-400">Buses Tracked</div>
            </div>
            <div className="pt-8 md:pt-0">
              <div className="text-5xl font-bold mb-2 text-blue-400">98%</div>
              <div className="text-slate-400">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="space-y-12">
                {[
                  { title: "Select your route", desc: "Choose from nearby stops or search for a specific bus line.", step: "01" },
                  { title: "Watch it move", desc: "See exactly where your bus is on the map in real-time.", step: "02" },
                  { title: "Get on board", desc: "Receive an alert 2 minutes before arrival. Walk to the stop. Ride.", step: "03" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
               {/* Abstract decorative representation of a route map */}
               <div className="aspect-square bg-slate-100 rounded-2xl relative overflow-hidden">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-[20px] border-white rounded-full"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[20px] bg-white rotate-45"></div>
                 <div className="absolute top-[30%] left-[30%] p-3 bg-blue-600 rounded-full shadow-lg z-10 animate-bounce">
                    <Bus className="text-white" />
                 </div>
                 <div className="absolute bottom-[30%] right-[30%] p-2 bg-white rounded-full shadow-md z-10">
                    <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                 </div>
                 <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-sm max-w-[200px]">
                    <div className="h-2 w-16 bg-slate-200 rounded mb-2"></div>
                    <div className="h-2 w-full bg-slate-200 rounded"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 opacity-20 rounded-full translate-y-1/3 -translate-x-1/3"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to upgrade your commute?</h2>
              <p className="text-blue-100 text-lg mb-10">
                Download RideForYou today and stop wondering when the bus will arrive. Available on iOS and Android.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                  <span className="text-xl">🍎</span> App Store
                </button>
                <button className="bg-blue-700 border border-blue-500 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
                  <span className="text-xl">▶</span> Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <Bus size={20} />
                </div>
                <span className="text-xl font-bold text-slate-900">RideForYou</span>
              </div>
              <p className="text-slate-500 max-w-xs leading-relaxed">
                Making public transportation predictable, accessible, and easy for everyone. Built with love for the daily commuter.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Product</h4>
              <ul className="space-y-4 text-slate-600">
                <li><a href="#" className="hover:text-blue-600">Download</a></li>
                <li><a href="#" className="hover:text-blue-600">Features</a></li>
                <li><a href="#" className="hover:text-blue-600">Cities</a></li>
                <li><a href="#" className="hover:text-blue-600">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Company</h4>
              <ul className="space-y-4 text-slate-600">
                <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2024 RideForYou Inc. All rights reserved.</p>
            <div className="flex gap-6 text-slate-400">
              <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Instagram</a>
              <a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}