import { Switch } from '@material-tailwind/react';
import React, { useState } from 'react';
import style from './Header.module.scss';
import { Typography } from '@material-tailwind/react';
import logo from '../../assets/rocket.svg';
import { useAppContext } from '../../context/AppContext';

function Header() {
	const { darkMode, handleDarkMode } = useAppContext();
	return (
		<header className={darkMode ? style.DarkWrapper : style?.LightWrapper}>
			<div className={style.Logo}>
				{/* <div>
					<img src={logo} alt="Chattyverse" />
				</div> */}
				<Typography variant="h4" color={darkMode ? 'pink' : 'blue-gray'}>
					ChattyVerse
				</Typography>
			</div>
			<div className={style.HeaderRight}>
				<div className={style.mode}>
					<span>{darkMode ? 'Dark' : 'Light'}</span>
					<Switch
						color="blue-gray"
						checked={darkMode}
						onChange={handleDarkMode}
					/>
				</div>
			</div>
		</header>
	);
}

export default Header;
