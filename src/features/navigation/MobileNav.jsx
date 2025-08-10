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
	background: none;
	border: none;
	cursor: pointer;
	padding: 0.8rem;
	border-radius: 0.8rem;
	transition: all 0.2s ease;
	color: var(--color-text);

	&:hover {
		background-color: var(--color-grey-100);
		transform: scale(1.05);
	}

	&:active {
		transform: scale(0.95);
	}

	svg {
		width: 2.4rem;
		height: 2.4rem;
	}

	/* Smaller icon on mobile */
	@media (max-width: 479px) {
		padding: 0.6rem;

		svg {
			width: 2rem;
			height: 2rem;
		}
	}
`;

// Overlay that covers the entire screen
const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(4px);
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
	background-color: var(--color-grey-0);
	border-right: 2px solid var(--color-border);
	box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
	z-index: 1000;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	gap: 3rem;
	padding: 3rem 0 1.2rem;

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
	background: none;
	border: none;
	cursor: pointer;
	padding: 0.8rem;
	border-radius: 50%;
	transition: all 0.2s ease;
	color: var(--color-text);

	&:hover {
		background-color: var(--color-grey-100);
		transform: rotate(90deg);
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

	/* Reduce gap on smaller screens */
	@media (max-width: 768px) {
		gap: 2.5rem;
	}

	@media (max-width: 479px) {
		gap: 2rem;
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
