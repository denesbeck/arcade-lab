import type { BlogMeta } from '../../app/blog/_config/metadata'

export type BlogPostMeta = BlogMeta

export interface BlogPost extends BlogMeta {
  content: string
}

export interface PersonalInfo {
  name: string
  location: string
  company: string
  role: string
  bio: string
  skills: string[]
  certificates: { name: string; url: string }[]
  connections: { platform: string; url: string }[]
}

export interface Project {
  title: string
  subtitle: string
  highlights: string[]
  tech: string[]
  url: string
  status: 'active' | 'archived'
  relatedBlogPostIds: number[]
}

export interface ToolResult {
  [key: string]: unknown
  content: { type: 'text'; text: string }[]
}
