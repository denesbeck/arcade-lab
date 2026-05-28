variable "repo" {
  type        = string
  default     = "denesbeck/arcade-lab"
  description = "GitHub repository in the format `owner/repo`"
}

variable "cf_secret_key" {
  type        = string
  sensitive   = true
  description = "Cloudflare Turnstile secret key"
}

variable "ses_target" {
  type        = string
  description = "SES destination email for contact form submissions"
}

variable "cloudflare_api_token" {
  type        = string
  sensitive   = true
  description = "Cloudflare API token with Zone:DNS:Edit permissions on arcade-lab.io"
}

variable "vercel_api_token" {
  type        = string
  sensitive   = true
  description = "Vercel API token for managing project environment variables"
}

variable "vercel_project_id" {
  type        = string
  default     = "prj_yJnmpKBmpqjtME6BATD7habvf0sO"
  description = "Vercel project ID for arcade-lab"
}
