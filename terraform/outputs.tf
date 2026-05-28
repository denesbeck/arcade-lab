output "functions_s3_bucket" {
  value = module.core.functions_s3_bucket
}

output "layers_s3_bucket" {
  value = module.core.layers_s3_bucket
}

output "hashes_s3_bucket" {
  value = module.core.hashes_s3_bucket
}

output "ses_verification_token" {
  value = module.core.ses_verification_token
}

output "ses_dkim_tokens" {
  value = module.core.ses_dkim_tokens
}

output "invoker_role_arn" {
  value = module.iam.invoker_role_arn
}
