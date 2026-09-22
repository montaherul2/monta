import React, { useState } from 'react';
import {
  Send,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  Github,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { playCyberClick, playSuccessChime } from '../utils/audio';
import { FadeInSection } from './FadeInSection';

export const ContactSection: React.FC = () => {
  const { portfolio, addMessage, messages } = usePortfolio();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    playCyberClick(700, 0.05);

    setTimeout(() => {
      addMessage(name, email, message);
      setStatus('success');
      playSuccessChime();
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 4500);
    }, 600);
  };

  const handleCopyEmail = () => {
    playCyberClick(800, 0.04);
    navigator.clipboard.writeText(portfolio.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-[#121f19]">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Social Links */}
          <FadeInSection className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a1811] border border-[#143525] text-[#00df81] text-xs font-mono tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00df81]" />
              <span>CONTACT</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              Have something <br />
              <span className="text-[#00df81] drop-shadow-[0_0_20px_rgba(0,223,129,0.3)]">
                worth building?
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#8ea498] leading-relaxed mb-8 max-w-md">
              Open to conversations about software, products, research, and ambitious ideas that need a technical home.
            </p>

            {/* Direct Email Pill */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0b1410] border border-[#162b20] mb-8 w-fit max-w-full">
              <div className="p-2 rounded-xl bg-[#0d2217] text-[#00df81]">
                <Mail size={16} />
              </div>
              <div className="text-xs font-mono text-white truncate max-w-[200px] sm:max-w-none">
                {portfolio.email}
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1 rounded-lg bg-[#0e1c15] hover:bg-[#14291f] text-[11px] font-mono text-[#00df81] border border-[#183626] transition-colors cursor-pointer flex items-center gap-1"
                title="Copy Email"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle2 size={12} />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Channels matching video */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#5d7568] mb-3">
                Social Presence & Accounts
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={portfolio.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0a1410] hover:bg-[#0f2119] border border-[#162b20] hover:border-[#00df81]/50 text-xs font-medium text-[#c0d4ca] hover:text-white transition-all cursor-pointer"
                >
                  <Facebook size={14} className="text-[#00df81]" />
                  <span>Facebook</span>
                </a>

                <a
                  href={portfolio.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0a1410] hover:bg-[#0f2119] border border-[#162b20] hover:border-[#00df81]/50 text-xs font-medium text-[#c0d4ca] hover:text-white transition-all cursor-pointer"
                >
                  <Instagram size={14} className="text-[#00df81]" />
                  <span>Instagram</span>
                </a>

                <a
                  href={portfolio.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0a1410] hover:bg-[#0f2119] border border-[#162b20] hover:border-[#00df81]/50 text-xs font-medium text-[#c0d4ca] hover:text-white transition-all cursor-pointer"
                >
                  <Linkedin size={14} className="text-[#00df81]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={portfolio.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0a1410] hover:bg-[#0f2119] border border-[#162b20] hover:border-[#00df81]/50 text-xs font-medium text-[#c0d4ca] hover:text-white transition-all cursor-pointer"
                >
                  <Github size={14} className="text-[#00df81]" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </FadeInSection>

          {/* Right Column: Contact Form */}
          <FadeInSection delay={0.15} className="lg:col-span-6">
            <div className="bg-[#0a130f] border border-[#172b21] rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#799486] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-[#0e1814] border border-[#172b21] focus:border-[#00df81] rounded-xl px-4 py-3 text-sm text-white placeholder-[#51675a] outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#799486] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-[#0e1814] border border-[#172b21] focus:border-[#00df81] rounded-xl px-4 py-3 text-sm text-white placeholder-[#51675a] outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#799486] mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message..."
                    className="w-full bg-[#0e1814] border border-[#172b21] focus:border-[#00df81] rounded-xl px-4 py-3 text-sm text-white placeholder-[#51675a] outline-none transition-colors resize-none"
                  />
                </div>

                {/* Feedback state */}
                {status === 'success' && (
                  <div className="p-3 rounded-xl bg-[#0b291a] border border-[#134e32] text-xs font-mono text-[#00df81] flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 size={16} />
                    <span>Message received! Montaherul will be notified directly.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3 rounded-xl bg-[#290d0d] border border-[#4e1313] text-xs font-mono text-[#f87171]">
                    Please fill out all fields before submitting.
                  </div>
                )}

                {/* Submit Button matching video */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 px-6 bg-[#00df81] hover:bg-[#05f08d] text-[#06100b] font-bold text-sm tracking-wide rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(0,223,129,0.25)] hover:shadow-[0_6px_25px_rgba(0,223,129,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="text-base font-bold">↗</span>
                    </>
                  )}
                </button>
              </form>

              {/* Dynamic message count indicator */}
              {messages.length > 0 && (
                <div className="mt-5 pt-4 border-t border-[#13241b] flex items-center justify-between text-[11px] font-mono text-[#668072]">
                  <span className="flex items-center gap-1">
                    <MessageSquare size={12} />
                    <span>{messages.length} message{messages.length > 1 ? 's' : ''} stored locally</span>
                  </span>
                  <span>Interactive Dynamic Storage</span>
                </div>
              )}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};
