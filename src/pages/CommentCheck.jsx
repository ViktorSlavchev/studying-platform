import Heading from "../ui/Heading";
import TableComments from "../features/comments/TableComments";
import CommentForm from "../features/comments/CommentForm";
import { useComments } from "../features/comments/useComments";
import Spinner from "../ui/Spinner";
import { useState } from "react";

function CommentCheck() {
	const { comments, isLoading } = useComments();
	const [selectedComment, setSelectedComment] = useState(null);

	const handleCommentClick = (index) => {
		setSelectedComment(index);
	};

	const handleInputChange = () => {
		setSelectedComment(null);
	};

	return (
		<>
			<Heading>Проверка на теза</Heading>
			<CommentForm selectedComment={selectedComment !== null ? comments[selectedComment] : null} onInput={handleInputChange} />
			<Heading as="h2">Предишни Тези</Heading>
			{isLoading ? <Spinner /> : <TableComments comments={comments} onClick={handleCommentClick} selected={selectedComment} />}
		</>
	);
}

export default CommentCheck;
