"use client";

import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

const FALLBACK_MENU = [
  {
    id: 1,
    name: "Espresso",
    price: 55,
    tag: "Hot",
    desc: "เข้มข้น กลิ่นหอม",
    image: "/coffee_hero.png",
  },
  {
    id: 2,
    name: "Latte",
    price: 65,
    tag: "Hot",
    desc: "นุ่มละมุน นมสด",
    image: "/cappuccino.png",
  },
  {
    id: 3,
    name: "Cappuccino",
    price: 65,
    tag: "Hot",
    desc: "ฟองนมหนานุ่ม",
    image: "/cappuccino.png",
  },
  {
    id: 4,
    name: "Iced Americano",
    price: 60,
    tag: "Cold",
    desc: "สดชื่น ไม่ใส่นม",
    image: "/coffee_hero.png",
  },
  {
    id: 5,
    name: "Matcha Latte",
    price: 75,
    tag: "Cold",
    desc: "ชาเขียวญี่ปุ่นแท้",
    image: "/matcha.png",
  },
  {
    id: 6,
    name: "Cocoa",
    price: 60,
    tag: "Cold",
    desc: "หวานมัน เด็กชอบ",
    image: "/cappuccino.png",
  },
];

export default function Home() {
  const [user, setUser] = useState(null);
  const [menuItems, setMenuItems] = useState(FALLBACK_MENU);
  const [loading, setLoading] = useState(true);

  // 1. Manage Supabase Auth Session
  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch Menu Items from Supabase
  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("menu")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          console.warn("Supabase fetch failed, using fallback data. Error:", error.message);
          setMenuItems(FALLBACK_MENU);
        } else if (data && data.length > 0) {
          setMenuItems(data);
        } else {
          setMenuItems(FALLBACK_MENU);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setMenuItems(FALLBACK_MENU);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-100 selection:bg-accent-orange selection:text-stone-950 antialiased">
      <Navbar user={user} />
      <main>
        <Hero />
        <Features />
        <Menu user={user} menuItems={menuItems} setMenuItems={setMenuItems} loading={loading} />
      </main>
      <Footer />
    </div>
  );
}
