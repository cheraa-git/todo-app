import React from 'react'
import './Loader.css'

export const Loader: React.FC<{width?: string, height?: string}> = ({width, height}) => {
  return <span style={{width, height}} className="loader"></span>
}
