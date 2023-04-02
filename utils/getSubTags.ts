export const getSubTags = (englishTag: string) => {
  let subTags: string[];

  switch (englishTag) {
    case "Chinese":
      subTags = [
        "Mandopop",
        "C-pop",
        "Chinese Rock",
        "Chinese Folk",
        "Chinese Hip-Hop",
      ];
      break;
    case "Western":
      subTags = ["Pop", "Rock", "Hip-Hop", "Country", "Electronic", "Jazz"];
      break;
    case "Korean":
      subTags = [
        "K-pop",
        "Korean Rock",
        "Korean Hip-Hop",
        "Korean R&B",
        "Korean Folk",
      ];
      break;
    case "Japanese":
      subTags = [
        "J-pop",
        "J-rock",
        "Japanese Hip-Hop",
        "Japanese R&B",
        "Japanese Electronic",
      ];
      break;
    case "Cantonese":
      subTags = [
        "Cantopop",
        "Cantonese Rock",
        "Cantonese Folk",
        "Cantonese Hip-Hop",
      ];
      break;
    case "Alternative/Independent":
      subTags = [
        "Alternative Rock",
        "Indie Pop",
        "Indie Rock",
        "Indie Electronic",
        "Indie Folk",
      ];
      break;
    case "R&B/Soul":
      subTags = ["Contemporary R&B", "Soul", "Funk", "Neo-Soul", "Disco"];
      break;
    case "Nostalgic":
      subTags = ["Oldies", "Classic Rock", "Retro Pop", "Vintage"];
      break;
    case "Minority languages":
      subTags = ["Tibetan", "Mongolian", "Uyghur", "Zhuang"];
      break;
    case "Study":
      subTags = ["Classical", "Ambient", "Focus", "Instrumental", "New Age"];
      break;
    case "Night":
      subTags = ["Chillout", "Lounge", "Late Night", "Downtempo", "Ambient"];
      break;
    case "Sports":
      subTags = ["Workout", "Running", "Gym", "Motivation", "Energetic"];
      break;
    case "ACG":
      subTags = ["Anime", "Comic", "Game", "Otaku", "Soundtrack"];
      break;
    case "Soundtrack":
      subTags = ["Movie", "TV Show", "Game", "Musical", "Scores"];
      break;
    case "Pop":
      subTags = ["Pop Rock", "Dance Pop", "Electropop", "Teen Pop", "Synthpop"];
      break;
    case "Sexy":
      subTags = ["Sensual", "Erotic", "Seductive", "Romantic", "Rhythmic"];
      break;
    case "Rock":
      subTags = [
        "Classic Rock",
        "Alternative Rock",
        "Hard Rock",
        "Progressive Rock",
        "Indie Rock",
      ];
      break;
    case "British":
      subTags = [
        "Britpop",
        "British Rock",
        "British Electronic",
        "British Folk",
        "British R&B",
      ];
      break;
    case "Post_Rock":
      subTags = ["Instrumental", "Experimental", "Ambient", "Minimal", "Drone"];
      break;
    case "Ancient style":
      subTags = [
        "Traditional",
        "Chinese Classical",
        "Folk",
        "Guqin",
        "Guzheng",
      ];
      break;
    case "Folk":
      subTags = [
        "Singer-Songwriter",
        "Americana",
        "Bluegrass",
        "Contemporary Folk",
        "Traditional Folk",
      ];
      break;
    case "Blues":
      subTags = [
        "Delta Blues",
        "Chicago Blues",
        "Electric Blues",
        "Acoustic Blues",
        "Blues Rock",
      ];
      break;
    case "Country":
      subTags = [
        "Contemporary Country",
        "Classic Country",
        "Alt-Country",
        "Bluegrass",
        "Country Rock",
      ];
      break;
    case "Romantic":
      subTags = ["Love Songs", "Ballads", "Sentimental", "Swoon", "Heartfelt"];
      break;
    case "Happy":
      subTags = ["Uplifting", "Energetic", "Cheerful", "Feel-Good", "Sunny"];
      break;
    case "Classic":
      subTags = [
        "Classical",
        "Baroque",
        "Romantic",
        "Contemporary",
        "Minimalism",
      ];
      break;
    case "World music":
      subTags = ["Reggae", "African", "Latin", "Celtic", "Indian"];
      break;
    case "Easy listening":
      subTags = ["Lounge", "Smooth Jazz", "Light Music", "Muzak", "Exotica"];
      break;
    case "Electronic":
      subTags = ["Electronica", "House", "Techno", "Trance", "Ambient"];
      break;
    case "Instrumental":
      subTags = ["Orchestral", "Solo", "Chamber Music", "Guitar", "Piano"];
      break;
    case "Rap":
      subTags = ["Hip-Hop", "Trap", "Old School", "Conscious", "Gangsta"];
      break;
    case "Classical":
      subTags = ["Symphony", "Concerto", "Sonata", "Chamber Music", "Opera"];
      break;
    case "Jazz":
      subTags = ["Smooth Jazz", "Bebop", "Big Band", "Swing", "Free Jazz"];
      break;
    case "Touching":
      subTags = [
        "Emotional",
        "Heartfelt",
        "Moving",
        "Poignant",
        "Soul-Stirring",
      ];
      break;
    case "Lonely":
      subTags = [
        "Melancholic",
        "Solitude",
        "Reflective",
        "Introspective",
        "Sorrowful",
      ];
      break;
    case "Relaxing":
      subTags = ["Chillout", "Ambient", "Meditation", "New Age", "Sleep"];
      break;
    case "Guitar":
      subTags = [
        "Acoustic",
        "Electric",
        "Classical",
        "Flamenco",
        "Fingerstyle",
      ];
      break;
    case "Latin":
      subTags = ["Salsa", "Tango", "Bossa Nova", "Reggaeton", "Latin Pop"];
      break;
    case "Emotional":
      subTags = [
        "Tearjerkers",
        "Heartbreaking",
        "Passionate",
        "Dramatic",
        "Deep",
      ];
      break;
    case "Healing":
      subTags = [
        "Therapeutic",
        "Calming",
        "Soothing",
        "Restorative",
        "Rejuvenating",
      ];
      break;
    case "Piano":
      subTags = ["Classical Piano", "Jazz Piano", "New Age Piano", "Pop Piano", "Solo Piano"];
      break;
    case "Peaceful":
      subTags = ["Serenity", "Tranquil", "Meditative", "Calm", "Relaxing"];
      break;
    case "Afternoon Tea":
      subTags = [
        "Lounge",
        "Light Jazz",
        "Acoustic",
        "Easy Listening",
        "Chillout",
      ];
      break;
    case "Online Songs":
      subTags = [
        "Viral Hits",
        "Internet Sensations",
        "Meme Songs",
        "Trending",
        "Online Collaborations",
      ];
      break;
    case "Traveling":
      subTags = ["Road Trip", "Wanderlust", "Adventure", "Explore", "Discover"];
      break;
    case "Strolling":
      subTags = ["Walk", "Leisure", "Mellow", "Breezy", "Outdoors"];
      break;
    case "Refreshing":
      subTags = [
        "Uplifting",
        "Energizing",
        "Revitalizing",
        "Invigorating",
        "Crisp",
      ];
      break;
    case "80s Generation":
      subTags = ["80s Pop", "80s Rock", "80s Dance", "80s Ballads", "New Wave"];
      break;
    case "Midday Break":
      subTags = ["Lunchtime", "Chill", "Relax", "Take a Break", "Unwind"];
      break;
    case "Top Chart":
      subTags = ["Billboard", "Top 40", "Hits", "Bestsellers", "Popular"];
      break;
    case "Variety Show":
      subTags = [
        "TV Soundtracks",
        "Comedy",
        "Talk Shows",
        "Interviews",
        "Sketches",
      ];
      break;
    case "Morning":
      subTags = [
        "Wake Up",
        "Early Bird",
        "Sunrise",
        "Breakfast",
        "Start Your Day",
      ];
      break;
    case "Kids":
      subTags = [
        "Children's Music",
        "Lullabies",
        "Nursery Rhymes",
        "Sing-Alongs",
        "Storytelling",
      ];
      break;
    case "Campus":
      subTags = [
        "College",
        "University",
        "High School",
        "School Life",
        "Student",
      ];
      break;
    case "Workplace":
      subTags = [
        "Office",
        "Productivity",
        "Focus",
        "Background Music",
        "Ambient",
      ];
      break;
    case "70s Generation":
      subTags = ["70s Pop", "70s Rock", "Disco", "Funk", "Soul"];
      break;
    case "90s Generation":
      subTags = [
        "90s Pop",
        "90s Rock",
        "90s R&B",
        "90s Hip-Hop",
        "Alternative",
      ];
      break;
    case "Metro":
      subTags = [
        "Subway",
        "Commuting",
        "City Life",
        "Urban",
        "Public Transport",
      ];
      break;
    case "Road Trip":
      subTags = ["Driving", "Highway", "Car Rides", "Scenic", "Travel"];
      break;
    case "Energetic":
      subTags = ["Upbeat", "Fast", "Exciting", "Pumped Up", "Adrenaline"];
      break;
    case "Pub":
      subTags = ["Bar", "Drinking", "Social", "Night Out", "Party"];
      break;
    case "Covers":
      subTags = [
        "Acoustic Covers",
        "Live Covers",
        "Remixes",
        "Reinterpretations",
        "Tributes",
      ];
      break;
    case "Ethnic":
      subTags = ["Folk", "World", "Traditional", "Indigenous", "Native"];
      break;
    case "Missing":
      subTags = ["Longing", "Yearning", "Nostalgia", "Melancholy", "Distance"];
      break;
    case "Metal":
      subTags = [
        "Heavy Metal",
        "Death Metal",
        "Black Metal",
        "Thrash Metal",
        "Power Metal",
      ];
      break;
    case "Punk":
      subTags = ["Punk Rock", "Hardcore", "Pop Punk", "Post-Punk", "Emo"];
      break;
    case "Reggae":
      subTags = ["Roots", "Dub", "Ska", "Dancehall", "Rocksteady"];
      break;
    case "Post Rock":
      subTags = [
        "Instrumental",
        "Experimental",
        "Ambient",
        "Atmospheric",
        "Progressive",
      ];
      break;
    case "Post_Rock":
      subTags = [
        "Instrumental",
        "Experimental",
        "Ambient",
        "Atmospheric",
        "Progressive",
      ];
      break;
    case "Dance":
      subTags = ["EDM", "House", "Techno", "Trance", "Electro"];
      break;
    case "Game":
      subTags = [
        "Video Game Music",
        "Chiptune",
        "Soundtracks",
        "8-bit",
        "Orchestral",
      ];
      break;
    case "Gen Z Music":
      subTags = ["TikTok Hits", "Viral", "Trending", "Meme", "Internet"];
      break;
    case "New Age":
      subTags = [
        "Meditation",
        "Ambient",
        "Celtic",
        "World Fusion",
        "Nature Sounds",
        "Space Music",
        "Healing",
      ];
      break;
    case "KTV":
      subTags = [
        "Pop Hits",
        "Classic KTV",
        "Love Songs",
        "Karaoke Duets",
        "Movie Soundtracks",
        "Show Tunes",
        "Disney Songs",
      ];
      break;
    case "Bossa Nova":
      subTags = [
        "Brazilian Jazz",
        "Samba",
        "Bossa Nova Classics",
        "Chill Bossa",
        "Instrumental Bossa",
        "Latin Jazz",
        "Bossa Nova Covers",
      ];
      break;
    default:
      subTags = [];
  }

  return subTags;
};
