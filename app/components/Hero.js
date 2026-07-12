import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-primary-dark py-20 lg:py-32">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/10 h-72 w-72 rounded-full bg-accent-orange/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 h-96 w-96 rounded-full bg-primary-gray/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            {/* Soft Badge */}
            <div className="inline-flex items-center self-center lg:self-start rounded-lg border border-accent-orange/30 bg-accent-orange/10 px-4 py-1.5 text-xs font-bold tracking-wide text-accent-orange mb-6 uppercase">
              🔧 คาเฟ่สไตล์อินดัสเทรียลวินเทจ
            </div>

            {/* Brand Title (Visual Hierarchy: Prominent name) */}
            <h1 className="font-serif text-5xl font-black tracking-tight text-secondary-light sm:text-6xl md:text-7xl leading-tight mb-6">
              จิบความสุข <br />
              จิบ <span className="text-accent-orange relative inline-block">
                sip555
                <span className="absolute bottom-1.5 left-0 h-1.5 w-full bg-accent-orange/30 rounded-lg" />
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto lg:mx-0 max-w-lg text-lg leading-relaxed text-secondary-metal mb-10">
              เติมพลังชีวิตในคาเฟ่ปูนเปลือยดิบเท่ ลิ้มลองกาแฟเบลนด์พิเศษ ชาออร์แกนิก และเบเกอรี่อบใหม่ร้อน ๆ จากเตาทุกวันในบรรยากาศเป็นกันเอง
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center rounded-lg bg-accent-orange px-8 py-4 text-base font-bold text-secondary-light shadow-lg shadow-accent-orange/15 transition-all duration-300 hover:scale-105 hover:bg-accent-orange-hover hover:shadow-xl hover:shadow-accent-orange/25 active:scale-95 border border-accent-orange/20"
              >
                ดูเมนูของเรา
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-primary-gray bg-primary-gray/30 px-8 py-4 text-base font-bold text-secondary-light transition-all duration-300 hover:scale-105 hover:bg-primary-gray/60 active:scale-95"
              >
                ปรัชญาของเรา
              </a>
            </div>

            {/* Stat Counters */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-primary-gray/60 pt-8 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-accent-orange">100%</p>
                <p className="text-xs text-secondary-metal uppercase tracking-wider font-semibold mt-1">เมล็ดออร์แกนิก</p>
              </div>
              <div className="border-x border-primary-gray/60 px-4">
                <p className="text-2xl font-bold text-accent-orange">5★</p>
                <p className="text-xs text-secondary-metal uppercase tracking-wider font-semibold mt-1">คะแนนรีวิว</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-orange">15+</p>
                <p className="text-xs text-secondary-metal uppercase tracking-wider font-semibold mt-1">เฮาส์เบลนด์พิเศษ</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image with industrial borders */}
          <div className="relative mx-auto max-w-md lg:max-w-none lg:w-full flex justify-center">
            <div className="relative group overflow-hidden rounded-3xl border border-primary-gray/60 bg-primary-gray/20 p-3 transition-transform duration-500 hover:rotate-1">
              <Image
                src="/coffee_hero.png"
                alt="sip555 Specialty Coffee"
                width={500}
                height={500}
                className="rounded-2xl object-cover shadow-2xl transition-transform duration-700 group-hover:scale-105"
                priority
              />
              
              {/* Floating Overlay Badge */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 rounded-lg border border-primary-gray/60 bg-primary-dark/95 p-4 shadow-xl backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-orange/10 text-accent-orange">
                  ☕
                </div>
                <div>
                  <p className="text-[10px] text-secondary-metal font-bold uppercase tracking-wider">เมนูแนะนำวันนี้</p>
                  <p className="text-sm font-bold text-secondary-light">ซอลเต็ด คาราเมล มัคคิอาโต</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
