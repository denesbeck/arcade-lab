data "aws_caller_identity" "current" {}

data "aws_kms_key" "default" {
  key_id = "alias/aws/ssm"
}

# --- Lambda execution role ---

resource "aws_iam_role" "contact" {
  name = "ArcadeLabContactRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })

  tags = {
    application = "arcade-lab"
  }
}

resource "aws_iam_role_policy_attachment" "contact_basic_exec" {
  role       = aws_iam_role.contact.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "contact_ssm" {
  name = "LambdaParameterStorePolicy"
  role = aws_iam_role.contact.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid    = "AllowKmsAndSsmAccess"
      Effect = "Allow"
      Action = ["kms:Decrypt", "ssm:GetParameters"]
      Resource = [
        "arn:aws:ssm:*:${data.aws_caller_identity.current.account_id}:*",
        "arn:aws:kms:eu-central-1:${data.aws_caller_identity.current.account_id}:key/${data.aws_kms_key.default.id}"
      ]
    }]
  })
}

resource "aws_iam_role_policy" "contact_ses" {
  name = "LambdaSESSendPolicy"
  role = aws_iam_role.contact.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Sid      = "AllowSESSendFromVerifiedIdentity"
      Effect   = "Allow"
      Action   = "ses:SendEmail"
      Resource = "arn:aws:ses:*:${data.aws_caller_identity.current.account_id}:identity/*"
      Condition = {
        StringEquals = {
          "ses:FromAddress" = "contact@arcade-lab.io"
        }
      }
    }]
  })
}

# --- GitHub Actions deploy role ---

data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_role" "deploy" {
  name = "ArcadeLabDeployRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Federated = data.aws_iam_openid_connect_provider.github.arn
      }
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringLike = {
          "token.actions.githubusercontent.com:sub" = "repo:${var.repo}:environment:*"
        }
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
        }
      }
    }]
  })
}

resource "aws_iam_role_policy" "deploy" {
  name = "LambdaDeployPolicy"
  role = aws_iam_role.deploy.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "AllowS3Access"
        Effect   = "Allow"
        Action   = ["s3:GetObject", "s3:PutObject", "s3:ListBucket"]
        Resource = var.s3_resources
      },
      {
        Sid    = "AllowLambdaManagement"
        Effect = "Allow"
        Action = [
          "lambda:UpdateFunctionCode",
          "lambda:UpdateFunctionConfiguration",
          "lambda:PublishVersion",
          "lambda:CreateAlias",
          "lambda:UpdateAlias",
          "lambda:GetFunction",
          "lambda:PublishLayerVersion",
          "lambda:GetFunctionConfiguration"
        ]
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = "iam:PassRole"
        Resource = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/*"
      },
      {
        Effect   = "Allow"
        Action   = "lambda:GetLayerVersion"
        Resource = "arn:aws:lambda:*:${data.aws_caller_identity.current.account_id}:layer:*"
      },
      {
        Sid      = "AllowSTSAccess"
        Effect   = "Allow"
        Action   = "sts:GetCallerIdentity"
        Resource = "*"
      }
    ]
  })
}
