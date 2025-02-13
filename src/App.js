import React, { useState, useEffect } from 'react';
import { Timer, Sparkles, Send, Mail, Phone } from 'lucide-react';

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [days, setDays] = useState(30);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else if (days > 0) {
        setDays(days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [days, hours, minutes, seconds]);

  // Mouse movement effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    setMousePosition({ x, y });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center p-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive background element */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-300 ease-out"
        style={{
          backgroundImage: `radial-gradient(circle at ${50 + mousePosition.x * 40}% ${50 + mousePosition.y * 40}%, rgba(147, 197, 253, 0.3), transparent 70%)`
        }}
      />

      {/* Logo and Company Name at Top Left */}
      <header className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-4 group">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300">
              <span className="text-3xl font-bold">T22</span>
            </div>
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-all duration-300 ease-out"
              style={{
                transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
              }}
            />
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Tech Company
          </h2>
        </div>
      </header>

      {/* Floating sparkles with mouse interaction */}
      <div 
        className="absolute top-10 right-10 animate-pulse transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) rotate(${mousePosition.x * 15}deg)`
        }}
      >
        <Sparkles className="w-6 h-6 text-blue-400" />
      </div>
      <div 
        className="absolute bottom-10 left-10 animate-pulse transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) rotate(${mousePosition.y * 15}deg)`
        }}
      >
        <Sparkles className="w-6 h-6 text-purple-400" />
      </div>

      {/* Main content */}
      <div className="text-center max-w-3xl mx-auto mt-24">
        <h1 className="text-6xl font-bold mb-8 leading-normal py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Something amazing is in the works. Stay tuned!
        </p>

        {/* Countdown timer */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Days', value: days },
            { label: 'Hours', value: hours },
            { label: 'Minutes', value: minutes },
            { label: 'Seconds', value: seconds }
          ].map(({ label, value }) => (
            <div 
              key={label} 
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700 transform transition-transform hover:scale-105"
              style={{
                transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
              }}
            >
              <div className="text-3xl font-bold mb-2">{value.toString().padStart(2, '0')}</div>
              <div className="text-sm text-gray-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Email subscription form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <div className="relative flex-1 min-w-[300px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700 focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
          >
            <span>Notify Me</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Contact Information */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 transform transition-transform hover:scale-[1.02]">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Contact Us</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-purple-400" />
              <a href="mailto:info@yourcompany.com" className="text-gray-300 hover:text-white transition-colors">
                info@yourcompany.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-purple-400" />
              <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors">
                +123 456 7890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
