resource "aws_lambda_function" "contact" {
  function_name = "ArcadeLabContact"
  role          = var.contact_role_arn
  handler       = "PLACEHOLDER"
  runtime       = "nodejs22.x"
  filename      = "${path.root}/PLACEHOLDER.zip"
  lifecycle {
    ignore_changes = all
  }
}
