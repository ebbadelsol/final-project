import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { Icons } from "./icons/Icons";
import { Color } from "./colors/Color";
import { Logout } from "./Logout";

const Background = styled.div`
	position: fixed;
	height: 100vh;
	width: 100vw;
	top: 0;
	right: 0;
	background-color: var(--shadow-2);
	z-index: 1;
`;

const Button = styled.button`
	position: absolute;
	top: 1.25rem;
	right: 0.95rem;
	width: 35px;
	height: 35px;
	padding: 0;
	z-index: 2;
`;

const NavBar = styled.nav`
	position: absolute;
	padding-top: 4.75rem;
	top: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	text-align: right;
	background-color: var(--white);
	width: 280px;
	z-index: 1;
	box-shadow: var(--shadow);
	border-radius: 0 0 0 var(--roundedCorners);

	> * {
		padding: 1.25rem;
		border-top: var(--borderGreyLight);
		text-decoration: none;
		color: var(--black);
		font-weight: 600;
	}

	> button {
		justify-content: end;
	}

	/* > *:last-child {
		border-bottom: var(--borderGreyLight);
	} */
`;

export const Menu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
				{isMenuOpen ? (
					<Icons.Close color={Color.BLACK} size="22px" />
				) : (
					<Icons.Hamburger color={Color.WHITE} size="30px" />
				)}
			</Button>
			{isMenuOpen && (
				<Background>
					<NavBar>
						<NavLink to="/">Home</NavLink>
						<NavLink to="/collections">Collections</NavLink>
						<NavLink to="/tasks">My Tasks</NavLink>
						<NavLink to="/calendar">Calendar</NavLink>
						<NavLink to="/account">Account</NavLink>
						<Logout />
					</NavBar>
				</Background>
			)}
		</>
	);
};
