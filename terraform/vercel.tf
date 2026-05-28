resource "vercel_project_environment_variable" "aws_region" {
  project_id = var.vercel_project_id
  key        = "AWS_REGION"
  value      = "eu-central-1"
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "aws_role_arn" {
  project_id = var.vercel_project_id
  key        = "AWS_ROLE_ARN"
  value      = module.iam.invoker_role_arn
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "contact_lambda" {
  project_id = var.vercel_project_id
  key        = "CONTACT_LAMBDA"
  value      = "ArcadeLabContact"
  target     = ["production", "preview", "development"]
}
