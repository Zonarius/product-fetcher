export interface DecathlonProduct {
  name: string;
  // In Euro
  price: number;
  // In kg
  weight: number;
  technicalData: Record<string, string>;
}