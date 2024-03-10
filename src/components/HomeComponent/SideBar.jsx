import React from 'react'
import style from './Style.module.scss';
import { useAppContext } from '../../context/AppContext';
import file from '../../assets/logo.png';

function SideBar({users}) {
    const {darkMode} = useAppContext();
  return (
    <div className={darkMode? style.DarkContainer : style.LightContainer}>
        {users && users.map((user,index)=>{
            return <div key={index} className={style.ListItem}>
                <div className={style.Profile}>
                    <img src={file} alt={user} />
                </div>
                <span>{user}</span>
            </div> 
        })}
    </div>
  )
}

export default SideBar