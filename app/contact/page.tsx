import type { Metadata } from 'next';
import {
  Mail,
  MessageSquare,
  Clock,
  ShieldCheck,
  Send,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Mentor Support & Aspirant Desk',
  description:
    'Reach the UGC NET/JRF academic team directly via WhatsApp, Email, or Telegram for test support, paper queries, and doubt resolution.',
};

export default function ContactPage() {
  return (
    <div className="flex-1 bg-[#FAF8F5] min-h-screen py-14 sm:py-20 text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-mono font-semibold uppercase tracking-wider shadow-2xs">
            <MessageSquare size={14} className="text-emerald-800" />
            <span>DIRECT ASPIRANT SUPPORT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-950 tracking-tight">
            Speak Directly with Our Mentors
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Have a question about a challenge key, need guidance on Paper 1 vs Paper 2 split, or encountered a technical issue? We are here to help you qualify.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Channels & SLA */}
          <div className="md:col-span-5 space-y-4">
            
            {/* WhatsApp Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  WA
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">WhatsApp Aspirant Desk</h3>
                  <p className="text-xs text-stone-500">Quickest response for doubt clarification</p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-xs font-mono font-bold text-emerald-800 block">
                  Coming soon
                </span>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center font-bold">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">Academic Review Board</h3>
                  <p className="text-xs text-stone-500">Key challenges &amp; syllabus suggestions</p>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <a
                  href="mailto:support@arabic-net-jrf.com"
                  className="text-xs font-mono font-bold text-stone-800 hover:text-stone-950 hover:underline block"
                >
                  support@arabic-net-jrf.com
                </a>
              </div>
            </div>


            {/* SLA Badge */}
            <div className="p-4 rounded-xl bg-stone-100 border border-stone-200/80 flex items-center gap-3 text-xs text-stone-600">
              <Clock size={16} className="text-emerald-700 shrink-0" />
              <span>
                <strong>Response SLA:</strong> We respond within <strong>4 hours</strong> on active exam cycle days (9 AM – 9 PM IST).
              </span>
            </div>

          </div>

          {/* Right Column: Direct Message Box */}
          <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Send an Inquiry</h2>
              <p className="text-stone-500 text-xs mt-0.5">
                Our academic coordinators will reply directly to your email or WhatsApp number.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-xs mb-4">
              <strong>Note:</strong> This form is currently being set up.
            </div>
            <form
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Khan"
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@university.edu"
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Target Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Arabic (Code 29) or Paper 1"
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">WhatsApp Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 XXXXX"
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">How can we assist you?</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail your question regarding question keys, CBT simulator, or access plans..."
                  className="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <Send size={13} />
                <span>Submit to Academic Board</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
