import Heading from "../ui/Heading";
import TableComments from "../features/comments/TableComments";
import CommentForm from "../features/comments/CommentForm";

function CommentCheck() {
	return (
		<>
			<Heading>Проверка на теза</Heading>
			<CommentForm />
			<Heading as="h2">Предишни Тези</Heading>
			<TableComments />
		</>
	);
}

export default CommentCheck;
