import { create } from 'zustand';

const useActivitiesStore = create((set) => ({
    stravaActivities: [],
    setStravaActivities: (activities: Array<object>) => set({ stravaActivities: activities }),
    addStravaActivity: (activity: object) => set((state) => ({
        stravaActivities: [...state.stravaActivities, activity],
    })),
    clearStravaActivities: () => set({ stravaActivities: [] }),
}));

export default useActivitiesStore;