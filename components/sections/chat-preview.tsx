"use client";

import { useEffect, useState } from "react";

export function ChatPreview() {
  const [showTyping, setShowTyping] = useState(true);
  const [showAi, setShowAi] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTyping(false), 2200);
    const t2 = setTimeout(() => setShowAi(true), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      {/* Floating food icons */}
      <div
        aria-hidden="true"
        className="absolute -top-6 -right-4 z-10 text-2xl drop-shadow-md animate-float1 hidden md:block"
      >
        🍜
      </div>
      <div
        aria-hidden="true"
        className="absolute top-1/2 -right-8 z-10 text-2xl drop-shadow-md animate-float2 hidden md:block"
      >
        🥗
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-8 -left-6 z-10 text-2xl drop-shadow-md animate-float3 hidden md:block"
      >
        🍵
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-3 left-16 z-10 text-2xl drop-shadow-md animate-float1 hidden md:block"
        style={{ animationDelay: "1.5s" }}
      >
        🫐
      </div>
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-10 z-10 text-xl drop-shadow-md animate-float2 hidden md:block"
        style={{ animationDelay: "2s" }}
      >
        🥑
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-16 z-10 text-xl drop-shadow-md animate-float3 hidden md:block"
        style={{ animationDelay: "0.8s" }}
      >
        🍋
      </div>

      <div className="relative z-[1] rounded-3xl bg-card border border-border shadow-soft-xl overflow-hidden">
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-border bg-card">
          <div className="flex gap-1.5 mr-1">
            <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-lg">
            🌿
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-tight">
              MoodFood AI
            </p>
            <p className="text-[11.5px] text-primary flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-green" />
              Online & Ready
            </p>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-3.5 min-h-[230px]">
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground/70">
              You
            </span>
            <div className="rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-4 py-2.5 text-sm leading-relaxed max-w-[88%]">
              I&apos;m feeling stressed after work 😩
            </div>
          </div>

          {showAi && (
            <div className="flex flex-col items-start gap-1.5 animate-fade-up">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground/70">
                MoodFood
              </span>
              <div className="rounded-2xl rounded-bl-sm bg-muted border border-border text-foreground px-4 py-2.5 text-sm leading-relaxed max-w-[88%]">
                Based on your mood, here&apos;s something warm and
                comforting ✨
                <div className="mt-2 flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-green-50 border border-green-200">
                  <span aria-hidden="true" className="text-2xl">
                    🍝
                  </span>
                  <div>
                    <span className="block font-semibold text-[13px] text-green-700">
                      Creamy Pasta al Limone
                    </span>
                    <span className="block text-[12px] text-muted-foreground">
                      + Chamomile herbal tea 🍵
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showTyping && (
            <div className="flex gap-1 px-4 py-3 rounded-2xl rounded-bl-sm bg-muted border border-border w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-dot-bounce" />
              <span
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-dot-bounce"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-dot-bounce"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-card">
          <input
            type="text"
            placeholder="How are you feeling today?"
            readOnly
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none border-none"
          />
          <button
            type="button"
            aria-label="Send"
            className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all hover:bg-primary/90 hover:scale-105 shrink-0"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="-ml-0.5"
            >
              <path d="M22 2L11 13M22 2 15 22l-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
