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
