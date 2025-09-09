import { useEffect } from 'react';
import './App.css';
// import { createClient } from '@supabase/supabase-js';
import useAthleteStore from './stores/athleteSlice';
import useStravaAuthStore from './stores/stravaAuthSlice';
import LoginImage from './assets/btn_strava_connect_with_orange_x2.png';
import { Link } from 'react-router';
import useStravaAuth from './hooks/useStravaAuth';
import ActivitiesBlock from './components/ActivitiesBlock';
import ActivitiesChart from './components/ActivitiesChart';
import { SITE_TITLE } from './constants/constants';
import Layout from './components/Layout';

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

  const { handleStravaRedirect, handleStravaLoginClick } = useStravaAuth();

  const stravaCode = useStravaAuthStore(
    (state) => state.stravaCode
  );

  const stravaToken = useStravaAuthStore(
    (state) => state.stravaToken
  );

  const stravaAthlete = useAthleteStore(
    (state) => state.stravaAthlete
  );



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
    if (!stravaCode) handleStravaRedirect();

  }, [stravaCode, stravaToken]);


  return (
    <Layout>

      <hr className='my-4' />
      <h1 className='text-3xl font-bold mb-4'>{SITE_TITLE}</h1>
      <hr className='my-4' />
      <p className='mb-4'>This is the {SITE_TITLE} app. It allows you to connect with your Strava account and view your athlete data.</p>
      <p className='mb-4'>This app is built with React, TypeScript, and Supabase. It uses the Strava API to fetch athlete data.</p>
      <hr className='my-4' />

      <div className={`grid grid-cols-1 ${stravaToken && "md:grid-cols-2"} gap-4`}>
        <div className="p-4 rounded shadow">
          {/* Left column content */}

          {!stravaCode && <button className='cursor-pointer' onClick={handleStravaLoginClick}>
            {/* <a href="https://strava.com/athletes/146628918" className="strava-badge- strava-badge-follow" target="_blank"><img src="//badges.strava.com/echelon-sprite-48.png" alt="Strava" /></a> */}

            <img src={LoginImage} alt="Connect with Strava" className='inline-block mr-2' />
          </button>}

          {stravaToken &&
            <div>
              {/* {!stravaAthlete && <button className='cursor-pointer text-white px-4 py-2 bg-[#5c64f7]/80 hover:bg-[#5c64f7] rounded-full' onClick={handleGetStravaAtheleteAccessTokenButtonClick}>
                Access your Athlete Data
              </button>} */}
              {stravaAthlete && <span className='text-green-500'>Strava login successful.</span>}
              {/* <button onClick={handleGetAthleteActivities}>
            Get Athlete Activities
          </button>
          <button onClick={() => handleGetStravaAtheleteStatsClick(athlete?.id)}>
            Get Athlete Stats
          </button> */}
            </div>}
        </div>

        <div className="p-4 rounded shadow">
          {!stravaAthlete && (
            <p>No Athlete Data Available. Please login to Strava.</p>
          )}
          {stravaAthlete && (
            <div className="athlete-summary">
              <h2 className="text-xl font-bold mb-2">Hi {`${stravaAthlete?.firstname} ${stravaAthlete?.lastname}`}</h2>
              <button className='cursor-pointer text-white px-4 py-2 bg-[#5c64f7]/80 hover:bg-[#5c64f7] rounded-full'><Link to="/stats">View your stats</Link></button>
            </div>
          )}
        </div>

        <div className="p-4 rounded shadow col-span-full">
          Recent Activity
          <ActivitiesBlock />
          <ActivitiesChart />
        </div>
      </div>

    </Layout>
  );
}

export default App;