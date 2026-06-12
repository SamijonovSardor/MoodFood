"use client";

import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener("open-auth-modal", handleOpen);
    window.addEventListener("close-auth-modal", handleClose);

    return () => {
      window.removeEventListener("open-auth-modal", handleOpen);
      window.removeEventListener("close-auth-modal", handleClose);
    };
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.data?.type === "next-auth-signin-success"
      ) {
        setIsOpen(false);
        window.location.reload();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setLoading(true);
    try {
      const width = 500;
      const height = 650;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      window.open(
        "/auth-popup",
        "Google Sign In",
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=yes`
      );
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="relative w-full max-w-[420px] rounded-[32px] border border-[#EAEAE6] bg-white p-8 shadow-soft-xl animate-in fade-in zoom-in-95 duration-300 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#F3F3EF] transition-all text-[#5A5A57] hover:text-[#0C0C0C]"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center gap-3 mt-4">
          <div className="h-12 w-12 rounded-full bg-[#16A34A]/5 text-[#16A34A] flex items-center justify-center text-xl animate-bounce">
            ✨
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold tracking-tight text-[#0C0C0C]">
              Sign In to MoodFood
            </h2>
            <p className="text-xs text-[#5A5A57] mt-1.5 leading-relaxed px-4">
              Sign in to discover personalized recipes and plan meals using AI. If you are new, an account will be created automatically.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-3 mt-2">
          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 h-12 rounded-2xl border border-[#EAEAE6] bg-white hover:bg-[#F9F9F6] active:bg-[#F3F3EF] text-sm font-semibold text-[#0C0C0C] transition-all shadow-soft-sm cursor-pointer disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Modal Footer */}
        <p className="text-[10px] text-center text-[#A1A19D] leading-normal px-6">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
