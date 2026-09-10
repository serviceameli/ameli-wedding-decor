export type Category = string;
export type CompositionItem = {
  id: string;
  name: string;
  quantity: number;
  image?: string;
  sourceUrl?: string;
};
export type ProductVariant = {
  id: string;
  label: string;
  price: number;
  unit: string;
  rentalDays: number;
  image: string;
  description: string;
  composition: CompositionItem[];
  sourceUrl: string;
};
export type Product = {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  image: string;
  palette: string[];
  tag?: string;
  description: string;
  defaultVariantId: string;
  variants: ProductVariant[];
  sourceUrl: string;
  isDemo: boolean;
};
