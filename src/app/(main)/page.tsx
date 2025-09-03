import Promo from '@/components/home/Promo/Promo';
import FavoriteBrands from '@/components/home/FavoriteBrands/FavoriteBrands';
import UkrainianBrands from '@/components/home/UkrainianBrands/UkrainianBrands';
// import Recommendations from "@/features/home/Recommendations/Recommendations";
import '@/styles/globals.scss';

const Home = () => {
  return (
    <div className="container">
      <Promo />
      <FavoriteBrands />
      <UkrainianBrands />
      {/*<Recommendations />*/}
    </div>
  );
};

export default Home;
