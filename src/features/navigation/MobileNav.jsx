import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";

import Logo from "../../ui/Logo";
import Nav from "./Nav";

// Animations
const slideIn = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideOut = keyframes`
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

// Mobile Menu Button
const MenuButton = styled.button`
	background: var(--bg-color);
	border: 1px solid var(--color-border);
	cursor: pointer;
	padding: 1rem;
	border-radius: 1.2rem;
	transition: all 0.3s ease;
	color: var(--color-text-dark);
	backdrop-filter: blur(10px);
	position: relative;

	&:hover {
		background: rgba(255, 255, 255, 1);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	&:active {
		transform: translateY(0);
	}

	svg {
		width: 2.4rem;
		height: 2.4rem;
	}

	/* Smaller icon on mobile */
	@media (max-width: 479px) {
		padding: 0.8rem;

		svg {
			width: 2rem;
			height: 2rem;
		}
	}
`; // Overlay that covers the entire screen
const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.4) 100%);
	backdrop-filter: blur(8px) saturate(180%);
	z-index: 999;
	animation: ${(props) => (props.$isClosing ? fadeOut : fadeIn)} 0.3s ease-in-out;
`;

// Mobile Navigation Panel
const MobileNavPanel = styled.aside`
	position: fixed;
	top: 0;
	left: 0;
	width: 28rem;
	height: 100vh;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(255, 255, 255, 0.95) 100%);
	backdrop-filter: blur(20px) saturate(180%);
	border-right: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1);
	z-index: 1000;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap: 3rem;
	padding: 3rem 0 1.2rem;

	position: relative;
	overflow: hidden;

	/* Glass morphism effect with subtle pattern */
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
		pointer-events: none;
	}

	animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.4s cubic-bezier(0.4, 0, 0.2, 1);

	/* Responsive width and spacing */
	@media (max-width: 768px) {
		width: 85vw;
		max-width: 28rem;
		gap: 2rem;
		padding: 2rem 0 1rem;
	}

	@media (max-width: 479px) {
		width: 90vw;
		max-width: 30rem;
		gap: 1.5rem;
		padding: 1.5rem 0 1rem;
	}
`;

// Close Button
const CloseButton = styled.button`
	position: absolute;
	top: 2rem;
	right: 2rem;
	background: rgba(255, 255, 255, 0.9);
	border: 1px solid rgba(0, 0, 0, 0.1);
	cursor: pointer;
	padding: 1rem;
	border-radius: 50%;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	color: var(--color-text);
	backdrop-filter: blur(10px);
	z-index: 10;

	&:hover {
		background: rgba(255, 255, 255, 1);
		transform: rotate(90deg) scale(1.1);
	}

	&:active {
		transform: rotate(90deg) scale(0.95);
	}

	svg {
		width: 2rem;
		height: 2rem;
	}
`;

// Navigation Content Container
const NavContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4rem;
	width: 100%;
	flex-grow: 1;
	padding: 2rem 1.5rem;
	border-radius: 2rem;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05);
	position: relative;
	z-index: 2;

	/* Reduce gap on smaller screens */
	@media (max-width: 768px) {
		gap: 2.5rem;
		padding: 1.5rem 1rem;
	}

	@media (max-width: 479px) {
		gap: 2rem;
		padding: 1rem 0.8rem;
	}
`;

function MobileNav() {
	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const openNav = () => {
		setIsOpen(true);
		setIsClosing(false);
		// Prevent body scroll when menu is open
		document.body.style.overflow = "hidden";
	};

	const closeNav = () => {
		setIsClosing(true);
		// Restore body scroll
		document.body.style.overflow = "unset";
		// Close after animation completes
		setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
		}, 400);
	};

	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			closeNav();
		}
	};

	return (
		<>
			<MenuButton onClick={openNav} aria-label="Open navigation menu">
				<Bars3Icon />
			</MenuButton>

			{isOpen &&
				createPortal(
					<Overlay $isClosing={isClosing} onClick={handleOverlayClick}>
						<MobileNavPanel $isClosing={isClosing}>
							<CloseButton onClick={closeNav} aria-label="Close navigation menu">
								<XMarkIcon />
							</CloseButton>

							<NavContent>
								<Logo />
								<Nav onNavigate={closeNav} />
							</NavContent>
						</MobileNavPanel>
					</Overlay>,
					document.body
				)}
		</>
	);
}

export default MobileNav;
