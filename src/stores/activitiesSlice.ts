import { create } from 'zustand';

type ActivitiesState = {
    stravaActivities: Array<object>;
    setStravaActivities: (activities: Array<object>) => void;
    addStravaActivity: (activity: object) => void;
    clearStravaActivities: () => void;
};

const useActivitiesStore = create<ActivitiesState>((set) => ({
    stravaActivities: [],
    setStravaActivities: (activities: Array<object>) => set({ stravaActivities: activities }),
    addStravaActivity: (activity: object) => set((state) => ({
        stravaActivities: [...state.stravaActivities, activity],
    })),
    clearStravaActivities: () => set({ stravaActivities: [] }),
}));

export default useActivitiesStore;