import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { Icons } from "./icons/Icons";
import { Color } from "./colors/Color";
import { Logout } from "./Logout";

const Button = styled.button`
	border: none;
	position: absolute;
	top: 0;
	right: 0;
	margin: 0.6rem 0.4rem;
`;

export const Menu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
				{isMenuOpen ? (
					<Icons.Close color={Color.WHITE} size="30px" />
				) : (
					<Icons.Hamburger color={Color.WHITE} size="30px" />
				)}
			</Button>
			{isMenuOpen && (
				<nav>
					<NavLink to="/">Home</NavLink>
					<NavLink to="/collections">Collections</NavLink>
					<NavLink to="/tasks">My Tasks</NavLink>
					<NavLink to="/calendar">Calendar</NavLink>
					<NavLink to="/account">Account</NavLink>
					<Logout />
				</nav>
			)}
		</>
	);
};
