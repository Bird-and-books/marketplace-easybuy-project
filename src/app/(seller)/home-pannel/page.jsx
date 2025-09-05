'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/seller/Card';
import { CardContent } from '@/components/seller/CardContent';

export default function HomePanel() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 h-full px-4 pb-10 w-[375px] mx-auto">
      <div className="flex items-center py-4">
        <ArrowLeft onClick={() => router.push('/seller/menu')} className="mr-2 cursor-pointer" />
        <h1 className="text-lg font-semibold">Home panel</h1>
      </div>

      <div className="mb-4 text-sm text-blue-700">General overview</div>
      <select className="mb-4 w-full rounded px-3 py-2 border text-sm">
        <option>Last 30 days</option>
      </select>

      <div className="flex flex-col gap-4">
        <Card>
          <CardContent className="p-4 text-sm">
            <p>Number of orders</p>
            <p>
              Completed: <strong>845</strong>
            </p>
            <p>
              In progress: <strong>478</strong>
            </p>
            <p>
              Cancelled: <strong>34</strong>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm">Store rating</p>
            <p className="text-xl font-bold">
              4.7<span className="text-sm">/5</span>
            </p>
            <p className="text-yellow-500 text-xl">⭐⭐⭐⭐⭑</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-sm">
            <p>Views</p>
            <p>
              Store page views: <strong>294</strong>
            </p>
            <p>
              Product views: <strong>982</strong>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-sm">
            <p>Interaction</p>
            <p>
              Items added to cart: <strong>567</strong>
            </p>
            <p>
              Orders placed: <strong>845</strong>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="mb-2">Income, UAH</p>
            <div className="h-40 bg-gray-200 rounded"></div>
            {/* Placeholder for chart */}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-sm">
            <p className="font-semibold mb-2">General information</p>
            <p>
              Period: <strong>2023 year</strong>
            </p>
            <p>
              Income amount: <strong>141,000 UAH</strong>
            </p>
            <p>
              Number of items sold: <strong>674 pcs</strong>
            </p>
            <p>
              Number of active orders: <strong>0</strong>
            </p>
            <p>
              Number of completed orders: <strong>578</strong>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
