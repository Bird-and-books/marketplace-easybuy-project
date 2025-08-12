'use client';

import { useState } from 'react';
import SignUpForm from '@/features/auth/signup-form/SignUpForm.jsx';
import SignInForm from '@/features/auth/sign-in/SignInForm.jsx';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      {isLogin ? (
        <>
          <SignInForm />
          <div className="flex gap-3 justify-end ">
            <p className="text-[#08034b]">Don't have an account?</p>
            <button className="text-[#2080c0] underline" onClick={() => setIsLogin(false)}>
              Sing up
            </button>
          </div>
        </>
      ) : (
        <>
          <SignUpForm />
          <div className="flex gap-3 justify-end ">
            <p className="text-[#08034b]">Already have an account?</p>
            <button
              className="text-[#2080c0] underline lg:cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              Log in
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Auth;
