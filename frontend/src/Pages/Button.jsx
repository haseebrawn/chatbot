import React from 'react'
const Button = ({clickHandler, stylingClass , title}) => {
  return (
    <div>
     <button onClick={clickHandler} className={stylingClass}>{title}</button>
    </div>
  )
}

export default Button
