import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type StravaAuthState = {
    stravaCode: string | undefined | null;
    stravaToken: string | null;
    setStravaCode: (code: string) => void;
    setStravaToken: (token: string) => void;
};

const useStravaAuthStore = create<StravaAuthState>()(
    persist(
        (set) => ({
            stravaCode: null,
            stravaToken: null,
            setStravaCode: (code: string | undefined | null) => set({ stravaCode: code }),
            setStravaToken: (token: string) => set({ stravaToken: token }),
        }),
        {
            name: 'strava-auth-storage', // name of item in storage
            storage: createJSONStorage(() => localStorage), // (optional) default is localStorage
        }
    )
);

export default useStravaAuthStore;