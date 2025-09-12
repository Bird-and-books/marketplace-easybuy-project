export default function SellerLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex justify-center bg-white">
      {/* children = menu/page.jsx або home-panel/page.jsx */}
      {children}
    </div>
  );
}
