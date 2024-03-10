import React from 'react'
import style from './Common.module.scss';

function CheckBox({text,styles,value,onChange}) {
  return (
    <div className={[styles,style.CheckBoxContainer].join(" ")}>
        <input type='checkbox' checked={value ? value : false} onChange={onChange}/>
        <label>{text}</label>
    </div>
  )
}

export default CheckBox