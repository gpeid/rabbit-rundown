import useActivitiesStore from "../stores/activitiesSlice";

const ActivitiesPage = () => {
  // const athlete = useAthleteStore((state) => state.stravaathlete);
  const activities = useActivitiesStore((state) => state.stravaActivities);
  return (
    <div>
      <h1>Activities Page</h1>
      <p>This is the activities page.</p>
      {activities && activities.length > 0 ? (
        <div>
          <h2>Activities</h2>
          <ul>
            {activities.map((activity, index) => (
              <li key={index}>
                <pre>{JSON.stringify(activity, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No activities data available.</p>
      )}
    </div>
  );
};

export default ActivitiesPage;