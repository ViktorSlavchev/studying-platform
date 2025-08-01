import PropTypes from "prop-types";
import { useEffect } from "react";

import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";

function ExamStatus({ status, onReload }) {
	// Auto-reload for grading status
	useEffect(() => {
		if (status === "grading") {
			const timer = setTimeout(() => {
				if (onReload) {
					onReload();
				} else {
					window.location.reload();
				}
			}, 4000);

			return () => clearTimeout(timer);
		}
	}, [status, onReload]);

	if (status === "grading") {
		return (
			<>
				<Heading as="h2" style={{ textAlign: "center" }}>
					Изпитът се проверява. Моля изчакайте.
				</Heading>
				<Spinner />
			</>
		);
	}

	return null;
}

ExamStatus.propTypes = {
	status: PropTypes.string.isRequired,
	onReload: PropTypes.func,
};

export default ExamStatus;
