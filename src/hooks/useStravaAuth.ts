import useStravaAuthStore from '../stores/stravaAuthSlice';
import useAthleteStore from '../stores/athleteSlice';
import useEnvVars from './useEnvVars';

const useStravaAuth = () => {
    const { stravaClientSecret, stravaRedirectUri } = useEnvVars();
    const setStravaCode = useStravaAuthStore((state) => state.setStravaCode);
    const setStravaToken = useStravaAuthStore((state) => state.setStravaToken);
    const stravaCode = useStravaAuthStore((state) => state.stravaCode);
    const stravaToken = useStravaAuthStore((state) => state.stravaToken);
    const setStravaAthlete = useAthleteStore((state) => state.setStravaAthlete);

    const handleStravaOAuth = async (code: string) => {
        if (!code) {
            console.error('No code provided for Strava OAuth');
            return;
        }
        const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: 167783,
                client_secret: stravaClientSecret,
                code: code,
                grant_type: 'authorization_code',
            }),
        });

        const data = await response.json();

        setStravaToken(data.access_token);
        setStravaAthlete(data.athlete);
    };

    const handleStravaRedirect = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            setStravaCode(code);
            await handleStravaOAuth(code);
            window.history.pushState({}, '', '/'); // Clear the code from the URL
        } else {
            console.log('No Strava code found in URL');
        }
    };

    const handleStravaLoginClick = () => {
        const clientId = 167783; // Replace with your Strava client ID
        const redirectUri = stravaRedirectUri
        const scope = 'read,activity:read_all'; // Adjust scopes as needed

        const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
        window.location.href = stravaAuthUrl;
    };

    return {
        stravaCode,
        stravaToken,
        handleStravaOAuth,
        handleStravaRedirect,
        handleStravaLoginClick,
    };
};

export default useStravaAuth;