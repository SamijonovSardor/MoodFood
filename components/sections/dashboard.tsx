"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  Sparkles,
  Camera,
  LogOut,
  Plus,
  Trash2,
  Utensils,
  RefreshCw,
  Search,
  Check,
  CheckCircle,
  Bell,
  MessageSquare,
  Bookmark,
  Heart,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Send,
  Loader2,
  User,
  BookOpen,
  Home,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Meal {
  id: string;
  name: string;
  image: string;
  time: string;
  difficulty: "Easy" | "Medium" | "Hard";
  calories: string;
  description: string;
}

// Recipes categorized by mood
const moodRecipes: Record<string, Meal[]> = {
  happy: [
    {
      id: "h1",
      name: "Crunchy Uzbek Somsa",
      image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=60",
      time: "45 Mins",
      difficulty: "Medium",
      calories: "380 kcal",
      description: "Delightful golden-brown flaky pastry filled with minced beef, onions, and cumin.",
    },
    {
      id: "h2",
      name: "Classic Italian Margherita Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60",
      time: "20 Mins",
      difficulty: "Easy",
      calories: "650 kcal",
      description: "Simple, cheerful pizza with fresh tomato sauce, mozzarella cheese, and fragrant basil leaves.",
    },
  ],
  relaxed: [
    {
      id: "r1",
      name: "Traditional Uzbek Palov",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=60",
      time: "60 Mins",
      difficulty: "Hard",
      calories: "820 kcal",
      description: "Slow-cooked, celebratory rice dish with tender lamb, sweet carrots, onions, and whole spices.",
    },
    {
      id: "r2",
      name: "Creamy Fettuccine Alfredo",
      image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&auto=format&fit=crop&q=60",
      time: "25 Mins",
      difficulty: "Easy",
      calories: "720 kcal",
      description: "Indulgent pasta tossed in a rich, buttery Parmesan cream sauce.",
    },
  ],
  tired: [
    {
      id: "t1",
      name: "Cozy Beef Mastava Soup",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=60",
      time: "35 Mins",
      difficulty: "Easy",
      calories: "420 kcal",
      description: "Warm, soothing liquid rice soup cooked with small beef cubes, vegetables, and fresh herbs.",
    },
    {
      id: "t2",
      name: "High-Protein Cold Norin",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=60",
      time: "15 Mins",
      difficulty: "Medium",
      calories: "340 kcal",
      description: "Traditional thin hand-cut noodles tossed with shredded cured beef and rich broth.",
    },
  ],
  sad: [
    {
      id: "s1",
      name: "Warm Hand-Pulled Lagman Noodles",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=60",
      time: "50 Mins",
      difficulty: "Hard",
      calories: "510 kcal",
      description: "Hearty, comforting hand-pulled noodles topped with a rich, aromatic meat and vegetable stew.",
    },
    {
      id: "s2",
      name: "Double Chocolate Fudge Brownie",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=60",
      time: "30 Mins",
      difficulty: "Easy",
      calories: "450 kcal",
      description: "Warm, gooey, comforting chocolate treat to instantly lift your spirits.",
    },
  ],
  stressed: [
    {
      id: "st1",
      name: "Spicy Beef Ramen",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=60",
      time: "20 Mins",
      difficulty: "Easy",
      calories: "580 kcal",
      description: "Fiery hot broth with tender noodles, soft boiled egg, and beef slices to sweat off stress.",
    },
    {
      id: "st2",
      name: "Crispy Garlic Butter Chicken Wings",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=60",
      time: "30 Mins",
      difficulty: "Medium",
      calories: "690 kcal",
      description: "Golden fried chicken wings coated in a highly satisfying rich garlic butter glaze.",
    },
  ],
  excited: [
    {
      id: "e1",
      name: "Aromatic Butter Chicken & Naan",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=60",
      time: "35 Mins",
      difficulty: "Medium",
      calories: "710 kcal",
      description: "Tender chicken cooked in a rich, buttery, spiced tomato cream sauce.",
    },
    {
      id: "e2",
      name: "Fresh Honey Fruit Salad with Almonds",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60",
      time: "10 Mins",
      difficulty: "Easy",
      calories: "220 kcal",
      description: "Vibrant, energizing mix of fresh apples, pears, and bananas topped with roasted almonds and honey.",
    },
  ],
};

const allDiscoverMeals = [
  ...moodRecipes.happy,
  ...moodRecipes.relaxed,
  ...moodRecipes.tired,
  ...moodRecipes.sad,
  ...moodRecipes.stressed,
  ...moodRecipes.excited,
];

const discoverCollections = [
  {
    title: "Quick Meals Under 20 Minutes",
    meals: [
      { name: "Avocado Toast with Egg", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&auto=format&fit=crop&q=60", time: "12 Min" },
      { name: "Caprese Salad Panel", image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=300&auto=format&fit=crop&q=60", time: "10 Min" },
      { name: "Creamy Garlic Shrimp", image: "https://images.unsplash.com/photo-1559742811-82428b5911b4?w=300&auto=format&fit=crop&q=60", time: "18 Min" },
    ],
  },
  {
    title: "Healthy Choices",
    meals: [
      { name: "Quinoa Veggie Bowl", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&auto=format&fit=crop&q=60", time: "25 Min" },
      { name: "Baked Lemon Salmon", image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=300&auto=format&fit=crop&q=60", time: "30 Min" },
      { name: "Green Greek Salad", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=60", time: "15 Min" },
    ],
  },
  {
    title: "Comfort Food",
    meals: [
      { name: "Mac & Cheese Skillet", image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=300&auto=format&fit=crop&q=60", time: "25 Min" },
      { name: "Creamy Mushroom Risotto", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&auto=format&fit=crop&q=60", time: "40 Min" },
      { name: "Classic French Onion Soup", image: "https://images.unsplash.com/photo-1547592165-e1d17f57655c?w=300&auto=format&fit=crop&q=60", time: "45 Min" },
    ],
  },
];

const initialIngredients = [
  { id: "1", name: "Cheese", category: "dairy" },
  { id: "2", name: "Eggs", category: "meat" },
  { id: "3", name: "Tomatoes", category: "vegetables" },
  { id: "4", name: "Potatoes", category: "vegetables" },
  { id: "5", name: "Beef Meat", category: "meat" },
  { id: "6", name: "Milk", category: "dairy" },
];

export function Dashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"main" | "fridge" | "recipes" | "saved" | "profile">("main");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [savedMeals, setSavedMeals] = useState<string[]>(["h2"]); // Default saved
  const [activeRecipe, setActiveRecipe] = useState<Meal | null>(null);
  const [healthRecommendation, setHealthRecommendation] = useState<{ title: string; benefits: string; ingredients: string; recipe: string; image?: string } | null>(null);
  const [dbSavedRecipes, setDbSavedRecipes] = useState<any[]>([]);
  const [isSavingRecipe, setIsSavingRecipe] = useState(false);

  // Mood Analyzer states
  const [textInput, setTextInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  // Sidebar toggle states
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Chatbot states
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Hello! I am your personal AI cooking companion. Tell me how your day went and what you want to eat!" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fridge Scanner states
  const [fridgeImage, setFridgeImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientCategory, setNewIngredientCategory] = useState("vegetables");
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
  const [fridgeRecipes, setFridgeRecipes] = useState<Meal[]>([]);

  // Simple Notification banner
  const [notification, setNotification] = useState<string | null>(
    "Tip: Select your mood on the Main section to get personalized recipe suggestions!"
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, aiTyping]);

  useEffect(() => {
    const fetchFridge = async () => {
      try {
        const response = await fetch("/api/fridge");
        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.ingredients)) {
            setIngredients(data.ingredients);
          }
        }
      } catch (err) {
        console.error("Error fetching fridge ingredients:", err);
      }
    };
    fetchFridge();
  }, []);

  const saveIngredientsToServer = async (list: typeof ingredients) => {
    try {
      await fetch("/api/fridge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: list }),
      });
    } catch (err) {
      console.error("Failed to save ingredients to server:", err);
    }
  };

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const res = await fetch("/api/recipes");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.recipes)) {
            setDbSavedRecipes(data.recipes);
          }
        }
      } catch (err) {
        console.error("Failed to fetch saved recipes:", err);
      }
    };
    fetchSavedRecipes();
  }, []);

  const handleSaveCustomRecipe = async () => {
    if (!healthRecommendation) return;
    setIsSavingRecipe(true);
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: healthRecommendation.title,
          ingredients: healthRecommendation.ingredients,
          instructions: healthRecommendation.recipe,
          mood: selectedMood,
          image: healthRecommendation.image,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.recipe) {
          setDbSavedRecipes((prev) => [data.recipe, ...prev]);
          setNotification("Recipe successfully saved to your profile!");
        }
      }
    } catch (err) {
      console.error("Failed to save custom recipe:", err);
    } finally {
      setIsSavingRecipe(false);
    }
  };

  const handleDeleteSavedRecipe = async (id: string) => {
    try {
      const res = await fetch(`/api/recipes?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDbSavedRecipes((prev) => prev.filter((r) => r.id !== id));
        setNotification("Recipe removed from your profile.");
      }
    } catch (err) {
      console.error("Failed to delete recipe:", err);
    }
  };

  const toggleSaveMeal = (id: string) => {
    setSavedMeals((prev) =>
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const handleAnalyzeMood = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    setAnalyzing(true);
    setAnalysisResult(null);
    setHealthRecommendation(null);

    const userTextInput = textInput.trim();
    setTextInput("");

    try {
      const response = await fetch("/api/analyze-mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userTextInput }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.mood && data.label) {
          setSelectedMood(data.mood);
          setAnalysisResult(`Detected mood: ${data.label}`);
          setHealthRecommendation(data.recommendation || null);

          // Also append a nice message in the chat
          setChatMessages((prev) => [
            ...prev,
            { sender: "user", text: `I analyzed my mood: "${userTextInput}"` },
            { sender: "ai", text: `I detected your mood is "${data.label}". Below I have updated your recipe recommendations based on how you feel! 🍽️` }
          ]);
          setAnalyzing(false);
          return;
        }
      }
    } catch (err) {
      console.error("Error calling analyze-mood API:", err);
    }

    // Fallback: Local Keyword Heuristic
    const text = userTextInput.toLowerCase();
    let detectedMood = "happy"; // default
    let detectedLabel = "Happy 😊";

    if (text.includes("charch") || text.includes("tired") || text.includes("holsiz") || text.includes("uyqu") || text.includes("charchadim") || text.includes("toliqdim")) {
      detectedMood = "tired";
      detectedLabel = "Tired 😴";
    } else if (text.includes("stress") || text.includes("asab") || text.includes("siqil") || text.includes("g'azab") || text.includes("angry") || text.includes("asabiylash")) {
      detectedMood = "stressed";
      detectedLabel = "Stressed 😤";
    } else if (text.includes("xafa") || text.includes("yomon") || text.includes("sad") || text.includes("ma'yus") || text.includes("yig'la") || text.includes("g'amgin")) {
      detectedMood = "sad";
      detectedLabel = "Sad 😔";
    } else if (text.includes("tinch") || text.includes("xotirjam") || text.includes("relaxed") || text.includes("calm") || text.includes("dam ol") || text.includes("hordiq")) {
      detectedMood = "relaxed";
      detectedLabel = "Relaxed 😌";
    } else if (text.includes("hayajon") || text.includes("excited") || text.includes("zo'r") || text.includes("a'lo") || text.includes("quvnoq") || text.includes("xursandman")) {
      detectedMood = "excited";
      detectedLabel = "Excited 🤩";
    } else if (text.includes("yaxshi") || text.includes("happy") || text.includes("quvonch") || text.includes("xursand")) {
      detectedMood = "happy";
      detectedLabel = "Happy 😊";
    } else {
      const moodsList = ["happy", "relaxed", "tired", "sad", "stressed", "excited"];
      detectedMood = moodsList[Math.floor(Math.random() * moodsList.length)];
      const labels: Record<string, string> = {
        happy: "Happy 😊",
        relaxed: "Relaxed 😌",
        tired: "Tired 😴",
        sad: "Sad 😔",
        stressed: "Stressed 😤",
        excited: "Excited 🤩",
      };
      detectedLabel = labels[detectedMood];
    }

    setSelectedMood(detectedMood);
    setAnalysisResult(`Detected mood (heuristic): ${detectedLabel}`);

    // Also append a nice message in the chat
    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text: `I analyzed my mood: "${userTextInput}"` },
      { sender: "ai", text: `I detected your mood is "${detectedLabel}". Below I have updated your recipe recommendations based on how you feel! 🍽️` }
    ]);
    setAnalyzing(false);
  };

  // AI Chat submission handler
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");
    setAiTyping(true);

    setTimeout(() => {
      let aiText = "";
      const lower = userText.toLowerCase();

      if (lower.includes("tired") || lower.includes("easy") || lower.includes("quick")) {
        aiText = "Based on your mood and preferences, I recommend a quick Cozy Beef Mastava Soup 🍲 or a simple Margherita Pizza 🍕 which takes less than 20 minutes to prepare!";
      } else if (lower.includes("sad") || lower.includes("comfort") || lower.includes("warm")) {
        aiText = "A warm, comforting bowl of hand-pulled Lagman Noodles 🍜 is perfect for lifting your spirits today. It will soothe your heart and keep you full.";
      } else if (lower.includes("stressed") || lower.includes("spicy")) {
        aiText = "Let's sweat off that stress with a bowl of Spicy Beef Ramen 🍜 or satisfying Garlic Butter Chicken Wings 🍗. Heavy flavors will help you release tension!";
      } else {
        aiText = "I suggest going with our Crunchy Uzbek Somsa 🥟 accompanied by fresh green tea. It is light, satisfying, and perfect for dinner.";
      }

      setChatMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
      setAiTyping(false);
    }, 1500);
  };

  // Real Refrigerator Scan via AI Vision
  const handleFridgeScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(true);
    setDetectedIngredients([]);
    setFridgeRecipes([]);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setFridgeImage(base64Image);

      try {
        const response = await fetch("/api/scan-fridge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.ingredients)) {
            setIngredients(data.ingredients);
            if (Array.isArray(data.detected)) {
              setDetectedIngredients(data.detected);
            }

            // Generate contextual recipes on the fly depending on scanned items
            const hasEggs = data.ingredients.some((i: any) => i.name.toLowerCase().includes("egg"));
            const hasTomatoes = data.ingredients.some((i: any) => i.name.toLowerCase().includes("tomato"));
            const hasCheese = data.ingredients.some((i: any) => i.name.toLowerCase().includes("cheese"));
            const hasPotatoes = data.ingredients.some((i: any) => i.name.toLowerCase().includes("potato"));

            const suggested = [];
            if (hasEggs && hasTomatoes) {
              suggested.push({
                id: "fr1",
                name: "Fresh Shakshuka (Tomato Omelette)",
                image: "https://images.unsplash.com/photo-1590412200988-a436bb705300?w=600&auto=format&fit=crop&q=60",
                time: "15 Mins",
                difficulty: "Easy" as const,
                calories: "320 kcal",
                description: "Poached eggs cooked in a delicious sauce of tomatoes, olive oil, and melted cheese.",
              });
            }
            if (hasCheese && hasPotatoes) {
              suggested.push({
                id: "fr2",
                name: "Cheesy Potato Hash",
                image: "https://images.unsplash.com/photo-1518047601542-79f18c655718?w=600&auto=format&fit=crop&q=60",
                time: "20 Mins",
                difficulty: "Easy" as const,
                calories: "450 kcal",
                description: "Crispy pan-fried potatoes topped with melted cheese and a fried egg.",
              });
            }
            if (suggested.length === 0) {
              suggested.push({
                id: "fr3",
                name: "Healthy Vegetable Stir-Fry",
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60",
                time: "15 Mins",
                difficulty: "Easy" as const,
                calories: "250 kcal",
                description: "Quick stir-fry using your available fresh vegetables and seasonings.",
              });
            }
            setFridgeRecipes(suggested);
          }
        }
      } catch (err) {
        console.error("Error scanning fridge image:", err);
      } finally {
        setScanning(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    const userName = session?.user?.name?.split(" ")[0] || "there";
    if (hours < 12) return `Good Morning, ${userName}`;
    if (hours < 18) return `Good Afternoon, ${userName}`;
    return `Welcome back, ${userName}`;
  };

  const getCuisinePreference = () => {
    const cuisinesStr = session?.user?.preferredCuisines;
    if (!cuisinesStr) return "Italian";
    const parts = cuisinesStr.split(",");
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  };

  const addManualIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIngredientName.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      name: newIngredientName.trim(),
      category: newIngredientCategory as any,
    };
    const updated = [...ingredients, newItem];
    setIngredients(updated);
    setNewIngredientName("");
    await saveIngredientsToServer(updated);
  };

  const deleteIngredient = async (id: string) => {
    const updated = ingredients.filter((item) => item.id !== id);
    setIngredients(updated);
    await saveIngredientsToServer(updated);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-[#0C0C0C] flex relative overflow-x-hidden">
      {/* Mobile Sidebar Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* ─── Left Sidebar Navigation ─── */}
      <aside
        className={`fixed inset-y-0 left-0 flex flex-col border-r border-[#EAEAE6] bg-[#F9F9F6] transition-all duration-300
          ${isMobileOpen ? "translate-x-0 z-50" : "-translate-x-full z-40"}
          md:translate-x-0 shrink-0 justify-between md:z-40
          ${isCollapsed ? "w-[68px]" : "w-64"}`}
      >
        <div className="flex flex-col gap-6 px-3 pt-5">
          {/* Logo & Toggle Button */}
          <div className="relative flex items-center h-8 px-1 group/logo">
            {/* Unified Logo — M and F stay in place, "ood" parts animate */}
            <span className="text-xl font-display font-bold tracking-tight whitespace-nowrap select-none">
              <span className="text-[#0C0C0C]">M</span>
              <span
                className="inline-block overflow-hidden align-bottom transition-all duration-300 ease-in-out"
                style={{ width: isCollapsed ? 0 : '38px', opacity: isCollapsed ? 0 : 1 }}
              >
                <span className="text-[#0C0C0C]">ood</span>
              </span>
              <span className="text-[#16A34A] italic font-semibold">F</span>
              <span
                className="inline-block overflow-hidden align-bottom transition-all duration-300 ease-in-out"
                style={{ width: isCollapsed ? 0 : '42px', opacity: isCollapsed ? 0 : 1 }}
              >
                <span className="text-[#16A34A] italic font-semibold pl-[1px]">ood</span>
              </span>
            </span>

            {/* Collapse toggle — overlays logo on hover when collapsed */}
            {isCollapsed && (
              <button
                onClick={() => setIsCollapsed(false)}
                className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-all duration-200 text-[#5A5A57] hover:text-[#0C0C0C] rounded-lg hover:bg-[#F3F3EF] active:bg-[#EAEAE6] bg-transparent border-none focus:outline-none cursor-pointer"
                title="Expand Sidebar"
              >
                <PanelLeftOpen className="h-5 w-5" />
              </button>
            )}

            {/* Collapse button when expanded */}
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="hidden md:flex ml-auto h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F3F3EF] active:bg-[#EAEAE6] transition-all duration-200 text-[#5A5A57] hover:text-[#0C0C0C] bg-transparent border-none focus:outline-none cursor-pointer shrink-0"
                title="Collapse Sidebar"
              >
                <PanelLeftClose className="h-5 w-5" />
              </button>
            )}

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden ml-auto h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#F3F3EF] active:bg-[#EAEAE6] text-[#5A5A57] hover:text-[#0C0C0C] bg-transparent border-none transition-all duration-200 cursor-pointer shrink-0"
              title="Close Menu"
            >
              <PanelLeftClose className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Options */}
          <nav className="flex flex-col gap-1">
            {[
              { id: "main", label: "Main", icon: Home },
              { id: "fridge", label: "Refrigerator", icon: Camera },
              { id: "recipes", label: "Recipes", icon: BookOpen },
              { id: "saved", label: "Saved Recipes", icon: Heart },
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setActiveRecipe(null);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 h-10 px-3 rounded-xl text-sm font-semibold transition-colors duration-200 relative overflow-hidden ${
                    active
                      ? "bg-[#16A34A] text-white"
                      : "text-[#5A5A57] hover:bg-[#F3F3EF] hover:text-[#0C0C0C]"
                  }`}
                  title={item.label}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className={`whitespace-nowrap transition-opacity duration-200 ${isCollapsed && !isMobileOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
                    {item.label}
                  </span>
                  {item.id === "saved" && savedMeals.length > 0 && (
                    <>
                      {(!isCollapsed || isMobileOpen) && (
                        <span
                          className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            active ? "bg-white text-[#16A34A]" : "bg-[#16A34A]/10 text-[#16A34A]"
                          }`}
                        >
                          {savedMeals.length}
                        </span>
                      )}
                      {isCollapsed && !isMobileOpen && (
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile and Logout Actions */}
        <div className="flex flex-col gap-1 px-3 pb-5 pt-4 border-t border-[#EAEAE6]">
          <button
            onClick={() => {
              setActiveTab("profile");
              setActiveRecipe(null);
              setIsMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 h-10 px-3 rounded-xl text-sm font-semibold transition-colors duration-200 ${
              activeTab === "profile"
                ? "bg-[#16A34A] text-white"
                : "text-[#5A5A57] hover:bg-[#F3F3EF] hover:text-[#0C0C0C]"
            }`}
            title="Profile Insights"
          >
            <User className="h-5 w-5 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-200 ${isCollapsed && !isMobileOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
              Profile
            </span>
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className={`w-full flex items-center gap-3 h-10 px-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors duration-200`}
            title="Sign Out"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className={`whitespace-nowrap transition-opacity duration-200 ${isCollapsed && !isMobileOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* ─── Main Content Area (Right Side) ─── */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? "md:pl-[68px]" : "md:pl-64"
        }`}
      >
        {/* Mobile Floating Trigger Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-[#EAEAE6] bg-[#FDFDFB] sticky top-0 z-30">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 border border-[#EAEAE6] rounded-xl hover:bg-[#F3F3EF] transition text-[#0C0C0C]"
            title="Open Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-base font-display font-bold tracking-tight">
            Mood<span className="text-[#16A34A] italic font-semibold">Food</span>
          </span>
          <div className="w-9 h-9 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center text-sm font-semibold">
            {session?.user?.name?.[0] || "U"}
          </div>
        </header>

        {/* Dynamic Section Contents */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-5xl">
          
          {/* TAB 1: MAIN SECTION (Mood Selection & AI Recommendations) */}
          {activeTab === "main" && (
            <div className="flex flex-col gap-10 animate-in fade-in duration-300">
              
              {/* Welcome Headline */}
              <section className="flex flex-col gap-1.5 pb-6 border-b border-[#EAEAE6]">
                <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#0C0C0C]">
                  {getGreeting()}
                </h1>
                <p className="text-lg text-[#5A5A57]">
                  How are you feeling today? Describe your mood below or select a quick card.
                </p>
              </section>

              {/* Main-app splits */}
              <div className="w-full flex flex-col gap-6">
                
                {/* Mood Detection and Cards (Full Width) */}
                <div className="w-full flex flex-col gap-6">
                  
                  {/* Mood Analyzer Input Box */}
                  <div className="rounded-3xl border border-[#EAEAE6] bg-white p-6 shadow-soft-sm flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-[#16A34A]" />
                      <h3 className="text-base font-semibold text-[#0C0C0C]">
                        Mood Analyzer (AI Mood Analysis)
                      </h3>
                    </div>
                    <form onSubmit={handleAnalyzeMood} className="flex flex-col gap-3">
                      <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="How was your day? What are you feeling? (For example: Today I am tired, had a great rest, feeling stressed, happy...)"
                        className="w-full min-h-[100px] p-4 rounded-2xl border border-[#EAEAE6] bg-[#F9F9F6] text-sm focus:outline-none focus:ring-1 focus:ring-[#16A34A] transition-all resize-none"
                      />
                      <Button
                        type="submit"
                        disabled={analyzing || !textInput.trim()}
                        className="h-10 rounded-full font-semibold bg-[#16A34A] hover:bg-[#16A34A]/90 text-white flex items-center justify-center gap-2 transition"
                      >
                        {analyzing ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin animate-pulse-green" />
                            Analyzing Mood...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            Analyze & Get Recipes
                          </>
                        )}
                      </Button>
                    </form>

                    {analysisResult && (
                      <div className="p-4 rounded-2xl bg-[#16A34A]/5 border border-[#16A34A]/20 flex items-center gap-3 text-sm text-[#0C0C0C] font-medium animate-in fade-in duration-300">
                        <CheckCircle className="h-5 w-5 text-[#16A34A]" />
                        <span>{analysisResult}</span>
                      </div>
                    )}
                  </div>

                  {/* Mood Selection Card Grid */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#A1A19D]">
                      Quick Select Mood
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {[
                        { id: "happy", emoji: "😊", label: "Happy", color: "hover:border-emerald-300 hover:bg-emerald-50/20" },
                        { id: "relaxed", emoji: "😌", label: "Relaxed", color: "hover:border-blue-300 hover:bg-blue-50/20" },
                        { id: "tired", emoji: "😴", label: "Tired", color: "hover:border-amber-300 hover:bg-amber-50/20" },
                        { id: "sad", emoji: "😔", label: "Sad", color: "hover:border-indigo-300 hover:bg-indigo-50/20" },
                        { id: "stressed", emoji: "😤", label: "Stressed", color: "hover:border-rose-300 hover:bg-rose-50/20" },
                        { id: "excited", emoji: "🤩", label: "Excited", color: "hover:border-orange-300 hover:bg-orange-50/20" },
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            setSelectedMood(selectedMood === m.id ? null : m.id);
                            setAnalysisResult(selectedMood === m.id ? null : `Manual select: ${m.label} ${m.emoji}`);
                            setHealthRecommendation(null);
                          }}
                          className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-soft-sm ${
                            selectedMood === m.id
                              ? "border-[#16A34A] bg-[#16A34A]/5 ring-1 ring-[#16A34A]"
                              : `border-[#EAEAE6] bg-white ${m.color}`
                          }`}
                        >
                          <span className="text-2xl" aria-hidden="true">
                            {m.emoji}
                          </span>
                          <span className="text-xs font-bold text-[#0C0C0C]">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Recipe Recommendations Section */}
              <section className="flex flex-col gap-5 pt-4 border-t border-[#EAEAE6]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#A1A19D]">
                    Recipe Recommendations for you
                  </h2>
                </div>

                {!selectedMood ? (
                  // Empty State Experience
                  <div className="rounded-3xl border border-dashed border-[#EAEAE6] bg-white p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
                    <div className="h-12 w-12 rounded-full bg-[#16A34A]/5 text-[#16A34A] flex items-center justify-center text-xl mb-4">
                      ✨
                    </div>
                    <h3 className="text-lg font-semibold text-[#0C0C0C]">
                      Tell us how you're feeling to view recipes
                    </h3>
                    <p className="text-xs text-[#5A5A57] mt-1 max-w-xs">
                      Use the Mood Analyzer text box or select a quick card above to get instant personalized recipe suggestions.
                    </p>
                  </div>
                ) : healthRecommendation ? (
                  // Text + Image Custom Health Recommendation (Persisted in DB)
                  <div className="w-full rounded-3xl border border-[#16A34A]/20 bg-gradient-to-br from-[#16A34A]/5 to-[#16A34A]/10 p-6 sm:p-8 flex flex-col gap-6 shadow-soft animate-in fade-in duration-300 relative">
                    {/* Save Recipe Button */}
                    <button
                      onClick={handleSaveCustomRecipe}
                      disabled={isSavingRecipe}
                      className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white text-[#5A5A57] hover:text-red-500 shadow-soft-sm transition disabled:opacity-50 z-10 cursor-pointer"
                      title="Save Recipe to Profile"
                    >
                      <Heart className={`h-5 w-5 ${dbSavedRecipes.some(r => r.title === healthRecommendation.title) ? "fill-red-500 text-red-500" : ""}`} />
                    </button>

                    <div className="flex flex-col gap-1.5 pr-12">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#16A34A] flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
                        🩺 Tibbiy Tadqiqotlarga Asoslangan Tavsiya (AI)
                      </span>
                      <h3 className="text-2xl font-display font-bold text-[#0C0C0C]">
                        {healthRecommendation.title}
                      </h3>
                    </div>

                    {/* Generated Food Image */}
                    {healthRecommendation.image && (
                      <div className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden border border-[#EAEAE6] shadow-soft-sm bg-[#F3F3EF] max-h-80">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={healthRecommendation.image} alt={healthRecommendation.title} className="object-cover w-full h-full" />
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-[#EAEAE6]">
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A5A57]">
                            🩺 Tibbiy/Ozuqaviy Foydasi
                          </h4>
                          <p className="text-xs text-[#0C0C0C] leading-relaxed bg-white/70 p-4 rounded-2xl border border-[#EAEAE6] shadow-soft-sm">
                            {healthRecommendation.benefits}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A5A57]">
                            🛒 Zaruriy Masalliqlar
                          </h4>
                          <div className="text-xs text-[#0C0C0C] whitespace-pre-line leading-relaxed bg-white/70 p-4 rounded-2xl border border-[#EAEAE6] shadow-soft-sm">
                            {healthRecommendation.ingredients}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A5A57]">
                          🍳 Tayyorlanish Usuli
                        </h4>
                        <div className="text-xs text-[#0C0C0C] whitespace-pre-line leading-relaxed bg-white/70 p-4 rounded-2xl border border-[#EAEAE6] shadow-soft-sm">
                          {healthRecommendation.recipe}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 animate-in fade-in zoom-in-95 duration-200">
                    {moodRecipes[selectedMood]?.map((meal) => {
                      const saved = savedMeals.includes(meal.id);
                      return (
                        <div
                          key={meal.id}
                          className="rounded-3xl border border-[#EAEAE6] bg-white overflow-hidden shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col group"
                        >
                          <div className="relative aspect-[16/10] overflow-hidden bg-[#F3F3EF]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={meal.image} alt={meal.name} className="object-cover w-full h-full group-hover:scale-102 transition duration-500" />
                            <button
                              onClick={() => toggleSaveMeal(meal.id)}
                              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white text-[#5A5A57] hover:text-red-500 shadow-soft-sm transition"
                            >
                              <Heart className={`h-4.5 w-4.5 ${saved ? "fill-red-500 text-red-500" : ""}`} />
                            </button>
                          </div>

                          <div className="p-4 flex-1 flex flex-col gap-2">
                            <div className="flex items-center justify-between text-[10px] text-[#A1A19D]">
                              <span>{meal.time}</span>
                              <span>{meal.calories}</span>
                            </div>
                            <h3 className="text-base font-semibold text-[#0C0C0C] truncate leading-tight">
                              {meal.name}
                            </h3>
                            <p className="text-[11px] text-[#5A5A57] line-clamp-2 leading-relaxed">
                              {meal.description}
                            </p>

                            <div className="mt-auto pt-2 border-t border-[#F3F3EF] flex items-center justify-between">
                              <span className="text-[9px] font-bold uppercase tracking-wide text-[#A1A19D]">
                                Diff: <span className="text-[#0C0C0C]">{meal.difficulty}</span>
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setActiveRecipe(meal)}
                                className="h-7 text-xs font-semibold px-2.5 text-[#16A34A] hover:bg-[#16A34A]/5 rounded-lg"
                              >
                                View Recipe
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeRecipe && (
                  <div className="rounded-2xl border border-[#16A34A]/20 bg-[#16A34A]/5 p-5 animate-in slide-in-from-bottom-3 duration-300">
                    <div className="flex items-start justify-between">
                      <h3 className="text-base font-bold text-[#0C0C0C]">{activeRecipe.name} - Cooking Steps</h3>
                      <button onClick={() => setActiveRecipe(null)} className="text-xs text-[#5A5A57] hover:underline">Close</button>
                    </div>
                    <div className="mt-3 text-xs text-[#5A5A57] space-y-2">
                      <p><strong>Calories:</strong> {activeRecipe.calories} | <strong>Prep Time:</strong> {activeRecipe.time}</p>
                      <p>Mix ingredients, heat saucepan or oven, and cook for specified time. Serve fresh with hot tea.</p>
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}

          {/* TAB 2: VIRTUAL REFRIGERATOR (Shelves, Skanerlash) */}
          {activeTab === "fridge" && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-300">
              
              <section className="flex flex-col gap-1 pb-4 border-b border-[#EAEAE6]">
                <h1 className="text-2xl font-display font-bold text-[#0C0C0C]">
                  Muzlatgich Skaneri va Javonlari
                </h1>
                <p className="text-sm text-[#5A5A57]">
                  Muzlatgichdagi mahsulotlarni boshqaring yoki AI orqali rasmni skanerlang.
                </p>
              </section>

              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Visual Fridge Shelves (Spans 7 columns) */}
                <div className="md:col-span-7 rounded-3xl border border-[#EAEAE6] bg-white p-6 shadow-soft flex flex-col">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#A1A19D] mb-4">
                    Muzlatgich Tarkibi ({ingredients.length} mahsulot)
                  </h3>

                  <div className="border-4 border-foreground/5 rounded-2xl p-4 bg-[#F9F9F6] flex flex-col gap-5">
                    {/* Shelf 1: Dairy */}
                    <div className="border-b border-[#EAEAE6] pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-primary">
                        🥛 Dairy & Liquids
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {ingredients
                          .filter((i) => i.category === "dairy")
                          .map((i) => (
                            <span key={i.id} className="inline-flex items-center gap-1 bg-white border border-[#EAEAE6] px-2.5 py-1 rounded-lg text-xs font-semibold">
                              {i.name}
                              <button onClick={() => deleteIngredient(i.id)} className="text-red-500 hover:text-red-700 ml-1">×</button>
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Shelf 2: Meat */}
                    <div className="border-b border-[#EAEAE6] pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-orange-600">
                        🥩 Meats & Proteins
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {ingredients
                          .filter((i) => i.category === "meat")
                          .map((i) => (
                            <span key={i.id} className="inline-flex items-center gap-1 bg-white border border-[#EAEAE6] px-2.5 py-1 rounded-lg text-xs font-semibold">
                              {i.name}
                              <button onClick={() => deleteIngredient(i.id)} className="text-red-500 hover:text-red-700 ml-1">×</button>
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Shelf 3: Veggies */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-green-700">
                        🥦 Vegetables & Fruits
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {ingredients
                          .filter((i) => i.category === "vegetables")
                          .map((i) => (
                            <span key={i.id} className="inline-flex items-center gap-1 bg-white border border-[#EAEAE6] px-2.5 py-1 rounded-lg text-xs font-semibold">
                              {i.name}
                              <button onClick={() => deleteIngredient(i.id)} className="text-red-500 hover:text-red-700 ml-1">×</button>
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right controls: Upload scan (Spans 5 columns) */}
                <div className="md:col-span-5 flex flex-col gap-6">
                  {/* Manual Input */}
                  <div className="rounded-3xl border border-[#EAEAE6] bg-white p-5 shadow-soft">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#A1A19D] mb-3">
                      Manual Add Ingredient
                    </h3>
                    <form onSubmit={addManualIngredient} className="flex gap-2">
                      <input
                        type="text"
                        value={newIngredientName}
                        onChange={(e) => setNewIngredientName(e.target.value)}
                        placeholder="Add Item..."
                        className="flex-1 h-9 px-3 rounded-lg border border-[#EAEAE6] bg-[#FDFDFB] text-xs focus:outline-none focus:ring-1"
                      />
                      <Button type="submit" size="sm" className="h-9 rounded-lg">Add</Button>
                    </form>
                  </div>

                  {/* AI Upload simulator */}
                  <div className="rounded-3xl border border-[#EAEAE6] bg-white p-5 shadow-soft flex flex-col gap-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#A1A19D]">
                      Scan Fridge Image
                    </h3>

                    {scanning ? (
                      <div className="border border-dashed border-[#EAEAE6] rounded-xl p-8 bg-[#FDFDFB] flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#16A34A]/10 to-transparent border-y border-[#16A34A]/20 h-6 w-full animate-bounce" />
                        <RefreshCw className="h-6 w-6 text-[#16A34A] animate-spin mb-2" />
                        <p className="text-xs font-semibold text-[#0C0C0C]">Scanning layout...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {fridgeImage ? (
                          <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#EAEAE6]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={fridgeImage} alt="Uploaded Fridge" className="w-full h-full object-cover" />
                            <button
                              onClick={() => {
                                setFridgeImage(null);
                                setDetectedIngredients([]);
                                setFridgeRecipes([]);
                              }}
                              className="absolute top-2 right-2 bg-black/60 text-white rounded-full h-6 w-6 text-xs flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer border-2 border-dashed border-[#EAEAE6] hover:border-[#16A34A]/30 transition rounded-xl p-6 bg-[#FDFDFB] flex flex-col items-center justify-center text-center">
                            <Camera className="h-6 w-6 text-[#A1A19D] mb-2" />
                            <span className="text-xs font-semibold text-[#0C0C0C]">Upload Fridge Photo</span>
                            <input type="file" accept="image/*" onChange={handleFridgeScan} className="hidden" />
                          </label>
                        )}

                        {detectedIngredients.length > 0 && (
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A1A19D]">Detected Ingredients</span>
                            <div className="flex flex-wrap gap-1.5">
                              {detectedIngredients.map((item) => (
                                <span key={item} className="bg-[#16A34A]/15 text-[#16A34A] px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                  ✓ {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {fridgeRecipes.length > 0 && (
                          <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-[#EAEAE6]">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A1A19D]">Generated Recipes</span>
                            <div className="flex flex-col gap-1.5">
                              {fridgeRecipes.map((r) => (
                                <button
                                  key={r.id}
                                  onClick={() => setActiveRecipe(r)}
                                  className="text-left w-full p-2.5 rounded-lg bg-[#F9F9F6] border border-[#EAEAE6] hover:bg-[#F3F3EF] transition flex items-center justify-between text-xs font-semibold"
                                >
                                  <span>{r.name} ({r.time})</span>
                                  <ChevronRight className="h-4 w-4 text-[#A1A19D]" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DISCOVER RECIPES (Spotify playlists) */}
          {activeTab === "recipes" && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-300">
              <section className="flex flex-col gap-1 pb-4 border-b border-[#EAEAE6]">
                <h1 className="text-2xl font-display font-bold text-[#0C0C0C]">
                  Discover Recipes
                </h1>
                <p className="text-sm text-[#5A5A57]">
                  Browse Spotify-like playlists categorized by cooking level and categories.
                </p>
              </section>

              {/* Collections */}
              <div className="flex flex-col gap-8">
                {/* Dynamically filters based on preferred cuisine */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-[#0C0C0C] tracking-tight">
                    Because You Like {getCuisinePreference()} Food
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {allDiscoverMeals.slice(0, 3).map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-[#EAEAE6] rounded-2xl overflow-hidden shadow-soft-sm hover:shadow-soft transition duration-300 flex flex-col group cursor-pointer"
                        onClick={() => setActiveRecipe(m)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.image} alt={m.name} className="h-28 w-full object-cover group-hover:scale-102 transition duration-500" />
                        <div className="p-3">
                          <p className="text-xs font-semibold text-[#0C0C0C] truncate">{m.name}</p>
                          <p className="text-[10px] text-[#A1A19D] mt-0.5">{m.time} · {m.difficulty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {discoverCollections.map((col) => (
                  <div key={col.title} className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold text-[#0C0C0C] tracking-tight">
                      {col.title}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {col.meals.map((m, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-[#EAEAE6] rounded-2xl overflow-hidden shadow-soft-sm hover:shadow-soft transition duration-300 flex flex-col group cursor-pointer"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={m.image} alt={m.name} className="h-28 w-full object-cover group-hover:scale-102 transition duration-500" />
                          <div className="p-3">
                            <p className="text-xs font-semibold text-[#0C0C0C] truncate">{m.name}</p>
                            <p className="text-[10px] text-[#A1A19D] mt-0.5">{m.time} · Easy</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SAVED RECIPES (From SQLite database) */}
          {activeTab === "saved" && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-300">
              <section className="flex flex-col gap-1 pb-4 border-b border-[#EAEAE6]">
                <h1 className="text-2xl font-display font-bold text-[#0C0C0C]">
                  Saved Recipes
                </h1>
                <p className="text-sm text-[#5A5A57]">
                  Your favorite saved meals and custom curated recipes.
                </p>
              </section>

              {dbSavedRecipes.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#EAEAE6] bg-white p-12 text-center flex flex-col items-center justify-center min-h-[260px]">
                  <Heart className="h-10 w-10 text-[#A1A19D] mb-3" />
                  <h3 className="text-base font-semibold text-[#0C0C0C]">No Saved Recipes</h3>
                  <p className="text-xs text-[#5A5A57] mt-1 max-w-xs">
                    Press the heart icon on any recipe suggestion to save them here for quick access.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-5">
                  {dbSavedRecipes.map((meal) => (
                    <div
                      key={meal.id}
                      className="rounded-3xl border border-[#EAEAE6] bg-white overflow-hidden shadow-soft-sm flex flex-col"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#F3F3EF]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={meal.image || "/images/food-placeholder.jpg"} alt={meal.title} className="object-cover w-full h-full" />
                        <button
                          onClick={() => handleDeleteSavedRecipe(meal.id)}
                          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/95 flex items-center justify-center text-red-500 shadow-soft-sm transition hover:scale-105 cursor-pointer"
                          title="Remove recipe"
                        >
                          <Trash2 className="h-4.5 w-4.5 text-red-500" />
                        </button>
                      </div>

                      <div className="p-4 flex-1 flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                          {meal.mood && (
                            <span className="bg-[#16A34A]/10 text-[#16A34A] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                              {meal.mood}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-[#0C0C0C] truncate leading-tight">
                          {meal.title}
                        </h3>
                        <p className="text-[11px] text-[#5A5A57] line-clamp-2 leading-relaxed">
                          {meal.benefits}
                        </p>

                        <div className="mt-auto pt-2 border-t border-[#F3F3EF] flex items-center justify-between">
                          <span className="text-[9px] font-bold text-[#A1A19D]">Saved on {new Date(meal.createdAt).toLocaleDateString()}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setActiveRecipe({
                              id: meal.id,
                              name: meal.title,
                              image: meal.image || "/images/food-placeholder.jpg",
                              time: "Custom",
                              difficulty: "Medium",
                              calories: "N/A",
                              description: (meal.benefits || "") + "\n\nIngredients:\n" + (meal.ingredients || "") + "\n\nInstructions:\n" + (meal.instructions || "")
                            })}
                            className="h-7 text-xs font-semibold px-2.5 text-[#16A34A] hover:bg-[#16A34A]/5 rounded-lg"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PROFILE INSIGHTS (User preferences list) */}
          {activeTab === "profile" && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-300">
              <section className="flex flex-col gap-1 pb-4 border-b border-[#EAEAE6]">
                <h1 className="text-2xl font-display font-bold text-[#0C0C0C]">
                  Preference Insights
                </h1>
                <p className="text-sm text-[#5A5A57]">
                  How MoodFood adapts to your choices and cooking habits.
                </p>
              </section>

              <div className="rounded-3xl border border-[#EAEAE6] bg-white p-6 shadow-soft max-w-md flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#0C0C0C]">{session?.user?.name}</h3>
                    <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-xs pt-4 border-t border-[#F3F3EF]">
                  <div className="flex items-center justify-between border-b border-[#F3F3EF] pb-2 text-[#5A5A57]">
                    <span>Favorite Cuisine:</span>
                    <span className="font-bold text-[#0C0C0C]">{getCuisinePreference()}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#F3F3EF] pb-2 text-[#5A5A57]">
                    <span>Cooking Level:</span>
                    <span className="font-bold text-[#0C0C0C]">Beginner</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#F3F3EF] pb-2 text-[#5A5A57]">
                    <span>Average Cooking Time:</span>
                    <span className="font-bold text-[#0C0C0C]">20 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between text-[#5A5A57]">
                    <span>Dietary Preference:</span>
                    <span className="font-bold text-[#0C0C0C]">None</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
