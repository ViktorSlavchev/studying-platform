import styled from "styled-components";
import PropTypes from "prop-types";
import { HomeIcon, PhoneIcon, ClipboardDocumentListIcon, CheckCircleIcon, XCircleIcon, PuzzlePieceIcon, ChatBubbleLeftEllipsisIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import NavElement from "./NavElement";
import Row from "../../ui/Row";

const StyledNav = styled.nav`
	display: flex;
	flex-direction: column;
	width: 100%;
	flex-grow: 1;
	overflow: auto;
`;

const NavContainer = styled(Row)`
	/* Reduce gap on mobile */
	@media (max-width: 768px) {
		gap: 3rem !important;
	}

	@media (max-width: 479px) {
		gap: 2rem !important;
	}
`;

const NavItemsContainer = styled(Row)`
	/* Reduce spacing between nav items on mobile */
	@media (max-width: 479px) {
		gap: 0.4rem !important;
	}
`;

function Nav({ onNavigate }) {
	return (
		<StyledNav>
			<NavContainer as="ul" $direction={"column"} $align={"strech"} $grow={1} $gap={"6rem"}>
				<NavItemsContainer $direction={"column"} $align={"strech"} $gap={"0.8rem"}>
					<NavElement to={"/home"} icon={<HomeIcon />} label={"Начало"} onNavigate={onNavigate} />
					<NavElement to={"/exams"} icon={<ClipboardDocumentListIcon />} label={"Пробни изпити"} onNavigate={onNavigate} />
					<NavElement to={"/comment"} icon={<CheckCircleIcon />} label={"Проверка на теза"} onNavigate={onNavigate} />
					<NavElement to={"/mistakes"} icon={<XCircleIcon />} label={"Предишни грешки"} onNavigate={onNavigate} />
					<NavElement to={"/daily"} icon={<PuzzlePieceIcon />} label={"Дневна мисия"} onNavigate={onNavigate} />
					<NavElement to={"/quotes"} icon={<ChatBubbleLeftEllipsisIcon />} label={"Цитати"} onNavigate={onNavigate} />
					<NavElement to={"/ai"} icon={<QuestionMarkCircleIcon />} label={"Питай AI"} onNavigate={onNavigate} />
				</NavItemsContainer>
				<NavElement to={"/contact-us"} icon={<PhoneIcon />} label={"Свържете се с нас"} onNavigate={onNavigate} />
			</NavContainer>
		</StyledNav>
	);
}

Nav.propTypes = {
	onNavigate: PropTypes.func,
};

export default Nav;
