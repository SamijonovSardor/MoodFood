"use client";

import { useEffect } from "react";

export default function AuthCallbackPage() {
  useEffect(() => {
    // Send a message to the opener window indicating successful sign-in
    if (window.opener) {
      window.opener.postMessage({ type: "next-auth-signin-success" }, window.location.origin);
      // Close the popup window
      window.close();
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F9F6] p-6 text-center">
      <div className="flex flex-col items-center gap-4 max-w-sm">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#16A34A] border-t-transparent" />
        <h2 className="text-lg font-display font-bold text-[#0C0C0C]">
          MoodFood Authentication
        </h2>
        <p className="text-sm text-[#5A5A57]">
          Sign-in completed successfully. This window is closing automatically...
        </p>
      </div>
    </div>
  );
}
