'use client';

import Link from 'next/link';
import Logo from '@/components/logo/Logo.jsx';
import DropdownBtn from '@/components/button/dropdown-btn/DropdownBtn.jsx';
import SearchBox from '@/components/search-box/SearchBox.jsx';
import HeaderIcons from '@/components/header/header-icons/HeaderIcons.jsx';
import BurgerButton from '@/components/button/burger-btn/BurgerBtn.tsx';
import { useSelector } from 'react-redux';
import SignUp from '@/features/auth/sign-up-btn/SignUp';

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <header className="header">
      <nav className="header-inner container">
        {/* MOBILE: один ряд */}
        <div className="flex items-center justify-between gap-3 lg:hidden h-[112px]">
          <BurgerButton />
          <Logo />
          <div className="flex-1 min-w-0">
            <SearchBox />
          </div>
          <HeaderIcons />
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:flex items-center justify-between h-[112px]">
          <div className="flex items-center gap-6">
            <Logo />
            <DropdownBtn />
            <Link className="btnHeader text-[32px]" href="/sale">
              Sale
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <SearchBox />
            <HeaderIcons />

            {isLoggedIn ? (
              <Link href="/profile">
                <p className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-xl">
                  P
                </p>
              </Link>
            ) : (
              <SignUp />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
