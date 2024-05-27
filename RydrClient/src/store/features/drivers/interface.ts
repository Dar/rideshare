export interface Driver {
  id: string;
  type: string;
  given_name: string;
  phone_number: string;
  family_name: string;
  isActive: boolean;
  currentLat: number;
  currentLng: number;
  heading: number;
  orders: object;
}
