import { ActivityEvent } from '../types';

export const SAMPLE_ACTIVITIES: ActivityEvent[] = [
  {
    id: 'act-1',
    title: 'Annual Sports Day 2026',
    category: 'Sports',
    date: 'March 15, 2026',
    location: 'Main School Athletics Ground',
    participantCount: '450+ Students',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200',
    shortDescription: 'Grand inter-house sports meet featuring track & field events, cricket & football finals, relay races, and the trophy distribution.',
    gallery: [
      {
        id: 'sp-1',
        url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000',
        title: '100m Athletics Sprint',
        category: 'Track Events',
        caption: 'Students competing in the senior boys 100m sprint finals.'
      },
      {
        id: 'sp-2',
        url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1000',
        title: 'Inter-House Cricket Match',
        category: 'Team Sports',
        caption: 'Eagle House batsman scoring the winning boundary during the final overs.'
      },
      {
        id: 'sp-3',
        url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000',
        title: 'Football Championship Final',
        category: 'Team Sports',
        caption: 'High-energy football championship match between Falcon and Panther House.'
      },
      {
        id: 'sp-4',
        url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=1000',
        title: 'Prize & Trophy Distribution',
        category: 'Awards',
        caption: 'School Principal presenting the Overall Champion Trophy to the winning House Captain.'
      },
      {
        id: 'sp-5',
        url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=1000',
        title: 'Students Cheering & Playing',
        category: 'Highlights',
        caption: 'Junior house members cheering enthusiastically from the pavilion stands.'
      },
      {
        id: 'sp-6',
        url: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&q=80&w=1000',
        title: '4x100m Relay Race Baton Pass',
        category: 'Track Events',
        caption: 'Perfect baton exchange during the thrilling 4x100m inter-house relay.'
      },
      {
        id: 'sp-7',
        url: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&q=80&w=1000',
        title: 'High Jump Competition',
        category: 'Field Events',
        caption: 'Junior girls record-breaking clearance in the high jump event.'
      },
      {
        id: 'sp-8',
        url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1000',
        title: 'March Past Parade & Salute',
        category: 'Ceremony',
        caption: 'Student Council leading the disciplined March Past salute before the Chief Guest.'
      },
      {
        id: 'sp-9',
        url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000',
        title: 'Tug of War Showdown',
        category: 'Team Sports',
        caption: 'Intense inter-house Tug of War contest bringing immense crowd excitement.'
      },
      {
        id: 'sp-10',
        url: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=1000',
        title: 'Gold Medal Ceremony',
        category: 'Awards',
        caption: 'Athletes wearing their hard-earned gold, silver, and bronze medals on the podium.'
      },
      {
        id: 'sp-11',
        url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000',
        title: 'Fitness & Aerobics Display',
        category: 'Ceremony',
        caption: 'Grade 7 & 8 mass gymnastics and rhythmic calisthenics formation.'
      },
      {
        id: 'sp-12',
        url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1000',
        title: 'Faculty vs Student Match',
        category: 'Friendly Matches',
        caption: 'Fun exhibition volleyball match played between teachers and graduating seniors.'
      }
    ]
  },
  {
    id: 'act-2',
    title: 'InnovateX Science Exhibition 2026',
    category: 'Academic',
    date: 'April 22, 2026',
    location: 'Science Auditorium & STEM Labs',
    participantCount: '320+ Participants',
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200',
    shortDescription: 'Interactive STEM showcase presenting student innovations, AI robotics, clean energy prototypes, and live chemistry experiments.',
    gallery: [
      {
        id: 'sc-1',
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000',
        title: 'Interactive Chemistry Experiments',
        category: 'Chemistry',
        caption: 'Students demonstrating chemical reaction indicators and liquid nitrogen displays.'
      },
      {
        id: 'sc-2',
        url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000',
        title: 'Robotics & AI Prototypes',
        category: 'Robotics',
        caption: 'Grade 10 robotics team displaying an autonomous line-following and obstacle-avoiding rover.'
      },
      {
        id: 'sc-3',
        url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000',
        title: 'Student Project Presentations',
        category: 'Presentations',
        caption: 'Students explaining quantum physics models and electromagnetic suspension to visiting parents.'
      },
      {
        id: 'sc-4',
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000',
        title: 'Exhibition Hall Overview',
        category: 'Exhibition Floor',
        caption: 'Busy main hall crowded with parents, judges, and visiting schools evaluating student stalls.'
      },
      {
        id: 'sc-5',
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
        title: 'Solar Energy & Smart Grid Model',
        category: 'Clean Energy',
        caption: 'Working model of a zero-emission green campus powered by mini solar panel arrays.'
      },
      {
        id: 'sc-6',
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000',
        title: 'Circuit & Microcontroller Setup',
        category: 'Electronics',
        caption: 'IoT automated plant watering system controlled via Arduino and mobile app.'
      },
      {
        id: 'sc-7',
        url: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=1000',
        title: 'Physics Wave & Laser Lab',
        category: 'Physics',
        caption: 'Refraction and fiber optic light guide experiments set up in darkroom stalls.'
      },
      {
        id: 'sc-8',
        url: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=1000',
        title: 'Young Innovators Award Ceremony',
        category: 'Awards',
        caption: 'Chief guest presenting the Best Innovation Trophy to the renewable water purification project.'
      },
      {
        id: 'sc-9',
        url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000',
        title: 'Microbiology & Microscopy Station',
        category: 'Biology',
        caption: 'Students demonstrating cell structures and plant tissue slides under optical microscopes.'
      },
      {
        id: 'sc-10',
        url: 'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&q=80&w=1000',
        title: 'Astronomy & Telescope Corner',
        category: 'Astronomy',
        caption: 'Model solar system simulation and refractor telescope demonstration by the Astronomy Club.'
      }
    ]
  },
  {
    id: 'act-3',
    title: 'Grand Annual Function 2026',
    category: 'Cultural',
    date: 'May 10, 2026',
    location: 'Open Air Grand Theater',
    participantCount: '600+ Performers',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
    shortDescription: 'A memorable evening of classical & fusion dance, theatrical drama, choir music, orchestra performances, and academic accolades.',
    gallery: [
      {
        id: 'af-1',
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000',
        title: 'Grand Stage Lighting & Opening',
        category: 'Stage',
        caption: 'Spectacular light show signaling the commencement of the Annual Function.'
      },
      {
        id: 'af-2',
        url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1000',
        title: 'Classical & Folk Dance Troupe',
        category: 'Dance',
        caption: 'Junior section students performing a colorful traditional folk dance sequence.'
      },
      {
        id: 'af-3',
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000',
        title: 'School Choir Singing Ensemble',
        category: 'Music',
        caption: 'Over 80 students performing harmonious choral arrangements accompanied by piano.'
      },
      {
        id: 'af-4',
        url: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&q=80&w=1000',
        title: 'Theatrical Drama & Play',
        category: 'Drama',
        caption: 'Senior drama club delivering a powerful stage play on environmental conservation.'
      },
      {
        id: 'af-5',
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000',
        title: 'Auditorium & Audience View',
        category: 'Audience',
        caption: 'Packed open-air theater with over 1,500 parents and dignitaries in attendance.'
      },
      {
        id: 'af-6',
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000',
        title: 'Symphony Orchestra Performance',
        category: 'Music',
        caption: 'School instrumental orchestra playing classical symphonies with violins and flutes.'
      },
      {
        id: 'af-7',
        url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000',
        title: 'Grand Finale Musical Act',
        category: 'Finale',
        caption: 'All performers uniting on stage for the energetic musical grand finale.'
      },
      {
        id: 'af-8',
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000',
        title: 'Annual Award Ceremony',
        category: 'Awards',
        caption: 'Valedictorian receiving the Gold Medal for Outstanding Academic & Extra-Curricular Performance.'
      },
      {
        id: 'af-9',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000',
        title: 'Contemporary Modern Fusion Dance',
        category: 'Dance',
        caption: 'Senior girls dance team executing a synchronization performance under spotlight.'
      },
      {
        id: 'af-10',
        url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=1000',
        title: 'Chief Guest Address',
        category: 'Dignitaries',
        caption: 'Honored Chief Guest sharing inspiring words of wisdom with the graduating batch.'
      }
    ]
  },
  {
    id: 'act-4',
    title: 'Independence Day Celebration',
    category: 'Celebration',
    date: 'August 14, 2025',
    location: 'Central Campus Quadrangle',
    participantCount: '800+ Students & Faculty',
    coverImage: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=1200',
    shortDescription: 'Patriotic flag hoisting ceremony, national anthem recital, parade salute, student speeches, and cultural tableau.',
    gallery: [
      {
        id: 'id-1',
        url: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=1000',
        title: 'Flag Hoisting Ceremony',
        category: 'Ceremony',
        caption: 'Principal and Student Council Unfurling the National Flag during sunrise.'
      },
      {
        id: 'id-2',
        url: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&q=80&w=1000',
        title: 'National Anthem Recital',
        category: 'Patriotic',
        caption: 'Entire school standing in crisp attention during the solemn National Anthem.'
      },
      {
        id: 'id-3',
        url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000',
        title: 'March Past & Guard of Honour',
        category: 'Parade',
        caption: 'Scouts, Guides, and Student Cabinet marching past the main dais in precision alignment.'
      },
      {
        id: 'id-4',
        url: 'https://images.unsplash.com/photo-1526976668916-ece7e471bd63?auto=format&fit=crop&q=80&w=1000',
        title: 'Campus Tricolor Decorations',
        category: 'Decorations',
        caption: 'Campus corridors and quadrangle adorned with festive tricolor ribbons and flowers.'
      },
      {
        id: 'id-5',
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
        title: 'Patriotic Song & Cultural Act',
        category: 'Performances',
        caption: 'Primary section choir singing national tribute songs in traditional attire.'
      },
      {
        id: 'id-6',
        url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1000',
        title: 'Speech & Declamation Contest',
        category: 'Competitions',
        caption: 'Student speakers addressing freedom struggle history and modern nation building.'
      },
      {
        id: 'id-7',
        url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1000',
        title: 'Student Assembly & Parade',
        category: 'Assembly',
        caption: 'Panoramic view of the main quadrangle filled with disciplined student contingents.'
      },
      {
        id: 'id-8',
        url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=1000',
        title: 'Marching Drum Band Drill',
        category: 'Band',
        caption: 'School brass band sounding drums and bugles during the ceremonial salute.'
      },
      {
        id: 'id-9',
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000',
        title: 'Tricolor Balloon Release',
        category: 'Highlight',
        caption: 'Releasing green, white, and saffron balloons into the sky to mark the occasion.'
      },
      {
        id: 'id-10',
        url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=1000',
        title: 'Patriotic Tableau Display',
        category: 'Tableau',
        caption: 'Living history drama portraying freedom fighters and historical national heroes.'
      }
    ]
  },
  {
    id: 'act-5',
    title: 'Museum & Science Discovery Trip',
    category: 'Field Trip',
    date: 'November 05, 2025',
    location: 'National Museum & Planetarium',
    participantCount: '180 Students (Grades 6–9)',
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
    shortDescription: 'An immersive educational trip visiting historical museum galleries, interactive planetarium shows, and botanical research gardens.',
    gallery: [
      {
        id: 'et-1',
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000',
        title: 'Bus Journey Excitement',
        category: 'Travel',
        caption: 'Students singing and enjoying the scenic bus ride on the way to the museum.'
      },
      {
        id: 'et-2',
        url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=1000',
        title: 'Museum Historical Gallery',
        category: 'Museum',
        caption: 'Students taking notes and observing ancient artifacts and archaeological remains.'
      },
      {
        id: 'et-3',
        url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000',
        title: 'Botanical Garden Exploration',
        category: 'Nature',
        caption: 'Guided tour through exotic conservatory greenhouses learning about plant species.'
      },
      {
        id: 'et-4',
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000',
        title: 'Group Photo at Landmark',
        category: 'Memories',
        caption: 'Grade 8 section souvenir group photograph on the museum grand steps.'
      },
      {
        id: 'et-5',
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000',
        title: 'Outdoor Learning & Sketching',
        category: 'Workshops',
        caption: 'Art students sketching botanical specimens in the heritage garden courtyard.'
      },
      {
        id: 'et-6',
        url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1000',
        title: 'Nature Trail Walk',
        category: 'Nature',
        caption: 'Ecology club exploring biodiversity trails with environmental science instructors.'
      },
      {
        id: 'et-7',
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000',
        title: 'Outdoor Picnic & Lunch',
        category: 'Picnic',
        caption: 'Students relaxing together and sharing lunch packages in the shaded park.'
      },
      {
        id: 'et-8',
        url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000',
        title: 'Interactive Science Discovery Lab',
        category: 'Interactive',
        caption: 'Testing optical illusions, gear mechanics, and sound resonance exhibits.'
      },
      {
        id: 'et-9',
        url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1000',
        title: 'Planetarium Cosmic Show',
        category: 'Planetarium',
        caption: '360-degree digital dome theater show exploring galaxies, stars, and space travel.'
      },
      {
        id: 'et-10',
        url: 'https://images.unsplash.com/photo-1506869640319-fe1a24c4684a?auto=format&fit=crop&q=80&w=1000',
        title: 'Field Journal Reflection Session',
        category: 'Reflection',
        caption: 'Students filling out their educational excursion worksheets before departure.'
      }
    ]
  }
];
