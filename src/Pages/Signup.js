import React from 'react';
import Header from '../Components/Header'
import SignupSignin from '../Components/SignupSignin';

function Signup() {
  return (
    <div>
      <Header />
      <div className='wrapper'>
        <SignupSignin />
      </div>
    </div>
  )
}

export default Signup