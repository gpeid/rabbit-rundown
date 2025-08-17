import { useEffect } from "react";
import useActivitiesStore from "../stores/activitiesSlice";
import useStravaAuthStore from "../stores/stravaAuthSlice";

type StravaActivity = {
    id: number;
    distance: number;
    // add other properties as needed
};

const ActivitiesBlock = () => {
    const stravaActivities = useActivitiesStore((state) => state.stravaActivities) as StravaActivity[];
    const setStravaActivities = useActivitiesStore((state) => state.setStravaActivities);
    const stravaToken = useStravaAuthStore(
        (state) => state.stravaToken
    );
    useEffect(() => {

        const fetchActivities = async () => {
            if (!stravaToken) {
                console.error('Strava token is not available');
                return;
            }

            const response = await fetch('https://www.strava.com/api/v3/athlete/activities', {
                headers: {
                    Authorization: `Bearer ${stravaToken}`,
                },
            });

            if (!response.ok) {
                console.error('Failed to fetch Strava athlete activities');
                return;
            }

            const activitiesData = await response.json();
            // setActivities(activitiesData);
            setStravaActivities(activitiesData);
            console.log('Strava Athlete Activities:', activitiesData);

            // try {
            //     const response = await fetch('/api/strava/activities');
            //     if (!response.ok) {
            //         throw new Error('Failed to fetch activities');
            //     }
            //     const data = await response.json();
            //     setStravaActivities(data);
            // } catch (error) {
            //     console.error('Error fetching activities:', error);
            // }
        };

        fetchActivities();
    }, [stravaToken, setStravaActivities]);

    return (
        <div>
            <h2>Recent Activities</h2>
            {stravaActivities.length === 0 ? (
                <p>No activities data available.</p>
            ) : <>
                {stravaActivities.map((activity, i) => i === 0 && (
                    <p key={i}>Distance: {activity?.distance}</p>
                ))}
            </>}

        </div>
    );
}

export default ActivitiesBlock;