import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 16rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 700;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red);
`;

function FormRow({ label, error, children }) {
	return (
		<StyledFormRow>
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{error && <Error>{error}</Error>}
		</StyledFormRow>
	);
}

FormRow.propTypes = {
	label: PropTypes.node,
	error: PropTypes.node,
	children: PropTypes.node.isRequired,
};

export default FormRow;
