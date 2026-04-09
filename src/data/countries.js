const countries = [
  {
    name: 'Canada',
    code: 'CA',
    visa: 6,
    jobs: 8,
    cost: 7,
    language: 2,
    continent: 'North America',
    lat: 56,
    lng: -106,
    migrantPopulation: '8.4M',
    topOrigins: ['India (18%)', 'China (12%)', 'Philippines (11%)'],
    challenges: ['Point-based scoring system complexity', 'Extreme winter weather adaptation', 'High housing prices in major cities', 'Credential recognition for professionals'],
    resources: [
      'Official IRCC Website: canada.ca/en/immigration-refugees-citizenship.html',
      'Job Bank Canada: jobbank.gc.ca',
      'Settlement Services: settlement.org'
    ],
    organizations: [
      { name: 'WES Canada', description: 'Academic credential evaluation for immigration.', link: 'https://wes.org/ca' },
      { name: 'ACCESS Employment', description: 'Helping newcomers find jobs in Canada.', link: 'https://accessemployment.ca' },
      { name: 'YMCA Newcomer Information', description: 'Settlement services and community support.', link: 'https://ymca.ca' }
    ],
    storyCount: 890,
    mapId: '124',
    visaDetail: { type: 'Express Entry / Provincial Nominee', processing: '6-12 months', fee: 'CAD $1,365', difficulty: 'Medium-High' },
    costDetail: { rent: 1650, food: 450, transport: 130, utilities: 160, total: 2390 }
  },
  {
    name: 'Germany',
    code: 'DE',
    visa: 5,
    jobs: 9,
    cost: 5,
    language: 7,
    continent: 'Europe',
    lat: 51,
    lng: 10,
    migrantPopulation: '13.7M',
    topOrigins: ['Turkey (13.1%)', 'Poland (8.6%)', 'Syria (5.7%)'],
    challenges: ['Complex administrative bureaucracy', 'Language barrier (B1/B2 often required)', 'Competitive housing market in cities', 'Strict social and cultural norms'],
    resources: [
      'Make it in Germany: make-it-in-germany.com',
      'Federal Employment Agency: arbeitsagentur.de',
      'BAMF Information: bamf.de'
    ],
    organizations: [
      { name: 'Goethe-Institut', description: 'Official language certification provider.', link: 'https://goethe.de' },
      { name: 'Working in Germany', description: 'Step-by-step guide for foreign professionals.', link: 'https://make-it-in-germany.com' },
      { name: 'Expatrio', description: 'Assistance with blocked accounts and health insurance.', link: 'https://expatrio.com' }
    ],
    storyCount: 650,
    mapId: '276',
    visaDetail: { type: 'Opportunity Card / Blue Card', processing: '1-4 months', fee: '€75-€100', difficulty: 'Medium' },
    costDetail: { rent: 950, food: 320, transport: 85, utilities: 160, total: 1515 }
  },
  {
    name: 'Australia',
    code: 'AU',
    visa: 7,
    jobs: 8,
    cost: 8,
    language: 1,
    continent: 'Oceania',
    lat: -25,
    lng: 134,
    migrantPopulation: '7.7M',
    topOrigins: ['England (13%)', 'India (9.5%)', 'China (8.3%)'],
    challenges: ['High cost of professional visa fees', 'Skills assessment and validation', 'Geographical isolation from family', 'Intense rental market competition'],
    resources: [
      'Department of Home Affairs: homeaffairs.gov.au',
      'Seek Jobs Australia: seek.com.au',
      'Migration Agents Registry: mara.gov.au'
    ],
    organizations: [
      { name: 'VETASSESS', description: 'Primary skills assessment body for migration.', link: 'https://vetassess.com.au' },
      { name: 'Settlement Services Intl', description: 'Supporting newcomers to settle in AU.', link: 'https://ssi.org.au' },
      { name: 'Migration Advice Bureau', description: 'Expert legal and visa guidance.', link: 'https://migrationadvicebureau.com' }
    ],
    storyCount: 580,
    mapId: '036',
    visaDetail: { type: 'Skilled Independent (189/190)', processing: '3-12 months', fee: 'AUD $4,640', difficulty: 'High' },
    costDetail: { rent: 1550, food: 420, transport: 110, utilities: 170, total: 2250 }
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    visa: 8,
    jobs: 7,
    cost: 9,
    language: 1,
    continent: 'Europe',
    lat: 54,
    lng: -2,
    migrantPopulation: '9.6M',
    topOrigins: ['India (10%)', 'Poland (8.2%)', 'Pakistan (6%)'],
    challenges: ['NHS healthcare waiting times', 'Post-Brexit immigration rules', 'Extreme cost of living in London', 'Increasingly high salary thresholds'],
    resources: [
      'UK Visas and Immigration: gov.uk/browse/visas-immigration',
      'Indeed UK Jobs: indeed.co.uk',
      'Citizens Advice: citizensadvice.org.uk'
    ],
    organizations: [
      { name: 'Immigration Advice Service', description: 'Specialized migration legal advice.', link: 'https://i-a-s.co.uk' },
      { name: 'TargetJobs UK', description: 'Graduate jobs and placement support.', link: 'https://targetjobs.co.uk' },
      { name: 'UK Council for Int Student', description: 'Advice for international students.', link: 'https://ukcisa.org.uk' }
    ],
    storyCount: 720,
    mapId: '826',
    visaDetail: { type: 'Skilled Worker Visa', processing: '3-8 weeks', fee: '£625-£1,423', difficulty: 'High' },
    costDetail: { rent: 1750, food: 380, transport: 140, utilities: 190, total: 2460 }
  },
  {
    name: 'Singapore',
    code: 'SG',
    visa: 6,
    jobs: 8,
    cost: 10,
    language: 3,
    continent: 'Asia',
    lat: 1,
    lng: 104,
    migrantPopulation: '2.4M',
    topOrigins: ['Malaysia (32%)', 'China (18%)', 'India (15%)'],
    challenges: ['Very high cost of private car ownership', 'Strict work pass dependency rules', 'Extremely humid tropical climate', 'Competitive educational environment'],
    resources: [
      'Ministry of Manpower: mom.gov.sg',
      'MyCareersFuture: mycareersfuture.gov.sg',
      'Expat Living Singapore: expatliving.sg'
    ],
    organizations: [
      { name: 'SkillsFuture', description: 'Lifelong learning and upskilling portal.', link: 'https://skillsfuture.gov.sg' },
      { name: 'Contact Singapore', description: 'Job Matching for foreign professionals.', link: 'https://contactsng.gov.sg' },
      { name: 'Migrant Workers Centre', description: 'Support for migrant worker welfare.', link: 'https://mwc.org.sg' }
    ],
    storyCount: 310,
    mapId: '702',
    visaDetail: { type: 'Employment Pass / S Pass', processing: '3-10 weeks', fee: 'SGD $105-$225', difficulty: 'Medium-High' },
    costDetail: { rent: 2200, food: 500, transport: 90, utilities: 150, total: 2940 }
  },
  {
    name: 'UAE',
    code: 'AE',
    visa: 4,
    jobs: 8,
    cost: 6,
    language: 4,
    continent: 'Asia',
    lat: 24,
    lng: 54,
    migrantPopulation: '8.8M',
    topOrigins: ['India (34.9%)', 'Pakistan (12.5%)', 'Bangladesh (10.1%)'],
    challenges: ['Kafala sponsorship system rules', 'Extreme desert summer heat', 'Limited path to permanent citizenship', 'High private school fees for kids'],
    resources: [
      'UAE Official Portal: u.ae/en/information-and-services',
      'Gulf Talent Jobs: gulftalent.com',
      'Khaleej Times Jobs: khaleejtimes.com/jobs'
    ],
    organizations: [
      { name: 'ICP UAE', description: 'Identity and citizenship regulatory portal.', link: 'https://icp.gov.ae' },
      { name: 'Nafis Platform', description: 'Competitive support for job seekers.', link: 'https://nafis.gov.ae' },
      { name: 'AWRAD Support', description: 'Migration and relocation assistance.', link: 'https://awrad.ae' }
    ],
    storyCount: 240,
    mapId: '784',
    visaDetail: { type: 'Green Visa / Freelance Visa', processing: '2-5 weeks', fee: 'AED 2,500-4,500', difficulty: 'Medium' },
    costDetail: { rent: 1300, food: 350, transport: 70, utilities: 200, total: 1920 }
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    visa: 6,
    jobs: 6,
    cost: 7,
    language: 1,
    continent: 'Oceania',
    lat: -41,
    lng: 174,
    migrantPopulation: '1.2M',
    topOrigins: ['UK (21%)', 'China (10%)', 'India (8%)'],
    challenges: ['Limited scope of high-tech industries', 'High shipping costs for imports', 'Frequent seismic activity (earthquakes)', 'Housing shortage in Auckland/Wellington'],
    resources: [
      'Immigration New Zealand: immigration.govt.nz',
      'Seek NZ Jobs: seek.co.nz',
      'New Zealand Now: newzealandnow.govt.nz'
    ],
    organizations: [
      { name: 'NZQA', description: 'Qualification assessment and recognition.', link: 'https://nzqa.govt.nz' },
      { name: 'Regional Newcomer Centre', description: 'Community settlement support.', link: 'https://rnc.nz' },
      { name: 'Trade Me Jobs', description: 'Largest Kiwi job and property portal.', link: 'https://trademe.co.nz/jobs' }
    ],
    storyCount: 180,
    mapId: '554',
    visaDetail: { type: 'Accredited Employer Work Visa', processing: '2-6 months', fee: 'NZD $750', difficulty: 'Medium' },
    costDetail: { rent: 1400, food: 400, transport: 100, utilities: 180, total: 2080 }
  },
  {
    name: 'India',
    code: 'IN',
    visa: 4,
    jobs: 7,
    cost: 2,
    language: 4,
    continent: 'Asia',
    lat: 21,
    lng: 78,
    migrantPopulation: '5.2M',
    topOrigins: ['Bangladesh (58%)', 'Pakistan (15%)', 'Nepal (12%)'],
    challenges: ['Intense air pollution in northern cities', 'Lengthy bureaucratic procedures', 'Significant traffic congestion in hubs', 'Highly competitive job market'],
    resources: [
      'Bureau of Immigration India: boi.gov.in',
      'Naukri.com Jobs: naukri.com',
      'National Government Services: services.india.gov.in'
    ],
    organizations: [
      { name: 'Invest India', description: 'Official entry point for foreign investors.', link: 'https://investindia.gov.in' },
      { name: 'FRRO Portal', description: 'Foreigners regional registration office.', link: 'https://indianfrro.gov.in' },
      { name: 'HackerEarth', description: 'Job and hackathon portal for tech talent.', link: 'https://hackerearth.com' }
    ],
    storyCount: 340,
    mapId: '356',
    visaDetail: { type: 'Employment Visa / e-Visa', processing: '1-4 weeks', fee: '$80-$250', difficulty: 'Low-Medium' },
    costDetail: { rent: 300, food: 120, transport: 40, utilities: 50, total: 510 }
  }
];


export const countryNames = countries.map(c => c.name);

export const getCountryByName = (name) => countries.find(c => c.name === name);

export const getCountryByCode = (code) => countries.find(c => c.code === code);

export const getCountryByMapId = (id) => countries.find(c => c.mapId === id);

export const migrationRoutes = [
  { from: 'IN', to: 'CA', count: 320000, label: 'India → Canada' },
  { from: 'IN', to: 'GB', count: 180000, label: 'India → UK' },
  { from: 'IN', to: 'AU', count: 210000, label: 'India → Australia' },
  { from: 'GB', to: 'AU', count: 130000, label: 'UK → Australia' },
  { from: 'IN', to: 'SG', count: 85000, label: 'India → Singapore' },
];

export default countries;


