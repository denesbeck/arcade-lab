import { BlogEntry } from "../_interfaces/blog";
import buildHomeServerSm from "@/../public/blog/covers/building_home_server_sm.png";
import lambdaDeploySm from "@/../public/blog/covers/lambda_deploy_sm.png";
import tektonCicdSm from "@/../public/blog/covers/tekton_cicd_sm.png";
import techConferenceSm from "@/../public/blog/covers/tech_conference_sm.png";
import buildHomeServer from "@/../public/blog/covers/building_home_server.png";
import lambdaDeploy from "@/../public/blog/covers/lambda_deploy.png";
import tektonCicd from "@/../public/blog/covers/tekton_cicd.png";
import techConference from "@/../public/blog/covers/tech_conference.png";

const BLOG_ENTRIES: BlogEntry[] = [
  {
    id: 6,
    title: "Building my home server P3",
    description: "Part 3: Volumes and backup",
    date: "2025-10-11",
    tags: [
      "linux",
      "ubuntu",
      "fsck",
      "fstab",
      "fdisk",
      "mkfs",
      "crontab",
      "home-server",
      "volumes",
      "rsync",
    ],
    content: "building-my-home-server-p3",
    cover: {
      image: buildHomeServerSm,
      original: buildHomeServer,
      alt: "build_home_server",
    },
  },
  {
    id: 5,
    title: "Building my home server P2",
    description: "Part 2: SMB with Samba",
    date: "2025-10-03",
    tags: ["linux", "ubuntu", "smb", "samba", "home-server"],
    content: "building-my-home-server-p2",
    cover: {
      image: buildHomeServerSm,
      original: buildHomeServer,
      alt: "build_home_server",
    },
  },
  {
    id: 4,
    title: "Building my home server P1",
    description: "Part 1: Starting and connecting to the server",
    date: "2025-10-03",
    tags: [
      "linux",
      "ubuntu",
      "ssh",
      "wifi",
      "netplan",
      "home-server",
      "security",
      "ufw",
    ],
    content: "building-my-home-server-p1",
    cover: {
      image: buildHomeServerSm,
      original: buildHomeServer,
      alt: "build_home_server",
    },
  },
  {
    id: 3,
    title: "Lambda Deployments",
    description:
      "Automating AWS Lambda and Layer Deployments with GitHub Actions",
    date: "2025-06-07",
    tags: ["aws", "lambda", "cicd", "github-actions"],
    content: "lambda-deployments",
    cover: {
      image: lambdaDeploySm,
      original: lambdaDeploy,
      alt: "lambda_deploy",
    },
  },
  {
    id: 2,
    title: "IBM Tech 2024 Conference",
    description: "Insights and takeaways from the IBM Tech 2024 conference.",
    date: "2024-03-22",
    tags: ["ibm", "red-hat", "openshift", "ansible", "security", "watsonx"],
    content: "ibm-tech-2024-conference",
    cover: {
      image: techConferenceSm,
      original: techConference,
      alt: "tech_conference",
    },
  },
  {
    id: 1,
    title: "Migrating to Tekton",
    description:
      "This blog post is about my experience migrating from Travis CI to Tekton.",
    date: "2023-12-13",
    tags: [
      "cicd",
      "tekton",
      "ruby-on-rails",
      "travis-ci",
      "kubernetes",
      "docker",
    ],
    content: "migrating-to-tekton",
    cover: { image: tektonCicdSm, original: tektonCicd, alt: "tekton_cicd" },
  },
];

export default BLOG_ENTRIES;
