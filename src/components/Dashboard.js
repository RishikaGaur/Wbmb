import React from 'react'
import "./Dashboard.css"


const Dashboard = () => {
  return (
    <>
      <div className='container'>
        <div className='first child'>
          <span className='heading'>
            List
          </span>
          <button className='new'>Add</button>
        </div>
        <div className='second child'>
          <table className='lst'>
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Branch
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                </td>
                <td>
                </td>
              </tr>
            </tbody>
            
          </table>
        </div>
      </div>
    </>
  )
}

export default Dashboard
