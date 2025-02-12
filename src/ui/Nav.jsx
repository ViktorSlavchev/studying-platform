import styled from "styled-components";
import { HomeIcon, PhoneIcon, ClipboardDocumentListIcon, CheckCircleIcon, XCircleIcon, PuzzlePieceIcon, ChatBubbleLeftEllipsisIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import NavElement from "./NavElement";
import Row from "./Row";

const StyledNav = styled.nav`
	display: flex;
	flex-direction: column;
	width: 100%;
	flex-grow: 1;
	overflow: auto;
`;

function Nav() {
	return (
		<StyledNav>
			<Row as="ul" direction={"column"} align={"strech"} grow={1} gap={"6rem"}>
				<Row direction={"column"} align={"strech"} gap={"0.8rem"}>
					<NavElement to={"/home"} icon={<HomeIcon />} label={"Начало"} />
					<NavElement to={"/exams"} icon={<ClipboardDocumentListIcon />} label={"Пробни изпити"} />
					<NavElement to={"/comment"} icon={<CheckCircleIcon />} label={"Проверка на теза"} />
					<NavElement to={"/mistakes"} icon={<XCircleIcon />} label={"Сгрешени въпроси"} />
					<NavElement to={"/daily"} icon={<PuzzlePieceIcon />} label={"Дневна мисия"} />
					<NavElement to={"/quotes"} icon={<ChatBubbleLeftEllipsisIcon />} label={"Цитати"} />
					<NavElement to={"/ai"} icon={<QuestionMarkCircleIcon />} label={"Питай AI"} />
				</Row>
				<NavElement to={"/contact-us"} icon={<PhoneIcon />} label={"Свържете се с нас"} />
			</Row>
		</StyledNav>
	);
}

export default Nav;
