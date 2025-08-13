import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type StatsState = {
    stats: object;
    setStats: (stats: object) => void;
};

const useStatsStore = create<StatsState>()(
    persist((set) => ({
        stats: {},
        setStats: (stats: object) => {
            console.log("Setting stats:", stats);
            set(({ stats: stats }))
        },
    }), {
        name: 'stats-storage', // name of item in storage
        storage: createJSONStorage(() => localStorage), // (optional) default is localStorage
    }));

export default useStatsStore;