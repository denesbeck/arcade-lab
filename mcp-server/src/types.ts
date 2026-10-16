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
  certificates: { name: string; url: string; expired?: boolean }[]
  connections: { platform: string; url: string }[]
}

export type Priority = 'low' | 'medium' | 'high' | 'critical'

export type Project = {
  title: string
  subtitle: string
  highlights: string[]
  tech: string[]
  url: string
  relatedBlogPostIds: number[]
} & (
  | { status: 'active'; priority: Priority }
  | { status: 'archived'; priority?: never }
)

export interface ToolResult {
  [key: string]: unknown
  content: { type: 'text'; text: string }[]
}
