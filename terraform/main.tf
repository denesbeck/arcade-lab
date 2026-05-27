module "core" {
  source = "./modules/core"

  contact_role_arn = module.iam.contact_role_arn
}

module "iam" {
  source = "./modules/iam"

  repo         = var.repo
  s3_resources = module.core.s3_resources
}
