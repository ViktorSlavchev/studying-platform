import { createPortal } from "react-dom";
import styled from "styled-components";
import { XMarkIcon } from "@heroicons/react/24/outline";

import Button from "./Button";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--bg-color);
	border-radius: var(--border-radius-lg);
	box-shadow: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
	transition: all 0.5s;
	width: 90%;
	max-width: 80rem;
	max-height: 80vh;
	z-index: 1001;

	/* Remove overflow from main modal to prevent scrollbar outside borders */
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

const ModalContent = styled.div`
	padding: 3.2rem 4rem;
	overflow-y: auto;
	flex: 1;

	/* Custom scrollbar styling */
	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: var(--color-grey-100);
		border-radius: 4px;
	}

	&::-webkit-scrollbar-thumb {
		background: var(--color-grey-300);
		border-radius: 4px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: var(--color-grey-400);
	}
`;

const CloseButton = styled(Button)`
	position: absolute;
	top: 1.2rem;
	right: 1.2rem;
	background: var(--color-grey-0);
	border: 1px solid var(--color-grey-200);
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transition: all 0.2s;
	color: var(--color-grey-500);
	z-index: 10;

	/* Ensure button stays visible and fixed */
	min-width: 3.2rem;
	min-height: 3.2rem;
	display: flex;
	align-items: center;
	justify-content: center;

	box-shadow: var(--shadow-md);

	&:hover {
		background-color: var(--color-grey-100);
		color: var(--color-grey-600);
		border-color: var(--color-grey-300);
	}

	& svg {
		width: 2rem;
		height: 2rem;
	}
`;

function Modal({ children, onClose }) {
	return createPortal(
		<Overlay onClick={onClose}>
			<StyledModal onClick={(e) => e.stopPropagation()}>
				<CloseButton onClick={onClose}>
					<XMarkIcon />
				</CloseButton>
				<ModalContent>{children}</ModalContent>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

export default Modal;
