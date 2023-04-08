import React from 'react'
//
import styles from '../countdown.module.css';


const Box = ({ count, label }) => {
  return (
    <div className={styles.box} >
      <h1> {count} </h1>
      <h4> {label} </h4>  
    </div>
  )
}

export default Box