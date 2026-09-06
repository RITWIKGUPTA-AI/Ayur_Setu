/**
 * AYUSH Skill Ontology
 *
 * A structured map from traditional AYUSH curriculum subjects to the modern industry
 * certifications and NSQF (National Skills Qualification Framework) levels they map to.
 * This is what actually drives the Curriculum Intelligence and gap-scoring logic elsewhere
 * in the app, instead of a flat, disconnected list of "skills to learn". Built from the
 * stakeholder interviews and job-description analysis referenced in the project README.
 */

export interface OntologyCertification {
  name: string;
  issuingBody: string;
  nsqfLevel: number; // 1-10 per India's National Skills Qualification Framework
}

export interface OntologyNode {
  curriculumSubject: string; // the traditional subject as taught in a BAMS/BHMS/BUMS/BSMS syllabus
  degreeStreams: string[]; // which AYUSH degree programs include this subject
  industrySkillDomain: string; // the modern industry-facing skill domain this subject should feed into
  certifications: OntologyCertification[];
  representativeEmployers: string[];
}

export const AYUSH_SKILL_ONTOLOGY: OntologyNode[] = [
  {
    curriculumSubject: 'Rasashastra & Bhaishajya Kalpana (Pharmaceutical Science)',
    degreeStreams: ['BAMS'],
    industrySkillDomain: 'GMP & Quality Systems',
    certifications: [
      { name: 'GMP for Ayurvedic, Siddha & Unani Drugs', issuingBody: 'Ministry of AYUSH / Pharmexcil', nsqfLevel: 5 },
      { name: 'ISO 9001:2015 Quality Management Systems', issuingBody: 'Quality Council of India (QCI)', nsqfLevel: 5 }
    ],
    representativeEmployers: ['Dabur India Ltd.', 'Himalaya Wellness Company', 'Baidyanath Ayurved Bhawan']
  },
  {
    curriculumSubject: 'Agada Tantra (Toxicology) & Vyavahara Ayurveda',
    degreeStreams: ['BAMS'],
    industrySkillDomain: 'Pharmacovigilance & Drug Safety',
    certifications: [
      { name: 'Pharmacovigilance Associate Certification (PvPI)', issuingBody: 'Indian Pharmacopoeia Commission (IPC)', nsqfLevel: 6 }
    ],
    representativeEmployers: ['Dabur India Ltd.', 'Zandu (Emami Ltd.)', 'Indian Pharmacopoeia Commission']
  },
  {
    curriculumSubject: 'Dravyaguna Vijnana (Pharmacognosy)',
    degreeStreams: ['BAMS'],
    industrySkillDomain: 'Lab & Analytical Techniques',
    certifications: [
      { name: 'HPLC & Analytical Method Validation', issuingBody: 'CSIR-National Botanical Research Institute', nsqfLevel: 6 }
    ],
    representativeEmployers: ['Himalaya Wellness Company', 'NABL-accredited testing labs']
  },
  {
    curriculumSubject: 'Swasthavritta & Community Medicine',
    degreeStreams: ['BAMS', 'BHMS', 'BUMS', 'BSMS'],
    industrySkillDomain: 'Clinical Research & AYUSH-GCP',
    certifications: [
      { name: 'AYUSH-GCP: Good Clinical Practice for Traditional Medicine Trials', issuingBody: 'All India Institute of Ayurveda (AIIA)', nsqfLevel: 6 }
    ],
    representativeEmployers: ['Patanjali Research Institute', 'CCRAS', 'AIIA']
  },
  {
    curriculumSubject: 'Kayachikitsa (Internal Medicine) & Clinical Postings',
    degreeStreams: ['BAMS'],
    industrySkillDomain: 'Formulation & Manufacturing',
    certifications: [
      { name: 'Stability & Shelf-Life Studies for Herbal Formulations', issuingBody: 'Pharmexcil', nsqfLevel: 5 }
    ],
    representativeEmployers: ['Baidyanath Ayurved Bhawan', 'Patanjali Ayurved']
  }
];
