
import { useEffect, useState } from 'react';
import { UserAccount } from '../types';

const KEY = 'speedkeyshop-user';

export function useUser() {
  const [user, setUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const save = (u: UserAccount) => {
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return { user, save, logout };
}
