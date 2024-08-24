import Alumni from '../assets/sponsors/Alumni.jpg';
import OSPE from '../assets/sponsors/OSPE.jpg';
import PEO from '../assets/sponsors/PEO.png';
import Nani from '../assets/sponsors/Nanis.png';
import Longos from '../assets/sponsors/Longos.png';
import Troost_iLead from '../assets/sponsors/Troost_iLead.jpg';
import Panago from '../assets/sponsors/Panago.png';
// import Neo from '../assets/sponsors/Neo.jpg';
// import Coco from '../assets/sponsors/Coco.jpg';
// import UTSU from '../assets/sponsors/UTSU.jpg';
// import Mogu from '../assets/sponsors/MoguMogu.png';
export const sponsors = [
  {
    website: 'https://alumni.engineering.utoronto.ca/engineering-alumni-network/',
    image: Alumni, // the sponsor image displayed on homepage (from "./client/src/assets/sponsors")
    scale: 0.82, // can be used to display each image at a different size
    rank: 'diamond', // rank of sponsor, can be used to display border
    label: 'Diamond sponsor: Alumni Office', // the label when user hovers on image in 'View All' state
  },
  {
    website: 'https://www.peo.on.ca/',
    image: PEO,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: PEO',
  },
  {
    website: 'https://www.nanisgelato.com/',
    image: Nani,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: Nani’s Gelato',
  },
  {
    website: 'https://www.longos.com/about-us/in-the-community',
    image: Longos,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: Longos',
  },
  {
    website: 'https://ospe.on.ca/',
    image: OSPE,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: OSPE',
  },
  {
    website: 'https://ilead.engineering.utoronto.ca/',
    image: Troost_iLead,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: Troost iLead',
  },
  {
    website: 'https://www.panago.com/',
    image: Panago,
    scale: 0.82,
    rank: 'bronze',
    label: 'Bronze sponsor: Panago',
  },
  // {
  //   image: Mogu,
  //   scale: 0.82,
  //   rank: 'bronze',
  //   label: 'Bronze sponsor: Mogu',
  // },
  // {
  //   website: 'https://www.neomaterials.com/',
  //   image: Neo,
  //   scale: 0.7,
  //   rank: 'gold',
  //   label: 'Gold sponsor: Neo Performance',
  // },
  // {
  //   website: 'https://www.cocofreshtea.ca/',
  //   image: Coco,
  //   scale: 0.7,
  //   rank: 'gold',
  //   label: 'Silver sponsor: Coco',
  // },
  // {
  //   website: 'https://www.utsu.ca/',
  //   image: UTSU,
  //   scale: 0.7,
  //   rank: 'bronze',
  //   label: 'Bronze sponsor: UTSU',
  // },
];
