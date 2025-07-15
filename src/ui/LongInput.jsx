import styled from "styled-components";
import PropTypes from "prop-types";

const StyledLongInput = styled.textarea`
	border-radius: var(--border-radius-sm);
	outline: none;
	border: 2px solid var(--color-border);
	background-color: var(--bg-color);
	padding: 0.8rem 1.2rem;
	width: 100%;
	font-size: 1.8rem;
	resize: vertical;
	min-height: 3.2rem;
	max-height: 16rem;
	line-height: 1.5;

	&:focus {
		outline: none;
		border: 2px solid var(--color-brand);
	}

	&:hover {
		outline: none;
		border: 2px solid var(--color-brand);
	}
`;

function LongInput({ placeholder, value, onChange, rows = 3, ...props }) {
	return <StyledLongInput placeholder={placeholder} value={value} onChange={onChange} rows={rows} {...props} />;
}

LongInput.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	rows: PropTypes.number,
};

export default LongInput;
