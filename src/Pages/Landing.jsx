import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <>
      <div className='container-fluid  d-flex justify-content-center align-items-center bg-dark' style={{height:"87vh"}}>

          <div className='  text-center shadow border border-2 flex-column landingDiv'>
              <h1 className='text-center text-light'>Welcome To Task-Manager</h1>
              <Link to={'/dash'} className='btn btn-success px-5 mt-2' style={{fontWeight:"bold"}}>Let's Go</Link>
          </div>
      </div>

    </>
  )
}

export default Landing

