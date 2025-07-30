import { useEffect } from 'react';
import './App.css';
// import { createClient } from '@supabase/supabase-js';
import useAthleteStore from './stores/athleteSlice';
// import useActivitiesStore from './stores/activitiesSlice';
import useStravaAuthStore from './stores/stravaAuthSlice';
import NavigationMenu from './components/NavigationMenu';
import { Link } from 'react-router';

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

// type Group = {
//   id: number;
//   group_name: string;
//   has_potty_episode: boolean;
// };

function App() {

  const setStravaCode = useStravaAuthStore(
    (state) => state.setStravaCode
  );
  const stravaCode = useStravaAuthStore(
    (state) => state.stravaCode
  );
  const setStravaToken = useStravaAuthStore(
    (state) => state.setStravaToken
  );
  const stravaToken = useStravaAuthStore(
    (state) => state.stravaToken
  );

  const stravaAthlete = useAthleteStore(
    (state) => state.stravaAthlete
  );

  const setStravaAthelete = useAthleteStore(
    (state) => state.setStravaAthlete
  );


  // const setStravaActivities = useActivitiesStore(
  //   (state) => state.setStravaActivities
  // );

  const handleStravaOAuth = async (code: string) => {
    const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: 167783,
        client_secret: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();

    // setToken(data.access_token);
    setStravaToken(data.access_token);
    setStravaAthelete(data.athlete);
    console.log('Strava OAuth Token:', data.access_token);
    console.log(data);

  };

  const handleStravaRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      setStravaCode(code);
      console.log('Strava Code from URL:', code);
      await handleStravaOAuth(code);
      window.history.pushState({}, '', '/'); // Clear the code from the URL
    } else {
      console.log('No Strava code found in URL');
    }
  };

  const handleStravaLoginClick = () => {
    const clientId = 167783; // Replace with your Strava client ID
    const redirectUri = import.meta.env.VITE_STRAVA_REDIRECT_URI // Replace with your redirect URI
    const scope = 'read,activity:read_all'; // Adjust scopes as needed

    const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    window.location.href = stravaAuthUrl;
  }

  // const handleGetStravaAtheleteAccessTokenButtonClick = async () => {
  // stravaAthelete can be retrieved from initial oauth token response
  //   if (!stravaToken) {
  //     console.error('Strava token is not available');
  //     return;
  //   }

  //   const response = await fetch('https://www.strava.com/api/v3/athlete', {
  //     headers: {
  //       Authorization: `Bearer ${stravaToken}`,
  //     },
  //   });

  //   if (!response.ok) {
  //     console.error('Failed to fetch Strava athlete data');
  //     return;
  //   }

  //   const athleteData = await response.json();

  //   setStravaAthelete(athleteData);
  //   console.log('Strava Athlete Data:', stravaAthlete);
  // }


  // const handleGetAthleteActivities = async () => {
  //   if (!stravaToken) {
  //     console.error('Strava token is not available');
  //     return;
  //   }

  //   const response = await fetch('https://www.strava.com/api/v3/athlete/activities', {
  //     headers: {
  //       Authorization: `Bearer ${stravaToken}`,
  //     },
  //   });

  //   if (!response.ok) {
  //     console.error('Failed to fetch Strava athlete activities');
  //     return;
  //   }

  //   const activitiesData = await response.json();
  //   setActivities(activitiesData);
  //   setStravaActivities(activitiesData);
  //   console.log('Strava Athlete Activities:', activitiesData);
  // }

  // const handleGetStravaAtheleteStatsClick = async (id: number) => {
  //   if (!stravaToken) {
  //     console.error('Strava token is not available');
  //     return;
  //   }

  //   const response = await fetch(`https://www.strava.com/api/v3/athletes/${id}/stats`, {
  //     headers: {
  //       Authorization: `Bearer ${stravaToken}`,
  //     },
  //   });

  //   if (!response.ok) {
  //     console.error('Failed to fetch Strava athlete stats');
  //     return;
  //   }

  //   const statsData = await response.json();

  //   setStats(statsData);

  //   console.log(stats);
  //   console.log('Strava Athlete Stats:', statsData);
  //   navigate('/stats'); // Navigate to the stats page
  // }


  // const getGroups = async () => {
  //   const { data } = await supabase.from('group').select();
  //   if (data) setGroups(data as Group[]);
  // };

  useEffect(() => {
    // getGroups();
    console.log(stravaCode);
    if (!stravaCode) handleStravaRedirect();

  }, [stravaCode, stravaToken]);


  return (
    <div>
      <NavigationMenu />
      <hr className='my-4' />
      <h1 className='text-3xl font-bold mb-4'>Strava Athlete Rundown</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded shadow">
          {/* Left column content */}

          {!stravaCode && <button className='cursor-pointer text-white px-4 py-2 bg-[#646cff]/80 hover:bg-[#646cff] rounded-full' onClick={handleStravaLoginClick}>
            Login with Strava
          </button>}

          {stravaCode && <p>Strava Code: {stravaCode}</p>}
          {stravaToken && <p>Strava Token: {stravaToken}</p>}

          {stravaToken &&
            <div>
              {/* {!stravaAthlete && <button className='cursor-pointer text-white px-4 py-2 bg-[#646cff]/80 hover:bg-[#646cff] rounded-full' onClick={handleGetStravaAtheleteAccessTokenButtonClick}>
                Access your Strava Athlete Data
              </button>} */}
              {stravaAthlete && <span className='text-green-500'>Athlete Data Accessed</span>}
              {/* <button onClick={handleGetAthleteActivities}>
            Get Strava Athlete Activities
          </button>
          <button onClick={() => handleGetStravaAtheleteStatsClick(athlete?.id)}>
            Get Strava Athlete Stats
          </button> */}
            </div>}

        </div>
        <div className="p-4 rounded shadow">
          {/* Right column content */}
          {!stravaAthlete && (
            <p>No Strava Athlete Data Available. Please login to Strava.</p>
          )}
          {stravaAthlete && (
            <div className="athlete-summary">
              <h2 className="text-xl font-bold mb-2">Hi {`${stravaAthlete?.firstname} ${stravaAthlete?.lastname}`}</h2>
              <button className='cursor-pointer text-white px-4 py-2 bg-[#646cff]/80 hover:bg-[#646cff] rounded-full'><Link to="/stats">View your stats</Link></button>
            </div>
          )}

        </div>
      </div>


      {/* 
      {stravaAthlete && (
        <div>
          <h2>Strava Athlete Information</h2>
          <p>Strava Athlete: {JSON.stringify(athlete)}</p>
          <p>Strava Activities: {JSON.stringify(activities)}</p>
          {stats && <StatsBlock />}
        </div>
      )} */}




      {/* <button onClick={getGroups}>Refresh Groups</button>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <h2>{group.group_name}</h2>
            <p>{group.has_potty_episode ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul> */}
    </div >
  );
}

export default App;