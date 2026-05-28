resource "aws_ses_domain_identity" "arcade_lab" {
  domain = "arcade-lab.io"
}

resource "aws_ses_domain_dkim" "arcade_lab" {
  domain = aws_ses_domain_identity.arcade_lab.domain
}
