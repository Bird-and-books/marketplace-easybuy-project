import Link from 'next/link.js';
import CopyrightIcon from '../icons/CopyrightIcon.jsx';

const Privacy = () => {
  return (
    <div className="flex text-sm text-white font-medium gap-x-8 items-center">
      <div className="flex gap-x-2">
        <CopyrightIcon />
        <p>Easybuy.2024</p>
        <p>All rights reserved</p>
      </div>
      <div className="flex text-base gap-x-5">
        <Link href="!#">Privacy Policy</Link>
        <Link href="!#">User Agreement</Link>
      </div>
    </div>
  );
};

export default Privacy;
