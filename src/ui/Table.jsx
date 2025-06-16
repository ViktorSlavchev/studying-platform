import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTable = styled.div`
	border: 2px solid var(--color-border);
	font-size: 1.6rem;
	border-radius: var(--border-radius-md);
	overflow: hidden;
	width: 100%;
`;

const CommonRow = styled.div`
	display: grid;
	grid-template-columns: ${(props) => props.$columns};
	column-gap: 2.4rem;
	align-items: center;
	transition: none;
`;

const StyledHeader = styled(CommonRow)`
	padding: 1.6rem 2.4rem;
	background-color: var(--color-brand-50);
	border-bottom: 2px solid var(--color-border);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: bold;
	color: var(--color-text-dark);
	opacity: 0.6;
	font-size: 1.2rem;
`;

const StyledRow = styled(CommonRow)`
	padding: 1.2rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 2px solid var(--color-border);
	}
`;
const StyledBody = styled.section`
	margin: 0.4rem 0;
`;

const Empty = styled.p`
	font-size: 1.6rem;
	font-weight: 500;
	text-align: center;
	margin: 2.4rem;
`;

const TableContext = createContext();

Table.propTypes = {
	columns: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

function Table({ columns, children }) {
	return (
		<TableContext.Provider value={{ columns }}>
			<StyledTable role="table">{children}</StyledTable>
		</TableContext.Provider>
	);
}

Header.propTypes = {
	children: PropTypes.node.isRequired,
};

function Header({ children }) {
	const { columns } = useContext(TableContext);
	return (
		<StyledHeader $columns={columns} role="row">
			{children}
		</StyledHeader>
	);
}

Row.propTypes = {
	children: PropTypes.node.isRequired,
	selected: PropTypes.bool,
};

function Row({ children, selected }) {
	const { columns } = useContext(TableContext);
	return (
		<StyledRow role="row" $columns={columns} $selected={selected}>
			{children}
		</StyledRow>
	);
}

Body.propTypes = {
	data: PropTypes.array.isRequired,
	render: PropTypes.func.isRequired,
};

function Body({ data, render }) {
	if (!data.length) return <Empty>No data to show at the moment</Empty>;
	console.log(data, render, data.map(render));
	return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
