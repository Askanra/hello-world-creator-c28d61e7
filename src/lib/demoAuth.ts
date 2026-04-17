// Fake auth — purely client-side for the Axyrix demo. No real backend.
const KEY = "axyrix_demo_session";

export type DemoUser = { email: string; name: string };

export const demoLogin = (email: string, name?: string) => {
  const user: DemoUser = { email, name: name || email.split("@")[0] };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
};

export const demoLogout = () => localStorage.removeItem(KEY);

export const getDemoUser = (): DemoUser | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
