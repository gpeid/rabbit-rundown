
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import useActivitiesStore from "../stores/activitiesSlice";
import useStravaAuthStore from "../stores/stravaAuthSlice";
import { GridColumns, GridRows } from "@visx/grid";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";

type StravaActivity = {
    start_date: string;
    distance: number;
    // add other properties if needed
};

const width = window.innerWidth* 0.8; // Adjust width based on window size
const height = 600;
const margin = { top: 40, right: 30, bottom: 50, left: 40 };



const ActivitiesChart = () => {
    const stravaActivities = useActivitiesStore((state) => state.stravaActivities) as StravaActivity[];
    const stravaToken = useStravaAuthStore((state) => state.stravaToken);

    if (!stravaActivities || !stravaToken) {
        return <div className="text-center">No activities available. Please log in to Strava.</div>;
    }

    const date = (d: StravaActivity) => new Date(d?.start_date).valueOf();

    const timeScale = scaleTime<number>({
        domain: [
            new Date(Math.min(...stravaActivities.map(activity => new Date(activity.start_date).getTime()))),
            new Date(Math.max(...stravaActivities.map(activity => new Date(activity.start_date).getTime()))),
        ],
    });

    const distanceScale = scaleLinear<number>({
        domain: [0, Math.max(...stravaActivities.map(activity => activity.distance)) / 1000 || 1],
        nice: true,
    });

    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    timeScale.range([0, xMax]);
    distanceScale.range([yMax, 0]);

    return (
        <div className="p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Activities Chart</h2>
            {/* Render your chart here using stravaActivities */}
            <svg width={width} height={height}>
                <rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill={"#eee"}
                    rx={14}
                />
                <Group top={margin.top} left={50}>
                    <GridRows
                        scale={distanceScale}
                        width={xMax}
                        height={yMax}
                        stroke="#e0e0e0"
                    />
                    <GridColumns
                        scale={timeScale}
                        width={xMax}
                        height={yMax}
                        stroke="#e0e0e0"
                    />
                    <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" />

                    <AxisBottom
                        top={yMax}
                        scale={timeScale}
                        numTicks={width > 520 ? 10 : 5}
                    />
                    <AxisLeft scale={distanceScale} />

                    <text x="-70" y="15" transform="rotate(-90)" fontSize={10}>
                        Distance (km)
                    </text>
                    <LinePath
                        data={stravaActivities}
                        x={(d) => timeScale(date(d)) ?? 0}
                        y={(d) => distanceScale((d.distance/1000)) ?? 0}
                        stroke="#90aea9"
                        strokeWidth={2}
                    />
                </Group>
            </svg>
        </div>
    );
}
export default ActivitiesChart;