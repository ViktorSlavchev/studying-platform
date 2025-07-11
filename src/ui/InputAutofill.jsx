import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Input from "./Input";
import PropTypes from "prop-types";
import compareStrings from "../utils/compareStrings";

const SuggestionsList = styled.ul`
	position: absolute;
	z-index: 10;
	width: 100%;
	background: var(--bg-color);
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-sm);
	margin-top: 0.2rem;
	box-shadow: var(--shadow-sm);
	max-height: 16rem;
	overflow-y: auto;
	list-style: none;
	padding: 0;
`;

const SuggestionItem = styled.li`
	padding: 0.8rem 1.2rem;
	cursor: pointer;
	background: ${({ $highlighted }) => ($highlighted ? "var(--color-brand-50)" : "transparent")};
	color: ${({ $highlighted }) => ($highlighted ? "var(--color-brand)" : "inherit")};
`;

const Wrapper = styled.div`
	position: relative;
	width: 100%;

	grid-column: 2 / 3;
`;

function InputAutofill({ list, value, onChange, placeholder, ...props }) {
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [filtered, setFiltered] = useState([]);
	const [highlighted, setHighlighted] = useState(-1);
	const inputRef = useRef();

	useEffect(() => {
		if (value) {
			const filteredList = list
				.map((item) => {
					return { str: item, value: compareStrings(value, item) };
				})
				.sort((a, b) => b.value - a.value)
				.map((item) => item.str)
				.slice(0, Math.min(4, list.length));
			setFiltered(filteredList);
			setShowSuggestions(filteredList.length > 0);
			setHighlighted(-1);

			if (value === filteredList[0]) {
				// If the input value matches the best suggestion, don't show suggestions
				setShowSuggestions(false);
			}
		} else {
			setFiltered([]);
			setShowSuggestions(false);
			setHighlighted(-1);
		}
	}, [value, list]);

	const handleInputChange = (e) => {
		onChange(e.target.value);
	};

	const handleSuggestionClick = (suggestion) => {
		onChange(suggestion);
		setShowSuggestions(false);
	};

	const handleKeyDown = (e) => {
		if (!showSuggestions) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlighted((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlighted((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
		} else if (e.key === "Enter" && highlighted >= 0) {
			e.preventDefault();
			onChange(filtered[highlighted]);
			setShowSuggestions(false);
		} else if (e.key === "Escape") {
			setShowSuggestions(false);
		}
	};

	const handleBlur = () => {
		setTimeout(() => setShowSuggestions(false), 100);
	};

	return (
		<Wrapper>
			<Input ref={inputRef} value={value} onChange={handleInputChange} onKeyDown={handleKeyDown} onFocus={() => setShowSuggestions(filtered.length > 0)} onBlur={handleBlur} placeholder={placeholder} autoComplete="off" {...props} />
			{showSuggestions && (
				<SuggestionsList>
					{filtered.map((suggestion, idx) => (
						<SuggestionItem key={suggestion} $highlighted={idx === highlighted} onMouseDown={() => handleSuggestionClick(suggestion)}>
							{suggestion}
						</SuggestionItem>
					))}
				</SuggestionsList>
			)}
		</Wrapper>
	);
}

InputAutofill.propTypes = {
	list: PropTypes.arrayOf(PropTypes.string).isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
};

export default InputAutofill;
