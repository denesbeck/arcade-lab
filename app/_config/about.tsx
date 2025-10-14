import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiCredly,
  SiTypescript,
  SiTerraform,
  SiKubernetes,
  SiDocker,
  SiGithubactions,
} from "react-icons/si";
import {
  FaGithub,
  FaAws,
  FaReact,
  FaNodeJs,
  FaLinux,
  FaMapMarkerAlt,
  FaBuilding,
  FaBriefcase,
  FaLinkedin,
} from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { HiIdentification } from "react-icons/hi2";

export const INFO = {
  Name: "Denes B.",
  Location: "Budapest, Hungary",
  Company: "SEON",
  Role: "Software Engineer",
};

export const INFO_ICONS = {
  Name: HiIdentification,
  Location: FaMapMarkerAlt,
  Company: FaBuilding,
  Role: FaBriefcase,
};

export const CONNECTIONS = [
  {
    url: "https://github.com/denesbeck",
    icon: FaGithub,
  },
  {
    url: "https://www.credly.com/users/denesbeck",
    icon: SiCredly,
  },
  {
    url: "https://www.linkedin.com/in/denesbeck",
    icon: FaLinkedin,
  },
];

export type Certificate = {
  url: string;
  size: number;
  img: string;
  alt: string;
};

export const CERTIFICATES: Certificate[] = [
  {
    url: "https://www.credly.com/badges/b4bf4117-6a90-49eb-baee-e382447b72c2/public_url",
    size: 105,
    img: "https://images.credly.com/size/680x680/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png",
    alt: "awsDeveloperAssociate",
  },
  {
    url: "https://www.credly.com/badges/91d294a8-8f7d-4f5a-80c1-071fa0bf2be6/public_url",
    size: 105,
    img: "https://images.credly.com/size/680x680/images/0dc62494-dc94-469a-83af-e35309f27356/blob",
    alt: "terraform",
  },
];

export const SKILLS = [
  {
    name: "Next.js",
    icon: RiNextjsFill,
  },
  {
    name: "React",
    icon: FaReact,
  },
  {
    name: "Tailwind CSS",
    icon: RiTailwindCssFill,
  },

  {
    name: "Node.js",
    icon: FaNodeJs,
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
  },
  {
    name: "Golang",
    icon: FaGolang,
  },
  {
    name: "GitHub Actions",
    icon: SiGithubactions,
  },
  {
    name: "Linux",
    icon: FaLinux,
  },
  {
    name: "Docker",
    icon: SiDocker,
  },
  {
    name: "Kubernetes",
    icon: SiKubernetes,
  },
  {
    name: "Terraform",
    icon: SiTerraform,
  },
  {
    name: "AWS",
    icon: FaAws,
  },
];

export const BIO_START = (
  <p className="mb-4 text-ellipsis">
    🚀 I&apos;m a full-stack software engineer with a strong focus on creating
    scalable, efficient, and maintainable applications using modern frameworks
    and best practices...
  </p>
);

export const BIO = (
  <div className="text-text-dark">
    <p className="mb-8">
      🚀 I&apos;m a full-stack software engineer with a strong focus on creating
      scalable, efficient, and maintainable applications using modern frameworks
      and best practices. I thrive on building self-hosted solutions and
      automating workflows, with a deep interest in DevOps and infrastructure
      management.
    </p>
    <p className="mb-8">
      🛠️ I&apos;m a huge Nvim and Tmux enthusiast — both help me optimize my
      development environment (check out{" "}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck/dotfiles"
      >
        my dotfiles
      </a>
      ).
    </p>
    <p>
      📁 Check out on{" "}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://github.com/denesbeck"
      >
        my work
      </a>{" "}
      on GitHub
    </p>
    <p>
      💻 Check out{" "}
      <a
        target="_blank"
        className="underline text-active underline-offset-4"
        href="https://lostindusk.com"
      >
        my portfolio page
      </a>
    </p>
  </div>
);
