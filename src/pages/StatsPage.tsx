import { useEffect } from "react";
import StatsBlock from "../components/StatsBlock";
import useStravaAuthStore from "../stores/stravaAuthSlice";
import { useNavigate } from "react-router";
import useStatsStore from "../stores/statsSlice";
import useAthleteStore from "../stores/athleteSlice";

const StatsPage = () => {
  const navigate = useNavigate();
  const stravaToken = useStravaAuthStore((state) => state.stravaToken);
  const setStats = useStatsStore((state) => state.setStats);
  const stats = useStatsStore((state) => state.stats);
  const stravaAthlete = useAthleteStore((state) => state.stravaAthlete);
  useEffect(() => {
    const getStravaAthleteStats = async (id: number) => {
      if (!stravaToken) {
        console.error("Strava token is not available");
        navigate("/"); // Navigate to the home page if token is not available
        return;
      }

      const response = await fetch(
        `https://www.strava.com/api/v3/athletes/${id}/stats`,
        {
          headers: {
            Authorization: `Bearer ${stravaToken}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch Strava athlete stats");
        return;
      }

      const statsData = await response.json();

      setStats(statsData);
      console.log("Stats:", stats);
    };


    getStravaAthleteStats(stravaAthlete?.id);

  }, []);

  return (
    <div>
      <h1 className="text-3xl">Stats Page</h1>
      <StatsBlock />
    </div>
  );
};

export default StatsPage;
