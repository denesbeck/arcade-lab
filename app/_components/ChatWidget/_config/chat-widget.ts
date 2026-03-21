export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi! I'm an AI assistant for Denes Beck's portfolio. Ask me about blog posts, projects, skills, or anything you'd like to know!",
}

export const MAX_USER_MESSAGES = 15
export const MIN_WIDTH = 320
export const MIN_HEIGHT = 400
export const DEFAULT_WIDTH = 400
export const DEFAULT_HEIGHT = 500
