"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function AuthPopupPage() {
  useEffect(() => {
    // Trigger NextAuth Google sign-in inside the popup window
    signIn("google", { callbackUrl: "/auth-callback" });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F9F6] p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#16A34A] border-t-transparent" />
        <h2 className="text-lg font-display font-bold text-[#0C0C0C]">
          Connecting to Google...
        </h2>
        <p className="text-xs text-[#5A5A57] max-w-xs leading-normal">
          Please wait. Preparing sign-in window via Google.
        </p>
      </div>
    </div>
  );
}
