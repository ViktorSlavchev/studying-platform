// src/ui/Notification.jsx
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { createPortal } from "react-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-1rem); }
`;

const NotificationWrapper = styled.div`
	position: fixed;
	top: 5rem;
	left: 50%;
	transform: translateX(-50%);
	background-color: var(--color-brand);
	color: white;
	padding: 1rem 2rem;
	border-radius: var(--border-radius-md);
	box-shadow: var(--shadow-md);
	font-size: 1.4rem;
	z-index: 1000000;
	animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.5s forwards;
	pointer-events: none;

	white-space: nowrap;
`;

function Notification({ message, duration = 2000, onDone }) {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setVisible(false), duration);
		const cleanup = setTimeout(() => {
			if (onDone) onDone();
		}, duration + 500); // allow fade-out to finish

		return () => {
			clearTimeout(timeout);
			clearTimeout(cleanup);
		};
	}, [duration, onDone]);

	return createPortal(<NotificationWrapper $visible={visible}>{message}</NotificationWrapper>, document.body);
}

export default Notification;
Notification.propTypes = {
	message: PropTypes.string.isRequired,
	duration: PropTypes.number,
	onDone: PropTypes.func,
};
