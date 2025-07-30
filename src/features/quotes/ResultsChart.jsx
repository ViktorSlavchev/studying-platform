import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useUser } from "../authentication/useUser";
import Spinner from "../../ui/Spinner";

function ResultsChart() {
	const { user, isLoading } = useUser();
	const data = user.quotesScores.map(({ score, correct }, index) => ({
		name: `${index + 1}`,
		score,
		correct,
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
					<Tooltip formatter={(value, name) => [`${value}`, name === "score" ? "Резултат" : "Познати"]} />
					<Line type="monotone" dataKey="correct" stroke="#ff853a" strokeWidth={2} dot={true} />
					<Line type="monotone" dataKey="score" stroke="var(--color-brand)" strokeWidth={4} dot={true} />
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}

export default ResultsChart;
