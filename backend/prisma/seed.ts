import { PrismaClient, LearningStatus } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
  // Create user
  const hash = await argon.hash("password");
  const user = await prisma.users.create({
    data: {
      email: 'lbj23@goat.com',
      fName: 'LeBron',
      lName: 'James',
      password: hash,
    },
  });

  // Seed Set 1: LeBron James Trivia
  const lebronSet = await prisma.sets.create({
    data: {
      userId: user.userId,
      name: 'LeBron James Trivia',
      description: '30 trivia flashcards about LeBron James\'s life and career.',
    },
  });

  const lebronTrivia = [
    { term: 'High School', definition: 'St. Vincent-St. Mary High School' },
    { term: 'NBA Draft Year', definition: '2003' },
    { term: 'Drafted By', definition: 'Cleveland Cavaliers' },
    { term: 'Draft Pick', definition: '1st overall' },
    { term: 'Rookie of the Year', definition: '2004' },
    { term: 'First NBA Championship', definition: '2012' },
    { term: 'Team for First Title', definition: 'Miami Heat' },
    { term: 'Total NBA Championships', definition: '4 (as of 2024)' },
    { term: 'Teams Played For', definition: 'Cavaliers, Heat, Lakers' },
    { term: 'Jersey Number', definition: '6 and 23' },
    { term: 'Nickname', definition: 'King James' },
    { term: 'Height', definition: '6 ft 9 in' },
    { term: 'Weight', definition: '250 lb' },
    { term: 'Birthplace', definition: 'Akron, Ohio' },
    { term: 'Date of Birth', definition: 'December 30, 1984' },
    { term: 'Olympic Gold Medals', definition: '2 (2008, 2012)' },
    { term: 'Scoring Title', definition: '2008' },
    { term: 'All-Star Appearances', definition: '20 (as of 2024)' },
    { term: 'MVP Awards', definition: '4 (2009, 2010, 2012, 2013)' },
    { term: 'Points Leader in NBA History', definition: 'Yes' },
    { term: 'Son\'s Name', definition: 'Bronny James' },
    { term: 'Foundation', definition: 'LeBron James Family Foundation' },
    { term: 'I PROMISE School', definition: 'Founded in 2018' },
    { term: 'Debut NBA Game', definition: 'October 29, 2003' },
    { term: 'First Triple-Double', definition: '2004 vs. Portland' },
    { term: 'Space Jam Sequel', definition: 'Space Jam: A New Legacy' },
    { term: 'Position', definition: 'Forward' },
    { term: 'College', definition: 'None (entered NBA from high school)' },
    { term: 'NBA Finals MVPs', definition: '4' },
    { term: 'Most Career Playoff Points', definition: 'Yes' },
  ];

  await seedSet(user.userId, lebronSet.setId, lebronTrivia);

  // Seed Set 2: World Capitals
  const capitalsSet = await prisma.sets.create({
    data: {
      userId: user.userId,
      name: 'World Capitals',
      description: 'Flashcards for capital cities around the world.',
    },
  });

  const capitals = [
    { term: 'France', definition: 'Paris' },
    { term: 'Germany', definition: 'Berlin' },
    { term: 'Italy', definition: 'Rome' },
    { term: 'Spain', definition: 'Madrid' },
    { term: 'UK', definition: 'London' },
    { term: 'USA', definition: 'Washington, D.C.' },
    { term: 'Canada', definition: 'Ottawa' },
    { term: 'Brazil', definition: 'Brasília' },
    { term: 'Argentina', definition: 'Buenos Aires' },
    { term: 'Japan', definition: 'Tokyo' },
    { term: 'China', definition: 'Beijing' },
    { term: 'India', definition: 'New Delhi' },
    { term: 'Russia', definition: 'Moscow' },
    { term: 'South Korea', definition: 'Seoul' },
    { term: 'Mexico', definition: 'Mexico City' },
    { term: 'Australia', definition: 'Canberra' },
    { term: 'Egypt', definition: 'Cairo' },
    { term: 'South Africa', definition: 'Pretoria' },
    { term: 'Nigeria', definition: 'Abuja' },
    { term: 'Kenya', definition: 'Nairobi' },
    { term: 'Turkey', definition: 'Ankara' },
    { term: 'Greece', definition: 'Athens' },
    { term: 'Netherlands', definition: 'Amsterdam' },
    { term: 'Sweden', definition: 'Stockholm' },
    { term: 'Norway', definition: 'Oslo' },
    { term: 'Denmark', definition: 'Copenhagen' },
    { term: 'Switzerland', definition: 'Bern' },
    { term: 'Poland', definition: 'Warsaw' },
    { term: 'Ukraine', definition: 'Kyiv' },
    { term: 'Vietnam', definition: 'Hanoi' },
    { term: 'Thailand', definition: 'Bangkok' },
    { term: 'Indonesia', definition: 'Jakarta' },
    { term: 'Saudi Arabia', definition: 'Riyadh' },
    { term: 'UAE', definition: 'Abu Dhabi' },
    { term: 'Pakistan', definition: 'Islamabad' },
    { term: 'Bangladesh', definition: 'Dhaka' },
    { term: 'Iraq', definition: 'Baghdad' },
    { term: 'Iran', definition: 'Tehran' },
  ];

  await seedSet(user.userId, capitalsSet.setId, capitals);

  // Seed Set 3: Computer Science Basics
  const csSet = await prisma.sets.create({
    data: {
      userId: user.userId,
      name: 'Computer Science Basics',
      description: 'Intro concepts for computer science.',
    },
  });

  const csBasics = [
    { term: 'Algorithm', definition: 'Step-by-step procedure to solve a problem.' },
    { term: 'Binary', definition: 'Base-2 number system.' },
    { term: 'Compiler', definition: 'Program that converts code to machine language.' },
    { term: 'CPU', definition: 'Central Processing Unit.' },
    { term: 'Array', definition: 'Collection of elements in contiguous memory.' },
    { term: 'Stack', definition: 'Last In First Out (LIFO) data structure.' },
    { term: 'Queue', definition: 'First In First Out (FIFO) data structure.' },
    { term: 'Recursion', definition: 'Function that calls itself.' },
    { term: 'Big O Notation', definition: 'Describes algorithm time/space complexity.' },
    { term: 'Hash Table', definition: 'Data structure that maps keys to values.' },
    { term: 'Object-Oriented Programming', definition: 'Programming using classes and objects.' },
    { term: 'Class', definition: 'Blueprint for creating objects.' },
    { term: 'Function', definition: 'Reusable block of code.' },
    { term: 'Variable', definition: 'Named storage for data.' },
    { term: 'Loop', definition: 'Used to repeat code.' },
    { term: 'If Statement', definition: 'Conditional execution of code.' },
    { term: 'Git', definition: 'Version control system.' },
    { term: 'Boolean', definition: 'Data type with true/false values.' },
    { term: 'IDE', definition: 'Integrated Development Environment.' },
    { term: 'API', definition: 'Application Programming Interface.' },
    { term: 'Framework', definition: 'Reusable software platform.' },
    { term: 'Library', definition: 'Collection of pre-written code.' },
    { term: 'Syntax', definition: 'Set of rules for code structure.' },
    { term: 'Data Structure', definition: 'Way to organize and store data.' },
    { term: 'Database', definition: 'Organized collection of data.' },
    { term: 'SQL', definition: 'Language for managing databases.' },
    { term: 'Frontend', definition: 'UI part of web development.' },
    { term: 'Backend', definition: 'Server-side of an application.' },
    { term: 'HTTP', definition: 'Protocol for data exchange over web.' },
    { term: 'DNS', definition: 'Translates domain names to IPs.' },
    { term: 'Operating System', definition: 'Software that manages hardware and software.' },
  ];

  await seedSet(user.userId, csSet.setId, csBasics);

  // Seed Set 4: Marvel Cinematic Universe
  const marvelSet = await prisma.sets.create({
    data: {
      userId: user.userId,
      name: 'Marvel Cinematic Universe',
      description: 'Facts and trivia about MCU movies and characters.',
    },
  });

  const marvel = [
    { term: 'Iron Man Release Year', definition: '2008' },
    { term: 'First Avenger', definition: 'Captain America' },
    { term: 'Infinity Stones', definition: '6 powerful gems' },
    { term: 'Thanos', definition: 'Wiped out half of life with the snap' },
    { term: 'Black Panther Country', definition: 'Wakanda' },
    { term: 'Thor\'s Hammer', definition: 'Mjolnir' },
    { term: 'Hawkeye Real Name', definition: 'Clint Barton' },
    { term: 'Natasha Romanoff', definition: 'Black Widow' },
    { term: 'Peter Parker', definition: 'Spider-Man' },
    { term: 'Vision\'s Creator', definition: 'Tony Stark & Bruce Banner' },
    { term: 'Doctor Strange\'s Power', definition: 'Mystic Arts' },
    { term: 'Guardians of the Galaxy Ship', definition: 'The Milano' },
    { term: 'Nick Fury\'s Eyepatch', definition: 'Left Eye' },
    { term: 'Avengers HQ Location', definition: 'Upstate New York' },
    { term: 'Wanda\'s Powers', definition: 'Chaos Magic' },
    { term: 'Loki\'s Weapon', definition: 'Scepter with Mind Stone' },
    { term: 'Gamora\'s Father', definition: 'Thanos' },
    { term: 'MCU Phase 1', definition: 'Ends with Avengers (2012)' },
    { term: 'Infinity War Release Year', definition: '2018' },
    { term: 'Endgame Time Travel', definition: 'Quantum Realm' },
    { term: 'Captain Marvel\'s Name', definition: 'Carol Danvers' },
    { term: 'Tony Stark AI', definition: 'JARVIS and FRIDAY' },
    { term: 'Shang-Chi Weapon', definition: 'Ten Rings' },
    { term: 'Eternals Purpose', definition: 'Fight Deviants' },
    { term: 'Multiverse Concept', definition: 'Parallel universes' },
    { term: 'Miles Morales', definition: 'Another Spider-Man' },
    { term: 'Ultron\'s Goal', definition: 'Human extinction' },
    { term: 'Wolverine\'s Metal', definition: 'Adamantium' },
    { term: 'She-Hulk Job', definition: 'Lawyer' },
    { term: 'Moon Knight Identity', definition: 'Marc Spector' },
    { term: 'MCU Start Movie', definition: 'Iron Man (2008)' },
    { term: 'MCU Studio', definition: 'Marvel Studios' },
    { term: 'Peggy Carter', definition: 'Agent and Cap\'s love interest' },
    { term: 'Hulk Real Name', definition: 'Bruce Banner' },
    { term: 'Spider-Man Actor (MCU)', definition: 'Tom Holland' },
  ];

  await seedSet(user.userId, marvelSet.setId, marvel);

  console.log('✅ Seeding complete!');
}

// Utility function to seed cards and their user relations
async function seedSet(userId: number, setId: number, flashcards: { term: string; definition: string }[]) {
  await Promise.all(
    flashcards.map(({ term, definition }) =>
      prisma.flashcard.create({
        data: {
          setId,
          term,
          definition,
        },
      })
    )
  );

  const cards = await prisma.flashcard.findMany({ where: { setId } });

  await Promise.all(
    cards.map((card) =>
      prisma.userCardInfo.create({
        data: {
          cardId: card.cardId,
          userId,
          favorite: false,
          learningStatus: LearningStatus.NOT_LEARNED,
        },
      })
    )
  );

  await prisma.userSetInfo.create({
    data: {
      setId,
      userId,
      color: '#FDB927',
      cardsLearned: 0,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
