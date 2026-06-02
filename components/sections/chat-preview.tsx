import { Bot, Sparkles, User } from "lucide-react";

export function ChatPreview() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Decorative floating elements */}
      <div
        aria-hidden="true"
        className="absolute -top-6 -left-6 hidden md:flex h-12 w-12 items-center justify-center rounded-2xl bg-card border border-border shadow-soft text-2xl animate-float"
      >
        🍝
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-4 -right-4 hidden md:flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border shadow-soft text-xl animate-float"
        style={{ animationDelay: "1s" }}
      >
        🥗
      </div>
      <div
        aria-hidden="true"
        className="absolute -bottom-4 -left-2 hidden md:flex h-11 w-11 items-center justify-center rounded-2xl bg-card border border-border shadow-soft text-2xl animate-float"
        style={{ animationDelay: "2s" }}
      >
        🍵
      </div>
      <div
        aria-hidden="true"
        className="absolute -bottom-6 -right-6 hidden md:flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border shadow-soft text-xl animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        🧠
      </div>

      {/* Chat card */}
      <div className="relative rounded-3xl border border-border bg-card shadow-soft-lg overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-5 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold leading-tight">MoodFood</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
              Online
            </p>
          </div>
          <Sparkles className="h-4 w-4 text-accent" />
        </div>

        <div className="p-5 space-y-4">
          <div className="flex gap-3 items-start">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4" />
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm leading-relaxed">
              I&apos;m feeling stressed after work.
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-primary/10 border border-primary/20 px-4 py-2.5 text-sm leading-relaxed">
              Based on your mood, you may enjoy a warm bowl of{" "}
              <span className="font-semibold text-primary">creamy pasta</span>{" "}
              and <span className="font-semibold text-primary">herbal tea</span>.
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-muted/30 px-5 py-3">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <span className="text-sm text-muted-foreground flex-1">
              Describe your mood...
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span aria-hidden="true" className="text-xs">↑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
