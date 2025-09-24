'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import AppInit from '@/features/auth/AppInit';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppInit />
      {children}
    </Provider>
  );
}
