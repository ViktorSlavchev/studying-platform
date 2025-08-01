import PropTypes from "prop-types";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";

import Button from "../../ui/Button";
import Row from "../../ui/Row";
import IconWrapper from "../../ui/IconWrapper";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";

const ActionButtons = styled(Row)`
	margin-top: 1.6rem;
	padding-top: 1.6rem;
	border-top: 1px solid var(--color-border);
`;

const CheckButton = styled(Button)`
	background-color: var(--color-brand);

	display: flex;
	align-items: center;
	justify-content: center;

	padding: 1rem 1.8rem;

	&:hover {
		background-color: var(--color-brand-600);
	}
`;

const DeleteButton = styled(Button)`
	background-color: var(--color-red);
	color: white;
	font-size: 1.6rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.8rem;
	padding: 1rem;

	&:hover {
		background-color: var(--color-red-700);
	}
`;

function QuestionActions({ hasAnswer, isChecked, isCorrect, onCheck, onDelete, isDeleting, questionId }) {
	return (
		<ActionButtons $gap="1.2rem" $justify="flex-start">
			{/* Check button - show only if user has answered and hasn't checked yet */}
			{hasAnswer && !isChecked && (
				<CheckButton onClick={onCheck}>
					<CheckIcon style={{ width: "1.6rem", height: "1.6rem", marginRight: "0.8rem" }} />
					Провери
				</CheckButton>
			)}

			{/* Delete button - show only if checked and correct */}
			{isChecked && isCorrect && (
				<DeleteButton onClick={() => onDelete && onDelete(questionId)} disabled={isDeleting}>
					<IconWrapper style={{ fontSize: "2rem" }}>{isDeleting ? <SpinnerMini /> : <TrashIcon />}</IconWrapper>
					Премахни
				</DeleteButton>
			)}
		</ActionButtons>
	);
}

QuestionActions.propTypes = {
	hasAnswer: PropTypes.bool.isRequired,
	isChecked: PropTypes.bool.isRequired,
	isCorrect: PropTypes.bool.isRequired,
	onCheck: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	isDeleting: PropTypes.bool,
	questionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default QuestionActions;
