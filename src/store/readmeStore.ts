import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  initialReadmeState,
  type ReadmeState,
  type SectionId,
} from '@/types/readme';

interface ReadmeStore {
  state: ReadmeState;
  savedAt: number | null;
  showSaved: boolean;
  setState: (patch: Partial<ReadmeState>) => void;
  updateSection: <K extends keyof ReadmeState>(
    key: K,
    value: ReadmeState[K]
  ) => void;
  setSectionOrder: (order: SectionId[]) => void;
  applyTemplate: (partial: Partial<ReadmeState>) => void;
  resetState: () => void;
  loadFromEncoded: (encoded: string) => void;
  markSaved: () => void;
  getEncodedState: () => string;
}

function deepMerge<T extends object>(base: T, patch: Partial<T>): T {
  const result = { ...base };
  for (const key of Object.keys(patch) as (keyof T)[]) {
    const val = patch[key];
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      result[key] = deepMerge(base[key] as object, val as object) as T[keyof T];
    } else if (val !== undefined) {
      result[key] = val as T[keyof T];
    }
  }
  return result;
}

const getCleanInitialState = (): ReadmeState => JSON.parse(JSON.stringify(initialReadmeState));

export const useReadmeStore = create<ReadmeStore>()(
  persist(
    (set, get) => ({
      state: getCleanInitialState(),
      savedAt: null,
      showSaved: false,

      setState: (patch) =>
        set((s) => ({ state: deepMerge(s.state, patch) })),

      updateSection: (key, value) =>
        set((s) => ({
          state: { ...s.state, [key]: value },
        })),

      setSectionOrder: (order) =>
        set((s) => ({
          state: { ...s.state, sectionOrder: order },
        })),

      applyTemplate: (partial) =>
        set({
          state: deepMerge(getCleanInitialState(), partial),
        }),

      resetState: () =>
        set({ state: getCleanInitialState(), savedAt: null, showSaved: false }),

      loadFromEncoded: (encoded) => {
        try {
          const json = decodeURIComponent(
            atob(encoded.replace(/-/g, '+').replace(/_/g, '/'))
          );
          const parsed = JSON.parse(json) as Partial<ReadmeState>;
          set({ state: deepMerge(getCleanInitialState(), parsed) });
        } catch {
          console.error('Failed to decode shared state');
        }
      },

      markSaved: () => {
        set({ savedAt: Date.now(), showSaved: true });
        setTimeout(() => {
          if (get().showSaved) set({ showSaved: false });
        }, 2500);
      },

      getEncodedState: () => {
        const json = JSON.stringify(get().state);
        return btoa(unescape(encodeURIComponent(json)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      },
    }),
    {
      name: 'readme-builder-state',
      partialize: (s) => ({ state: s.state }),
    }
  )
);
