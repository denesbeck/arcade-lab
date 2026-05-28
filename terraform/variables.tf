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
