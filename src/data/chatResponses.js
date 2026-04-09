const responses = {
  visa: {
    keywords: ['visa', 'permit', 'immigration', 'green card', 'work permit', 'residency'],
    reply: {
      title: '🛂 Visa & Immigration Guidance',
      analysis: 'Visa requirements vary significantly by destination country, your nationality, and purpose of travel/migration. Key factors include employment sponsorship, family ties, and skills assessment.',
      steps: [
        'Identify the correct visa category for your purpose (work, study, family, tourist)',
        'Check eligibility requirements on the official immigration website',
        'Gather required documents: passport, photos, financial proof, employment letters',
        'Submit your application online or at the nearest consulate',
        'Attend biometrics appointment and interview if required',
        'Track your application status regularly',
      ],
      tips: [
        'Apply well in advance — processing times can range from weeks to months',
        'Consider hiring an immigration consultant for complex cases',
        'Keep digital and physical copies of all documents',
        'Check if your country has any bilateral visa agreements',
      ],
    },
  },
  cost: {
    keywords: ['cost', 'expensive', 'afford', 'money', 'budget', 'living', 'rent', 'salary', 'price'],
    reply: {
      title: '💰 Cost of Living Analysis',
      analysis: 'Cost of living depends on city, lifestyle, and housing choices. Major hubs like London, Singapore, and Sydney tend to be 40-60% more expensive than smaller cities in the same country.',
      steps: [
        'Research average rent in your destination city',
        'Calculate monthly expenses: groceries, transport, utilities, healthcare',
        'Compare your expected salary with cost of living indices',
        'Plan an emergency fund covering at least 3-6 months of expenses',
        'Look into shared housing to reduce initial costs',
      ],
      tips: [
        'Use tools like Numbeo or Expatistan for cost comparisons',
        'Factor in one-time costs: security deposit, visa fees, flights',
        'Open a local bank account early to avoid foreign transaction fees',
        'Suburban areas often offer 30-50% lower rents than city centers',
      ],
    },
  },
  job: {
    keywords: ['job', 'work', 'employment', 'career', 'hire', 'hiring', 'skills', 'profession', 'occupation'],
    reply: {
      title: '💼 Job Market & Employment',
      analysis: 'The job market for migrants varies by industry, location, and visa status. Tech, healthcare, and skilled trades typically have the highest demand in Canada, Australia, and Germany for foreign workers.',
      steps: [
        'Research in-demand occupations in your destination country',
        'Get your qualifications assessed or recognized locally',
        'Update your resume/CV to match local formatting standards',
        'Apply through job portals, LinkedIn, and recruitment agencies',
        'Network with local professionals and immigrant communities',
        'Prepare for interviews by understanding local work culture',
      ],
      tips: [
        'Many countries have skilled occupation lists — check if your profession is on it',
        'Professional certifications may need to be re-validated',
        'Freelancing or remote work can be a bridge while job hunting',
        'Attend local job fairs and industry meetups to build connections',
      ],
    },
  },
  language: {
    keywords: ['language', 'speak', 'english', 'learn', 'communication', 'translate', 'fluent'],
    reply: {
      title: '🗣️ Language & Communication',
      analysis: 'Language proficiency significantly impacts your migration and daily life experience. Countries like Germany require language tests (TestDaF, Goethe-Zertifikat) as part of the immigration process.',
      steps: [
        'Determine the language requirements for your visa type',
        'Register for a recognized language proficiency test',
        'Enroll in language courses (online or local)',
        'Practice daily with native speakers through language exchange programs',
        'Use apps like Duolingo, Babbel, or Anki for vocabulary building',
      ],
      tips: [
        'Immersion is the fastest way to learn — watch local TV shows, listen to podcasts',
        'Many countries offer free language courses for immigrants',
        'Language partnerships (tandems) are free and effective',
        'Don\'t be afraid to make mistakes — locals appreciate the effort',
      ],
    },
  },
  healthcare: {
    keywords: ['health', 'hospital', 'doctor', 'insurance', 'medical', 'healthcare', 'medicine'],
    reply: {
      title: '🏥 Healthcare & Insurance',
      analysis: 'Healthcare systems differ drastically. Some countries offer universal healthcare like the NHS in the UK or Medicare in Australia, while others like UAE require private insurance.',
      steps: [
        'Research whether your destination has public or private healthcare',
        'Arrange health insurance that covers your initial months',
        'Get required vaccinations and health screenings before departure',
        'Register with the local health system upon arrival',
        'Find English-speaking doctors or clinics in your area',
      ],
      tips: [
        'Carry a translated copy of your medical history and prescriptions',
        'Some employer-sponsored visas include health insurance',
        'Many countries require a medical exam as part of the visa process',
        'Emergency numbers vary by country — save them in your phone',
      ],
    },
  },
  housing: {
    keywords: ['house', 'housing', 'apartment', 'rent', 'accommodation', 'flat', 'stay', 'live', 'home'],
    reply: {
      title: '🏠 Housing & Accommodation',
      analysis: 'Finding housing in tight markets like Auckland, London, or Vancouver can be challenging due to high demand and unfamiliarity with local laws.',
      steps: [
        'Book temporary accommodation (Airbnb, hostel) for the first 2-4 weeks',
        'Research neighborhoods based on safety, commute, and amenities',
        'Use local property portals and expatriate forums',
        'Prepare documents: ID, proof of income, employment contract',
        'Visit properties in person when possible before signing',
        'Understand your tenant rights in the new country',
      ],
      tips: [
        'Join local expat Facebook groups for room-share opportunities',
        'Some countries require a guarantor — employer sponsorship can help',
        'Negotiate rent if you can pay multiple months upfront',
        'Check if utilities (water, electricity, internet) are included in rent',
      ],
    },
  },
  default: {
    reply: {
      title: '🌍 Migration & Travel Assistant',
      analysis: 'I can help you with various aspects of migration and travel planning for the 7 key countries we cover. I cover visa requirements, cost of living, job markets, and more.',
      steps: [
        'Tell me about your destination country',
        'Specify whether you\'re migrating or traveling',
        'Ask about specific topics: visa, jobs, cost, language, health, housing',
        'I\'ll provide structured guidance with actionable steps',
      ],
      tips: [
        'Try asking: "What visa do I need for Canada?"',
        'Try asking: "How much does it cost to live in UAE?"',
        'Try asking: "How do I find a job in Australia?"',
        'Try asking: "What are the travel tips for Singapore?"',
      ],
    },
  },
};

export function getAIResponse(message) {
  const lower = message.toLowerCase();

  for (const [key, data] of Object.entries(responses)) {
    if (key === 'default') continue;
    if (data.keywords.some((kw) => lower.includes(kw))) {
      return data.reply;
    }
  }

  return responses.default.reply;
}

export default responses;
