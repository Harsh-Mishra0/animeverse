import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutNavbar extends Struct.ComponentSchema {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'navbar';
    icon: 'bulletList';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.nav-link', true>;
    logo: Schema.Attribute.String;
  };
}

export interface SectionsAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_sections';
  info: {
    displayName: 'about-section';
    icon: 'attachment';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsAnimeSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_anime_sections';
  info: {
    displayName: 'anime-section';
    icon: 'apps';
  };
  attributes: {
    showFeaturedOnly: Schema.Attribute.Boolean;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_sections';
  info: {
    displayName: 'cta-section';
    icon: 'connector';
  };
  attributes: {
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFooter extends Struct.ComponentSchema {
  collectionName: 'components_sections_footers';
  info: {
    displayName: 'footer';
    icon: 'arrowDown';
  };
  attributes: {
    copyright: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'hero';
    icon: 'command';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsMissionVision extends Struct.ComponentSchema {
  collectionName: 'components_sections_mission_visions';
  info: {
    displayName: 'mission-vision';
    icon: 'attachment';
  };
  attributes: {
    missionText: Schema.Attribute.Blocks;
    missionTitle: Schema.Attribute.String;
    visionText: Schema.Attribute.Blocks;
    visionTitle: Schema.Attribute.String;
  };
}

export interface SharedNavLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_links';
  info: {
    displayName: 'nav-link';
    icon: 'attachment';
  };
  attributes: {
    children: Schema.Attribute.Component<'shared.sub-nav-link', true>;
    isExternal: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    types: Schema.Attribute.Enumeration<['default', 'genre', 'dropdown']>;
    url: Schema.Attribute.String;
  };
}

export interface SharedSubNavLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_sub_nav_links';
  info: {
    displayName: 'sub-nav-link';
    icon: 'attachment';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.navbar': LayoutNavbar;
      'sections.about-section': SectionsAboutSection;
      'sections.anime-section': SectionsAnimeSection;
      'sections.cta-section': SectionsCtaSection;
      'sections.footer': SectionsFooter;
      'sections.hero': SectionsHero;
      'sections.mission-vision': SectionsMissionVision;
      'shared.nav-link': SharedNavLink;
      'shared.sub-nav-link': SharedSubNavLink;
    }
  }
}
