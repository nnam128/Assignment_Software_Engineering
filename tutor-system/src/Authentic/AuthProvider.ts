import { mockUsers } from "../data/hardcodedData";
import type { User } from "../data/hardcodedData";


const STORAGE_KEY = "tutor-system-user";

export function login(email: string, password: string): User | null {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  return null;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser(): User | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;

  try {
    const user: User = JSON.parse(data);
    return user;
  } catch {
    return null;
  }
}

export function hasRole(requiredRole: User['role']): boolean {
  const user = getCurrentUser();
  return !!user && user.role === requiredRole;
}