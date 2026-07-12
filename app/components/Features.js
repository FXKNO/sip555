export default function Features() {
  const highlights = [
    {
      id: "feat-1",
      icon: (
        <svg
          className="h-6 w-6 text-accent-orange"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m10.607 10.607l.707-.707M10 11a2 2 0 112 2 2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "คั่วบดอย่างพิถีพิถัน",
      desc: "เมล็ดกาแฟอาราบิก้าและโรบัสต้าคุณภาพเยี่ยมที่คัดสรรมาอย่างดี นำมาคั่วบดในปริมาณน้อยเพื่อคงรสชาติและกลิ่นหอมอันเป็นเอกลักษณ์",
    },
    {
      id: "feat-2",
      icon: (
        <svg
          className="h-6 w-6 text-accent-orange"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "บรรยากาศอบอุ่นเป็นกันเอง (555)",
      desc: "ที่นั่งแสนสบาย ดนตรีเพราะ ๆ และความเป็นกันเอง ให้คุณจิบกาแฟแก้วโปรดไปพร้อมกับรอยยิ้มและเสียงหัวเราะแห่งความสุข",
    },
    {
      id: "feat-3",
      icon: (
        <svg
          className="h-6 w-6 text-accent-orange"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "วัตถุดิบยั่งยืน",
      desc: "เราจัดหาเมล็ดกาแฟและใบชาโดยตรงจากเกษตรกรผู้ปลูกกาแฟออร์แกนิกรายย่อยในท้องถิ่น เพื่อสนับสนุนชุมชนอย่างแท้จริง",
    },
  ];

  return (
    <section id="features" className="bg-primary-gray py-24 relative overflow-hidden border-y border-primary-gray/80">
      {/* Visual Accent */}
      <div className="absolute right-0 top-0 -mt-16 h-80 w-80 bg-accent-orange/5 blur-3xl rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold tracking-widest text-accent-orange uppercase mb-3">จุดเด่นของเรา</h2>
          <p className="font-serif text-3xl font-bold text-secondary-light sm:text-4xl">
            ทำไมใคร ๆ ก็รัก sip555
          </p>
          <div className="mt-4 h-1 w-12 bg-accent-orange mx-auto rounded-lg" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl border border-primary-gray/80 bg-primary-dark p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-accent-orange/30 hover:shadow-xl hover:shadow-accent-orange/5"
            >
              {/* Icon Container */}
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary-gray group-hover:bg-accent-orange/10 transition-colors duration-300">
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
              </div>

              {/* Title & Description with Visual Hierarchy */}
              <h3 className="text-xl font-bold text-secondary-light mb-3 group-hover:text-accent-orange transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-secondary-metal leading-relaxed text-sm">
                {item.desc}
              </p>

              {/* Corner Glow Decoration */}
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-accent-orange/0 to-accent-orange/0 group-hover:from-accent-orange/[0.03] group-hover:to-accent-orange/0 transition-all duration-300 rounded-tr-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
