const STORAGE_KEY = "vidfly_verified_email";

export const saveVerifiedEmail = (email: string) => {
  if (typeof window === "undefined") return;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return;
  try {
    // Store in sessionStorage for backward compatibility
    sessionStorage.setItem(STORAGE_KEY, normalized);
    // Also store in localStorage for cross-tab sync (as per GPT suggestion)
    localStorage.setItem("logged_user_email", normalized);
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
    localStorage.removeItem("logged_user_email");
  } catch (err) {
    console.warn("Unable to clear verified email", err);
  }
};

// Get selected channel key for current email (for cross-tab sync)
// Using GPT suggestion format: channel_${email}
export const getSelectedChannelKey = (): string => {
  const email = getVerifiedEmail();
  if (email) {
    return `channel_${email}`;
  }
  // Fallback: try to get from localStorage directly
  const loggedEmail = typeof window !== "undefined" ? localStorage.getItem("logged_user_email") : null;
  if (loggedEmail) {
    return `channel_${loggedEmail}`;
  }
  return "channel_default"; // Fallback for backward compatibility
};


