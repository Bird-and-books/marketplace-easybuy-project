import React from 'react'

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex justify-center bg-white">
      {/* children = menu/page.jsx або home-panel/page.jsx */}
      {children}
    </div>
  );
}
