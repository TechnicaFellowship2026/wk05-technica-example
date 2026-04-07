import type { User } from "firebase/auth";

// Yes i know this is basic but
// it's just for the sake of this example :sob:
export interface UserData {
  email: string;
  notes: string;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}
