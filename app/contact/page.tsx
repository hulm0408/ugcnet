import type { Metadata } from 'next';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Arabic NET/JRF Practice team.',
};

export default function ContactPage() {
  return (
    <div className="flex-1 bg-stone-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-stone-900 mb-4">Contact Us</h1>
          <p className="text-stone-500 max-w-lg mx-auto">
            Have a question, spotted a mistake in a PYQ, or want to suggest a feature? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-surface text-primary rounded-xl flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1">Email Support</h3>
                <p className="text-stone-500 text-sm mb-2">For general queries and technical support.</p>
                <a href="mailto:support@arabicnetjrf.com" className="text-primary font-bold hover:underline">
                  support@arabicnetjrf.com
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1">Feedback</h3>
                <p className="text-stone-500 text-sm mb-2">Spotted an error in an explanation? Let us know.</p>
                <a href="mailto:feedback@arabicnetjrf.com" className="text-accent font-bold hover:underline">
                  feedback@arabicnetjrf.com
                </a>
              </div>
            </div>
            
            <div className="bg-stone-100 p-6 rounded-2xl border border-stone-200 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-4">
               <div className="w-12 h-12 bg-stone-200 text-stone-500 rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-1">Location</h3>
                <p className="text-stone-500 text-sm">
                  We operate entirely online to serve Arabic students globally.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 mb-6">Send a Message</h3>
            <form className="space-y-4" action="mailto:support@arabicnetjrf.com" method="post" encType="text/plain">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">Name</label>
                <input type="text" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">Email</label>
                <input type="email" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-1">Message</label>
                <textarea rows={4} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-xl transition-colors">
                Send Message
              </button>
            </form>
          </div>

        </div>
        
      </div>
    </div>
  );
}
