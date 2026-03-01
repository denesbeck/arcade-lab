import blobStorageOptimization from '@/../public/blog/covers/blob_storage_optimization.png'
import blobStorageOptimizationSm from '@/../public/blog/covers/blob_storage_optimization_sm.png'
import blobStorageOptimizationX from '@/../public/blog/covers/blob_storage_optimization_x.png'
import buildHomeServer from '@/../public/blog/covers/building_home_server.png'
import buildHomeServerSm from '@/../public/blog/covers/building_home_server_sm.png'
import buildHomeServerX from '@/../public/blog/covers/building_home_server_x.png'
import beanstalkSecrets from '@/../public/blog/covers/cloudgoat__beanstalk_secrets.png'
import beanstalkSecretsSm from '@/../public/blog/covers/cloudgoat__beanstalk_secrets_sm.png'
import beanstalkSecretsX from '@/../public/blog/covers/cloudgoat__beanstalk_secrets_x.png'
import dataSecrets from '@/../public/blog/covers/cloudgoat__data_secrets.png'
import dataSecretsSm from '@/../public/blog/covers/cloudgoat__data_secrets_sm.png'
import dataSecretsX from '@/../public/blog/covers/cloudgoat__data_secrets_x.png'
import snsSecrets from '@/../public/blog/covers/cloudgoat__sns_secrets.png'
import snsSecretsSm from '@/../public/blog/covers/cloudgoat__sns_secrets_sm.png'
import snsSecretsX from '@/../public/blog/covers/cloudgoat__sns_secrets_x.png'
import developingMyOwnVcs from '@/../public/blog/covers/developing_my_own_vcs.png'
import developingMyOwnVcsSm from '@/../public/blog/covers/developing_my_own_vcs_sm.png'
import developingMyOwnVcsX from '@/../public/blog/covers/developing_my_own_vcs_x.png'
import fromJsonToSqlite from '@/../public/blog/covers/from_json_to_sqlite.png'
import fromJsonToSqliteSm from '@/../public/blog/covers/from_json_to_sqlite_sm.png'
import fromJsonToSqliteX from '@/../public/blog/covers/from_json_to_sqlite_x.png'
import lambdaDeploy from '@/../public/blog/covers/lambda_deploy.png'
import lambdaDeploySm from '@/../public/blog/covers/lambda_deploy_sm.png'
import lambdaDeployX from '@/../public/blog/covers/lambda_deploy_x.png'
import techConference from '@/../public/blog/covers/tech_conference.png'
import techConferenceSm from '@/../public/blog/covers/tech_conference_sm.png'
import techConferenceX from '@/../public/blog/covers/tech_conference_x.png'
import tektonCicd from '@/../public/blog/covers/tekton_cicd.png'
import tektonCicdSm from '@/../public/blog/covers/tekton_cicd_sm.png'
import tektonCicdX from '@/../public/blog/covers/tekton_cicd_x.png'
import { BlogEntry } from '../_interfaces/blog'

const BLOG_ENTRIES: BlogEntry[] = [
  {
    id: 15,
    title: 'Building my home server: Part 5',
    description: 'Network-wide ad blocking with Pi-hole',
    date: '2026-03-01',
    hidden: false,
    tags: [
      'linux',
      'ubuntu',
      'docker',
      'ufw',
      'nginx',
      'containers',
      'home-server',
      'pi-hole',
      'dns',
      'ad-blocking',
      'ansible',
    ],
    content: 'building-my-home-server-p5',
    cover: {
      image: buildHomeServerSm,
      original: buildHomeServer,
      xImage: buildHomeServerX,
      alt: 'build_home_server',
      ogImage: '/blog/covers/building_home_server.png',
      ogImageX: '/blog/covers/building_home_server_x.png',
    },
  },
  {
    id: 14,
    title: 'From JSON Files to SQLite',
    description:
      "How a Simple Benchmark Convinced Me to Rewrite Nexio's Storage Layer",
    date: '2026-02-28',
    hidden: false,
    tags: ['sqlite', 'golang', 'vcs', 'nexio', 'performance', 'optimization'],
    content: 'from-json-to-sqlite',
    cover: {
      image: fromJsonToSqliteSm,
      original: fromJsonToSqlite,
      xImage: fromJsonToSqliteX,
      alt: 'from-json-to-sqlite',
      ogImage: '/blog/covers/from_json_to_sqlite.png',
      ogImageX: '/blog/covers/from_json_to_sqlite_x.png',
    },
  },
  {
    id: 13,
    title: 'CloudGoat: Data Secrets',
    description:
      'Write-up: Exploiting EC2 User Data and IMDS to escalate privileges',
    date: '2026-02-19',
    hidden: false,
    tags: [
      'hacking',
      'write-up',
      'cloudgoat',
      'aws',
      'pacu',
      'ec2',
      'lambda',
      'secrets_manager',
      'iam',
      'exploit',
      'vulnerability',
    ],
    content: 'cloudgoat__data-secrets',
    cover: {
      image: dataSecretsSm,
      original: dataSecrets,
      xImage: dataSecretsX,
      alt: 'cloudgoat__data-secrets',
      ogImage: '/blog/covers/cloudgoat__data_secrets.png',
      ogImageX: '/blog/covers/cloudgoat__data_secrets_x.png',
    },
  },
  {
    id: 12,
    title: 'CloudGoat: SNS Secrets',
    description: 'Write-up: Exploiting SNS subscriptions to leak API keys',
    date: '2026-01-17',
    hidden: false,
    tags: [
      'hacking',
      'write-up',
      'cloudgoat',
      'aws',
      'pacu',
      'awscli',
      'sns',
      'api-gw',
      'iam',
      'exploit',
      'vulnerability',
    ],
    content: 'cloudgoat__sns-secrets',
    cover: {
      image: snsSecretsSm,
      original: snsSecrets,
      xImage: snsSecretsX,
      alt: 'cloudgoat__sns-secrets',
      ogImage: '/blog/covers/cloudgoat__sns_secrets.png',
      ogImageX: '/blog/covers/cloudgoat__sns_secrets_x.png',
    },
  },
  {
    id: 11,
    title: 'CloudGoat: Beanstalk Secrets (Pacu)',
    description: 'Write-up: From low-privilege user to admin (Pacu approach)',
    date: '2026-01-11',
    hidden: false,
    tags: [
      'hacking',
      'write-up',
      'cloudgoat',
      'aws',
      'pacu',
      'beanstalk',
      'iam',
      'privesc',
      'exploit',
      'vulnerability',
    ],
    content: 'cloudgoat__beanstalk-secrets-pacu',
    cover: {
      image: beanstalkSecretsSm,
      original: beanstalkSecrets,
      xImage: beanstalkSecretsX,
      alt: 'cloudgoat__beanstalk-secrets-pacu',
      ogImage: '/blog/covers/cloudgoat__beanstalk_secrets.png',
      ogImageX: '/blog/covers/cloudgoat__beanstalk_secrets_x.png',
    },
  },
  {
    id: 10,
    title: 'CloudGoat: Beanstalk Secrets (AWS CLI)',
    description:
      'Write-up: From low-privilege user to admin (AWS CLI approach)',
    date: '2026-01-11',
    hidden: false,
    tags: [
      'hacking',
      'write-up',
      'cloudgoat',
      'aws',
      'awscli',
      'beanstalk',
      'iam',
      'privesc',
      'exploit',
      'vulnerability',
    ],
    content: 'cloudgoat__beanstalk-secrets-awscli',
    cover: {
      image: beanstalkSecretsSm,
      original: beanstalkSecrets,
      xImage: beanstalkSecretsX,
      alt: 'cloudgoat__beanstalk-secrets-awscli',
      ogImage: '/blog/covers/cloudgoat__beanstalk_secrets.png',
      ogImageX: '/blog/covers/cloudgoat__beanstalk_secrets_x.png',
    },
  },
  {
    id: 9,
    title: 'Nexio: Storage optimization',
    description: 'Transforming Nexio with Content-Addressable Storage',
    date: '2025-12-21',
    hidden: false,
    tags: [
      'blake3',
      'zlib',
      'sharding',
      'git',
      'golang',
      'vcs',
      'nexio',
      'performance',
      'blob',
      'optimization',
    ],
    content: 'blob-storage-optimization',
    cover: {
      image: blobStorageOptimizationSm,
      original: blobStorageOptimization,
      xImage: blobStorageOptimizationX,
      alt: 'blob_storage_optimization',
      ogImage: '/blog/covers/blob_storage_optimization.png',
      ogImageX: '/blog/covers/blob_storage_optimization_x.png',
    },
  },
  {
    id: 8,
    title: 'Developing my own VCS',
    description: 'Learning Git the Hard Way',
    date: '2025-11-13',
    hidden: false,
    tags: ['git', 'golang', 'vcs', 'nexio'],
    content: 'developing-my-own-vcs',
    cover: {
      image: developingMyOwnVcsSm,
      original: developingMyOwnVcs,
      xImage: developingMyOwnVcsX,
      alt: 'developing_my_own_vcs',
      ogImage: '/blog/covers/developing_my_own_vcs.png',
      ogImageX: '/blog/covers/developing_my_own_vcs_x.png',
    },
  },
  {
    id: 7,
    title: 'Building my home server P4',
    description: 'Part 4: Docker, UFW and Nginx',
    date: '2025-10-26',
    hidden: false,
    tags: [
      'linux',
      'ubuntu',
      'docker',
      'ufw',
      'nginx',
      'containers',
      'home-server',
    ],
    content: 'building-my-home-server-p4',
    cover: {
      image: buildHomeServerSm,
      original: buildHomeServer,
      xImage: buildHomeServerX,
      alt: 'build_home_server',
      ogImage: '/blog/covers/building_home_server.png',
      ogImageX: '/blog/covers/building_home_server_x.png',
    },
  },
  {
    id: 6,
    title: 'Building my home server P3',
    description: 'Part 3: Volumes and backup',
    date: '2025-10-11',
    hidden: false,
    tags: [
      'linux',
      'ubuntu',
      'fsck',
      'fstab',
      'fdisk',
      'mkfs',
      'crontab',
      'home-server',
      'volumes',
      'rsync',
    ],
    content: 'building-my-home-server-p3',
    cover: {
      image: buildHomeServerSm,
      original: buildHomeServer,
      xImage: buildHomeServerX,
      alt: 'build_home_server',
      ogImage: '/blog/covers/building_home_server.png',
      ogImageX: '/blog/covers/building_home_server_x.png',
    },
  },
  {
    id: 5,
    title: 'Building my home server P2',
    description: 'Part 2: SMB with Samba',
    date: '2025-10-03',
    hidden: false,
    tags: ['linux', 'ubuntu', 'smb', 'samba', 'home-server'],
    content: 'building-my-home-server-p2',
    cover: {
      image: buildHomeServerSm,
      original: buildHomeServer,
      xImage: buildHomeServerX,
      alt: 'build_home_server',
      ogImage: '/blog/covers/building_home_server.png',
      ogImageX: '/blog/covers/building_home_server_x.png',
    },
  },
  {
    id: 4,
    title: 'Building my home server P1',
    description: 'Part 1: Starting and connecting to the server',
    date: '2025-10-03',
    hidden: false,
    tags: [
      'linux',
      'ubuntu',
      'ssh',
      'wifi',
      'netplan',
      'home-server',
      'security',
      'ufw',
    ],
    content: 'building-my-home-server-p1',
    cover: {
      image: buildHomeServerSm,
      original: buildHomeServer,
      xImage: buildHomeServerX,
      alt: 'build_home_server',
      ogImage: '/blog/covers/building_home_server.png',
      ogImageX: '/blog/covers/building_home_server_x.png',
    },
  },
  {
    id: 3,
    title: 'Lambda Deployments',
    description:
      'Automating AWS Lambda and Layer Deployments with GitHub Actions',
    date: '2025-10-19',
    hidden: false,
    tags: ['aws', 'lambda', 'cicd', 'github-actions', 'terraform', 'oidc'],
    content: 'lambda-deployments',
    cover: {
      image: lambdaDeploySm,
      original: lambdaDeploy,
      xImage: lambdaDeployX,
      alt: 'lambda_deploy',
      ogImage: '/blog/covers/lambda_deploy.png',
      ogImageX: '/blog/covers/lambda_deploy_x.png',
    },
  },
  {
    id: 2,
    title: 'IBM Tech 2024 Conference',
    description: 'Insights and takeaways from the IBM Tech 2024 conference.',
    date: '2024-03-22',
    hidden: false,
    tags: ['ibm', 'red-hat', 'openshift', 'ansible', 'security', 'watsonx'],
    content: 'ibm-tech-2024-conference',
    cover: {
      image: techConferenceSm,
      original: techConference,
      xImage: techConferenceX,
      alt: 'tech_conference',
      ogImage: '/blog/covers/tech_conference.png',
      ogImageX: '/blog/covers/tech_conference_x.png',
    },
  },
  {
    id: 1,
    title: 'Migrating to Tekton',
    description:
      'This blog post is about my experience migrating from Travis CI to Tekton.',
    date: '2023-12-13',
    hidden: false,
    tags: [
      'cicd',
      'tekton',
      'ruby-on-rails',
      'travis-ci',
      'kubernetes',
      'docker',
    ],
    content: 'migrating-to-tekton',
    cover: {
      image: tektonCicdSm,
      original: tektonCicd,
      xImage: tektonCicdX,
      alt: 'tekton_cicd',
      ogImage: '/blog/covers/tekton_cicd.png',
      ogImageX: '/blog/covers/tekton_cicd_x.png',
    },
  },
]

export default BLOG_ENTRIES
