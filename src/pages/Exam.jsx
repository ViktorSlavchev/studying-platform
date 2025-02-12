import { useParams } from "react-router";
import Heading from "../ui/Heading";

function Exam() {
	const { id } = useParams();
	return <Heading>Изпит #{id}</Heading>;
}

export default Exam;
