// export const createFishSlice = (set) => ({
//   fishes: 0,
//   addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
// })

// export const useStravaAtheleteSlice = (set) => ({
//     stravaCode: null,
//     stravaToken: null,
//     stravaAthlete: null,

//     setStravaCode: (code: string) => set({ stravaCode: code }),
//     setStravaToken: (token: string) => set({ stravaToken: token }),
//     setStravaAthlete: (athlete: object) => set({ stravaAthlete: athlete }),

// });

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Athlete = {
    id: string;
    firstname: string;
    lastname: string;
    city: string;
    state: string;
    country: string;
    profile: string;
};

type AthleteState = {
    stravaAthlete: Athlete | null;
    setStravaAthlete: (athlete: Athlete) => void;
};

const useAthleteStore = create<AthleteState>()(
    persist(
        (set) => ({
            stravaAthlete: null,
            setStravaAthlete: (athlete: Athlete) => set({ stravaAthlete: athlete }),
        }),
        {
            name: 'athlete-storage', // name of item in storage
            storage: createJSONStorage(() => localStorage), // (optional) default is localStorage
        }
    )
);

export default useAthleteStore;