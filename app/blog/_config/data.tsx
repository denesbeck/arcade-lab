import arcadeLab from '@/../public/blog/covers/arcade_lab.png'
import arcadeLabSm from '@/../public/blog/covers/arcade_lab_sm.png'
import arcadeLabX from '@/../public/blog/covers/arcade_lab_x.png'
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
import remoteStateManagement from '@/../public/blog/covers/remote_state_management.png'
import remoteStateManagementSm from '@/../public/blog/covers/remote_state_management_sm.png'
import remoteStateManagementX from '@/../public/blog/covers/remote_state_management_x.png'
import selfHostedDevPlatform from '@/../public/blog/covers/self_hosted_dev_platform.png'
import selfHostedDevPlatformSm from '@/../public/blog/covers/self_hosted_dev_platform_sm.png'
import selfHostedDevPlatformX from '@/../public/blog/covers/self_hosted_dev_platform_x.png'
import techConference from '@/../public/blog/covers/tech_conference.png'
import techConferenceSm from '@/../public/blog/covers/tech_conference_sm.png'
import techConferenceX from '@/../public/blog/covers/tech_conference_x.png'
import tektonCicd from '@/../public/blog/covers/tekton_cicd.png'
import tektonCicdSm from '@/../public/blog/covers/tekton_cicd_sm.png'
import tektonCicdX from '@/../public/blog/covers/tekton_cicd_x.png'
import tmuxWorktree from '@/../public/blog/covers/tmux_worktree.png'
import tmuxWorktreeSm from '@/../public/blog/covers/tmux_worktree_sm.png'
import tmuxWorktreeX from '@/../public/blog/covers/tmux_worktree_x.png'
import { BlogCover, BlogEntry } from '../_interfaces/blog'
import BLOG_METADATA from './metadata'

const COVERS: Record<number, BlogCover> = {
  32: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  31: {
    image: selfHostedDevPlatformSm,
    original: selfHostedDevPlatform,
    xImage: selfHostedDevPlatformX,
    alt: 'self_hosted_dev_platform',
    ogImage: '/blog/covers/self_hosted_dev_platform.png',
    ogImageX: '/blog/covers/self_hosted_dev_platform_x.png',
  },
  30: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  29: {
    image: selfHostedDevPlatformSm,
    original: selfHostedDevPlatform,
    xImage: selfHostedDevPlatformX,
    alt: 'self_hosted_dev_platform',
    ogImage: '/blog/covers/self_hosted_dev_platform.png',
    ogImageX: '/blog/covers/self_hosted_dev_platform_x.png',
  },
  28: {
    image: arcadeLabSm,
    original: arcadeLab,
    xImage: arcadeLabX,
    alt: 'arcade_lab',
    ogImage: '/blog/covers/arcade_lab.png',
    ogImageX: '/blog/covers/arcade_lab_x.png',
  },
  27: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  26: {
    image: selfHostedDevPlatformSm,
    original: selfHostedDevPlatform,
    xImage: selfHostedDevPlatformX,
    alt: 'self_hosted_dev_platform',
    ogImage: '/blog/covers/self_hosted_dev_platform.png',
    ogImageX: '/blog/covers/self_hosted_dev_platform_x.png',
  },
  25: {
    image: tmuxWorktreeSm,
    original: tmuxWorktree,
    xImage: tmuxWorktreeX,
    alt: 'tmux_pane_controller',
    ogImage: '/blog/covers/tmux_worktree.png',
    ogImageX: '/blog/covers/tmux_worktree_x.png',
  },
  24: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  23: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  22: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  21: {
    image: tmuxWorktreeSm,
    original: tmuxWorktree,
    xImage: tmuxWorktreeX,
    alt: 'tmux_worktree',
    ogImage: '/blog/covers/tmux_worktree.png',
    ogImageX: '/blog/covers/tmux_worktree_x.png',
  },
  20: {
    image: arcadeLabSm,
    original: arcadeLab,
    xImage: arcadeLabX,
    alt: 'arcade_lab',
    ogImage: '/blog/covers/arcade_lab.png',
    ogImageX: '/blog/covers/arcade_lab_x.png',
  },
  19: {
    image: lambdaDeploySm,
    original: lambdaDeploy,
    xImage: lambdaDeployX,
    alt: 'lambda_deploy',
    ogImage: '/blog/covers/lambda_deploy.png',
    ogImageX: '/blog/covers/lambda_deploy_x.png',
  },
  18: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  17: {
    image: remoteStateManagementSm,
    original: remoteStateManagement,
    xImage: remoteStateManagementX,
    alt: 'remote_state_management',
    ogImage: '/blog/covers/remote_state_management.png',
    ogImageX: '/blog/covers/remote_state_management_x.png',
  },
  16: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  15: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  14: {
    image: fromJsonToSqliteSm,
    original: fromJsonToSqlite,
    xImage: fromJsonToSqliteX,
    alt: 'from-json-to-sqlite',
    ogImage: '/blog/covers/from_json_to_sqlite.png',
    ogImageX: '/blog/covers/from_json_to_sqlite_x.png',
  },
  13: {
    image: dataSecretsSm,
    original: dataSecrets,
    xImage: dataSecretsX,
    alt: 'cloudgoat__data-secrets',
    ogImage: '/blog/covers/cloudgoat__data_secrets.png',
    ogImageX: '/blog/covers/cloudgoat__data_secrets_x.png',
  },
  12: {
    image: snsSecretsSm,
    original: snsSecrets,
    xImage: snsSecretsX,
    alt: 'cloudgoat__sns-secrets',
    ogImage: '/blog/covers/cloudgoat__sns_secrets.png',
    ogImageX: '/blog/covers/cloudgoat__sns_secrets_x.png',
  },
  11: {
    image: beanstalkSecretsSm,
    original: beanstalkSecrets,
    xImage: beanstalkSecretsX,
    alt: 'cloudgoat__beanstalk-secrets-pacu',
    ogImage: '/blog/covers/cloudgoat__beanstalk_secrets.png',
    ogImageX: '/blog/covers/cloudgoat__beanstalk_secrets_x.png',
  },
  10: {
    image: beanstalkSecretsSm,
    original: beanstalkSecrets,
    xImage: beanstalkSecretsX,
    alt: 'cloudgoat__beanstalk-secrets-awscli',
    ogImage: '/blog/covers/cloudgoat__beanstalk_secrets.png',
    ogImageX: '/blog/covers/cloudgoat__beanstalk_secrets_x.png',
  },
  9: {
    image: blobStorageOptimizationSm,
    original: blobStorageOptimization,
    xImage: blobStorageOptimizationX,
    alt: 'blob_storage_optimization',
    ogImage: '/blog/covers/blob_storage_optimization.png',
    ogImageX: '/blog/covers/blob_storage_optimization_x.png',
  },
  8: {
    image: developingMyOwnVcsSm,
    original: developingMyOwnVcs,
    xImage: developingMyOwnVcsX,
    alt: 'developing_my_own_vcs',
    ogImage: '/blog/covers/developing_my_own_vcs.png',
    ogImageX: '/blog/covers/developing_my_own_vcs_x.png',
  },
  7: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  6: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  5: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  4: {
    image: buildHomeServerSm,
    original: buildHomeServer,
    xImage: buildHomeServerX,
    alt: 'build_home_server',
    ogImage: '/blog/covers/building_home_server.png',
    ogImageX: '/blog/covers/building_home_server_x.png',
  },
  3: {
    image: lambdaDeploySm,
    original: lambdaDeploy,
    xImage: lambdaDeployX,
    alt: 'lambda_deploy',
    ogImage: '/blog/covers/lambda_deploy.png',
    ogImageX: '/blog/covers/lambda_deploy_x.png',
  },
  2: {
    image: techConferenceSm,
    original: techConference,
    xImage: techConferenceX,
    alt: 'tech_conference',
    ogImage: '/blog/covers/tech_conference.png',
    ogImageX: '/blog/covers/tech_conference_x.png',
  },
  1: {
    image: tektonCicdSm,
    original: tektonCicd,
    xImage: tektonCicdX,
    alt: 'tekton_cicd',
    ogImage: '/blog/covers/tekton_cicd.png',
    ogImageX: '/blog/covers/tekton_cicd_x.png',
  },
}

const BLOG_ENTRIES: BlogEntry[] = BLOG_METADATA.map((meta) => ({
  ...meta,
  cover: COVERS[meta.id],
}))

export default BLOG_ENTRIES
