terraform {
  cloud {
    organization = "arcade-lab"
    workspaces {
      name = "arcade-lab"
    }
  }

  required_version = "~> 1.15"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}
