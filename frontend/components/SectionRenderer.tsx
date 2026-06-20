import type { PageSection } from "@/lib/getPage";
import Hero from "@/components/sections/Hero";
import AnimeSection from "@/components/sections/AnimeSection";
import CTASection from "@/components/sections/CTASection";
import FormSection from "@/components/sections/FormSection";
import AboutSection from "@/components/sections/AboutSection";
import MissionVision from "@/components/sections/MissionVision";
import ContactInfo from "@/components/sections/ContactInfo";


export default function SectionRenderer({
  sections,
}: {
  sections?: PageSection[];
}) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section, index) => {
        const key = `${section?.__component}-${section?.id ?? index}`;

        switch (section?.__component) {
          case "sections.hero":
            return <Hero key={key} section={section} />;

          case "sections.anime-section":
            return <AnimeSection key={key} section={section} />;

          case "sections.cta-section":
            return <CTASection key={key} section={section} />;

          case "sections.form-section":
            return <FormSection key={key} section={section} />;

          case "sections.about-section":
            return <AboutSection key={key} section={section} />;

          case "sections.mission-vision":
            return (
              <MissionVision
                key={key}
                section={section}
              />
            );

          case "sections.contact-info":
            return <ContactInfo key={key} section={section} />;

          default:
            
            return null;
        }
      })}
    </>
  );
}
