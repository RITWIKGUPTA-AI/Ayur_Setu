import { Router } from 'express';
import { db } from '../db/database.js';

const router = Router();

// 1. Health Check
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'AyurSetu API Server',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// 2. Student Profile
router.get('/profile', (_req, res) => {
  try {
    const profile = db.getProfile();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student profile' });
  }
});

router.put('/profile', (req, res) => {
  try {
    const updated = db.updateProfile(req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student profile' });
  }
});

// 3. Jobs & Opportunities
router.get('/jobs', (_req, res) => {
  try {
    const jobs = db.getJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

router.get('/jobs/:id', (req, res) => {
  try {
    const job = db.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

router.post('/jobs', (req, res) => {
  try {
    const { title, company, companyLogo, location, type, workplace, stipendOrSalary, deadline, description, responsibilities, requiredSkills, preferredSkills, eligibility, featured } = req.body;
    if (!title || !company) {
      return res.status(400).json({ error: 'Title and company are required' });
    }
    const newJob = db.createJob({
      title,
      company,
      companyLogo: companyLogo || 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80',
      location: location || 'Remote, India',
      type: type || 'Full-Time',
      workplace: workplace || 'Hybrid',
      stipendOrSalary: stipendOrSalary || '₹10 - 15 LPA',
      deadline: deadline || 'In 30 days',
      description: description || '',
      responsibilities: responsibilities || [],
      requiredSkills: requiredSkills || [],
      preferredSkills: preferredSkills || [],
      eligibility: eligibility || 'Final year B.Tech / M.Tech / MCA',
      featured: !!featured
    });
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post new job' });
  }
});

// 4. Job Applications
router.get('/applications', (req, res) => {
  try {
    const studentId = req.query.studentId as string | undefined;
    const apps = db.getApplications(studentId);
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

router.post('/applications', (req, res) => {
  try {
    const { jobId, studentId } = req.body;
    if (!jobId) {
      return res.status(400).json({ error: 'jobId is required' });
    }
    const targetStudentId = studentId || db.getProfile().id;
    const result = db.createApplication(jobId, targetStudentId);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    res.status(201).json(result.application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

router.patch('/applications/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    const updated = db.updateApplicationStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application status' });
  }
});

// 5. Learning Programs
router.get('/learning-programs', (_req, res) => {
  try {
    res.json(db.getLearningPrograms());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch learning programs' });
  }
});

router.post('/learning-programs/:id/enroll', (req, res) => {
  try {
    const result = db.enrollInProgram(req.params.id);
    if (!result.success) {
      return res.status(404).json({ error: result.error });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to enroll in program' });
  }
});

// 6. Faculty Opportunities
router.get('/faculty-opportunities', (_req, res) => {
  try {
    res.json(db.getFacultyOpportunities());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch faculty opportunities' });
  }
});

// 7. Skill Roadmap
router.get('/roadmap', (_req, res) => {
  try {
    res.json(db.getRoadmapItems());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roadmap items' });
  }
});

router.post('/roadmap', (req, res) => {
  try {
    const { title, type, provider, duration, targetSkill, gapClosedPoints, difficulty, status, linkUrl } = req.body;
    if (!title || !targetSkill) {
      return res.status(400).json({ error: 'Title and targetSkill are required' });
    }
    const item = db.addRoadmapItem({
      title,
      type: type || 'course',
      provider: provider || 'AyurSetu Skill Hub',
      duration: duration || '4 weeks',
      targetSkill,
      gapClosedPoints: gapClosedPoints || 15,
      difficulty: difficulty || 'Intermediate',
      status: status || 'recommended',
      linkUrl
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add roadmap item' });
  }
});

// 8. Assessment Engine
router.get('/assessment/questions', (_req, res) => {
  try {
    res.json(db.getAssessmentQuestions());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assessment questions' });
  }
});

router.post('/assessment/submit', (req, res) => {
  try {
    const { categoryScores } = req.body;
    if (!categoryScores || typeof categoryScores !== 'object') {
      return res.status(400).json({ error: 'categoryScores object is required' });
    }
    const result = db.submitAssessment(categoryScores);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process assessment submission' });
  }
});

// 9. Industry Skill Signals (industry -> academia closed feedback loop)
router.get('/industry-skill-needs', (_req, res) => {
  try {
    res.json(db.getIndustrySkillNeeds());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch industry skill signals' });
  }
});

router.post('/industry-skill-needs', (req, res) => {
  try {
    const { submittedBy, skillDomain, description, urgency } = req.body;
    if (!skillDomain || !description) {
      return res.status(400).json({ error: 'skillDomain and description are required' });
    }
    const validUrgencies = ['High', 'Medium', 'Low'];
    const need = db.submitIndustrySkillNeed({
      submittedBy: submittedBy || 'Industry Partner',
      skillDomain,
      description,
      urgency: validUrgencies.includes(urgency) ? urgency : 'Medium'
    });
    res.status(201).json(need);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit industry skill signal' });
  }
});

// 9b. Institutional Analytics & Curriculum Insights
router.get('/analytics', (_req, res) => {
  try {
    res.json(db.getAnalytics());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// 10. Auth / User Session simulation
router.post('/auth/login', (req, res) => {
  const { role, email } = req.body;
  const validRoles = ['student', 'academician', 'industry', 'institution'];
  const assignedRole = validRoles.includes(role) ? role : 'student';

  res.json({
    token: `token_${assignedRole}_${Date.now()}`,
    user: {
      id: assignedRole === 'student' ? db.getProfile().id : `user-${assignedRole}-001`,
      email: email || `${assignedRole}@ayursetu.gov.in`,
      role: assignedRole,
      name: assignedRole === 'student' ? db.getProfile().name : `${assignedRole.toUpperCase()} Officer`
    }
  });
});

export default router;
