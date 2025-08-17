import PropTypes from "prop-types";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Text from "../../ui/Text";
import MultipleLines from "../../ui/MultipleLines";

const ReadingButton = styled(Button)`
	position: absolute;
	top: 1.6rem;
	right: 1.6rem;
	padding: 0.8rem;
	background: unset;
	background-color: var(--color-grey-200);
	color: var(--color-grey-700);
	border: 1px solid var(--color-grey-300);

	&:hover {
		background-color: var(--color-grey-300);
		color: var(--color-grey-800);
	}
`;

function ReadingTextModal({ needsReading, isLoadingReading, showReading, setShowReading, reading }) {
	if (!needsReading) return null;

	return (
		<>
			{/* Reading button */}
			<ReadingButton onClick={() => setShowReading(true)} disabled={isLoadingReading}>
				<DocumentTextIcon style={{ width: "1.6rem", height: "1.6rem" }} />
			</ReadingButton>

			{/* Modal */}
			{showReading && reading && (
				<Modal onClose={() => setShowReading(false)}>
					<div>
						<Text $weight="bold" $size="2rem" style={{ marginBottom: "2rem" }}>
							Текст за анализ
						</Text>
						<div style={{ lineHeight: "1.8", fontSize: "1.6rem" }}>
							<MultipleLines text={reading} />
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}

ReadingTextModal.propTypes = {
	needsReading: PropTypes.bool.isRequired,
	isLoadingReading: PropTypes.bool.isRequired,
	showReading: PropTypes.bool.isRequired,
	setShowReading: PropTypes.func.isRequired,
	reading: PropTypes.string,
};

export default ReadingTextModal;
