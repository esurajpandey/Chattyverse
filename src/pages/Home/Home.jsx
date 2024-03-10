import React from 'react';
import { useAppContext } from '../../context/AppContext';
import SideBar from '../../components/HomeComponent/SideBar';

const list = [
	"Suraj Pandey",
	'Raju Kumar',
	'Mohan Kumar',
	'Surya Kumar',
	'Sanju Kumar'
]
function Home() {
	const { darkMode } = useAppContext();

	return (
		<div className={darkMode ? 'DarkWrapper' : 'LightWrapper'}>
			<SideBar users={list}/>
		</div>
	);
}

export default Home;
