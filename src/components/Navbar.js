import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/TopVulnerabilities' activeStyle>
			Top Affected Vendors & Products
		</NavLink>
		<NavLink to='/ThreatProliferation' activeStyle>
			Threat Proliferation
		</NavLink>
		<NavLink to='/ImpactOverTheYears' activeStyle>
			Impact Over The Years
		</NavLink>
		<NavLink to='/ThreatsChangedOverTime' activeStyle>
			How Threats Have Changed Over Time
		</NavLink>
		<NavLink to='/Clustering' activeStyle>
			Clustering
		</NavLink>
		
		</NavMenu>
		
	</Nav>
	</>
);
};

export default Navbar;
