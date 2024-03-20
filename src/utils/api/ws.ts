import { chatBaseURL } from "../constants";

export const initiateConnection = (): WebSocket | undefined => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return undefined; // Return undefined if window or localStorage is not available
  }
  const token = localStorage.getItem("CHID") || ""; // Use || to provide a default value
  if (!token) {
    return undefined; // Return undefined if token is not available
  }

  return new WebSocket(`${chatBaseURL}?t=${encodeURIComponent(token)}`);
};
