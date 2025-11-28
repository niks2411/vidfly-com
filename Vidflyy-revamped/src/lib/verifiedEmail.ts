const STORAGE_KEY = "vidfly_verified_email";

export const saveVerifiedEmail = (email: string) => {
  if (typeof window === "undefined") return;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, normalized);
  } catch (err) {
    console.warn("Unable to store verified email", err);
  }
};

export const getVerifiedEmail = (): string | undefined => {
  if (typeof window === "undefined") return undefined;
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return value ? value.trim().toLowerCase() : undefined;
  } catch (err) {
    console.warn("Unable to read verified email", err);
    return undefined;
  }
};

export const clearVerifiedEmail = () => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Unable to clear verified email", err);
  }
};


