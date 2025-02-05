import { generateContentRows, generateUniqueContent, resetContentTracking } from '@/lib/content-generator';

// Helper function to generate fresh content for each service
const generateServiceContent = (serviceId) => {
  resetContentTracking();
  return {
    featured_content: generateUniqueContent(2, serviceId),
    content_rows: generateContentRows(serviceId)
  };
};

export const subscriptions = [
  {
    id: 'netflix',
    name: 'Netflix',
    description: 'Stream award-winning TV shows, movies, anime, documentaries, and more',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png',
    hero_image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1000',
    background_color: 'bg-inherit',
    categories: ['Movies', 'TV Shows', 'Kids', 'Documentaries'],
    ...generateServiceContent('netflix'),
    plans: [
      {
        name: 'Basic',
        price: 9.99,
        features: ['Good video quality', '1 device at a time', 'Ad-supported'],
        popular: false
      },
      {
        name: 'Standard',
        price: 15.49,
        features: ['Great video quality', '2 devices at a time', 'Ad-free viewing'],
        popular: true
      },
      {
        name: 'Premium',
        price: 22.99,
        features: ['Best video quality', '4 devices at a time', 'Ultra HD available'],
        popular: false
      }
    ]
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    description: 'Stream exclusive Disney originals, Pixar, Marvel, Star Wars, and more',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/2560px-Disney%2B_logo.svg.png',
    hero_image: 'https://images.unsplash.com/photo-1604548530945-f33c0c298028?w=1000',
    background_color: 'bg-blue-600',
    categories: ['Disney', 'Pixar', 'Marvel', 'Star Wars', 'National Geographic'],
    ...generateServiceContent('disney-plus'),
    plans: [
      {
        name: 'Basic',
        price: 7.99,
        features: ['Ad-supported', 'HD quality', '2 devices'],
        popular: false
      },
      {
        name: 'Premium',
        price: 13.99,
        features: ['Ad-free', '4K UHD', '4 devices'],
        popular: true
      },
      {
        name: 'Bundle',
        price: 19.99,
        features: ['Disney+', 'Hulu', 'ESPN+'],
        popular: false
      }
    ]
  },
  {
    id: 'prime-video',
    name: 'Prime Video',
    description: 'Watch exclusive Amazon Originals, movies, and TV shows',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Amazon_Prime_logo_%282024%29.svg/2560px-Amazon_Prime_logo_%282024%29.svg.png',
    hero_image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=1000',
    background_color: 'bg-blue-500',
    categories: ['Movies', 'TV Shows', 'Amazon Originals', 'Kids'],
    ...generateServiceContent('prime-video'),
    plans: [
      {
        name: 'Prime Video',
        price: 8.99,
        features: ['Streaming only', 'HD quality', '3 devices'],
        popular: false
      },
      {
        name: 'Prime',
        price: 14.99,
        features: ['Prime Video', 'Free shipping', 'Prime Music'],
        popular: true
      },
      {
        name: 'Student',
        price: 7.49,
        features: ['50% off Prime', 'Student exclusive deals', '6-month trial'],
        popular: false
      }
    ]
  },
  {
    id: 'hbo-max',
    name: 'HBO Max',
    description: 'Stream blockbuster movies, epic originals, and addictive series',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/HBO_Max_Logo.svg/1000px-HBO_Max_Logo.svg.png',
    hero_image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1000',
    background_color: 'bg-purple-600',
    categories: ['HBO Originals', 'DC', 'Movies', 'Series'],
    ...generateServiceContent('hbo-max'),
    plans: [
      {
        name: 'With Ads',
        price: 9.99,
        features: ['Ad-supported', 'HD streaming', '2 devices'],
        popular: false
      },
      {
        name: 'Ad-Free',
        price: 15.99,
        features: ['No ads', '4K UHD', '3 devices'],
        popular: true
      },
      {
        name: 'Ultimate',
        price: 19.99,
        features: ['4K UHD', '100 downloads', '4 devices'],
        popular: false
      }
    ]
  },
  {
    id: 'apple-tv',
    name: 'Apple TV+',
    description: 'Original stories from the most creative minds in TV and film',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Apple_TV_Plus_Logo.svg/1024px-Apple_TV_Plus_Logo.svg.png',
    hero_image: 'https://images.unsplash.com/photo-1528928441742-b4ccac1bb04c?w=1000',
    background_color: 'bg-gray-800',
    categories: ['Apple Originals', 'Movies', 'Kids & Family', 'Documentaries'],
    ...generateServiceContent('apple-tv'),
    plans: [
      {
        name: 'Monthly',
        price: 6.99,
        features: ['Ad-free', '4K HDR', 'Family sharing'],
        popular: true
      },
      {
        name: 'Annual',
        price: 69.99,
        features: ['Save 12%', '4K HDR', 'Family sharing'],
        popular: false
      },
      {
        name: 'Apple One',
        price: 16.95,
        features: ['Apple TV+', 'Apple Music', 'Apple Arcade'],
        popular: false
      }
    ]
  },
  {
    id: 'hulu',
    name: 'Hulu',
    description: 'Watch TV shows, movies, originals, sports, and news',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Hulu_logo_%282017%29.svg/2560px-Hulu_logo_%282017%29.svg.png',
    hero_image: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=1000',
    background_color: 'bg-green-600',
    categories: ['TV Shows', 'Movies', 'Hulu Originals', 'FX'],
    ...generateServiceContent('hulu'),
    plans: [
      {
        name: 'With Ads',
        price: 7.99,
        features: ['Ad-supported', 'Full library', '2 screens'],
        popular: false
      },
      {
        name: 'No Ads',
        price: 14.99,
        features: ['Ad-free', 'Downloads', '2 screens'],
        popular: true
      },
      {
        name: 'Live TV',
        price: 69.99,
        features: ['Live TV', '75+ channels', 'Sports'],
        popular: false
      }
    ]
  },
  {
    id: 'paramount-plus',
    name: 'Paramount+',
    description: 'Stream live sports, breaking news, and a mountain of entertainment',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Paramount_Global.svg/1200px-Paramount_Global.svg.png',
    hero_image: 'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=1000',
    background_color: 'bg-blue-800',
    categories: ['Movies', 'TV Shows', 'Sports', 'News'],
    ...generateServiceContent('paramount-plus'),
    plans: [
      {
        name: 'Essential',
        price: 5.99,
        features: ['Ad-supported', 'NFL on CBS', '2 devices'],
        popular: false
      },
      {
        name: 'Premium',
        price: 11.99,
        features: ['Ad-free', 'Local CBS', '3 devices'],
        popular: true
      },
      {
        name: 'Bundle',
        price: 14.99,
        features: ['Showtime included', 'Downloads', '4K content'],
        popular: false
      }
    ]
  },
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    description: 'The ultimate anime streaming experience',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Crunchyroll.svg/2560px-Crunchyroll.svg.png',
    hero_image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=1000',
    background_color: 'bg-orange-500',
    categories: ['Anime', 'Manga', 'Drama', 'Simulcast'],
    ...generateServiceContent('crunchyroll'),
    plans: [
      {
        name: 'Fan',
        price: 7.99,
        features: ['Ad-free', 'Unlimited access', '1 device'],
        popular: false
      },
      {
        name: 'Mega Fan',
        price: 9.99,
        features: ['4 devices', 'Offline viewing', 'Fan perks'],
        popular: true
      },
      {
        name: 'Ultimate Fan',
        price: 14.99,
        features: ['6 devices', 'Exclusive merch', 'First access'],
        popular: false
      }
    ]
  }
]; 