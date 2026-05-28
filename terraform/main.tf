module "core" {
  source = "./modules/core"

  contact_role_arn = module.iam.contact_role_arn
  cf_secret_key    = var.cf_secret_key
  ses_target       = var.ses_target
}

module "iam" {
  source = "./modules/iam"

  repo         = var.repo
  s3_resources = module.core.s3_resources
}
