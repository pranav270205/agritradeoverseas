// ===== PRODUCT HIERARCHY TYPES =====

export interface SubProduct {
  name: string;
  slug: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  specifications: Record<string, string>;
  packagingOptions: string[];
  exportQuality: string;
  metaTitle: string;
  metaDescription: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
  image: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  subProducts: SubProduct[];
}

// ===== INFRASTRUCTURE TYPES =====

export interface InfrastructureGalleryItem {
  title: string;
  image: string;
  description: string;
}

export interface ProcessingCapability {
  icon: string;
  title: string;
  description: string;
}

// ===== EXISTING TYPES (preserved) =====

export interface ContactFormData {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  productInterested: string;
  message: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface StatCard {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessCard {
  step: number;
  title: string;
  description: string;
  highlighted?: boolean;
}

export interface WhyChooseCard {
  icon: string;
  title: string;
  description: string;
}

export interface Certification {
  title: string;
  description: string;
  icon: string;
}

export interface ExportCountry {
  name: string;
  region: string;
  flag?: string;
}
