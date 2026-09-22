import React, { useState, useEffect, useRef } from 'react';
import { Lock, KeyRound, Eye, EyeOff, X, ShieldAlert, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const PasswordGateModal: React.FC = () => {
  const { isPasswordGateOpen, setIsPasswordGateOpen, verifyPassword } = usePortfolio();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPasswordGateOpen) {
      setPassword('');
      setErrorMsg('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isPasswordGateOpen]);

  if (!isPasswordGateOpen) return null;

  const handleClose = () => {
    setIsPasswordGateOpen(false);
    if (window.location.hash === '#edit') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg('Please enter your passcode.');
      return;
    }

    const success = verifyPassword(password);
    if (!success) {
      setErrorMsg('Incorrect passcode. Access denied.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md bg-[#09120e] border border-[#1b3d2b] rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-left ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0e1c15] text-[#71897c] hover:text-white border border-[#193325] transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Header Icon */}
        <div className="w-12 h-12 rounded-2xl bg-[#0d261b] border border-[#184933] flex items-center justify-center text-[#00df81] mb-5 shadow-[0_0_20px_rgba(0,223,129,0.2)]">
          <Lock size={22} />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
          Owner Authentication
        </h3>
        <p className="text-xs sm:text-sm text-[#87a092] leading-relaxed mb-6 font-mono">
          The dynamic configuration editor is restricted. Enter your security passcode to proceed.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <KeyRound
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a7465]"
              />
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Enter passcode..."
                className="w-full bg-[#0d1913] border border-[#1a3326] focus:border-[#00df81] rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-[#51675a] outline-none transition-colors font-mono"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#647c6e] hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-[#f87171]">
                <ShieldAlert size={14} />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#00df81] hover:bg-[#05f08d] text-[#06100b] font-bold text-xs tracking-wide uppercase rounded-xl transition-all shadow-[0_4px_20px_rgba(0,223,129,0.3)] hover:shadow-[0_6px_25px_rgba(0,223,129,0.45)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Authenticate & Unlock</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-[#13241b] text-center">
          <span className="text-[11px] font-mono text-[#576e61]">
            Protected Path // Administrator Only
          </span>
        </div>
      </div>
    </div>
  );
};
