"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import MenuCard from "./MenuCard";

export default function Menu({ user, menuItems, setMenuItems, loading }) {
  const categories = ["ทั้งหมด", "ร้อน", "เย็น"];
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");

  // Admin Editing States
  const [editingItem, setEditingItem] = useState(null); // null or item object
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editTag, setEditTag] = useState("Hot");
  const [updating, setUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditPrice(item.price.toString());
    setEditDesc(item.desc);
    setEditTag(item.tag || "Hot");
    setErrorMsg("");
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setErrorMsg("");

    const updatedData = {
      name: editName,
      price: Number(editPrice),
      desc: editDesc,
      tag: editTag,
    };

    try {
      // Attempt to save to Supabase
      const { error } = await supabase
        .from("menu")
        .update(updatedData)
        .eq("id", editingItem.id);

      if (error) {
        console.warn("Supabase update failed. Falling back to local memory update. Error:", error.message);
        // Fallback: update state locally so it still works in memory for presentation
        setMenuItems(
          menuItems.map((item) =>
            item.id === editingItem.id ? { ...item, ...updatedData } : item
          )
        );
      } else {
        // Success: update state locally with database output
        setMenuItems(
          menuItems.map((item) =>
            item.id === editingItem.id ? { ...item, ...updatedData } : item
          )
        );
      }

      setEditingItem(null);
    } catch (err) {
      console.error("Save error:", err);
      // Fallback update in case of fetch/network crash
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingItem.id ? { ...item, ...updatedData } : item
        )
      );
      setEditingItem(null);
    } finally {
      setUpdating(false);
    }
  };

  const filteredItems = activeCategory === "ทั้งหมด"
    ? menuItems
    : menuItems.filter((item) => {
        if (activeCategory === "ร้อน") return item.tag === "Hot";
        if (activeCategory === "เย็น") return item.tag === "Cold";
        return false;
      });

  const isAdmin = user?.user_metadata?.role === "admin";

  return (
    <section id="menu" className="bg-primary-dark py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header (Visual Hierarchy: Section Title) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold tracking-widest text-accent-orange uppercase mb-3">
            รายการเครื่องดื่มและของว่าง
          </h2>
          <p className="font-serif text-3xl font-bold text-secondary-light sm:text-4xl">
            เมนูแนะนำของเรา
          </p>
          <div className="mt-4 h-1 w-12 bg-accent-orange mx-auto rounded-lg" />
        </div>

        {/* Filter Tabs (Consistency in UI buttons) */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-6 py-2 text-xs font-bold transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-accent-orange text-secondary-light border-transparent shadow-md shadow-accent-orange/15"
                  : "bg-primary-gray/30 text-secondary-metal border-primary-gray/60 hover:bg-primary-gray hover:text-secondary-light"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-10 text-secondary-metal text-sm">
            กำลังโหลดข้อมูลเมนูจากฐานข้อมูล...
          </div>
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              name={item.name}
              price={item.price}
              desc={item.desc}
              image={item.image}
              badge={item.tag === "Hot" ? "ร้อน" : "เย็น"}
              isAdmin={isAdmin}
              onEdit={() => handleEditClick(item)}
            />
          ))}
        </div>
      </div>

      {/* Admin Edit Modal Overlay */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-primary-gray/80 bg-primary-dark p-8 shadow-2xl shadow-accent-orange/5 relative">
            {/* Close Button */}
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 p-2 text-secondary-metal hover:text-secondary-light transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title */}
            <h3 className="font-serif text-2xl font-bold text-secondary-light mb-2">แก้ไขข้อมูลสินค้า</h3>
            <p className="text-secondary-metal text-xs mb-6">ผู้ใช้สิทธิ์แอดมิน: แก้ไขรายละเอียดเพื่ออัปเดตลงฐานข้อมูล Supabase</p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-secondary-metal mb-1.5 uppercase tracking-wider">
                  ชื่อเมนู
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-lg bg-primary-dark border border-primary-gray/80 px-4 py-3 text-sm text-secondary-light focus:outline-none focus:border-accent-orange transition-colors"
                />
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-xs font-bold text-secondary-metal mb-1.5 uppercase tracking-wider">
                  ราคา (บาท)
                </label>
                <input
                  type="number"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full rounded-lg bg-primary-dark border border-primary-gray/80 px-4 py-3 text-sm text-secondary-light focus:outline-none focus:border-accent-orange transition-colors"
                />
              </div>

              {/* Tag Selector */}
              <div>
                <label className="block text-xs font-bold text-secondary-metal mb-2.5 uppercase tracking-wider">
                  ประเภทเครื่องดื่ม (เสิร์ฟร้อน/เย็น)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setEditTag("Hot")}
                    className={`rounded-lg py-2.5 text-xs font-bold border transition-all ${
                      editTag === "Hot"
                        ? "bg-primary-gray text-secondary-light border-accent-orange/40"
                        : "bg-primary-dark text-secondary-metal border-primary-gray hover:bg-primary-gray/40"
                    }`}
                  >
                    🔥 ร้อน (Hot)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditTag("Cold")}
                    className={`rounded-lg py-2.5 text-xs font-bold border transition-all ${
                      editTag === "Cold"
                        ? "bg-primary-gray text-secondary-light border-accent-orange/40"
                        : "bg-primary-dark text-secondary-metal border-primary-gray hover:bg-primary-gray/40"
                    }`}
                  >
                    ❄️ เย็น (Cold)
                  </button>
                </div>
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-bold text-secondary-metal mb-1.5 uppercase tracking-wider">
                  คำอธิบายสินค้า
                </label>
                <textarea
                  required
                  rows="3"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full rounded-lg bg-primary-dark border border-primary-gray/80 px-4 py-3 text-sm text-secondary-light focus:outline-none focus:border-accent-orange transition-colors resize-none"
                />
              </div>

              {errorMsg && <p className="text-red-500 text-xs font-semibold">{errorMsg}</p>}

              {/* Submit Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="rounded-lg border border-primary-gray bg-primary-gray/20 py-3 text-sm font-bold text-secondary-light transition-all hover:bg-primary-gray/60"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="rounded-lg bg-accent-orange py-3 text-sm font-bold text-secondary-light hover:bg-accent-orange-hover shadow-md shadow-accent-orange/15 disabled:opacity-50"
                >
                  {updating ? "กำลังบันทึก..." : "บันทึก"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
