import React from 'react' 

const Start = () => {
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
          
           <h2>Login As</h2>
           <div className='d-flex justify-content-between mt-5 mb-2'>
            <button type="button">Employee</button>
            <button type="button">Admin</button>
           </div>
          
        </div>
    </div>
    )
} 

export default Start 