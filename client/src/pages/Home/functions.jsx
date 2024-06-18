import useAxios from '../../hooks/useAxios.jsx';
const { axios } = useAxios();

import slideshow2 from '../../assets/homeSlideshow/NINU2-350-4K.jpg';
import slideshow1 from '../../assets/homeSlideshow/DSC_0309.webp';
import slideshow3 from '../../assets/homeSlideshow/DSC_0411.webp';
import slideshow4 from '../../assets/homeSlideshow/EgeFeyzioglu_Phi (264)-4K.jpg';
import slideshow5 from '../../assets/homeSlideshow/Erin_Sigma_CheerOff (30)-4K.jpg';
import slideshow6 from '../../assets/homeSlideshow/IMG_9541.webp';
import slideshow7 from '../../assets/homeSlideshow/MithunVanniasinghe_Omega-0422-4K.jpg';
import slideshow8 from '../../assets/homeSlideshow/NatalieChan_Gamma (7)-4K.jpg';
import slideshow9 from '../../assets/homeSlideshow/ZarehMarkarian_Chi_04649-XL.jpg';
import slideshow10 from '../../assets/homeSlideshow/VedantGupta_Pi-7292-4K.jpg';

import slideshowTiny1 from '../../assets/homeSlideshow/tiny/NINU2-350-4K.jpg';
import slideshowTiny2 from '../../assets/homeSlideshow/tiny/DSC_0309.webp';
import slideshowTiny3 from '../../assets/homeSlideshow/tiny/DSC_0411.webp';
import slideshowTiny4 from '../../assets/homeSlideshow/tiny/EgeFeyzioglu_Phi (264)-4K.jpg';
import slideshowTiny5 from '../../assets/homeSlideshow/tiny/Erin_Sigma_CheerOff (30)-4K.jpg';
import slideshowTiny6 from '../../assets/homeSlideshow/tiny/IMG_9541.webp';
import slideshowTiny7 from '../../assets/homeSlideshow/tiny/MithunVanniasinghe_Omega-0422-4K.jpg';
import slideshowTiny8 from '../../assets/homeSlideshow/tiny/NatalieChan_Gamma (7)-4K.jpg';
import slideshowTiny9 from '../../assets/homeSlideshow/tiny/ZarehMarkarian_Chi_04649-XL.jpg';
import slideshowTiny10 from '../../assets/homeSlideshow/tiny/VedantGupta_Pi-7292-4K.jpg';

export async function getTimelineEvents() {
  try {
    const response = await axios.get('/timeline');
    return response.data.timelines;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function getSlideshowImages() {
  return shuffleArray([
    {
      src: slideshow1,
      placeholder: slideshowTiny1,
    },
    {
      src: slideshow2,
      placeholder: slideshowTiny2,
    },
    {
      src: slideshow3,
      placeholder: slideshowTiny3,
    },
    {
      src: slideshow4,
      placeholder: slideshowTiny4,
    },
    {
      src: slideshow5,
      placeholder: slideshowTiny5,
    },
    {
      src: slideshow6,
      placeholder: slideshowTiny6,
    },
    {
      src: slideshow7,
      placeholder: slideshowTiny7,
    },
    {
      src: slideshow8,
      placeholder: slideshowTiny8,
    },
    {
      src: slideshow9,
      placeholder: slideshowTiny9,
    },
    {
      src: slideshow10,
      placeholder: slideshowTiny10,
    },
  ]);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
