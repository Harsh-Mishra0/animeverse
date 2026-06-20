"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getImageUrl } from "@/lib/api";
import type { PageSection } from "@/lib/getPage";
import RichText from "@/components/shared/RichText";
import { bgClass, textClass } from "@/lib/styleMap";

export default function AboutSection({ section }: { section?: PageSection }) {
  if (!section) return null;

  const imageUrl = getImageUrl(section?.image);
  const isReversed = section?.layout === "right";
  const bg = bgClass(section?.backgroundColor);
  const text = textClass(section?.textColor) || "text-white";

  return (
    <section className={`relative w-full overflow-hidden px-6 py-20 lg:px-20 lg:py-28 ${bg} ${text}`}>
      {/* Glow background decorative effect (only show if not white/light background) */}
      {section?.backgroundColor !== "light" && (
        <div className="pointer-events-none absolute -right-32 top-1/3 size-80 rounded-full bg-violet-600/8 blur-3xl" />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 ${isReversed ? "direction-rtl" : ""}`}
      >
        {/* Image Grid Column */}
        {imageUrl ? (
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl ${isReversed ? "lg:order-2" : ""}`}
          >
            <Image
              src={imageUrl}
              alt={section?.image?.alternativeText ?? section?.title ?? ""}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        ) : null}

        {/* Text Grid Column */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={isReversed ? "lg:order-1" : ""}
        >
          {section?.title ? (
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              {section.title}
            </h2>
          ) : null}

          {section?.description ? (
            <div className="mt-6 max-w-xl text-base leading-8 opacity-75 sm:text-lg">
              {typeof section.description === "string" ? (
                <p>{section.description}</p>
              ) : (
                <RichText content={section.description} />
              )}
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </section>
  );
}
