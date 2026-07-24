// src/pages/Contactpage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowUpRight, Zap, MapPin, Phone, Mail, Clock } from 'lucide-react';
import api from '../api/axios'; // ✅ centralized axios

function Contactpage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Fixed: handleSubmit is now INSIDE Contactpage component
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionMessage('');

    try {
      const response = await api.post('/api/contact', formData);
      setSubmissionMessage(response.data.message || 'Message sent successfully!');
      setIsSuccess(true);
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (err) {
      setSubmissionMessage(
        err.response?.data?.message || 'Server error. Please try again later.'
      );
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Locations",
      lines: [
        "Colombo 7, Maitland Crescent",
        "Colombo 2, Moors Sports Club",
        "Colombo 2, World Trade Center",
        "Ja-ela",
      ],
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      lines: [
        "Colombo 7: 011-269-5331 | 077-834-5678",
        "Moors: 011-212-1755 | 075-711-9033",
        "WTC: 011-233-8842 | 077-840-5889",
        "Ja-ela: 011-222-9747 | 077-834-5678",
      ],
    },
    {
      icon: Mail,
      title: "Email",
      lines: ["fitnessfirstcolombo@gmail.com"],
    },
    {
      icon: Clock,
      title: "Opening Hours",
      lines: [
        "Mon – Fri: 5:00 AM – 11:00 PM",
        "Sat – Sun: 6:00 AM – 10:00 PM",
      ],
    },
  ];

  return (
    <div className="bg-black text-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="min-h-screen relative flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/a3.jpg')] bg-center bg-cover bg-no-repeat"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 10,
            background: 'linear-gradient(105deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.80) 50%, rgba(0,0,0,0.10) 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ zIndex: 11, background: 'linear-gradient(to top, #000, transparent)' }} />

        <div className="relative w-full max-w-7xl mx-auto px-8 md:px-16 pt-28 pb-20" style={{ zIndex: 60 }}>
          <div className="max-w-2xl">
            <h1 className="text-7xl md:text-8xl font-black text-white leading-none uppercase mb-5">
              Contact<br /><span className="text-red-500">Us</span>
            </h1>
            <p className="text-gray-300 italic text-xl mb-8 font-light border-l-2 border-red-600 pl-4">
              "We're here to help you start your fitness journey."
            </p>
            <div className="flex items-center gap-8 mb-10">
              {[["4","Branches"],["24/7","Support"],["1min","Response"]].map(([val, label], i) => (
                <React.Fragment key={i}>
                  {i !== 0 && <div className="w-px h-10 bg-gray-700" />}
                  <div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold">{label}</p>
                    <p className="text-white text-2xl font-black">{val}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <p className="text-gray-400 text-base leading-relaxed max-w-md">
              Have a question, want to book a session, or just want to know more about
              FitTrack? Reach out — we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Info + Form ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── Left: Contact Info ── */}
          <div className="space-y-0">
            <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Reach Us</p>
            <h2 className="text-5xl font-black uppercase leading-none mb-4">
              We're<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Always</span><br />
              Here
            </h2>
            <div className="w-12 h-0.5 bg-red-600 mb-12" />

            <div className="grid grid-cols-1 gap-px bg-gray-800/40 rounded-2xl overflow-hidden">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#0a0a0a] hover:bg-gray-950 p-8 group transition-all duration-300 flex gap-6 items-start"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 group-hover:border-red-600/50 group-hover:bg-red-600/10 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                    <item.icon size={20} className="text-gray-500 group-hover:text-red-500 transition-colors duration-300" />
                  </div>
                  {/* Text */}
                  <div>
                    <h3 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">{item.title}</h3>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div>
            <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Send Message</p>
            <h2 className="text-5xl font-black uppercase leading-none mb-4">
              Leave A<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Message</span>
            </h2>
            <div className="w-12 h-0.5 bg-red-600 mb-12" />

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2 block">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-5 py-4 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white placeholder-gray-700 transition-colors duration-300 text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2 block">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-5 py-4 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white placeholder-gray-700 transition-colors duration-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2 block">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+94 77 123 4567"
                  required
                  className="w-full px-5 py-4 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white placeholder-gray-700 transition-colors duration-300 text-sm"
                />
              </div>

              <div>
                <label className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2 block">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows="6"
                  required
                  className="w-full px-5 py-4 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white placeholder-gray-700 transition-colors duration-300 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-red-900/30"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>Send Message <ArrowUpRight size={16} /></>
                )}
              </button>

              {/* Success / Error message */}
              {submissionMessage && (
                <div className={`flex items-center gap-3 p-4 rounded-xl border text-sm ${
                  isSuccess
                    ? 'bg-green-950/50 border-green-800 text-green-400'
                    : 'bg-red-950/50 border-red-800 text-red-400'
                }`}>
                  <span>{isSuccess ? '✓' : '✕'}</span>
                  {submissionMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="bg-black border-t border-gray-800 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 text-center">Find Us</p>
          <h2 className="text-4xl font-black uppercase text-center mb-12">Our Locations</h2>
          <div className="rounded-2xl overflow-hidden border border-gray-800 h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80388957863!2d79.82118565!3d6.9218374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="FitTrack Locations"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contactpage;