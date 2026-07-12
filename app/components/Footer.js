export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-primary-dark border-t border-primary-gray/60 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4 group w-fit">
              <svg
                className="h-7 w-7 text-accent-orange transition-transform duration-300 group-hover:rotate-12"
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
              <span className="font-serif text-xl font-black tracking-widest text-secondary-light transition-colors duration-300 group-hover:text-accent-orange">
                sip<span className="text-accent-orange">555</span>
              </span>
            </a>
            <p className="text-secondary-metal text-sm leading-relaxed max-w-sm">
              จิบความสุข จิบ sip555 เติมพลังให้วันของคุณด้วยกาแฟพิเศษคั่วบดละเอียด ชาออร์แกนิก เบเกอรี่อบใหม่ร้อน ๆ ในบรรยากาศดิบเท่สไตล์อู่รถยนต์ที่ต้อนรับทุกคนอย่างอบอุ่น
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-orange mb-4">เวลาเปิดทำการ</h4>
            <ul className="space-y-2 text-secondary-metal text-sm">
              <li className="flex justify-between">
                <span>จันทร์ - ศุกร์</span>
                <span className="font-semibold text-secondary-light">07:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>เสาร์ - อาทิตย์</span>
                <span className="font-semibold text-secondary-light">08:00 - 20:00</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-orange mb-4">แวะมาหาเรา</h4>
            <address className="not-italic space-y-3 text-secondary-metal text-sm">
              <p>
                555/5 ถนนสุขุมวิท, <br />
                คลองเตย, กรุงเทพฯ, 10110
              </p>
              <p className="flex items-center gap-2 mt-2 text-accent-orange/90 font-bold">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +66 2 555 5555
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-gray/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-metal text-xs text-center md:text-left">
            &copy; {currentYear} sip555. สงวนลิขสิทธิ์.
          </p>
          <div className="flex gap-4">
            {/* Social Icons */}
            <a
              href="#"
              className="text-secondary-metal hover:text-accent-orange transition-colors duration-300"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-secondary-metal hover:text-accent-orange transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-secondary-metal hover:text-accent-orange transition-colors duration-300"
              aria-label="Twitter/X"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
