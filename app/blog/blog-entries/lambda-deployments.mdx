# 🚀 Lambda Deployments

_Automating AWS Lambda and Layer Deployments with GitHub Actions_

📅 2025-06-07

## 🧭 Introduction

Managing and deploying AWS Lambda functions at scale can get complex, especially when dealing with multiple environments, configuration changes, and code versions. To simplify this, I created a GitHub Actions workflow that automates the deployment of both Lambda functions and Lambda layers — directly from a monorepo structure, with smart caching and S3-backed hash tracking.

In this post, I’ll walk you through how it works, the logic behind it, and how you can adapt it to your own projects.

## 🗂️ Repo Structure Overview

The repository uses a clear folder structure:

```
.
├── functions/
│   └── <app_name>/<function_name>/
│       ├── config.json
│       └── [code files]
├── layers/
│   └── <layer_name>/
│       ├── config.json
│       └── [dependencies]
├── scripts/
│   ├── get-alias.sh
│   ├── install-packages.sh
│   └── generate-function-hashes.sh
```

This allows us to independently track changes to each function or layer, and optimize deployments accordingly.

## ⚙️ GitHub Actions Workflow Overview

The [Deploy Lambda](https://github.com/denesbeck/lambda-functions/blob/main/.github/workflows/main.yml) workflow runs on every `push` to any branch. Here's a breakdown of what it does:

### 1. Setup & Initialization

- Checks out the repo
- Installs `jq` for JSON parsing
- Configures AWS credentials using GitHub Secrets
- Sets environment variables using GH `vars`.

### 2. Download Previous Hashes from S3

Before proceeding, it pulls previously stored `.code.hash` and `.config.hash` files from S3 into a local cache. These are used to determine whether the Lambda function code and/or configuration has changed since the last deployment.

This enables smart, cache-aware deployments.

### 3. Detect Changed Layer Directories

Using `git diff` and fallback logic for first commits, the workflow detects which folders under `/layers` have changed since the last commit. If this is the first commit, it defaults to all directories.

### 4. Package & Deploy Layers

For each changed layer:

- Reads `config.json` for metadata like name, description, runtimes
- Installs dependencies using a custom shell script
- Zips and uploads the package to S3
- Publishes a new AWS Lambda Layer version
- Cleans up local ZIP files

Versioning is automatic and timestamped, tied to the commit SHA.

### 5. Detect Changed Lambda Functions

Same approach as layers — identifies changed function folders under `/functions/<app>/<function>`

### 6. Generate Hashes

For each changed Lambda function:

- If the code hash changed → zip and upload code, publish a new version.
- If the config hash changed → update function configuration.

It handles both `create` and `update` logic for new or existing functions, using `aws lambda get-function`.

Aliases (like `dev`, `staging`, etc.) are managed via the `get-alias.sh` script, enabling branch-to-alias mapping.

### 7. Upload Updated Hashes to S3

Finally, updated `.code.hash` and `.config.hash` files are uploaded back to S3, ensuring the next deployment has a reliable change reference.

## 💥 Key Features

| Feature             | Description                                               |
| ------------------- | --------------------------------------------------------- |
| Incremental Deploys | Only changed functions/layers are deployed                |
| Environment-Aware   | Automatically maps branch → alias (e.g. `dev`, `staging`) |
| Smart Caching       | Avoids unnecessary builds via S3-based hash comparison    |
| Secure              | Uses GitHub Secrets for AWS credentials                   |
| Fully Idempotent    | Can run multiple times without side effects               |

## 💡 Final Thoughts

This workflow has massively reduced friction in deploying AWS Lambda infrastructure at scale. If you’re looking for a robust CI/CD setup for your serverless stack, this architecture can serve as a solid blueprint.

You can check out the full repo here:  
🔗 [https://github.com/denesbeck/lambda-functions](https://github.com/denesbeck/lambda-functions)
