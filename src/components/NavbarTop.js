import React from 'react';
import {
Nav,
NavTop,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const NavbarTop = () => {
return (
	<>
	<NavTop>
		<Bars />
		<NavMenu>
		<NavLink to='/TopVulnerabilities' activeStyle>
			Top Vulnerabilities
		</NavLink>
		<NavLink to='/ProductsSection' activeStyle>
			Top Products
		</NavLink>
		<NavLink to='/VendorsSection' activeStyle>
			Top Vendors
		</NavLink>
		</NavMenu>	
	</NavTop>
	</>
);
};

export default NavbarTop;
