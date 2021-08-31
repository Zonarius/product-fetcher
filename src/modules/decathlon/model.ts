export interface DecathlonProduct {
  name: string;
  url: string;
  // In Euro
  price: number;
  // In kg
  weight: number;
  technicalData: Record<string, string>;
}