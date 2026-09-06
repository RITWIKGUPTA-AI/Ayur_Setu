import { 
  AssessmentQuestion, 
  CurriculumSkillInsight, 
  FacultyOpportunity, 
  IndustrySkillNeed,
  InstitutionalMetrics, 
  JobApplication, 
  JobOpportunity, 
  LearningProgram, 
  SkillRoadmapItem, 
  StudentProfile 
} from '../types.js';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'stu-001',
  name: 'Sakshi Sharma',
  email: 'sakshi.sharma@aiia.edu.in',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
  college: 'All India Institute of Ayurveda (AIIA), New Delhi',
  degree: 'Bachelor of Ayurvedic Medicine & Surgery (BAMS)',
  department: 'Dravyaguna & Rasashastra (Pharmaceutical Sciences)',
  year: 'Final Year (2026)',
  cgpa: 8.62,
  headline: 'Aspiring Pharmacovigilance & Quality Assurance Associate | AYUSH Drug Safety',
  bio: 'Final-year BAMS graduate with hands-on lab exposure in herbal drug standardization, GMP documentation, and adverse-event reporting. Actively seeking a 6-month industry internship in Pharmacovigilance, Quality Control, or Clinical Research with an AYUSH-certified manufacturer.',
  location: 'New Delhi, India',
  linkedin: 'https://linkedin.com/in/sakshi-sharma-ayursetu',
  github: '',
  portfolioUrl: 'https://ayursetu.gov.in/p/sakshi-sharma',
  verifiedBadges: ['Top 5% Assessment Score', 'Verified Skill Benchmark', 'PvPI Trained Associate', 'AIIA Merit Scholar'],
  skills: [
    { name: 'Pharmacovigilance (ADR Reporting - PvPI)', level: 88, verified: true },
    { name: 'GMP Documentation & SOPs', level: 82, verified: true },
    { name: 'HPLC & Analytical Instrumentation', level: 66, verified: false },
    { name: 'AYUSH-GCP Clinical Research', level: 70, verified: true },
    { name: 'Herbal Formulation (Bhaishajya Kalpana)', level: 85, verified: true },
    { name: 'Quality Control & Standardization', level: 60, verified: false },
    { name: 'Regulatory Affairs (CDSCO / AYUSH Licensing)', level: 58, verified: false },
    { name: 'Patient Counselling & Professional Communication', level: 90, verified: true }
  ],
  radarScores: [
    { category: 'Pharmacovigilance', student: 88, benchmark: 82, fullMark: 100 },
    { category: 'GMP & Quality', student: 74, benchmark: 85, fullMark: 100 },
    { category: 'Clinical Research', student: 70, benchmark: 80, fullMark: 100 },
    { category: 'Lab & Analytics', student: 58, benchmark: 78, fullMark: 100 },
    { category: 'Formulation Sci.', student: 85, benchmark: 75, fullMark: 100 },
    { category: 'Communication', student: 90, benchmark: 75, fullMark: 100 }
  ],
  overallReadiness: 76,
  completedAssessmentsCount: 3,
  certifications: [
    {
      id: 'cert-1',
      title: 'GMP for Ayurvedic, Siddha & Unani Drugs',
      issuer: 'Ministry of AYUSH & Pharmexcil',
      issueDate: 'Jan 2026',
      credentialId: 'AYUSH-GMP-4471',
      verified: true
    },
    {
      id: 'cert-2',
      title: 'Pharmacovigilance Associate Certification (PvPI)',
      issuer: 'Indian Pharmacopoeia Commission (IPC)',
      issueDate: 'Nov 2025',
      credentialId: 'PVPI-ASSOC-2291',
      verified: true
    },
    {
      id: 'cert-3',
      title: 'AYUSH-GCP: Good Clinical Practice for Traditional Medicine Trials',
      issuer: 'All India Institute of Ayurveda (AIIA)',
      issueDate: 'Feb 2026',
      credentialId: 'AIIA-GCP-2026-88',
      verified: true
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'HPLC Fingerprinting for Standardization of Ashwagandha Churna',
      description: 'Developed and validated an HPLC-based chemical fingerprinting method to standardize withanolide content across three commercial Ashwagandha batches, supporting batch-to-batch quality consistency.',
      tags: ['HPLC', 'Standardization', 'Quality Control', 'Ayurvedic Pharmacognosy'],
      githubUrl: '',
      liveUrl: '',
      stars: undefined
    },
    {
      id: 'proj-2',
      title: 'Digital ADR Reporting Tool for Polyherbal Formulations',
      description: 'Built a structured adverse-drug-reaction intake form aligned with PvPI reporting fields to help small AYUSH manufacturers digitize pharmacovigilance data collection instead of paper logs.',
      tags: ['Pharmacovigilance', 'PvPI', 'Data Collection', 'Herbal Safety'],
      githubUrl: '',
      liveUrl: ''
    }
  ],
  internshipHistory: [
    {
      id: 'intern-1',
      role: 'Quality Control Intern',
      company: 'Dabur Research & Development Centre',
      duration: 'May 2025 - Jul 2025 (3 mos)',
      description: 'Assisted in raw-material testing and GMP documentation for classical Ayurvedic formulations; supported HPLC-based purity checks on herbal extracts.',
      verifiedByCompany: true
    }
  ]
};

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    category: 'GMP & Quality Systems',
    question: 'During a WHO-GMP audit of an Ayurvedic manufacturing unit, an inspector finds that a batch of Triphala Churna was released without a completed Certificate of Analysis (CoA). What is the correct GMP-compliant response?',
    codeSnippet: undefined,
    options: [
      { text: 'Release the batch anyway since Triphala is a well-known classical formulation with low risk', scoreWeight: 10 },
      { text: 'Quarantine the batch, halt further dispatch, and initiate a deviation report before any release decision', scoreWeight: 100 },
      { text: 'Backdate the CoA once testing is completed to match the original release date', scoreWeight: 0 },
      { text: 'Ask the quality manager to verbally approve release while paperwork is completed later', scoreWeight: 20 }
    ],
    explanation: 'GMP requires that no batch is released without a completed CoA. The correct action is to quarantine the batch and raise a documented deviation — releasing without records, or backdating documents, are serious GMP and regulatory violations under Schedule T.'
  },
  {
    id: 'q2',
    category: 'Pharmacovigilance & Drug Safety',
    question: 'A patient reports mild gastric discomfort after starting a polyherbal Ayurvedic formulation alongside their prescribed allopathic medication. As the pharmacovigilance associate, what is the most appropriate first step?',
    options: [
      { text: 'Dismiss it since Ayurvedic medicines are natural and assumed to be free of adverse effects', scoreWeight: 0 },
      { text: 'Document the case using a structured ADR form (PvPI format), assess causality, and check for possible herb-drug interaction', scoreWeight: 100 },
      { text: 'Advise the patient to simply stop all medications without informing the treating physician', scoreWeight: 15 },
      { text: 'Record it informally in a notebook and only escalate if the symptom becomes severe', scoreWeight: 30 }
    ],
    explanation: 'Every suspected adverse drug reaction — regardless of formulation type — should be captured on a standardized PvPI ADR form with causality assessment (e.g. WHO-UMC scale), since herb-drug interactions are a recognized and under-reported risk category.'
  },
  {
    id: 'q3',
    category: 'Clinical Research & AYUSH-GCP',
    question: 'You are supporting a clinical trial evaluating an Ayurvedic formulation for osteoarthritis. Under AYUSH-GCP guidelines, what must happen before any participant is enrolled?',
    options: [
      { text: 'Verbal consent is enough as long as the participant agrees to take part', scoreWeight: 15 },
      { text: 'Written informed consent must be obtained after explaining the trial in a language the participant understands, following Ethics Committee-approved protocol', scoreWeight: 100 },
      { text: 'Enrollment can begin immediately once the principal investigator personally approves the candidate', scoreWeight: 25 },
      { text: 'Only participants already familiar with Ayurveda need to sign consent forms', scoreWeight: 10 }
    ],
    explanation: 'AYUSH-GCP, aligned with ICMR and Schedule Y principles, mandates documented informed consent in a language the participant understands, following Institutional Ethics Committee approval — this is non-negotiable regardless of formulation type.'
  },
  {
    id: 'q4',
    category: 'Lab & Analytical Techniques',
    question: 'While standardizing a herbal extract, your HPLC chromatogram shows an unexpected extra peak not present in the reference standard. What is the most scientifically sound next step?',
    options: [
      { text: 'Ignore the peak since the main marker compound peak still matches', scoreWeight: 15 },
      { text: 'Investigate for possible adulteration, degradation, or solvent impurity — re-run with a blank and spike with reference standard to confirm peak identity', scoreWeight: 100 },
      { text: 'Increase the detector sensitivity until the extra peak disappears from view', scoreWeight: 0 },
      { text: 'Report only the marker compound result and omit the anomaly from the report', scoreWeight: 5 }
    ],
    explanation: 'An unidentified peak requires investigation — running a solvent blank rules out contamination, and spiking with reference standard confirms peak identity. Omitting anomalies from analytical reports is a serious data-integrity violation.'
  },
  {
    id: 'q5',
    category: 'Formulation & Manufacturing',
    question: 'A Bhasma (calcined metal-based Ayurvedic preparation) fails the modern heavy-metal safety limit test despite following classical Rasashastra preparation methods. What should the formulation team do?',
    options: [
      { text: 'Proceed to market it anyway since classical texts approve the preparation method', scoreWeight: 0 },
      { text: 'Investigate the Shodhana (purification) and Marana (incineration) process parameters, revalidate against Ayurvedic Pharmacopoeia limits, and withhold release until it passes safety testing', scoreWeight: 100 },
      { text: 'Dilute the final product with excipients until the heavy-metal concentration mathematically appears within limits', scoreWeight: 5 },
      { text: 'Switch to a different testing lab until a passing result is obtained', scoreWeight: 0 }
    ],
    explanation: 'Modern regulatory safety limits apply regardless of the classical preparation lineage. The correct response is to revisit and revalidate the purification/processing steps against Ayurvedic Pharmacopoeia of India standards — diluting to mask results or lab-shopping are serious integrity violations.'
  },
  {
    id: 'q6',
    category: 'Professional Communication',
    question: 'A patient wants to stop their prescribed allopathic diabetes medication in favor of an Ayurvedic formulation you are helping study, based on a family member\'s suggestion. What is the most professionally responsible response?',
    options: [
      { text: 'Support the switch immediately since the formulation is under study', scoreWeight: 0 },
      { text: 'Explain the current evidence status of the formulation clearly, and advise the patient to discuss any change with their treating physician before stopping prescribed medication', scoreWeight: 100 },
      { text: 'Stay silent and let the patient make the decision on their own', scoreWeight: 20 },
      { text: 'Tell the patient Ayurvedic medicine is always safer without further discussion', scoreWeight: 10 }
    ],
    explanation: 'Responsible AYUSH practice means being transparent about evidence levels and never encouraging discontinuation of prescribed treatment without involving the treating physician — patient safety and honest communication come first.'
  }
];

export const INITIAL_ROADMAP_ITEMS: SkillRoadmapItem[] = [
  {
    id: 'road-1',
    title: 'GMP Certification for Ayurvedic Drug Manufacturing (WHO-GMP)',
    type: 'certification',
    provider: 'Ministry of AYUSH & Pharmexcil',
    duration: '3 Weeks (15 hrs)',
    targetSkill: 'GMP & Quality',
    gapClosedPoints: 18,
    difficulty: 'Intermediate',
    linkUrl: 'https://ayush.gov.in',
    status: 'in_progress'
  },
  {
    id: 'road-2',
    title: 'HPLC & Modern Analytical Method Validation Workshop',
    type: 'course',
    provider: 'CSIR-National Botanical Research Institute',
    duration: '4 Weeks (20 hrs)',
    targetSkill: 'Lab & Analytics',
    gapClosedPoints: 22,
    difficulty: 'Advanced',
    linkUrl: 'https://csir.res.in',
    status: 'recommended'
  },
  {
    id: 'road-3',
    title: 'Build a Herb-Drug Interaction Reference Log (Capstone)',
    type: 'project',
    provider: 'AyurSetu Industry Collaboration Lab',
    duration: '2 Weeks (Hands-on Capstone)',
    targetSkill: 'Pharmacovigilance',
    gapClosedPoints: 14,
    difficulty: 'Advanced',
    status: 'recommended'
  },
  {
    id: 'road-4',
    title: 'Regulatory Affairs Internship - AYUSH Drug Licensing',
    type: 'internship',
    provider: 'Himalaya Wellness / Dabur',
    duration: '6 Months',
    targetSkill: 'Clinical Research',
    gapClosedPoints: 30,
    difficulty: 'Advanced',
    status: 'recommended'
  }
];

export const JOB_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: 'job-1',
    title: 'Pharmacovigilance Associate - Ayurvedic Drug Safety',
    company: 'Dabur India Ltd.',
    companyLogo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=120&auto=format&fit=crop&q=80',
    location: 'Ghaziabad / Remote',
    type: 'Internship',
    workplace: 'Hybrid',
    stipendOrSalary: '₹25,000 / month',
    duration: '6 Months (PPO Potential)',
    postedDate: '2 days ago',
    deadline: '15 March 2026',
    applicantsCount: 64,
    featured: true,
    description: 'Join Dabur\'s Pharmacovigilance cell to monitor adverse drug reactions for classical and proprietary Ayurvedic formulations, maintain PvPI-aligned case records, and support signal-detection reviews.',
    responsibilities: [
      'Log and triage suspected ADR cases using PvPI-standard forms',
      'Assist with causality assessment (WHO-UMC scale) under supervision',
      'Maintain herb-drug interaction reference documentation',
      'Support periodic safety update report (PSUR) compilation'
    ],
    requiredSkills: [
      { name: 'Pharmacovigilance', weight: 40 },
      { name: 'GMP & Quality', weight: 15 },
      { name: 'Clinical Research', weight: 25 },
      { name: 'Communication', weight: 20 }
    ],
    preferredSkills: ['PvPI ADR Forms', 'MedDRA Coding Basics', 'MS Excel', 'Medical Terminology'],
    eligibility: 'BAMS/BHMS/BUMS/BSMS/B.Pharm (Ayurveda), Final year, CGPA 7.0+'
  },
  {
    id: 'job-2',
    title: 'Quality Control & GMP Compliance Intern',
    company: 'Himalaya Wellness Company',
    companyLogo: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=120&auto=format&fit=crop&q=80',
    location: 'Bangalore, India',
    type: 'Internship',
    workplace: 'On-Site',
    stipendOrSalary: '₹22,000 / month',
    duration: '6 Months',
    postedDate: '1 day ago',
    deadline: '20 March 2026',
    applicantsCount: 112,
    featured: true,
    description: 'Work in Himalaya\'s Quality Assurance lab supporting raw-material testing, HPLC-based standardization of herbal extracts, and Schedule T / WHO-GMP documentation audits.',
    responsibilities: [
      'Perform HPLC and TLC-based identity and purity testing of herbal raw materials',
      'Maintain batch manufacturing and quality control records per GMP',
      'Support internal audits against Schedule T requirements',
      'Document out-of-specification (OOS) investigations'
    ],
    requiredSkills: [
      { name: 'GMP & Quality', weight: 35 },
      { name: 'Lab & Analytics', weight: 35 },
      { name: 'Formulation Sci.', weight: 15 },
      { name: 'Communication', weight: 15 }
    ],
    preferredSkills: ['HPLC', 'TLC', 'Schedule T Documentation', 'ISO 9001'],
    eligibility: 'BAMS/B.Pharm/M.Pharm (Pharmacognosy or Quality Assurance)'
  },
  {
    id: 'job-3',
    title: 'Clinical Research Associate - AYUSH-GCP Trials',
    company: 'Patanjali Research Institute',
    companyLogo: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=120&auto=format&fit=crop&q=80',
    location: 'Haridwar, India',
    type: 'Apprenticeship',
    workplace: 'Hybrid',
    stipendOrSalary: '₹20,000 / month',
    duration: '1 Year',
    postedDate: '4 days ago',
    deadline: '25 March 2026',
    applicantsCount: 48,
    featured: false,
    description: 'Support ongoing AYUSH-GCP compliant clinical trials evaluating polyherbal formulations, including informed consent documentation, case report form (CRF) management, and Ethics Committee coordination.',
    responsibilities: [
      'Assist investigators with participant screening and informed consent documentation',
      'Maintain case report forms (CRFs) and source data verification',
      'Coordinate with Institutional Ethics Committee for protocol amendments'
    ],
    requiredSkills: [
      { name: 'Clinical Research', weight: 40 },
      { name: 'Pharmacovigilance', weight: 20 },
      { name: 'Communication', weight: 25 },
      { name: 'GMP & Quality', weight: 15 }
    ],
    preferredSkills: ['ICH-GCP Basics', 'CRF Documentation', 'MS Excel', 'Data Privacy Awareness'],
    eligibility: 'Pre-final and Final year BAMS/BUMS/BSMS students'
  },
  {
    id: 'job-4',
    title: 'Formulation & Product Development Intern',
    company: 'Baidyanath Ayurved Bhawan',
    companyLogo: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=120&auto=format&fit=crop&q=80',
    location: 'Kolkata, India',
    type: 'Live Project',
    workplace: 'On-Site',
    stipendOrSalary: '₹18,000 / month',
    duration: '4 Months',
    postedDate: '5 days ago',
    deadline: '30 March 2026',
    applicantsCount: 39,
    featured: false,
    description: 'Collaborate with the R&D team on reformulating classical Churna and Arishta preparations into modern dosage forms (tablets, capsules) while preserving Rasashastra principles.',
    responsibilities: [
      'Support stability testing of reformulated dosage forms',
      'Document Bhaishajya Kalpana processing parameters',
      'Assist in shelf-life and packaging compatibility studies'
    ],
    requiredSkills: [
      { name: 'Formulation Sci.', weight: 40 },
      { name: 'Lab & Analytics', weight: 30 },
      { name: 'GMP & Quality', weight: 20 },
      { name: 'Communication', weight: 10 }
    ],
    preferredSkills: ['Bhaishajya Kalpana', 'Stability Studies', 'Packaging Science'],
    eligibility: 'BAMS students with Rasashastra & Bhaishajya Kalpana coursework'
  },
  {
    id: 'job-5',
    title: 'Regulatory Affairs Executive - AYUSH Licensing',
    company: 'Zandu (Emami Ltd.)',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120&auto=format&fit=crop&q=80',
    location: 'Remote (India-wide)',
    type: 'Full-Time',
    workplace: 'Remote',
    stipendOrSalary: '₹4.2 LPA - ₹5.5 LPA',
    postedDate: '3 days ago',
    deadline: '10 April 2026',
    applicantsCount: 180,
    featured: true,
    description: 'Entry-level full-time position for graduates with verified GMP and regulatory competencies. Manage AYUSH product licensing (Form 25/28), labeling compliance, and CDSCO/state licensing authority correspondence.',
    responsibilities: [
      'Prepare and track AYUSH manufacturing license renewals',
      'Ensure label and claim compliance under Drugs & Cosmetics Rules',
      'Liaise with State AYUSH Licensing Authorities on audit queries'
    ],
    requiredSkills: [
      { name: 'GMP & Quality', weight: 35 },
      { name: 'Clinical Research', weight: 20 },
      { name: 'Formulation Sci.', weight: 20 },
      { name: 'Communication', weight: 25 }
    ],
    preferredSkills: ['Schedule T', 'CDSCO Portal', 'Labeling Compliance', 'Drugs & Cosmetics Act'],
    eligibility: 'Graduating batch 2025/2026, BAMS/B.Pharm preferred'
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Pharmacovigilance Associate - Ayurvedic Drug Safety',
    company: 'Dabur India Ltd.',
    companyLogo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=120&auto=format&fit=crop&q=80',
    studentId: 'stu-001',
    studentName: 'Sakshi Sharma',
    appliedDate: '28 Feb 2026',
    status: 'Technical Round',
    fitScore: 92,
    nextStep: 'PvPI case-documentation exercise scheduled for March 8',
    feedback: 'High aptitude in causality assessment and strong ADR documentation project.'
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    jobTitle: 'Quality Control & GMP Compliance Intern',
    company: 'Himalaya Wellness Company',
    companyLogo: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=120&auto=format&fit=crop&q=80',
    studentId: 'stu-001',
    studentName: 'Sakshi Sharma',
    appliedDate: '01 Mar 2026',
    status: 'Shortlisted',
    fitScore: 81,
    nextStep: 'Lab practical assessment under review by QA Lead',
    feedback: 'Strong HPLC standardization project from coursework.'
  },
  {
    id: 'app-3',
    jobId: 'job-3',
    jobTitle: 'Clinical Research Associate - AYUSH-GCP Trials',
    company: 'Patanjali Research Institute',
    companyLogo: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=120&auto=format&fit=crop&q=80',
    studentId: 'stu-001',
    studentName: 'Sakshi Sharma',
    appliedDate: '24 Feb 2026',
    status: 'Interview',
    fitScore: 88,
    nextStep: 'Ethics Committee coordination round scheduled',
    feedback: 'Past internship mentor feedback verified by platform.'
  }
];

export const LEARNING_PROGRAMS: LearningProgram[] = [
  {
    id: 'prog-1',
    title: 'GMP & Quality Systems for Ayurvedic Drug Manufacturing',
    offeredBy: 'Ministry of AYUSH & Pharmexcil',
    partnerLogo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=120&auto=format&fit=crop&q=80',
    instructor: 'Dr. R. Sundaram (AIIA) & S. Patel (QA Head, Pharmexcil)',
    skillsTaught: ['Schedule T Compliance', 'WHO-GMP Documentation', 'Batch Manufacturing Records', 'CoA Preparation'],
    duration: '6 Weeks (Self-paced + Live Labs)',
    level: 'Advanced',
    rating: 4.9,
    reviewsCount: 1420,
    enrolledCount: 3840,
    thumbnail: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    type: 'Industry Certification',
    isIndustryEndorsed: true,
    scholarshipAvailable: true,
    description: 'Learn real-world GMP documentation and audit-readiness practices directly from professionals maintaining certified Ayurvedic manufacturing facilities. Includes 5 hands-on batch-record case studies.',
    syllabus: [
      { week: 1, title: 'Foundations of Schedule T & WHO-GMP', topics: ['Facility & hygiene requirements', 'Raw material approval workflow', 'Documentation hierarchy'] },
      { week: 2, title: 'Batch Manufacturing & Quality Records', topics: ['BMR/BPR preparation', 'Deviation & CAPA handling', 'Change control'] },
      { week: 3, title: 'Audit Readiness & CoA', topics: ['Internal audit checklists', 'Certificate of Analysis preparation', 'Out-of-specification handling'] }
    ]
  },
  {
    id: 'prog-2',
    title: 'Pharmacovigilance Certification Program (PvPI-Aligned)',
    offeredBy: 'Indian Pharmacopoeia Commission (IPC)',
    partnerLogo: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=120&auto=format&fit=crop&q=80',
    instructor: 'A. Narang (Pharmacovigilance Lead, IPC)',
    skillsTaught: ['ADR Reporting', 'Causality Assessment', 'MedDRA Basics', 'Signal Detection'],
    duration: '4 Weeks',
    level: 'Intermediate',
    rating: 4.8,
    reviewsCount: 980,
    enrolledCount: 2950,
    thumbnail: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=600&auto=format&fit=crop&q=80',
    type: 'Bootcamp',
    isIndustryEndorsed: true,
    scholarshipAvailable: true,
    description: 'Master structured adverse-event documentation, WHO-UMC causality scoring, and herb-drug interaction awareness for AYUSH formulations under active pharmacovigilance monitoring.',
    syllabus: [
      { week: 1, title: 'ADR Fundamentals & PvPI Forms', topics: ['Reporting forms', 'Case narrative writing', 'Seriousness classification'] },
      { week: 2, title: 'Causality & Signal Detection', topics: ['WHO-UMC scale', 'Herb-drug interaction screening', 'PSUR basics'] }
    ]
  },
  {
    id: 'prog-3',
    title: 'HPLC & Modern Analytical Techniques for Herbal Standardization',
    offeredBy: 'CSIR-National Botanical Research Institute',
    partnerLogo: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=120&auto=format&fit=crop&q=80',
    instructor: 'Elena Rostova (Analytical Chemist, CSIR-NBRI)',
    skillsTaught: ['HPLC Method Development', 'TLC Fingerprinting', 'GC-MS Basics', 'Method Validation'],
    duration: '5 Weeks',
    level: 'Intermediate',
    rating: 4.95,
    reviewsCount: 2100,
    enrolledCount: 5400,
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
    type: 'Industry Certification',
    isIndustryEndorsed: true,
    scholarshipAvailable: false,
    description: 'Deep dive into chemical fingerprinting, marker compound quantification, and heavy-metal/pesticide-residue testing for herbal raw materials and finished AYUSH products.',
    syllabus: [
      { week: 1, title: 'HPLC Method Fundamentals', topics: ['Column selection', 'Mobile phase optimization', 'Marker compound quantification'] },
      { week: 2, title: 'Validation & Interpretation', topics: ['Method validation parameters', 'Chromatogram troubleshooting', 'Reporting to Pharmacopoeial limits'] }
    ]
  }
];

export const FACULTY_OPPORTUNITIES: FacultyOpportunity[] = [
  {
    id: 'fac-1',
    title: 'Industry Immersion & Sabbatical Fellowship on Modern Pharmacovigilance',
    hostCompany: 'Indian Pharmacopoeia Commission & Dabur R&D',
    type: 'Faculty Internship',
    domain: 'Pharmacovigilance & Drug Safety',
    duration: '2 to 6 Months (Flexible sabbatical)',
    stipendOrGrant: '₹80,000 / month + Lab Research Budget',
    location: 'Ghaziabad / Hybrid',
    description: 'Work alongside PvPI and Dabur pharmacovigilance leads to co-develop AYUSH-specific ADR monitoring frameworks and bring industry-grade case studies back into the classroom.',
    requirements: ['Faculty in Dravyaguna/Rasashastra with minimum 3 years teaching/research experience', 'Interest in drug safety and regulatory science'],
    deadline: '15 April 2026',
    applicantsCount: 18,
    openings: 4
  },
  {
    id: 'fac-2',
    title: 'National Faculty Development Program (FDP) on Integrating Pharmacovigilance & GMP into AYUSH Curriculum',
    hostCompany: 'Ministry of AYUSH Initiative',
    type: 'FDP',
    domain: 'AYUSH Regulatory Science',
    duration: '2 Weeks (Intensive Hybrid)',
    stipendOrGrant: 'Fully Sponsored + ₹15,000 Travel Grant',
    location: 'AIIA, New Delhi & Online',
    description: 'Equip AYUSH faculty with pedagogy, hands-on GMP/PvPI case exercises, and ready-to-teach course modules on modern drug-safety and quality-systems topics.',
    requirements: ['Open to all AYUSH College Professors / Associate Professors'],
    deadline: '28 March 2026',
    applicantsCount: 142,
    openings: 50
  },
  {
    id: 'fac-3',
    title: 'Joint Industry-Academia Research Grant on Herb-Drug Interaction Mapping',
    hostCompany: 'CCRAS & Himalaya Wellness Research',
    type: 'Research Grant',
    domain: 'Pharmacovigilance & Clinical Pharmacology',
    duration: '18 Months',
    stipendOrGrant: '₹32,00,000 Total Project Grant',
    location: 'University Campus + Himalaya R&D Site',
    description: 'Collaborative sponsored research proposal seeking academic co-principal investigators to build a structured herb-drug interaction database for commonly co-prescribed polyherbal formulations.',
    requirements: ['PhD in relevant AYUSH discipline', 'Prior publications in pharmacology or drug safety'],
    deadline: '30 April 2026',
    applicantsCount: 9,
    openings: 2
  }
];

export const CURRICULUM_SKILL_INSIGHTS: CurriculumSkillInsight[] = [
  {
    domain: 'Pharmacovigilance & Drug Safety Monitoring',
    industryDemandGrowth: 58,
    academicCoverageScore: 38,
    gapSeverity: 'High',
    inDemandTechnologies: ['PvPI ADR Reporting Format', 'WHO-UMC Causality Scale', 'MedDRA Coding Basics', 'Herb-Drug Interaction Screening'],
    suggestedCurriculumModules: [
      'Introduce a dedicated Pharmacovigilance practicum in final-year Dravyaguna coursework',
      'Add structured ADR case-writing exercises using real PvPI reporting formats'
    ]
  },
  {
    domain: 'GMP & Regulatory Compliance',
    industryDemandGrowth: 46,
    academicCoverageScore: 45,
    gapSeverity: 'High',
    inDemandTechnologies: ['Schedule T Documentation', 'WHO-GMP Batch Records', 'CDSCO Licensing Process', 'ISO 9001:2015 Quality Systems'],
    suggestedCurriculumModules: [
      'Replace theoretical GMP lectures with hands-on batch manufacturing record (BMR) simulation labs',
      'Add a module on AYUSH product licensing (Form 25/28) and State Licensing Authority processes'
    ]
  },
  {
    domain: 'Modern Analytical & Instrumentation Techniques',
    industryDemandGrowth: 41,
    academicCoverageScore: 40,
    gapSeverity: 'Moderate',
    inDemandTechnologies: ['HPLC Method Development', 'GC-MS for Residue Testing', 'TLC Fingerprinting', 'Heavy Metal & Pesticide Screening'],
    suggestedCurriculumModules: [
      'Upgrade Rasashastra & Bhaishajya Kalpana labs with instrument-time on HPLC/GC-MS rather than classical methods alone'
    ]
  },
  {
    domain: 'Clinical Research & AYUSH-GCP',
    industryDemandGrowth: 39,
    academicCoverageScore: 50,
    gapSeverity: 'Moderate',
    inDemandTechnologies: ['Informed Consent Documentation', 'Case Report Form (CRF) Management', 'Ethics Committee Protocols', 'ICH-GCP Basics'],
    suggestedCurriculumModules: [
      'Integrate a mock clinical-trial coordination exercise into the community medicine (Swasthavritta) curriculum'
    ]
  }
];

export const INSTITUTIONAL_METRICS: InstitutionalMetrics = {
  totalStudents: 2180,
  placementReadinessRate: 71.4,
  activeIndustryPartners: 34,
  internshipsSecuredThisYear: 486,
  avgSkillGapClosedPct: 58.2,
  departmentReadiness: [
    { dept: 'Ayurveda (BAMS)', studentCount: 780, readinessScore: 76, topGapSkill: 'Pharmacovigilance', topStrength: 'Formulation Sciences' },
    { dept: 'Homeopathy (BHMS)', studentCount: 420, readinessScore: 70, topGapSkill: 'GMP & Quality Systems', topStrength: 'Clinical Communication' },
    { dept: 'Unani (BUMS)', studentCount: 260, readinessScore: 66, topGapSkill: 'Lab & Analytical Techniques', topStrength: 'Traditional Diagnostics' },
    { dept: 'Siddha (BSMS)', studentCount: 190, readinessScore: 64, topGapSkill: 'Regulatory Affairs', topStrength: 'Formulation Sciences' },
    { dept: 'Yoga & Naturopathy (BNYS)', studentCount: 310, readinessScore: 73, topGapSkill: 'Clinical Research', topStrength: 'Patient Counselling' },
    { dept: 'AYUSH Pharmacy', studentCount: 220, readinessScore: 68, topGapSkill: 'HPLC & Instrumentation', topStrength: 'GMP Documentation' }
  ],
  monthlyPlacementTrend: [
    { month: 'Sep 2025', placed: 52, target: 60 },
    { month: 'Oct 2025', placed: 98, target: 110 },
    { month: 'Nov 2025', placed: 175, target: 180 },
    { month: 'Dec 2025', placed: 268, target: 260 },
    { month: 'Jan 2026', placed: 372, target: 350 },
    { month: 'Feb 2026', placed: 486, target: 440 }
  ],
  hiringDomainBreakdown: [
    { domain: 'Pharmacovigilance & Drug Safety', percentage: 30, color: '#8a6d1e' },
    { domain: 'GMP & Quality Control', percentage: 27, color: '#1c463e' },
    { domain: 'Clinical Research', percentage: 20, color: '#4f8f83' },
    { domain: 'Formulation & Manufacturing', percentage: 15, color: '#c9971c' },
    { domain: 'Regulatory Affairs', percentage: 8, color: '#a15c3e' }
  ]
};

export const SAMPLE_CANDIDATES_FOR_INDUSTRY = [
  {
    id: 'cand-1',
    name: 'Sakshi Sharma',
    college: 'All India Institute of Ayurveda (AIIA)',
    roleTarget: 'Pharmacovigilance Associate - Ayurvedic Drug Safety',
    targetJobId: 'job-1',
    cgpa: 8.62,
    skills: [
      { name: 'Pharmacovigilance', level: 88 },
      { name: 'GMP & Quality', level: 74 },
      { name: 'Clinical Research', level: 70 },
      { name: 'Communication', level: 90 }
    ],
    status: 'Applied to Dabur India Ltd.',
    assessmentScore: 92,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    verifiedBadges: ['Top 5% Score', 'PvPI Trained']
  },
  {
    id: 'cand-2',
    name: 'Pooja Venkatesh',
    college: 'National Institute of Ayurveda, Jaipur',
    roleTarget: 'Quality Control & GMP Compliance Intern',
    targetJobId: 'job-2',
    cgpa: 9.02,
    skills: [
      { name: 'GMP & Quality', level: 89 },
      { name: 'Lab & Analytics', level: 85 },
      { name: 'Formulation Sci.', level: 60 },
      { name: 'Communication', level: 72 }
    ],
    status: 'Shortlisted',
    assessmentScore: 89,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    verifiedBadges: ['NABL Lab Certified', 'Published Paper']
  },
  {
    id: 'cand-3',
    name: 'Rohan Deshmukh',
    college: 'Government Ayurved College, Nagpur',
    roleTarget: 'Clinical Research Associate - AYUSH-GCP Trials',
    targetJobId: 'job-3',
    cgpa: 8.35,
    skills: [
      { name: 'Clinical Research', level: 86 },
      { name: 'Pharmacovigilance', level: 62 },
      { name: 'Communication', level: 80 },
      { name: 'GMP & Quality', level: 55 }
    ],
    status: 'Under Review',
    assessmentScore: 85,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    verifiedBadges: ['AYUSH-GCP Certified', 'Hackathon Winner']
  },
  {
    id: 'cand-4',
    name: 'Ananya Iyer',
    college: 'Sri Sri College of Ayurvedic Science',
    roleTarget: 'Regulatory Affairs Executive - AYUSH Licensing',
    targetJobId: 'job-5',
    cgpa: 8.68,
    skills: [
      { name: 'GMP & Quality', level: 80 },
      { name: 'Clinical Research', level: 58 },
      { name: 'Formulation Sci.', level: 65 },
      { name: 'Communication', level: 78 }
    ],
    status: 'Applied',
    assessmentScore: 84,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    verifiedBadges: ['AYUSH Licensing Certified']
  }
];

export interface LearningOutcomeRecord {
  programId: string;
  programTitle: string;
  cohortSize: number;
  avgSkillScoreBefore: number;
  avgSkillScoreAfter: number;
  placementRateBeforePct: number;
  placementRateAfterPct: number;
  avgTimeToPlacementDaysBefore: number;
  avgTimeToPlacementDaysAfter: number;
}

export const LEARNING_OUTCOMES: LearningOutcomeRecord[] = [
  {
    programId: 'prog-1',
    programTitle: 'GMP & Quality Systems for Ayurvedic Drug Manufacturing',
    cohortSize: 214,
    avgSkillScoreBefore: 52,
    avgSkillScoreAfter: 81,
    placementRateBeforePct: 38,
    placementRateAfterPct: 67,
    avgTimeToPlacementDaysBefore: 142,
    avgTimeToPlacementDaysAfter: 79
  },
  {
    programId: 'prog-2',
    programTitle: 'Pharmacovigilance Certification Program (PvPI-Aligned)',
    cohortSize: 168,
    avgSkillScoreBefore: 46,
    avgSkillScoreAfter: 85,
    placementRateBeforePct: 33,
    placementRateAfterPct: 72,
    avgTimeToPlacementDaysBefore: 156,
    avgTimeToPlacementDaysAfter: 68
  },
  {
    programId: 'prog-3',
    programTitle: 'HPLC & Modern Analytical Techniques for Herbal Standardization',
    cohortSize: 190,
    avgSkillScoreBefore: 41,
    avgSkillScoreAfter: 76,
    placementRateBeforePct: 29,
    placementRateAfterPct: 58,
    avgTimeToPlacementDaysBefore: 168,
    avgTimeToPlacementDaysAfter: 94
  }
];

export const INITIAL_INDUSTRY_SKILL_NEEDS: IndustrySkillNeed[] = [
  {
    id: 'need-seed-1',
    submittedBy: 'Himalaya Wellness Company',
    skillDomain: 'Lab & Analytics',
    description: 'Graduates rarely arrive with hands-on GC-MS experience for pesticide-residue screening — most only know classical TLC methods.',
    urgency: 'High',
    submittedAt: '3 days ago'
  },
  {
    id: 'need-seed-2',
    submittedBy: 'Dabur India Ltd.',
    skillDomain: 'Pharmacovigilance',
    description: 'Need more familiarity with structured PvPI case-narrative writing, not just theoretical ADR definitions.',
    urgency: 'Medium',
    submittedAt: '6 days ago'
  }
];
