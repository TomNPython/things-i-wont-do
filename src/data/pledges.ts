export type NewsStory = {
  headline: string
  publication: string
  publishedAt: string
  summary: string
  sourceUrl: string
  sourceLabel: string
}

export type Pledge = {
  id: string
  icon: string
  title: string
  amount: number
  currency: 'gbp'
  description: string
  category: 'environment' | 'society' | 'workplace' | 'general'
  news?: NewsStory
}

export const pledges: Pledge[] = [
  {
    id: 'pollute-ocean',
    icon: '🌊',
    title: 'Pollute the ocean',
    amount: 5,
    category: 'environment',
    description:
      "I will not casually turn the world's oceans into a convenient place to put things I don't want anymore.",
    news: {
      headline: 'Millions of plastic pellets wash up on the North East coast',
      publication: 'BBC News',
      publishedAt: '14 August 2026',
      summary:
        'Millions of plastic pellets, known as nurdles, washed onto beaches in north-east England after a collision at the Port of Tyne. Environmental groups warned that tides could spread the pollution further.',
      sourceUrl:
        'https://www.bbc.co.uk/news/articles/c3ek2eyzvx7o',
      sourceLabel: 'Read the BBC story',
    },
    currency: 'gbp',
  },

  {
    id: 'private-jet',
    icon: '✈️',
    title: 'Fly around in a private jet',
    amount: 2,
    category: 'environment',
    description:
      'I will not require an aircraft the size of a small house to transport myself somewhere I could have travelled normally.',
    news: {
      headline: 'How FIFA president Gianni Infantino is jetting around',
      publication: 'BBC Sport / BBC Verify',
      publishedAt: '2026',
      summary:
        'BBC Sport and BBC Verify tracked a private jet linked to FIFA president Gianni Infantino during the 2026 World Cup and identified 27 flights during the group stage, with an estimated climate impact of around 516 tonnes of CO₂e.',
      sourceUrl:
        'https://www.bbc.co.uk/sport/football/articles/cgev5wy0zg3o',
      sourceLabel: 'Read the BBC investigation',
    },
    currency: 'gbp',
  },

  {
    id: 'dog-poo',
    icon: '🐕',
    title: "Leave my dog's poo outside your house",
    amount: 1,
    category: 'society',
    description:
      "I will pick it up. This should not be considered an act of exceptional civic virtue, but here we are.",
    news: {
      headline: 'Highland Council issues just three dog fouling fines in five years',
      publication: 'BBC Scotland',
      publishedAt: '21 April 2026',
      summary:
        'A BBC Scotland investigation found that just three dog-fouling fines had been issued in the Highlands over five years, generating £240 in penalties.',
      sourceUrl:
        'https://www.bbc.co.uk/news/articles/cly3m9j1xvpo',
      sourceLabel: 'Read the BBC story',
    },
    currency: 'gbp',
  },

  {
    id: 'toxic-waste',
    icon: '🏭',
    title: 'Dump toxic waste somewhere',
    amount: 5,
    category: 'environment',
    description:
      'I will not dispose of hazardous substances somewhere that definitely was not designed to contain them.',
    news: {
      headline: 'Buried: the toxic chemical legacy in Wales',
      publication: 'BBC',
      publishedAt: '2026',
      summary:
        'The BBC investigation Buried follows claims surrounding decades of toxic chemical dumping in South Wales and the work of environmental whistleblower Douglas Gowan.',
      sourceUrl:
        'https://www.bbc.co.uk/iplayer',
      sourceLabel: 'Watch Buried on BBC iPlayer',
    },
    currency: 'gbp',
  },

  {
    id: 'office-lunch',
    icon: '🥪',
    title: "Steal someone's lunch from the office fridge",
    amount: 1,
    category: 'workplace',
    description:
      'I will not see a clearly labelled sandwich and interpret that as an invitation.',
    currency: 'gbp',

  },
]