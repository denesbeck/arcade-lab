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
