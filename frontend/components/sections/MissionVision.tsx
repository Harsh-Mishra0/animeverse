"use client";

import { motion } from "framer-motion";
import type { PageSection } from "@/lib/getPage";
import RichText from "@/components/shared/RichText";
import { bgClass, textClass } from "@/lib/styleMap";

type MissionVisionProps = {
  section?: PageSection;
};

const cardTransition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };
const cardHoverTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

export default function MissionVision({ section }: MissionVisionProps) {
  const missionTitle = section?.missionTitle;
  const missionText = section?.missionText;
  const visionTitle = section?.visionTitle;
  const visionText = section?.visionText;

  const hasMission = Boolean(missionTitle || missionText?.length);
  const hasVision = Boolean(visionTitle || visionText?.length);

  if (!hasMission && !hasVision) {
    return null;
  }

  // Fallback to premium theme background and white text if CMS parameters are absent
  const bg = bgClass(section?.backgroundColor) || "bg-gradient-to-br from-[#151019] via-[#0b0b0b] to-violet-950/30";
  const text = textClass(section?.textColor) || "text-white";

  return (
    <section className={`relative w-full overflow-hidden px-6 py-20 lg:px-20 lg:py-24 ${bg} ${text}`}>
      {section?.backgroundColor !== "light" && (
        <>
          <div className="pointer-events-none absolute -left-32 top-1/2 size-80 -translate-y-1/2 rounded-full bg-fuchsia-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 top-1/3 size-80 rounded-full bg-violet-600/10 blur-3xl" />
        </>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative z-10 grid w-full gap-10 ${hasMission && hasVision ? "md:grid-cols-2" : "grid-cols-1"}`}
      >
        {hasMission ? (
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={cardTransition}
            whileHover={{ scale: 1.04, y: -4, transition: cardHoverTransition }}
            whileTap={{ scale: 1.01 }}
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 hover:border-fuchsia-300/30 hover:bg-white/[0.07] hover:shadow-[0_20px_60px_rgba(217,70,239,0.18)] sm:p-12"
          >
            {missionTitle ? (
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                {missionTitle}
              </h2>
            ) : null}
            {missionText?.length ? (
              <div className="mt-6 max-w-4xl text-base opacity-80 sm:text-lg">
                <RichText content={missionText} />
              </div>
            ) : null}
          </motion.article>
        ) : null}

        {hasVision ? (
          <motion.article
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ ...cardTransition, delay: 0.1 }}
            whileHover={{ scale: 1.04, y: -4, transition: cardHoverTransition }}
            whileTap={{ scale: 1.01 }}
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 hover:border-violet-300/30 hover:bg-white/[0.07] hover:shadow-[0_20px_60px_rgba(139,92,246,0.18)] sm:p-12"
          >
            {visionTitle ? (
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                {visionTitle}
              </h2>
            ) : null}
            {visionText?.length ? (
              <div className="mt-6 max-w-4xl text-base opacity-80 sm:text-lg">
                <RichText content={visionText} />
              </div>
            ) : null}
          </motion.article>
        ) : null}
      </motion.div>
    </section>
  );
}
