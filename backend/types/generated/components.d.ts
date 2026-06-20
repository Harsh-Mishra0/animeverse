import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutNavbar extends Struct.ComponentSchema {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'navbar';
    icon: 'bulletList';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.nav-link', true>;
    logoAlt: Schema.Attribute.String;
    logoImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    logoLink: Schema.Attribute.String;
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
    layout: Schema.Attribute.Enumeration<['left', 'right']>;
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
    animes: Schema.Attribute.Relation<'oneToMany', 'api::anime.anime'>;
    backgroundColor: Schema.Attribute.Enumeration<
      ['light', 'dark', 'primary', 'transparent']
    >;
    cardStyle: Schema.Attribute.Enumeration<['default', 'glass', 'minimal']>;
    columns: Schema.Attribute.Enumeration<['col2', 'col3', 'col4', 'col5']>;
    showFeaturedOnly: Schema.Attribute.Boolean;
    showTitle: Schema.Attribute.Boolean;
    textColor: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'light', 'dark']
    >;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['latest', 'featured', 'byGenre', 'manual']
    >;
  };
}

export interface SectionsContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_infos';
  info: {
    displayName: 'contact-info';
    icon: 'code';
  };
  attributes: {
    email: Schema.Attribute.Email;
    message: Schema.Attribute.Text;
  };
}

export interface SectionsCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_sections';
  info: {
    displayName: 'cta-section';
    icon: 'connector';
  };
  attributes: {
    backgroundColor: Schema.Attribute.Enumeration<
      ['light', 'dark', 'primary', 'secondary']
    >;
    buttonLink: Schema.Attribute.String;
    buttonSize: Schema.Attribute.Enumeration<['small', 'medium', 'large']>;
    buttonText: Schema.Attribute.String;
    buttonVariant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline']
    >;
    openInNewTab: Schema.Attribute.Boolean;
    subtitle: Schema.Attribute.String;
    textAlignment: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
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
    logoImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SectionsFormSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_form_sections';
  info: {
    displayName: 'form-section';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    fields: Schema.Attribute.Component<'shared.form-field', true>;
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
    align: Schema.Attribute.Enumeration<['left', 'center', 'right']>;
    backgroundColor: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'light', 'dark', 'gradient', 'transparent']
    >;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    openInNewTab: Schema.Attribute.Boolean;
    size: Schema.Attribute.Enumeration<['small', 'medium', 'large']>;
    subtitle: Schema.Attribute.Text;
    textColor: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'light', 'dark', 'white', 'black']
    >;
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

export interface SharedFormField extends Struct.ComponentSchema {
  collectionName: 'components_shared_form_fields';
  info: {
    displayName: 'form-field';
  };
  attributes: {
    lable: Schema.Attribute.String;
    name: Schema.Attribute.String;
    options: Schema.Attribute.JSON;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean;
    type: Schema.Attribute.Enumeration<
      ['text', 'email', 'textarea', 'select', 'checkbox', 'submit', 'dropdown']
    >;
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
      'sections.contact-info': SectionsContactInfo;
      'sections.cta-section': SectionsCtaSection;
      'sections.footer': SectionsFooter;
      'sections.form-section': SectionsFormSection;
      'sections.hero': SectionsHero;
      'sections.mission-vision': SectionsMissionVision;
      'shared.form-field': SharedFormField;
      'shared.nav-link': SharedNavLink;
      'shared.sub-nav-link': SharedSubNavLink;
    }
  }
}
