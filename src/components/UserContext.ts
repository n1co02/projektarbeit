import { createContext, Dispatch, SetStateAction } from 'react';

export interface User {
  id: string;
  username?: string;
  // add any other fields you need
}

interface UserContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | null>(null);

export default UserContext;
