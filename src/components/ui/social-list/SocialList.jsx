import FacebookIcon from '../../icons/FacebookIcon.jsx';
import InstagramIcon from '../../icons/InstagramIcon.jsx';
import TelegramIcon from '../../icons/TelegramIcon.jsx';
import YouTubeIcon from '../../icons/YouTubeIcon.jsx';
import Link from 'next/link.js';

const SocialList = () => {
  return (
    <div className="flex justify-around items-center gap-x-17">
      <Link href="!#">
        <FacebookIcon />
      </Link>
      <Link href="!#">
        <InstagramIcon />
      </Link>
      <Link href="!#">
        <TelegramIcon />
      </Link>
      <Link href="!#">
        <YouTubeIcon />
      </Link>
    </div>
  );
};

export default SocialList;
