interface Option {
  label: string;
  value: string;
}

interface Question {
  id: string;
  text: string;
  type: "single" | "multiple" | "text";
  options?: Option[];
  visibleIf?: {
    questionId: string;
    value: string | string[];
  };
}

export const questions: Question[] = [
  {
    id: "gender",
    text: "What is your gender?",
    type: "single",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "age",
    text: "How old are you?",
    type: "text",
  },
  {
    id: "country",
    text: "In which country do you live?",
    type: "text",
  },
  {
    id: "study_location",
    text: "Do you prefer to study in your country or abroad?",
    type: "single",
    options: [
      { value: "local", label: "My country" },
      { value: "abroad", label: "Abroad" },
      { value: "no_preference", label: "No preference" },
    ],
  },
  {
    id: "languages_spoken",
    text: "What languages do you speak?",
    type: "multiple",
    options: [
      { value: "english", label: "English" },
      { value: "french", label: "French" },
      { value: "spanish", label: "Spanish" },
      { value: "german", label: "German" },
      { value: "other", label: "Other" },
    ],
    visibleIf: {
      questionId: "study_location",
      value: "abroad",
    },
  },
  {
    id: "study_region",
    text: "Which region do you prefer to study in?",
    type: "single",
    options: [
      { value: "north_america", label: "North America" },
      { value: "europe", label: "Europe" },
      { value: "asia", label: "Asia" },
      { value: "middle_east", label: "Middle East" },
      { value: "africa", label: "Africa" },
      { value: "anywhere", label: "Anywhere" },
    ],
    visibleIf: {
      questionId: "study_location",
      value: "abroad",
    },
  },
  {
    id: "specific_country",
    text: "Do you have preference for specific country?",
    type: "text",
    visibleIf: {
      questionId: "study_location",
      value: "abroad",
    },
  },
  {
    id: "budget_yearly",
    text: "What is your budget per year?",
    type: "single",
    options: [
      { value: "under_5k", label: "Less than $5 000" },
      { value: "5k_15k", label: "$5 000 - $15 000" },
      { value: "15k_plus", label: "$15 000+" },
      { value: "no_limit", label: "No limit" },
    ],
  },
  {
    id: "academic_strength",
    text: "How strong are your academic results?",
    type: "single",
    options: [
      { value: "top", label: "Top grades" },
      { value: "above_avg", label: "Above Average" },
      { value: "average", label: "Average" },
      { value: "below_avg", label: "Below average" },
    ],
  },
  {
    id: "knowMajor",
    text: "Do you already know what you want to study in college?",
    type: "single",
    options: [
      { value: "yes", label: "Yes, I know my intended major" },
      { value: "no", label: "No, I'm not sure yet" },
    ],
  },
  {
    id: "majorName",
    text: "What major have you decided on?",
    type: "text",
    visibleIf: { questionId: "knowMajor", value: "yes" },
  },
  {
    id: "consideredMajors",
    text: 'Have you considered any specific majors or career paths? You can list any that come to mind, or type "none" if not sure.',
    type: "text",
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  {
    id: "interest_science",
    text: "Do you enjoy science and research (experiments, discovering how things work)?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  {
    id: "interest_science_detail",
    text: "Which area of science are you most interested in?",
    type: "multiple",
    options: [
      {
        value: "biology",
        label: "Biology or life sciences (including health/medicine)",
      },
      { value: "chemistry", label: "Chemistry or chemical processes" },
      { value: "physics", label: "Physics or physical sciences" },
      { value: "environment", label: "Environmental or Earth science" },
      {
        value: "other_science",
        label: "Other science fields (astronomy, etc.)",
      },
    ],
    visibleIf: { questionId: "interest_science", value: "yes" },
  },
  {
    id: "interest_math",
    text: "Do you enjoy mathematics or statistics (solving math problems, working with numbers)?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  {
    id: "interest_math_detail",
    text: "What aspect of math do you enjoy most?",
    type: "single",
    options: [
      {
        value: "pure_math",
        label: "Abstract math and theories (solving puzzles, proofs)",
      },
      {
        value: "applied_math",
        label: "Applied math or statistics (practical problem-solving)",
      },
      { value: "both", label: "Both, or not sure" },
    ],
    visibleIf: { questionId: "interest_math", value: "yes" },
  },
  {
    id: "interest_tech",
    text: "Are you interested in computers and technology (coding, software, computing)?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  {
    id: "interest_tech_detail",
    text: "Which area of computing or technology interests you most?",
    type: "multiple",
    options: [
      { value: "programming", label: "Programming or software development" },
      { value: "ai_data", label: "Artificial intelligence or data science" },
      { value: "gaming", label: "Game development or interactive media" },
      { value: "hardware", label: "Computer hardware or engineering" },
      { value: "cybersecurity", label: "Cybersecurity or network systems" },
      { value: "web_mobile", label: "Web or mobile application development" },
      { value: "general_tech", label: "General tech gadgets and computing" },
    ],
    visibleIf: { questionId: "interest_tech", value: "yes" },
  },
  // Interests - Engineering/Hands-on
  {
    id: "interest_engineering",
    text: "Do you enjoy engineering or hands-on building and fixing things?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  {
    id: "interest_engineering_detail",
    text: "What kind of engineering or hands-on work appeals to you most?",
    type: "multiple",
    options: [
      {
        value: "mechanical",
        label:
          "Designing or working with machines/electronics (mechanical/electrical engineering)",
      },
      {
        value: "civil",
        label:
          "Designing structures or buildings (civil/architectural engineering)",
      },
      {
        value: "chemical",
        label:
          "Working with chemicals or materials (chemical/materials engineering)",
      },
      {
        value: "biomedical",
        label: "Combining biology and engineering (bioengineering/biomedical)",
      },
      {
        value: "other_engineering",
        label: "Other engineering fields or general building/DIY",
      },
    ],
    visibleIf: { questionId: "interest_engineering", value: "yes" },
  },
  // Interests - Nature/Outdoors
  {
    id: "interest_nature",
    text: "Do you enjoy working outdoors, in nature, or with animals?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  {
    id: "interest_nature_detail",
    text: "What aspects of nature or outdoors work interest you?",
    type: "multiple",
    options: [
      { value: "environment", label: "Environmental science or ecology" },
      { value: "animals", label: "Working with animals (veterinary, zoology)" },
      { value: "agriculture", label: "Agriculture or plant science" },
      { value: "geology", label: "Geology or earth sciences" },
      { value: "outdoor_activity", label: "Outdoor activities and adventure" },
    ],
    visibleIf: { questionId: "interest_nature", value: "yes" },
  },
  // Interests - Visual Arts
  {
    id: "interest_art",
    text: "Do you enjoy visual arts or design (drawing, painting, graphic design)?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  {
    id: "interest_art_detail",
    text: "What kinds of visual art or design are you interested in?",
    type: "multiple",
    options: [
      { value: "fine_art", label: "Fine arts (drawing, painting, sculpting)" },
      { value: "graphic_design", label: "Graphic or digital design" },
      { value: "photography", label: "Photography or filmmaking" },
      { value: "fashion_design", label: "Fashion or interior design" },
      { value: "crafts", label: "Crafts or DIY making" },
    ],
    visibleIf: { questionId: "interest_art", value: "yes" },
  },
  // Interests - Performing Arts
  {
    id: "interest_perform",
    text: "Are you interested in performing arts (music, theater, dance) or entertainment?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  {
    id: "interest_perform_detail",
    text: "Which area of performing arts or entertainment interests you most?",
    type: "multiple",
    options: [
      { value: "music", label: "Music (singing, playing instruments)" },
      { value: "theater", label: "Theater or acting" },
      { value: "dance", label: "Dance" },
      { value: "film_tv", label: "Film/TV production or directing" },
      {
        value: "other_performing",
        label: "Other performing arts/entertainment",
      },
    ],
    visibleIf: { questionId: "interest_perform", value: "yes" },
  },
  // Interests - Writing/Language
  {
    id: "interest_writing",
    text: "Do you enjoy writing, reading, or languages?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  {
    id: "interest_writing_detail",
    text: "What type of writing or language-related activities interest you?",
    type: "multiple",
    options: [
      {
        value: "creative_writing",
        label: "Creative writing (stories, novels, poetry)",
      },
      { value: "journalism", label: "Journalism or blogging" },
      { value: "literature", label: "Reading and analyzing literature" },
      {
        value: "languages",
        label: "Learning foreign languages or linguistics",
      },
      {
        value: "public_speaking",
        label: "Communication or public speaking/debate",
      },
    ],
    visibleIf: { questionId: "interest_writing", value: "yes" },
  },
  // Interests - Helping/People
  {
    id: "interest_helping",
    text: "Do you enjoy helping people (teaching, caregiving, or volunteering)?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  {
    id: "interest_helping_detail",
    text: "How would you most like to help others?",
    type: "multiple",
    options: [
      { value: "teaching", label: "Teaching or educating others" },
      { value: "counseling", label: "Counseling or providing guidance" },
      { value: "healthcare", label: "Healthcare (medical, nursing, etc.)" },
      { value: "social_work", label: "Social work or community service" },
      {
        value: "advocacy",
        label: "Advocating for others (law, policy, non-profit)",
      },
    ],
    visibleIf: { questionId: "interest_helping", value: "yes" },
  },
  // Interests - Leadership/Business
  {
    id: "interest_leadership",
    text: "Do you enjoy leading or persuading others (leading projects, convincing people)?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  {
    id: "interest_leadership_detail",
    text: "What kind of leadership or persuasive role appeals to you?",
    type: "multiple",
    options: [
      { value: "entrepreneurship", label: "Starting or running a business" },
      { value: "management", label: "Managing teams or projects" },
      {
        value: "marketing",
        label: "Marketing or advertising (promoting ideas/products)",
      },
      {
        value: "politics",
        label: "Politics or debating (influencing public policy)",
      },
      { value: "sales", label: "Negotiating deals or sales" },
    ],
    visibleIf: { questionId: "interest_leadership", value: "yes" },
  },
  // Interests - Organizing/Detail
  {
    id: "interest_organizing",
    text: "Do you enjoy organizing, planning, or working with data/details?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  {
    id: "interest_organizing_detail",
    text: "Which of these activities do you find appealing?",
    type: "multiple",
    options: [
      { value: "accounting", label: "Accounting or financial management" },
      { value: "data_analysis", label: "Analyzing data or statistics" },
      { value: "event_planning", label: "Planning events or projects" },
      {
        value: "information_management",
        label: "Organizing information (records, libraries)",
      },
      { value: "it_systems", label: "Managing computer systems or databases" },
    ],
    visibleIf: { questionId: "interest_organizing", value: "yes" },
  },
  // Personality - Big Picture vs Detail
  {
    id: "personality_bigPicture",
    text: "When working on a project, which approach sounds more like you?",
    type: "single",
    options: [
      {
        value: "big_picture",
        label:
          "I focus on the big picture and ideas first, rather than details.",
      },
      {
        value: "detail_oriented",
        label: "I pay attention to details and practical aspects first.",
      },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  // Personality - Decision Making
  {
    id: "personality_decisionMaking",
    text: "Which statement fits you better when making decisions?",
    type: "single",
    options: [
      { value: "logic", label: "I rely on logic and objective analysis." },
      { value: "feelings", label: "I consider people's feelings and values." },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  // Personality - Structure
  {
    id: "personality_structure",
    text: "Which do you prefer in your daily life?",
    type: "single",
    options: [
      { value: "organized", label: "Having a clear plan and being organized." },
      {
        value: "flexible",
        label: "Being flexible and adapting as things change.",
      },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  // Personality - Social
  {
    id: "personality_social",
    text: "In social situations, which describes you more?",
    type: "single",
    options: [
      {
        value: "extroverted",
        label: "I am energized by being around people and enjoy socializing.",
      },
      {
        value: "introverted",
        label: "I am drained by large groups and need quiet time to recharge.",
      },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  // Personality - Teamwork
  {
    id: "personality_teamwork",
    text: "Do you prefer working independently or as part of a team?",
    type: "single",
    options: [
      {
        value: "independent",
        label: "Independently – I like having autonomy.",
      },
      {
        value: "team",
        label: "In a team – I enjoy collaborating with others.",
      },
      {
        value: "no_preference",
        label: "No strong preference or depends on the situation.",
      },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  // Personality - Work Environment
  {
    id: "personality_environment",
    text: "What type of work environment do you think you would thrive in?",
    type: "single",
    options: [
      {
        value: "competitive",
        label:
          "A competitive, high-pressure environment – I thrive under challenge.",
      },
      {
        value: "calm",
        label: "A calm, stable environment – I prefer low stress.",
      },
      { value: "moderate", label: "Something in between, a moderate pace." },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
  // Skills/Strengths
  {
    id: "skills_strengths",
    text: "Which of the following do you consider your strengths or skills? (Select all that apply)",
    type: "multiple",
    options: [
      { value: "math_skill", label: "Mathematics or quantitative analysis" },
      { value: "science_skill", label: "Understanding scientific concepts" },
      { value: "writing_skill", label: "Writing and communication" },
      { value: "art_skill", label: "Artistic or design skills" },
      { value: "music_skill", label: "Musical or performance talent" },
      { value: "language_skill", label: "Foreign language proficiency" },
      {
        value: "tech_skill",
        label: "Computer programming or technical skills",
      },
      { value: "leadership_skill", label: "Leadership and teamwork" },
      {
        value: "organization_skill",
        label: "Organization and detail management",
      },
      { value: "empathy_skill", label: "Empathy and understanding people" },
      {
        value: "mechanical_skill",
        label: "Mechanical or hands-on problem-solving",
      },
      { value: "creativity_skill", label: "Creativity and idea generation" },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },

  // Values/Priorities
  {
    id: "values_priorities",
    text: "What are the most important factors to you in a future career or major? (Select up to 3)",
    type: "multiple",
    options: [
      { value: "impact", label: "Making a positive impact on society" },
      { value: "high_salary", label: "High earning potential" },
      { value: "stability", label: "Job security and stability" },
      { value: "work_life_balance", label: "Work-life balance" },
      {
        value: "creativity",
        label: "Opportunities for creativity and expression",
      },
      {
        value: "challenge",
        label: "Intellectual challenge or continuous learning",
      },
      { value: "helping_others", label: "Helping others" },
      { value: "leadership", label: "Leadership opportunities" },
      { value: "prestige", label: "Prestige or recognition" },
      { value: "technology", label: "Working with cutting-edge technology" },
      {
        value: "team_work",
        label: "Being part of a team-oriented environment",
      },
      { value: "independence", label: "Having independence or autonomy" },
      {
        value: "travel",
        label: "Opportunities to travel or work internationally",
      },
    ],
    visibleIf: { questionId: "knowMajor", value: "no" },
  },
];
