import FooterList from '@/components/footer/footer-list/FooterList.jsx';
import FooterSeller from '@/components/footer/footer-seller/FooterSeller.jsx';
import SocialList from '@/components/social-list/SocialList.jsx';
import Privacy from '@/components/privacy/Privacy.jsx';
import LogoFooter from '@/components/footer/logo-footer/LogoFooter.jsx';

const Footer = () => {
  return (
    <footer className="bg-primary text-white hidden md:block bg-main pt-6 pb-7">
      <div className="container">
        <div className="flex justify-left mb-13">
          <LogoFooter />
        </div>
        <div className="flex justify-between ">
          <FooterList />
          <FooterSeller />
        </div>
        <div className="flex justify-between max-w-[65%] -mt-10">
          <SocialList />
          <Privacy />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
