import { BlogEntry } from "../_interfaces/blog";
import buildHomeServer from "@/../public/blog/covers/building_home_server_sm.png";
import lambdaDeploy from "@/../public/blog/covers/lambda_deploy_sm.png";
import tektonCicd from "@/../public/blog/covers/tekton_cicd_sm.png";
import techConference from "@/../public/blog/covers/tech_conference_sm.png";

const BLOG_ENTRIES: BlogEntry[] = [
  {
    id: 5,
    title: "Building my home server",
    description: "Part 2: SMB with Samba",
    date: "2025-10-03",
    tags: ["linux", "ubuntu", "smb", "samba"],
    content: "building-my-home-server-p2",
    cover: { image: buildHomeServer, alt: "build_home_server" },
  },
  {
    id: 4,
    title: "Building my home server",
    description: "Part 1: Starting and connecting to the server",
    date: "2025-10-03",
    tags: ["linux", "ubuntu", "ssh", "wifi", "netplan", "security", "ufw"],
    content: "building-my-home-server-p1",
    cover: { image: buildHomeServer, alt: "build_home_server" },
  },
  {
    id: 3,
    title: "Lambda Deployments",
    description:
      "Automating AWS Lambda and Layer Deployments with GitHub Actions",
    date: "2025-06-07",
    tags: ["aws", "lambda", "cicd", "github-actions"],
    content: "lambda-deployments",
    cover: { image: lambdaDeploy, alt: "lambda_deploy" },
  },
  {
    id: 2,
    title: "IBM Tech 2024 Conference",
    description: "Insights and takeaways from the IBM Tech 2024 conference.",
    date: "2024-03-22",
    tags: ["ibm", "red-hat", "openshift", "ansible", "security", "watsonx"],
    content: "ibm-tech-2024-conference",
    cover: { image: techConference, alt: "tech_conference" },
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
    cover: { image: tektonCicd, alt: "tekton_cicd" },
  },
];

export default BLOG_ENTRIES;
