import SellItemBtn from '@/components/ui/sell-item-btn/SellItemBtn.jsx';

const FooterSeller = () => {
  return (
    <div className="text-white -mt-18">
      <h2 className="font-bold text-2xl mb-2">Start selling today!</h2>
      <p className="font-medium mb-4 max-w-[300px]">
        Join our marketplace and discover new opportunities for your business!
      </p>
      <ul className="ml-8 mb-5.5 list-disc">
        <li>Millions of buyers are waiting for your products;</li>
        <li>Increase sales and make more profit;</li>
        <li>User-friendly control panel and growth tools</li>
      </ul>
      <SellItemBtn />
    </div>
  );
};

export default FooterSeller;
