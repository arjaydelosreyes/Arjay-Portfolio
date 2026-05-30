import type { CSSProperties } from 'react'
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'
import {
  Html5, Css, Javascript, Typescript,
  React as ReactIcon, TailwindCss, Vite,
  Nodedotjs, Expressdotjs, Djangorest, Fastapi, Socketdotio,
  Supabase, Firebase, Sqlite,
  Opencv, Numpy, GoogleColab, Roboflow,
  Anthropic, N8n,
  Git, Github, Vercel, GoogleDrive, Upstash,
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
  iconUrl?: string
  iconUrlLight?: string
  iconUrlDark?: string
  iconStyle?: CSSProperties
  monoOn?: 'light' | 'dark' | 'both'
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
      {
        name: 'Next.js',
        iconUrlLight: 'https://thesvg.org/icons/nextdotjs/wordmark-light.svg',
        iconUrlDark: 'https://thesvg.org/icons/nextdotjs/wordmark-dark.svg',
        iconStyle: { width: 72, height: 18, objectFit: 'contain' },
      },
      { name: 'Tailwind CSS', Icon: TailwindCss },
      { name: 'Vite', Icon: Vite },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', Icon: Nodedotjs },
      { name: 'Express', Icon: Expressdotjs, monoOn: 'light' },
      { name: 'Python', iconUrl: 'https://thesvg.org/icons/python/default.svg' },
      { name: 'Django REST', Icon: Djangorest },
      { name: 'FastAPI', Icon: Fastapi },
      { name: 'Socket.IO', Icon: Socketdotio, monoOn: 'light' },
    ],
  },
  {
    name: 'Databases',
    skills: [
      {
        name: 'MySQL',
        iconUrlLight: 'https://thesvg.org/icons/mysql/light.svg',
        iconUrlDark: 'https://thesvg.org/icons/mysql/dark.svg',
      },
      { name: 'PostgreSQL', iconUrl: 'https://thesvg.org/icons/postgresql/mono.svg', monoOn: 'dark' },
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
      { name: 'Claude API', Icon: Anthropic, monoOn: 'light' },
      { name: 'N8N', Icon: N8n },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', Icon: Git },
      { name: 'GitHub', Icon: Github, monoOn: 'dark' },
      { name: 'Vercel', Icon: Vercel, monoOn: 'light' },
      {
        name: 'Railway',
        iconUrlLight: 'https://thesvg.org/icons/railway/light.svg',
        iconUrlDark: 'https://thesvg.org/icons/railway/dark.svg',
      },
      { name: 'Google Drive API', Icon: GoogleDrive },
      { name: 'Upstash Redis', Icon: Upstash },
    ],
  },
]
