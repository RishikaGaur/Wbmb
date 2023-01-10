import React from 'react'
import "./Dashboard.css"


const Dashboard = () => {
  return (
    <>
      <div className='container'>
        <div className='first child'>
          <span className='heading'>
            Log In
          </span>
          <button className='new'>Add</button>
        </div>
        <div className='second child'>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input></input>
          </form>
        </div>
      </div>
    </>
  )
}

export default Dashboard
