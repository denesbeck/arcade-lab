resource "vercel_project" "arcade_lab" {
  name      = "arcade-lab"
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = "denesbeck/arcade-lab"
  }

  oidc_token_config = {
    enabled     = true
    issuer_mode = "team"
  }
}

resource "vercel_project_environment_variable" "aws_region" {
  project_id = vercel_project.arcade_lab.id
  sensitive  = false
  key        = "AWS_REGION"
  value      = "eu-central-1"
  target     = ["production"]
}

resource "vercel_project_environment_variable" "aws_role_arn" {
  project_id = vercel_project.arcade_lab.id
  sensitive  = true
  key        = "AWS_ROLE_ARN"
  value      = module.iam.invoker_role_arn
  target     = ["production"]
}

resource "vercel_project_environment_variable" "contact_lambda" {
  project_id = vercel_project.arcade_lab.id
  sensitive  = false
  key        = "CONTACT_LAMBDA"
  value      = "ArcadeLabContact"
  target     = ["production"]
}

resource "vercel_project_environment_variable" "anthropic_api_key" {
  project_id = vercel_project.arcade_lab.id
  sensitive  = true
  key        = "ANTHROPIC_API_KEY"
  value      = var.anthropic_api_key
  target     = ["production"]
}

resource "vercel_project_environment_variable" "public_domain" {
  project_id = vercel_project.arcade_lab.id
  sensitive  = false
  key        = "NEXT_PUBLIC_DOMAIN"
  value      = "arcade-lab.io"
  target     = ["production"]
}

resource "vercel_project_environment_variable" "ts_site_key" {
  project_id = vercel_project.arcade_lab.id
  sensitive  = false
  key        = "NEXT_PUBLIC_TS_SITE_KEY"
  value      = "0x4AAAAAABfQOswuSiTvm6ip"
  target     = ["production"]
}
