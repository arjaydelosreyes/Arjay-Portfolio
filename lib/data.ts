export type Project = {
  name: string
  description: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export type SkillCategory = {
  name: string
  skills: string[]
}

export const bio = {
  name: 'Arjay Delos Reyes',
  title: 'Full-Stack Developer & AI Automation Builder',
  tagline: 'Building production-grade web apps and AI-powered automation workflows with Claude MCP, N8N, and modern full-stack tooling.',
  summary:
    'Graduating BS Information Technology student with hands-on experience building production-grade web applications. Sole developer of Instroom Post Tracker, a multi-tenant B2B SaaS platform. Co-developer of SagiTech, a CNN-based banana ripeness prediction system. Skilled in modern full-stack development and proficient in leveraging AI tools to accelerate development. Builds AI-driven automation workflows by connecting Claude MCP to N8N, using community workflows from GitHub to rapidly deliver production-ready automations.',
  email: 'arjay09.adr43@gmail.com',
  github: 'https://github.com/arjaydelosreyes',
  location: 'Calapan City, Oriental Mindoro, Philippines',
  certification: {
    name: 'IT Specialist — Data Analytics',
    issuer: 'Certiport / CertNexus',
    date: 'December 16, 2025',
  },
}

export const projects: Project[] = [
  {
    name: 'Instroom Post Tracker',
    description:
      'Multi-tenant B2B SaaS platform for influencer marketing agencies. Sole developer. Handles automated post detection, content downloading, and metrics pipelines with row-level security.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Railway', 'Vercel', 'Redis'],
    liveUrl: 'https://posttracker.instroom.io',
  },
  {
    name: 'SagiTech',
    description:
      'AI platform for real-time Saba banana ripeness classification and yield prediction for Filipino farmers. Integrates a custom-trained YOLOv8 model with weather-based yield forecasting.',
    tags: ['React 18', 'TypeScript', 'Django REST', 'FastAPI', 'YOLOv8', 'Socket.IO', 'Firebase'],
  },
]

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React 18', 'Next.js', 'Tailwind CSS', 'Vite'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'Django REST', 'FastAPI', 'Socket.IO'],
  },
  {
    name: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'Supabase', 'Firebase', 'SQLite'],
  },
  {
    name: 'AI / ML',
    skills: ['YOLOv8', 'OpenCV', 'NumPy', 'PIL', 'Google Colab', 'Roboflow'],
  },
  {
    name: 'AI Automation',
    skills: ['Claude API', 'MCP (Model Context Protocol)', 'N8N', 'Workflow Automation', 'Prompt Engineering'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'GitHub', 'Vercel', 'Railway', 'Google Drive API', 'Upstash Redis'],
  },
]
