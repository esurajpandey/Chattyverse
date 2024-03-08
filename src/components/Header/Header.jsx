import { Switch } from "@material-tailwind/react";
import React, { useState } from 'react'
import style from './Header.module.scss'
import { Typography } from '@material-tailwind/react';
import logo from '../../assets/logo.png';

function Header() {
    const [activeStatus, setActiveStatus] = useState(true);
  return (
    <header className={style.Wrapper}>
       <div className={style.Logo}>
            <div>
                <img src={logo} alt="Chattyverse" />
            </div>
            <Typography variant="h4" color='blue-gray'>ChattyVerse</Typography>
       </div>
       <div className={style.HeaderRight}>
            <div className={style.mode}>
            <Switch
                color="blue-gray"
                checked={activeStatus}
                onChange={() => setActiveStatus(!activeStatus)}
			/>
            </div>
       </div>
    </header>
  )
}

export default Header