output "contact_role_arn" {
  value = aws_iam_role.contact.arn
}

output "deploy_role_arn" {
  value = aws_iam_role.deploy.arn
}

output "invoker_role_arn" {
  value = aws_iam_role.invoker.arn
}
