variable "contact_role_arn" {
  type = string
}

variable "cf_secret_key" {
  type      = string
  sensitive = true
}

variable "ses_target" {
  type = string
}
