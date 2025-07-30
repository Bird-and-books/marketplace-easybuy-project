import Link from 'next/link';

const linkGroups = [
  ['Catalogue', 'Contacts', 'Sale'],
  ['Delivery and payment', 'Guarantee', 'Product return'],
  ['Support', 'News', 'Marketplace Guide'],
];

const FooterList = () => (
  <div className="flex justify-between gap-x-[240px]">
    {linkGroups.map((group, i) => (
      <ul key={i}>
        {group.map((text) => (
          <li key={text}>
            <Link href="!#" className="text-xl font-medium text-white">
              {text}
            </Link>
          </li>
        ))}
      </ul>
    ))}
  </div>
);

export default FooterList;
