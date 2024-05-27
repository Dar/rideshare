export interface Rider {
  id: string;
  username: string;
  phone_number_verified: boolean;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  currentLat: number;
  currentLng: number;
  heading: number;
  phone_number: string;
  email: string;
  orders: object[];
}
