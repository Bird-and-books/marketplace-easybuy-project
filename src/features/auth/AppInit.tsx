'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAccessToken } from '@/store/auth/slice';
import { refreshUser } from '@/store/auth/operations';

const AppInit = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedAccessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${storedAccessToken}`;
      dispatch(setAccessToken(storedAccessToken));
    } else if (storedRefreshToken) {
      dispatch(refreshUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  }, [accessToken]);

  return null;
};

export default AppInit;
