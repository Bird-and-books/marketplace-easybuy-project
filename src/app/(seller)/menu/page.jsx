'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function MenuPanel() {
  const router = useRouter();
  const menuItems = [
    { name: 'Home panel', route: '/home-panel' },
    { name: 'Products' },
    { name: 'Order' },
    { name: 'Chat with customers' },
    { name: 'Reviews' },
    { name: 'Notification' },
    { name: 'Profile settings' },
    { name: 'Managers' },
    { name: 'Promotions' },
    { name: 'Technical support' },
  ];

  return (
    <div className="bg-blue-800 text-white h-screen flex flex-col justify-between w-[375px] mx-auto">
      <div>
        <div className="flex flex-col items-center py-6">
          <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-black font-bold">Nike</span>
          </div>
        </div>
        <nav className="flex flex-col gap-4 px-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => item.route && router.push(item.route)}
              className="text-left text-sm py-2 hover:underline"
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <Button variant="outline" className="w-full bg-white text-blue-800">
          Log out
        </Button>
      </div>
    </div>
  );
}
