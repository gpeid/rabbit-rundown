import useStatsStore from "../stores/statsSlice";

const StatsBlock = () => {
    const stats = useStatsStore((state) => state.stats);
    // console.log("Stats:", stats);
    // console.log("Stats:", Object.keys(stats));
    return (
        <div className="stats-block">
            {stats && Object.keys(stats).length > 0 ? (
                <table>
                    {Object.entries(stats).map(([key, value]) => (
                        <tr key={key}>
                            <td className="stat-label">{key}:</td>
                            {Object.entries(value).map(([subKey, subValue]) => (
                                <tr key={subKey} className="stat-value">
                                    <td>{subKey}: {String(subValue)}</td>
                                </tr>
                            ))}
                        </tr>
                    ))}
                </table>
            ) : (
                <p>No stats available.</p>
            )}

        </div>
    );
};

export default StatsBlock;