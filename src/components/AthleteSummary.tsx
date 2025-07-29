import useAthleteStore from "../stores/athleteSlice";

const AthleteSummary = () => {
    const stravaAthlete = useAthleteStore((state) => state.stravaAthlete);
    return (
        <div className="athlete-summary">
            <h2>Athlete Summary</h2>
            {stravaAthlete ? (
                <div>
                    <p>Name: {stravaAthlete.firstname} {stravaAthlete.lastname}</p>
                    <p>City: {stravaAthlete.city}</p>
                    <p>State: {stravaAthlete.state}</p>
                    <p>Country: {stravaAthlete.country}</p>
                    <p>Profile Picture: <img src={stravaAthlete.profile} alt="Profile" /></p>
                </div>
            ) : (
                <p>No athlete data available.</p>
            )}
        </div>
    );
}

export default AthleteSummary;