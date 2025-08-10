// import { UserCircleIcon } from "@heroicons/react/24/outline};
import styled from "styled-components";
import { Link } from "react-router-dom";

import Row from "../../ui/Row";
import Text from "../../ui/Text";
import IconWrapper from "../../ui/IconWrapper";
import { useQueryClient } from "@tanstack/react-query";

import { ArrowRightStartOnRectangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useLogout } from "../../hooks/useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledProfile = styled(Link)`
	cursor: pointer;
`;

const ProfileRow = styled(Row)`
	/* Reduce spacing on mobile */
	@media (max-width: 479px) {
		gap: 1rem;
	}
`;

const NameRow = styled(Row)`
	/* Hide name on very small screens, keep only icon */
	@media (max-width: 379px) {
		span {
			display: none;
		}
	}
`;

function Profile() {
	const queryClient = useQueryClient();
	const name = queryClient.getQueryData(["user"])?.name;

	const { logout, isLoading } = useLogout();
	const handleLogout = () => {
		logout();
	};

	return (
		<StyledProfile to={"/settings"}>
			<ProfileRow $gap="1.6rem">
				<NameRow $gap="1rem">
					<Text>{name || ""}</Text>
					<IconWrapper $sz="md">
						<UserCircleIcon strokeWidth={0.9} />
					</IconWrapper>
				</NameRow>

				{isLoading ? (
					<SpinnerMini />
				) : (
					<IconWrapper $sz="sm" $color="var(--text-color-secondary)" onClick={handleLogout}>
						<ArrowRightStartOnRectangleIcon strokeWidth={0.9} />
					</IconWrapper>
				)}
			</ProfileRow>
		</StyledProfile>
	);
}

export default Profile;
