"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isAuthOpen, setIsAuthOpen] = useState(false); // Auth modal state
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In / Sign Up
  
  // Auth Form Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // "customer" | "admin"
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navLinks = [
    { name: "หน้าแรก", href: "#home" },
    { name: "จุดเด่น", href: "#features" },
    { name: "เมนูของเรา", href: "#menu" },
    { name: "ติดต่อเรา", href: "#footer" },
  ];

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up with custom role in user_metadata
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: role,
            },
          },
        });

        if (error) throw error;
        setAuthSuccess("สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลหรือเข้าสู่ระบบ");
        setIsSignUp(false);
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        setAuthSuccess("เข้าสู่ระบบสำเร็จ!");
        setIsAuthOpen(false);
      }
    } catch (err) {
      setAuthError(err.message || "เกิดข้อผิดพลาดในการดำเนินการ");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Helper to render user role tag in Thai
  const getRoleLabel = (usr) => {
    const r = usr?.user_metadata?.role || "customer";
    return r === "admin" ? "แอดมิน" : "ลูกค้า";
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-primary-gray/60 bg-primary-dark/90 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <a href="#home" className="flex items-center gap-2 group">
                <svg
                  className="h-8 w-8 text-accent-orange transition-transform duration-300 group-hover:rotate-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                  <line x1="6" x2="6" y1="2" y2="4" strokeDasharray="1 1" />
                  <line x1="10" x2="10" y1="2" y2="4" strokeDasharray="1 1" />
                  <line x1="14" x2="14" y1="2" y2="4" strokeDasharray="1 1" />
                </svg>
                <span className="font-serif text-2xl font-black tracking-widest text-secondary-light transition-colors duration-300 group-hover:text-accent-orange">
                  sip<span className="text-accent-orange">555</span>
                </span>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-secondary-metal transition-colors duration-300 hover:text-accent-orange"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop CTA / Auth Button */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  {/* Role Badge */}
                  <span className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-bold ${
                    user?.user_metadata?.role === "admin"
                      ? "bg-accent-orange/15 text-accent-orange border border-accent-orange/30"
                      : "bg-primary-gray border border-primary-gray/80 text-secondary-metal"
                  }`}>
                    👤 {getRoleLabel(user)}
                  </span>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-lg border border-primary-gray bg-primary-gray/30 px-5 py-2 text-xs font-bold text-secondary-light transition-all duration-300 hover:bg-red-950/20 hover:text-red-400 hover:border-red-900/50 active:scale-95"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="inline-flex items-center justify-center rounded-lg bg-accent-orange px-6 py-2.5 text-sm font-bold text-secondary-light shadow-md shadow-accent-orange/15 transition-all duration-300 hover:scale-105 hover:bg-accent-orange-hover hover:shadow-lg hover:shadow-accent-orange/30 active:scale-95 border border-accent-orange/20"
                >
                  เข้าสู่ระบบ
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-secondary-metal hover:bg-primary-gray hover:text-secondary-light focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-80 border-b border-primary-gray bg-primary-dark" : "max-h-0"
          }`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-secondary-metal hover:bg-primary-gray hover:text-accent-orange transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-4 pb-2 border-t border-primary-gray/60 mt-3">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-3 py-1">
                    <span className="text-sm text-secondary-metal">ผู้ใช้งาน:</span>
                    <span className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-bold ${
                      user?.user_metadata?.role === "admin"
                        ? "bg-accent-orange/15 text-accent-orange border border-accent-orange/30"
                        : "bg-primary-gray border border-primary-gray/80 text-secondary-metal"
                    }`}>
                      👤 {getRoleLabel(user)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-center rounded-lg bg-primary-gray/40 border border-primary-gray py-2 text-sm font-bold text-secondary-light"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="block w-full text-center rounded-lg bg-accent-orange px-4 py-2.5 text-base font-bold text-secondary-light shadow-md shadow-accent-orange/15 hover:bg-accent-orange-hover transition-colors"
                >
                  เข้าสู่ระบบ
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal Overlay (Beautiful glassmorphism styled form) */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-primary-gray/80 bg-primary-dark p-8 shadow-2xl shadow-accent-orange/5 relative">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setIsAuthOpen(false);
                setAuthError("");
                setAuthSuccess("");
              }}
              className="absolute top-4 right-4 p-2 text-secondary-metal hover:text-secondary-light transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title */}
            <h3 className="font-serif text-2xl font-bold text-secondary-light mb-2">
              {isSignUp ? "สร้างบัญชีใหม่" : "เข้าสู่ระบบ"}
            </h3>
            <p className="text-secondary-metal text-xs mb-6">
              {isSignUp ? "สมัครใช้งานเพื่อรับสิทธิ์ลูกค้าหรือจัดการแผงควบคุมแอดมิน" : "กรอกอีเมลและรหัสผ่านเพื่อเข้าใช้งาน"}
            </p>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-secondary-metal mb-1.5 uppercase tracking-wider">
                  อีเมล
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-lg bg-primary-dark border border-primary-gray/80 px-4 py-3 text-sm text-secondary-light focus:outline-none focus:border-accent-orange transition-colors"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold text-secondary-metal mb-1.5 uppercase tracking-wider">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg bg-primary-dark border border-primary-gray/80 px-4 py-3 text-sm text-secondary-light focus:outline-none focus:border-accent-orange transition-colors"
                />
              </div>

              {/* Role Toggle Selector (Only visible during Sign Up) */}
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-secondary-metal mb-2.5 uppercase tracking-wider">
                    เลือกบทบาทการใช้งาน (Role)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole("customer")}
                      className={`rounded-lg py-2.5 text-xs font-bold border transition-all ${
                        role === "customer"
                          ? "bg-primary-gray text-secondary-light border-accent-orange/40"
                          : "bg-primary-dark text-secondary-metal border-primary-gray hover:bg-primary-gray/40"
                      }`}
                    >
                      👤 ลูกค้าทั่วไป
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("admin")}
                      className={`rounded-lg py-2.5 text-xs font-bold border transition-all ${
                        role === "admin"
                          ? "bg-accent-orange/10 text-accent-orange border-accent-orange/40"
                          : "bg-primary-dark text-secondary-metal border-primary-gray hover:bg-primary-gray/40"
                      }`}
                    >
                      🛠️ แอดมินร้าน
                    </button>
                  </div>
                </div>
              )}

              {/* Feedback messages */}
              {authError && <p className="text-red-500 text-xs font-semibold">{authError}</p>}
              {authSuccess && <p className="text-green-500 text-xs font-semibold">{authSuccess}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full items-center justify-center rounded-lg bg-accent-orange py-3 text-sm font-bold text-secondary-light hover:bg-accent-orange-hover transition-colors shadow-md shadow-accent-orange/15 disabled:opacity-50 mt-4"
              >
                {loading ? "กำลังดำเนินการ..." : isSignUp ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
              </button>
            </form>

            {/* Toggle Sign Up / Sign In footer link */}
            <div className="mt-6 text-center border-t border-primary-gray/40 pt-4">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setAuthError("");
                  setAuthSuccess("");
                }}
                className="text-xs text-accent-orange hover:underline font-bold"
              >
                {isSignUp ? "มีบัญชีผู้ใช้อยู่แล้ว? เข้าสู่ระบบ" : "ยังไม่มีบัญชีผู้ใช้งาน? สมัครสมาชิก"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
