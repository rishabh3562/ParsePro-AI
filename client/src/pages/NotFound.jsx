import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div>
      Page not found 

      go back to main page:
      <div>

      <Link to='/'>Home</Link>
      </div>
    </div>
  )
}

export default NotFound
