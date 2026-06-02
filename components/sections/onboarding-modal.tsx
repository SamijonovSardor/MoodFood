"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Sparkles,
  Camera,
  Smile,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Upload,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const cuisines = [
  { id: "uzbek", name: "Uzbek", flag: "🇺🇿" },
  { id: "italian", name: "Italian", flag: "🇮🇹" },
  { id: "turkish", name: "Turkish", flag: "🇹🇷" },
  { id: "korean", name: "Korean", flag: "🇰🇷" },
  { id: "japanese", name: "Japanese", flag: "🇯🇵" },
  { id: "american", name: "American", flag: "🇺🇸" },
  { id: "indian", name: "Indian", flag: "🇮🇳" },
];

const moods = [
  { emoji: "😊", label: "Xursand", id: "happy" },
  { emoji: "😔", label: "Xafa", id: "sad" },
  { emoji: "😴", label: "Charchagan", id: "tired" },
  { emoji: "😌", label: "Xotirjam", id: "calm" },
  { emoji: "😰", label: "Bezovta", id: "anxious" },
  { emoji: "🤩", label: "Hayajonda", id: "excited" },
];

export function OnboardingModal() {
  const { data: session, update } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form states
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [fridgeImage, setFridgeImage] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // If user is not logged in or is already onboarded, don't show the modal
  if (!session?.user || session.user.isOnboarded || !isOpen) {
    return null;
  }

  const toggleCuisine = (id: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate file upload by using a temporary local URL object or base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFridgeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferredCuisines: selectedCuisines,
          fridgeImage,
          currentMood: selectedMood,
        }),
      });

      if (response.ok) {
        // Trigger NextAuth session token update client-side
        await update({ isOnboarded: true });
        setIsOpen(false);
      } else {
        console.error("Failed to save onboarding data");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background bg-dot-grid p-4 animate-in fade-in duration-300">
      {/* Progress bar at the top of the screen */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="relative w-full max-w-lg flex flex-col animate-in zoom-in-95 duration-300 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Profil sozlamalari · {step}/3-qadam
            </p>
          </div>
          {step > 1 && (
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Orqaga
            </button>
          )}
        </div>

        {/* STEP 1: Cuisines */}
        {step === 1 && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-right-5 duration-200">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-display font-bold text-foreground">
                Sevimli oshxonangiz?
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mt-2 mb-6">
              Sizga yoqadigan milliy taomlarni belgilang. Bir nechta tanlashingiz mumkin.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {cuisines.map((c) => {
                const active = selectedCuisines.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleCuisine(c.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border text-left transition ${
                      active
                        ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                        : "border-border bg-background hover:bg-muted text-foreground/80"
                    }`}
                  >
                    <span className="flex items-center gap-3 text-base font-semibold">
                      <span className="text-2xl" aria-hidden="true">
                        {c.flag}
                      </span>
                      {c.name}
                    </span>
                    {active && (
                      <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto">
              <Button
                onClick={() => setStep(2)}
                className="w-full h-12 rounded-full"
                disabled={selectedCuisines.length === 0}
              >
                Keyingi qadam
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Fridge Upload */}
        {step === 2 && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-right-5 duration-200">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-display font-bold text-foreground">
                Muzlatgichda nima bor?
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mt-2 mb-6">
              Uydagi mahsulotlardan foydali taomlar taklif qilishimiz uchun rasmini yuklang (o'tkazib yuborish mumkin).
            </p>

            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-primary/50 transition rounded-2xl bg-muted/30 p-6 mb-8 relative group min-h-[180px]">
              {fridgeImage ? (
                <div className="relative w-full h-full min-h-[140px] flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={fridgeImage}
                    alt="Muzlatgich"
                    className="max-h-[140px] rounded-xl object-cover border"
                  />
                  <button
                    onClick={() => setFridgeImage(null)}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground text-xs font-bold shadow flex items-center justify-center hover:bg-destructive/90 transition"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-center py-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 transition group-hover:scale-110">
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    Rasm tanlang yoki sudrab keling
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    PNG, JPG (max 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="mt-auto flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setFridgeImage(null);
                  setStep(3);
                }}
                className="flex-1 h-12 rounded-full"
              >
                O'tkazib yuborish
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 h-12 rounded-full"
              >
                Davom etish
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Mood Selection */}
        {step === 3 && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-right-5 duration-200">
            <div className="flex items-center gap-2">
              <Smile className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-display font-bold text-foreground">
                Hozirgi kayfiyatingiz?
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mt-2 mb-6">
              Bugun qanday his qilyapsiz? Mos keladiganini tanlang (o'tkazib yuborish mumkin).
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {moods.map((m) => {
                const active = selectedMood === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMood(active ? null : m.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition ${
                      active
                        ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                        : "border-border bg-background hover:bg-muted text-foreground/80"
                    }`}
                  >
                    <span className="text-3xl" aria-hidden="true">
                      {m.emoji}
                    </span>
                    <span className="text-xs font-semibold">{m.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto flex gap-3">
              <Button
                variant="outline"
                disabled={loading}
                onClick={() => {
                  setSelectedMood(null);
                  handleSubmit();
                }}
                className="flex-1 h-12 rounded-full"
              >
                O'tkazib yuborish
              </Button>
              <Button
                disabled={loading}
                onClick={handleSubmit}
                className="flex-1 h-12 rounded-full"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Tugatish
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
