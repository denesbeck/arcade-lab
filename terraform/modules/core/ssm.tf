resource "aws_ssm_parameter" "cf_secret_key" {
  name  = "/arcade-lab.io/contact/CF/SECRET_KEY"
  type  = "SecureString"
  value = var.cf_secret_key
}

resource "aws_ssm_parameter" "ses_target" {
  name  = "/arcade-lab.io/contact/ses/TARGET"
  type  = "SecureString"
  value = var.ses_target
}

resource "aws_ssm_parameter" "ses_source" {
  name  = "/arcade-lab.io/contact/ses/SOURCE"
  type  = "SecureString"
  value = "contact@arcade-lab.io"
}
