import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useUser } from "../authentication/useUser";
import Spinner from "../../ui/Spinner";

function ResultsChart() {
	const { user, isLoading } = useUser();
	const data = user.quotesScores.map((score, index) => ({
		name: `${index + 1}`,
		value: score,
	}));

	if (isLoading || !user) {
		return <Spinner />;
	}

	return (
		<>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={data}>
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip formatter={(value) => [`${value}`, "Резултат"]} />
					<Line type="monotone" dataKey="value" stroke="var(--color-brand)" strokeWidth={3} dot={true} />
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}

export default ResultsChart;
