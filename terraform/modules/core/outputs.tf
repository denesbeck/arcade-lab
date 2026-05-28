output "s3_resources" {
  value = [
    aws_s3_bucket.functions.arn,
    "${aws_s3_bucket.functions.arn}/*",
    aws_s3_bucket.layers.arn,
    "${aws_s3_bucket.layers.arn}/*",
    aws_s3_bucket.hashes.arn,
    "${aws_s3_bucket.hashes.arn}/*",
  ]
}

output "functions_s3_bucket" {
  value = aws_s3_bucket.functions.bucket
}

output "layers_s3_bucket" {
  value = aws_s3_bucket.layers.bucket
}

output "hashes_s3_bucket" {
  value = aws_s3_bucket.hashes.bucket
}

output "ses_verification_token" {
  value = aws_ses_domain_identity.arcade_lab.verification_token
}

output "ses_dkim_tokens" {
  value = aws_ses_domain_dkim.arcade_lab.dkim_tokens
}
