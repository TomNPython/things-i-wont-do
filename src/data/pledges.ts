export type PledgeLevel = {
  id: 'minimum-wage' | 'decent-salary' | 'generous-employer'
  amount: number
  name: string
  tagline: string
  description: string
  certificateTitle: string
}

export type Pledge = {
  id: string
  icon: string
  title: string
  category: string
  description: string
  news?: {
    headline: string
    publication: string
    publishedAt: string
    summary: string
    sourceUrl: string
    sourceLabel: string
    payouts: string
  }
  currency: string
  levels: PledgeLevel[]
}

export const pledges: Pledge[] = [
  {
  id: 'pollute-ocean',
  icon: '🌊',
  title: 'Destroy the ocean',
  category: 'environment',
  description:
    "I won't spill millions of gallons of oil into the sea, destroy marine ecosystems, and cause one of the world's worst environmental catastrophes.",
  news: {
    headline: 'Deepwater Horizon oil spill',
    publication: 'BBC',
    publishedAt: '20 April 2010',
    summary:
      'The Deepwater Horizon disaster began when an explosion killed 11 workers and triggered an 87-day oil spill in the Gulf of Mexico. The BP-operated well became one of the largest marine oil spills in history and caused extensive environmental and economic damage.',
    sourceUrl:
      'https://www.bbc.co.uk/news/articles/c3ek2eyzvx7o',
    sourceLabel: 'Read the BBC story',
    payouts: "In the year following the incident, Deepwater's CEO was paid..."
  },
  currency: 'gbp',
  levels: [
    {
      id: 'minimum-wage',
      amount: 1,
      name: 'MINIMUM WAGE',
      tagline: "I'll try my best.",
      description:
        "A modest salary for an employee who promises not to cause an environmental catastrophe.",
      certificateTitle: 'CERTIFICATE OF BASIC DECENCY',
    },
    {
      id: 'decent-salary',
      amount: 2,
      name: 'DECENT SALARY',
      tagline: "I'm definitely not doing it.",
      description:
        'A respectable wage for an employee who intends to leave the oceans exactly where they found them.',
      certificateTitle: 'CERTIFICATE OF SERIOUS MORAL INTENT',
    },
    {
      id: 'generous-employer',
      amount: 5,
      name: 'GENEROUS EMPLOYER',
      tagline: "I'd rather die!",
      description:
        'A generous salary for an employee who promises to keep catastrophic oil spills off their CV.',
      certificateTitle:
        'CERTIFICATE OF EXEMPLARY EMPLOYERSHIP',
    },
  ],
},
{
  id: 'private-jet',
  icon: '✈️',
  title: 'Fly by private jet',
  category: 'environment',
  description:
    "I won't fly around the world on a private jet, making regular trips that could have been done in a far less harmful way, purely for my own convenience.",
  news: {
    headline: '27 flights, 24 matches',
    publication: 'BBC',
    publishedAt: '28 June 2026',
    summary:
      "Fifa president Gianni Infantino has attended 24 matches in just over two weeks all across North America at this summer's World Cup, clocking up thousands of air miles.",
    sourceUrl:
      'https://www.bbc.co.uk/sport/football/articles/cgev5wy0zg3o',
    sourceLabel: 'Read the BBC story',
    payouts: "Gianni Infantino is estimated to have made..."
  },
  currency: 'gbp',
  levels: [
    {
      id: 'minimum-wage',
      amount: 1,
      name: 'MINIMUM WAGE',
      tagline: "I'll try my best.",
      description:
        "A modest salary for an employee who promises not to cause an environmental catastrophe.",
      certificateTitle: 'CERTIFICATE OF BASIC DECENCY',
    },
    {
      id: 'decent-salary',
      amount: 2,
      name: 'DECENT SALARY',
      tagline: "I'm definitely not doing it.",
      description:
        'A respectable wage for an employee who intends to leave the oceans exactly where they found them.',
      certificateTitle: 'CERTIFICATE OF SERIOUS MORAL INTENT',
    },
    {
      id: 'generous-employer',
      amount: 5,
      name: 'GENEROUS EMPLOYER',
      tagline: "I'd rather die!",
      description:
        'A generous salary for an employee who promises to keep catastrophic oil spills off their CV.',
      certificateTitle:
        'CERTIFICATE OF EXEMPLARY EMPLOYERSHIP',
    },
  ],
},
{
  id: 'factory-emissions',
  icon: '🏭',
  title: 'Break emissions regulations',
  category: 'environment',
  description:
    "I won't deliberately install software devices that flout globally agreed upon emissions regulations in order to sell more cars.",
  news: {
    headline: 'Volkswagen: The Diesel Dupe',
    publication: 'BBC',
    publishedAt: '10 December 2015',
    summary:
      'Many VW cars being sold in America had a "defeat device" - or software - in diesel engines that could detect when they were being tested, changing the performance accordingly to improve results.',
    sourceUrl:
      'https://www.bbc.co.uk/news/business-34324772',
    sourceLabel: 'Read the BBC story',
    payouts: "In the year following the incident, Volkswagen's CEO was paid..."
  },
  currency: 'gbp',
  levels: [
    {
      id: 'minimum-wage',
      amount: 1,
      name: 'MINIMUM WAGE',
      tagline: "I'll try my best.",
      description:
        "A modest salary for an employee who promises not to cause an environmental catastrophe.",
      certificateTitle: 'CERTIFICATE OF BASIC DECENCY',
    },
    {
      id: 'decent-salary',
      amount: 2,
      name: 'DECENT SALARY',
      tagline: "I'm definitely not doing it.",
      description:
        'A respectable wage for an employee who intends to leave the oceans exactly where they found them.',
      certificateTitle: 'CERTIFICATE OF SERIOUS MORAL INTENT',
    },
    {
      id: 'generous-employer',
      amount: 5,
      name: 'GENEROUS EMPLOYER',
      tagline: "I'd rather die!",
      description:
        'A generous salary for an employee who promises to keep catastrophic oil spills off their CV.',
      certificateTitle:
        'CERTIFICATE OF EXEMPLARY EMPLOYERSHIP',
    },
  ],
},
]