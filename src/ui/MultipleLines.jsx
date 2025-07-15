import PropTypes from "prop-types";

function MultipleLines({ text }) {
	return (
		<>
			{text.split("\n").map((t, ind) => (
				<span key={ind}>
					{t} <br />
				</span>
			))}
		</>
	);
}

MultipleLines.propTypes = {
	text: PropTypes.string.isRequired,
};

export default MultipleLines;
