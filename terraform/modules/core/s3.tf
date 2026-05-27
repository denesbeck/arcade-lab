resource "random_string" "suffix" {
  length  = 16
  upper   = false
  lower   = true
  numeric = true
  special = false
}

resource "aws_s3_bucket" "functions" {
  bucket        = "arcade-lab-functions-${random_string.suffix.id}"
  force_destroy = true

  tags = {
    application = "arcade-lab"
  }
}

resource "aws_s3_bucket" "layers" {
  bucket        = "arcade-lab-layers-${random_string.suffix.id}"
  force_destroy = true

  tags = {
    application = "arcade-lab"
  }
}

resource "aws_s3_bucket" "hashes" {
  bucket        = "arcade-lab-hashes-${random_string.suffix.id}"
  force_destroy = true

  tags = {
    application = "arcade-lab"
  }
}
