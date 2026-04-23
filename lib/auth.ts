export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const AUTH_STORAGE_KEY = 'interviewai_auth';
const USERS_STORAGE_KEY = 'interviewai_users';

class AuthService {
  private getAllUsers(): any[] {
    if (typeof window === 'undefined') return [];
    
    const usersData = localStorage.getItem(USERS_STORAGE_KEY);
    if (!usersData) return [];

    try {
      return JSON.parse(usersData);
    } catch {
      return [];
    }
  }

  signup(name: string, email: string, password: string): { success: boolean; message: string; user?: User } {
    if (typeof window === 'undefined') {
      return { success: false, message: 'Not in browser environment' };
    }

    const existingUsers = this.getAllUsers();
    const userExists = existingUsers.find(u => u.email === email);

    if (userExists) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      createdAt: new Date().toISOString()
    };

    existingUsers.push({ ...newUser, password });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(existingUsers));
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));

    return { success: true, message: 'Signup successful', user: newUser };
  }

  login(email: string, password: string): { success: boolean; message: string; user?: User } {
    if (typeof window === 'undefined') {
      return { success: false, message: 'Not in browser environment' };
    }

    const existingUsers = this.getAllUsers();
    const user = existingUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));

    return { success: true, message: 'Login successful', user: userWithoutPassword };
  }

  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!authData) return null;

    try {
      return JSON.parse(authData);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  getAuthState(): AuthState {
    const user = this.getCurrentUser();
    return {
      isAuthenticated: user !== null,
      user
    };
  }
}

export const authService = new AuthService();