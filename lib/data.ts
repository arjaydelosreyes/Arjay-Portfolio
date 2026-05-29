import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'
import {
  Html5, Css, Javascript, Typescript,
  React as ReactIcon, Nextdotjs, TailwindCss, Vite,
  Nodedotjs, Expressdotjs, Python, Djangorest, Fastapi, Socketdotio,
  Mysql, Postgresql, Supabase, Firebase, Sqlite,
  Opencv, Numpy, GoogleColab, Roboflow,
  Anthropic, N8n,
  Git, Github, Vercel, Railway, GoogleDrive, Upstash,
} from '@thesvg/react'

export type SvgIcon = ForwardRefExoticComponent<SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>>

export type Project = {
  name: string
  description: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export type Skill = {
  name: string
  Icon?: SvgIcon
}

export type SkillCategory = {
  name: string
  skills: Skill[]
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
    skills: [
      { name: 'HTML', Icon: Html5 },
      { name: 'CSS', Icon: Css },
      { name: 'JavaScript', Icon: Javascript },
      { name: 'TypeScript', Icon: Typescript },
      { name: 'React 18', Icon: ReactIcon },
      { name: 'Next.js', Icon: Nextdotjs },
      { name: 'Tailwind CSS', Icon: TailwindCss },
      { name: 'Vite', Icon: Vite },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', Icon: Nodedotjs },
      { name: 'Express', Icon: Expressdotjs },
      { name: 'Python', Icon: Python },
      { name: 'Django REST', Icon: Djangorest },
      { name: 'FastAPI', Icon: Fastapi },
      { name: 'Socket.IO', Icon: Socketdotio },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'MySQL', Icon: Mysql },
      { name: 'PostgreSQL', Icon: Postgresql },
      { name: 'Supabase', Icon: Supabase },
      { name: 'Firebase', Icon: Firebase },
      { name: 'SQLite', Icon: Sqlite },
    ],
  },
  {
    name: 'AI / ML',
    skills: [
      { name: 'OpenCV', Icon: Opencv },
      { name: 'NumPy', Icon: Numpy },
      { name: 'Google Colab', Icon: GoogleColab },
      { name: 'Roboflow', Icon: Roboflow },
    ],
  },
  {
    name: 'AI Automation',
    skills: [
      { name: 'Claude API', Icon: Anthropic },
      { name: 'N8N', Icon: N8n },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', Icon: Git },
      { name: 'GitHub', Icon: Github },
      { name: 'Vercel', Icon: Vercel },
      { name: 'Railway', Icon: Railway },
      { name: 'Google Drive API', Icon: GoogleDrive },
      { name: 'Upstash Redis', Icon: Upstash },
    ],
  },
]
