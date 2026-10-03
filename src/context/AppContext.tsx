"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getService } from "@/data/mockServices";
import { defaultProfile, type HouseholdProfile } from "@/lib/serviceFilters";

const WATCHLIST_KEY = "civik-ottawa-watchlist-v1";
const LEGACY_WATCHLIST_KEY = "canada-connect-watchlist-v1";
const LEGACY_PROFILE_KEY = "canada-connect-profile-v1";

interface AppContextValue {
  profile: HouseholdProfile;
  updateProfile: (patch: Partial<HouseholdProfile>) => void;
  savedIds: string[];
  toggleSaved: (id: string) => void;
  clearSaved: () => void;
  isSaved: (id: string) => boolean;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<HouseholdProfile>(defaultProfile);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedWatchlist = window.localStorage.getItem(WATCHLIST_KEY) ?? window.localStorage.getItem(LEGACY_WATCHLIST_KEY);
      if (storedWatchlist) {
        const parsed: unknown = JSON.parse(storedWatchlist);
        if (Array.isArray(parsed)) setSavedIds(parsed.filter((id): id is string => typeof id === "string" && Boolean(getService(id))));
      }
      // The old prototype persisted household filters. Remove them during the rebrand.
      window.localStorage.removeItem(LEGACY_PROFILE_KEY);
      window.localStorage.removeItem(LEGACY_WATCHLIST_KEY);
    } catch {
      // Invalid or unavailable browser storage simply resets this demo's local state.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (savedIds.length) window.localStorage.setItem(WATCHLIST_KEY, JSON.stringify(savedIds));
      else window.localStorage.removeItem(WATCHLIST_KEY);
    } catch {
      // The app still works in memory when storage is disabled.
    }
  }, [savedIds, hydrated]);

  const updateProfile = (patch: Partial<HouseholdProfile>) => {
    setProfile((current) => {
      if (patch.province && patch.province !== current.province) {
        return {
          ...current,
          ...patch,
          municipality: patch.municipality ?? "",
        };
      }
      return { ...current, ...patch };
    });
  };

  const toggleSaved = (id: string) => {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
    );
  };

  const value = useMemo<AppContextValue>(
    () => ({
      profile,
      updateProfile,
      savedIds,
      toggleSaved,
      clearSaved: () => setSavedIds([]),
      isSaved: (id) => savedIds.includes(id),
      chatOpen,
      setChatOpen,
    }),
    [profile, savedIds, chatOpen],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
