type EnvVars = {
    supabaseUrl: string;
    supabaseAnonKey: string;
    stravaClientSecret: string;
    stravaRedirectUri: string;
};

const useEnvVars = (): EnvVars => {
    return {
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string,
        supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
        stravaClientSecret: import.meta.env.VITE_STRAVA_CLIENT_SECRET as string,
        stravaRedirectUri: import.meta.env.VITE_STRAVA_REDIRECT_URI as string,
    };
};

export default useEnvVars;