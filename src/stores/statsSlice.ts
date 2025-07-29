import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useStatsStore = create()(
    persist((set) => ({
        stats: {},
        setStats: (stats: object) => set(({ stats: stats })),
    }), {
        name: 'stats-storage', // name of item in storage
        storage: createJSONStorage(() => localStorage), // (optional) default is localStorage
    }));

export default useStatsStore;