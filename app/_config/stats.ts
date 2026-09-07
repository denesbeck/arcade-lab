import { CERTIFICATES, SKILLS } from '@/about/_config/data'
import BLOG_ENTRIES from '@/blog/_config/data'
import { isPublished } from '@/blog/_utils/isPublished'
import PROJECTS from '@/work/_config/data'

const CAREER_START_YEAR = 2019

export const YEARS = new Date().getFullYear() - CAREER_START_YEAR
export const POSTS = BLOG_ENTRIES.filter(isPublished).length
export const ACTIVE_PROJECTS = PROJECTS.filter(
  (project) => project.status === 'active'
).length
export const CERT_COUNT = CERTIFICATES.length
export const TOOL_COUNT = SKILLS.length
