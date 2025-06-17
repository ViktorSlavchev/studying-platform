import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useUser } from "../features/authentication/useUser";

import Spinner from "./Spinner";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--bg-color);

	display: flex;
	justify-content: center;
	align-items: center;
`;

function ProtectedRoute({ children }) {
	const { user, isLoading } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user && !isLoading) {
			navigate("/login", { replace: true });
		}
	}, [user, isLoading, navigate]);

	if (isLoading) {
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);
	}

	return children;
}
ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
