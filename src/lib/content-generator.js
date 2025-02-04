// Movie/Show image collection by type
const contentImagesByType = {
  'sci-fi': [
    'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500',  // Sci-fi space theme
    'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=500',     // Futuristic
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500'   // Space/Tech
  ],
  'superhero': [
    'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500',  // Superhero silhouette
    'https://images.unsplash.com/photo-1568607689150-17e625c1d296?w=500',  // City skyline
    'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=500'   // Action pose
  ],
  'fantasy': [
    'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500',  // Fantasy castle
    'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=500',     // Magical forest
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500'   // Medieval setting
  ],
  'drama': [
    'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500',  // Dramatic lighting
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',  // Moody scene
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500'   // Emotional moment
  ],
  'comedy': [
    'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=500',  // Stage mic
    'https://images.unsplash.com/photo-1543584756-8f40a802e14f?w=500',     // Fun colorful
    'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=500'   // Light mood
  ],
  'horror': [
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500',  // Dark corridor
    'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?w=500',  // Spooky house
    'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=500'   // Eerie scene
  ],
  'animation': [
    'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500',  // Colorful abstract
    'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=500',  // Animation style
    'https://images.unsplash.com/photo-1569701813229-33284b643e3c?w=500'   // Vibrant colors
  ],
  'anime': [
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500',  // Anime aesthetic
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500',  // Japanese culture
    'https://images.unsplash.com/photo-1565473292042-31b72031cbb3?w=500'   // Manga style
  ],
  'crime': [
    'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=500',  // Dark city
    'https://images.unsplash.com/photo-1453873531674-2151bcd01707?w=500',  // Police lights
    'https://images.unsplash.com/photo-1556566229-5e8c8a4e4e04?w=500'      // Mystery scene
  ],
  'western': [
    'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=500',  // Desert landscape
    'https://images.unsplash.com/photo-1533167649158-6d508895b680?w=500',  // Ranch
    'https://images.unsplash.com/photo-1581022295087-35e593704911?w=500'   // Western setting
  ]
};

// Content type mapping
const contentTypeMap = {
  'Stranger Things': 'horror',
  'Wednesday': 'horror',
  'Squid Game': 'drama',
  'The Crown': 'drama',
  'Black Mirror': 'sci-fi',
  'The Mandalorian': 'sci-fi',
  'Loki': 'superhero',
  'Ms. Marvel': 'superhero',
  'Andor': 'sci-fi',
  'Encanto': 'animation',
  'The Boys': 'superhero',
  'The Wheel of Time': 'fantasy',
  'Fleabag': 'comedy',
  'The Marvelous Mrs. Maisel': 'comedy',
  'Reacher': 'crime',
  'House of the Dragon': 'fantasy',
  'Succession': 'drama',
  'The Last of Us': 'horror',
  'True Detective': 'crime',
  'The White Lotus': 'drama',
  'Ted Lasso': 'comedy',
  'Severance': 'sci-fi',
  'The Morning Show': 'drama',
  'Foundation': 'sci-fi',
  'Slow Horses': 'crime',
  'The Handmaid\'s Tale': 'drama',
  'Only Murders in the Building': 'comedy',
  'The Bear': 'drama',
  'The Great': 'drama',
  'Reservation Dogs': 'comedy',
  'Star Trek: Strange New Worlds': 'sci-fi',
  '1883': 'western',
  'Yellowstone': 'western',
  'Tulsa King': 'crime',
  'Evil': 'horror',
  'Demon Slayer': 'anime',
  'Attack on Titan': 'anime',
  'Jujutsu Kaisen': 'anime',
  'My Hero Academia': 'anime',
  'Spy x Family': 'anime'
};

// Content organized by service
const serviceContent = {
  netflix: [
    {
      title: 'Stranger Things',
      description: 'Sci-fi horror series',
      synopsis: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
      year: 2016,
      rating: 'TV-14',
      duration: '50m'
    },
    {
      title: 'Wednesday',
      description: 'Comedy horror',
      synopsis: 'Wednesday Addams attends Nevermore Academy, where she attempts to master her psychic ability, solve a murder mystery, and make new friends.',
      year: 2022,
      rating: 'TV-14',
      duration: '45m'
    },
    {
      title: 'Squid Game',
      description: 'Drama thriller',
      synopsis: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games for a tempting prize, but the stakes are deadly.',
      year: 2021,
      rating: 'TV-MA',
      duration: '55m'
    },
    {
      title: 'The Crown',
      description: 'Historical drama',
      synopsis: 'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
      year: 2016,
      rating: 'TV-MA',
      duration: '58m'
    },
    {
      title: 'Black Mirror',
      description: 'Sci-fi anthology',
      synopsis: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.',
      year: 2011,
      rating: 'TV-MA',
      duration: '60m'
    }
  ],
  'disney-plus': [
    {
      title: 'The Mandalorian',
      description: 'Star Wars series',
      synopsis: 'A lone bounty hunter makes his way through the outer reaches of the galaxy, far from the authority of the New Republic.',
      year: 2019,
      rating: 'TV-14',
      duration: '45m'
    },
    {
      title: 'Loki',
      description: 'Marvel series',
      synopsis: 'The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers: Endgame.',
      year: 2021,
      rating: 'TV-14',
      duration: '50m'
    },
    {
      title: 'Ms. Marvel',
      description: 'Marvel series',
      synopsis: 'A great student, avid gamer, and voracious fan-fic scribe, Kamala Khan has a special affinity for superheroes, particularly Captain Marvel.',
      year: 2022,
      rating: 'TV-14',
      duration: '45m'
    },
    {
      title: 'Andor',
      description: 'Star Wars series',
      synopsis: 'The tale of the burgeoning rebellion against the Empire and how people and planets became involved.',
      year: 2022,
      rating: 'TV-14',
      duration: '45m'
    },
    {
      title: 'Encanto',
      description: 'Animated musical',
      synopsis: 'A Colombian teenage girl has to face the frustration of being the only member of her family without magical powers.',
      year: 2021,
      rating: 'PG',
      duration: '1h 49m'
    }
  ],
  'prime-video': [
    {
      title: 'The Boys',
      description: 'Superhero drama',
      synopsis: 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.',
      year: 2019,
      rating: 'TV-MA',
      duration: '60m'
    },
    {
      title: 'The Wheel of Time',
      description: 'Fantasy series',
      synopsis: 'Set in a high fantasy world where magic exists but only certain women are allowed to access it.',
      year: 2021,
      rating: 'TV-14',
      duration: '60m'
    },
    {
      title: 'Fleabag',
      description: 'Comedy drama',
      synopsis: 'A dry-witted woman, known only as Fleabag, has no filter as she navigates life and love in London.',
      year: 2016,
      rating: 'TV-MA',
      duration: '30m'
    },
    {
      title: 'The Marvelous Mrs. Maisel',
      description: 'Comedy drama',
      synopsis: 'A housewife in 1958 decides to become a stand-up comic.',
      year: 2017,
      rating: 'TV-MA',
      duration: '57m'
    },
    {
      title: 'Reacher',
      description: 'Action thriller',
      synopsis: 'Jack Reacher, a veteran military police investigator, enters civilian life with a desire to explore the U.S.',
      year: 2022,
      rating: 'TV-MA',
      duration: '49m'
    }
  ],
  'hbo-max': [
    {
      title: 'House of the Dragon',
      description: 'Fantasy drama',
      synopsis: 'The story of the House Targaryen set 200 years before the events of Game of Thrones.',
      year: 2022,
      rating: 'TV-MA',
      duration: '60m'
    },
    {
      title: 'Succession',
      description: 'Drama series',
      synopsis: 'The Roy family is known for controlling the biggest media and entertainment company in the world.',
      year: 2018,
      rating: 'TV-MA',
      duration: '60m'
    },
    {
      title: 'The Last of Us',
      description: 'Drama series',
      synopsis: 'In a post-apocalyptic world, a smuggler is tasked with escorting a teenage girl across the United States.',
      year: 2023,
      rating: 'TV-MA',
      duration: '60m'
    },
    {
      title: 'True Detective',
      description: 'Crime drama',
      synopsis: 'Seasonal anthology series in which police investigations unearth the personal and professional secrets of those involved.',
      year: 2014,
      rating: 'TV-MA',
      duration: '55m'
    },
    {
      title: 'The White Lotus',
      description: 'Social satire',
      synopsis: 'The guests and employees of a tropical resort deal with various personal issues over the course of a week.',
      year: 2021,
      rating: 'TV-MA',
      duration: '60m'
    }
  ],
  'apple-tv': [
    {
      title: 'Ted Lasso',
      description: 'Comedy series',
      synopsis: 'American football coach Ted Lasso heads to London to manage a struggling soccer team.',
      year: 2020,
      rating: 'TV-MA',
      duration: '30m'
    },
    {
      title: 'Severance',
      description: 'Sci-fi thriller',
      synopsis: 'Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives.',
      year: 2022,
      rating: 'TV-MA',
      duration: '55m'
    },
    {
      title: 'The Morning Show',
      description: 'Drama series',
      synopsis: 'An inside look at the lives of the people who help America wake up in the morning.',
      year: 2019,
      rating: 'TV-MA',
      duration: '60m'
    },
    {
      title: 'Foundation',
      description: 'Sci-fi drama',
      synopsis: 'A band of exiles embark on a monumental journey to save humanity and rebuild civilization.',
      year: 2021,
      rating: 'TV-14',
      duration: '60m'
    },
    {
      title: 'Slow Horses',
      description: 'Spy thriller',
      synopsis: 'Follows a team of British intelligence agents who serve as a dumping ground department of MI5.',
      year: 2022,
      rating: 'TV-MA',
      duration: '45m'
    }
  ],
  'hulu': [
    {
      title: 'The Handmaid\'s Tale',
      description: 'Drama series',
      synopsis: 'Set in a dystopian future, a woman is forced to live as a concubine under a fundamentalist theocratic dictatorship.',
      year: 2017,
      rating: 'TV-MA',
      duration: '50m'
    },
    {
      title: 'Only Murders in the Building',
      description: 'Comedy mystery',
      synopsis: 'Three strangers who share an obsession with true crime suddenly find themselves wrapped up in one.',
      year: 2021,
      rating: 'TV-MA',
      duration: '30m'
    },
    {
      title: 'The Bear',
      description: 'Drama series',
      synopsis: 'A young chef from the fine dining world returns to Chicago to run his family\'s sandwich shop.',
      year: 2022,
      rating: 'TV-MA',
      duration: '30m'
    },
    {
      title: 'The Great',
      description: 'Historical comedy',
      synopsis: 'A royal woman living in rural Russia during the 18th century is forced to choose between her own personal happiness and the future of Russia.',
      year: 2020,
      rating: 'TV-MA',
      duration: '45m'
    },
    {
      title: 'Reservation Dogs',
      description: 'Comedy drama',
      synopsis: 'Four Indigenous teenagers in rural Oklahoma steal, rob and save to get to the exotic, mysterious and faraway land of California.',
      year: 2021,
      rating: 'TV-MA',
      duration: '30m'
    }
  ],
  'paramount-plus': [
    {
      title: 'Star Trek: Strange New Worlds',
      description: 'Sci-fi series',
      synopsis: 'Follow Captain Pike and the crew of the USS Enterprise years before Captain Kirk\'s mission.',
      year: 2022,
      rating: 'TV-14',
      duration: '50m'
    },
    {
      title: '1883',
      description: 'Western drama',
      synopsis: 'Follow the Dutton family as they embark on a journey west through the Great Plains.',
      year: 2021,
      rating: 'TV-MA',
      duration: '60m'
    },
    {
      title: 'Yellowstone',
      description: 'Drama series',
      synopsis: 'A ranching family in Montana faces off against others encroaching on their land.',
      year: 2018,
      rating: 'TV-MA',
      duration: '60m'
    },
    {
      title: 'Tulsa King',
      description: 'Crime drama',
      synopsis: 'A mafia capo is released from prison after 25 years and is exiled by his boss to set up shop in Tulsa, Oklahoma.',
      year: 2022,
      rating: 'TV-MA',
      duration: '60m'
    },
    {
      title: 'Evil',
      description: 'Supernatural drama',
      synopsis: 'A skeptical forensic psychologist joins a priest-in-training and a contractor to investigate supposed miracles, demonic possessions, and other extraordinary occurrences.',
      year: 2019,
      rating: 'TV-14',
      duration: '45m'
    }
  ],
  'crunchyroll': [
    {
      title: 'Demon Slayer',
      description: 'Anime series',
      synopsis: 'A young man fights demons to save his sister and avenge his family.',
      year: 2019,
      rating: 'TV-14',
      duration: '25m'
    },
    {
      title: 'Attack on Titan',
      description: 'Anime series',
      synopsis: 'Humanity lives inside cities surrounded by walls due to the Titans, gigantic humanoid creatures who devour humans.',
      year: 2013,
      rating: 'TV-MA',
      duration: '25m'
    },
    {
      title: 'Jujutsu Kaisen',
      description: 'Anime series',
      synopsis: 'A high school student joins a secret organization to fight cursed creatures.',
      year: 2020,
      rating: 'TV-14',
      duration: '25m'
    },
    {
      title: 'My Hero Academia',
      description: 'Anime series',
      synopsis: 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy and learn what it really means to be a hero.',
      year: 2016,
      rating: 'TV-14',
      duration: '25m'
    },
    {
      title: 'Spy x Family',
      description: 'Anime series',
      synopsis: 'A spy on an undercover mission gets married and adopts a child as part of his cover story, but discovers his new wife and daughter have secrets of their own.',
      year: 2022,
      rating: 'TV-14',
      duration: '25m'
    }
  ]
};

// Used to track which content has been used
const usedContent = new Set();
const usedImagesByType = {};

export function resetContentTracking() {
  usedContent.clear();
  Object.keys(contentImagesByType).forEach(type => {
    usedImagesByType[type] = new Set();
  });
}

function getMatchingImage(contentTitle) {
  const contentType = contentTypeMap[contentTitle];
  const images = contentImagesByType[contentType];
  const availableImages = images.filter(img => !usedImagesByType[contentType]?.has(img));
  
  if (availableImages.length === 0) {
    // Reset tracking for this type if all images are used
    usedImagesByType[contentType] = new Set();
    return images[0];
  }
  
  const image = availableImages[Math.floor(Math.random() * availableImages.length)];
  usedImagesByType[contentType] = usedImagesByType[contentType] || new Set();
  usedImagesByType[contentType].add(image);
  return image;
}

export function generateUniqueContent(count = 5, serviceId = null) {
  const availableContent = serviceId 
    ? serviceContent[serviceId].filter(c => !usedContent.has(c.title))
    : Object.values(serviceContent).flat().filter(c => !usedContent.has(c.title));
  
  const result = [];
  
  for (let i = 0; i < Math.min(count, availableContent.length); i++) {
    const contentIndex = Math.floor(Math.random() * availableContent.length);
    const content = availableContent[contentIndex];
    
    result.push({
      ...content,
      image: getMatchingImage(content.title)
    });
    
    usedContent.add(content.title);
    availableContent.splice(contentIndex, 1);
  }
  
  return result;
}

export function generateContentRows(serviceId = null) {
  return [
    {
      title: 'Trending Now',
      items: generateUniqueContent(5, serviceId)
    },
    {
      title: 'New Releases',
      items: generateUniqueContent(5, serviceId)
    },
    {
      title: 'Popular Shows',
      items: generateUniqueContent(5, serviceId)
    },
    {
      title: 'Must Watch',
      items: generateUniqueContent(5, serviceId)
    }
  ];
} 