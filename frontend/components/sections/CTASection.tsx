"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { PageSection } from "@/lib/getPage";
import { alignClass, bgClass, btnSizeClass, btnVariantClass, textClass } from "@/lib/styleMap";

export default function CTASection({ section }: { section?: PageSection }) {
  if (!section) return null;

  const bg = bgClass(section?.backgroundColor);
  const text = textClass(section?.textColor);
  const alignment = alignClass(section?.textAlignment);
  const btnVariant = btnVariantClass(section?.buttonVariant);
  const btnSize = btnSizeClass(section?.buttonSize);

  return (
    <section className={`relative w-full overflow-hidden ${bg || "bg-gradient-to-br from-purple-950/80 via-[#0b0b0b] to-fuchsia-950/40"}`}>
      {}
      <div className="pointer-events-none absolute -left-40 top-1/2 size-96 -translate-y-1/2 rounded-full bg-purple-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-80 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 mx-auto max-w-4xl px-6 py-20 lg:py-28 ${alignment} ${text}`}
      >
        {section?.title ? (
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {section.title}
          </h2>
        ) : null}

        {section?.subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 opacity-70 sm:text-lg">
            {section.subtitle}
          </p>
        ) : null}

        {section?.buttonText ? (
          <div className="mt-10">
            <Link
              href={section?.buttonLink || (section?.buttonText?.toLowerCase() === "scroll to form" ? "#contact-form" : "/")}
              target={section?.openInNewTab ? "_blank" : undefined}
              rel={section?.openInNewTab ? "noreferrer" : undefined}
              className={`inline-flex rounded-full font-bold transition-all duration-300 ${btnVariant} ${btnSize}`}
            >
              {section.buttonText}
            </Link>
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
