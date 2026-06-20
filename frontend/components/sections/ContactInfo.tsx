"use client";

import { motion } from "framer-motion";
import type { PageSection } from "@/lib/getPage";
import { bgClass, textClass } from "@/lib/styleMap";

export default function ContactInfo({ section }: { section?: PageSection }) {
  if (!section?.email && !section?.message) return null;

  const bg = bgClass(section?.backgroundColor);
  const text = textClass(section?.textColor) || "text-white";

  return (
    <section className={`relative w-full overflow-hidden px-6 py-16 lg:py-24 ${bg} ${text}`}>
      {section?.backgroundColor !== "light" && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/5 blur-3xl" />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-xl backdrop-blur-md sm:p-12"
      >
        {section?.message ? (
          <p className="text-base leading-8 opacity-75 sm:text-lg">{section.message}</p>
        ) : null}

        {section?.email ? (
          <a
            href={`mailto:${section.email}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-6 py-3 text-sm font-semibold text-fuchsia-300 transition-all duration-300 hover:scale-105 hover:border-fuchsia-400/50 hover:bg-fuchsia-500/20"
          >
            <span className="text-lg">✉</span>
            {section.email}
          </a>
        ) : null}
      </motion.div>
    </section>
  );
}
