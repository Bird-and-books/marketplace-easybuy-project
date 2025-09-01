export default function SellerLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen w-full flex justify-center bg-white">
          {/* children = menu/page.jsx або home-panel/page.jsx */}
          {children}
        </div>
      </body>
    </html>
  );
}
