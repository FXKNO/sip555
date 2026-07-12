import Image from "next/image";

export default function MenuCard({ name, price, desc, image, badge, isAdmin, onEdit }) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary-gray/60 bg-primary-dark p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-orange/30 hover:shadow-xl hover:shadow-accent-orange/5">
      <div>
        {/* Image / Thumbnail Container */}
        <div className="relative h-48 w-full overflow-hidden rounded-xl bg-primary-gray mb-4">
          <Image
            src={image || "/coffee_hero.png"}
            alt={name}
            fill
            sizes="(max-w-7xl) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Tag / Badge */}
          {badge && (
            <span className="absolute top-3 left-3 rounded bg-accent-orange px-3 py-1 text-[10px] font-black uppercase tracking-wider text-secondary-light shadow-md shadow-accent-orange/20">
              {badge}
            </span>
          )}
        </div>

        {/* Text Details & Visual Hierarchy */}
        <div className="px-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-secondary-light group-hover:text-accent-orange transition-colors duration-300">
              {name}
            </h3>
            <span className="text-accent-orange font-bold text-lg font-mono whitespace-nowrap">
              ฿{price}
            </span>
          </div>
          <p className="text-secondary-metal text-sm leading-relaxed mt-2 line-clamp-2">
            {desc}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 px-1 space-y-2">
        {/* Add to Order Button */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-gray/40 border border-primary-gray/80 py-2.5 text-xs font-bold text-secondary-light transition-all duration-300 hover:bg-accent-orange hover:text-secondary-light hover:border-transparent active:scale-95"
        >
          สั่งเมนูนี้
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>

        {/* Admin Edit Button */}
        {isAdmin && (
          <button
            onClick={onEdit}
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-accent-orange bg-accent-orange/15 py-2.5 text-xs font-bold text-accent-orange transition-all duration-300 hover:bg-accent-orange hover:text-secondary-light active:scale-95"
          >
            🛠️ แก้ไขข้อมูลเมนู
          </button>
        )}
      </div>
    </div>
  );
}
