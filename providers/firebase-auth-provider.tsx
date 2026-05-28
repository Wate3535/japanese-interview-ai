'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  User,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { auth } from '@/lib/firebase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export function FirebaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  
useEffect(() => {
  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      setUser(user);

      if (user) {
        document.cookie =
          'firebase-auth=true; path=/';
      } else {
        document.cookie =
          'firebase-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }

      setLoading(false);
    }
  );

  return () => unsubscribe();
}, []);



  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useFirebaseAuth = () =>
  useContext(AuthContext);