import React from 'react'
import './InvalidMessageHandler.module.css'

interface props {
  message: string
}

export default function InvalidMessageHandler({ message }: props) {
  return (
    <div className="invalid-message">
      <em>{message}</em>
    </div>
  )
}
