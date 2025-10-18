# 🔁 Migrating from Travis CI to Tekton

📅 2023-12-13

## 🧙🏻‍♂️ A New Adventure

At the company where I work recently a strategic decision was made to migrate all CI/CD workflows from Travis CI to the company’s own CI/CD solution built with Tekton. As result, since the majority of our applications were written in Ruby on Rails and there was no generic pipeline built for this web-framework, I got the opportunity to contribute to this InnerSource project and develop a CI/CD pipeline using Tekton. In this article I would like to share my experience and perception related to this project.

## ❓ Why?

First of all, a question to answer: Why we committed to replace Travis CI — a working pipeline solution — with another, less trending solution? Well, it was important to reduce the spending on third-party IT tools and the elimination of the dependency on these tools was also a relevant concern.

Using third-party tools is a convenient approach as you don’t have to develop or maintain the software, you don’t have to establish the infrastructure, install and deploy your application, fix security vulnerabilities or add new features. However, at the same time you have to trust these tools: At some point you probably have to expose credentials or other secrets and have to accept the fact that you don’t have full control over the data security. Besides, you can’t extend the functionality of these tools, you can only work with a limited amount of features already available.

Beside reducing the cost and dependency, it was also important to create a secure and standardized software supply chain. Forcing application development teams to follow coding conventions and best practices by executing scans on the code base during each pipeline run can make the life of a lot of developers obviously more difficult, but at the end of the day I believe both in terms of the code quality and security there will be an increase. For example a common mistake in case of single page applications (SPA) is to store sensitive data or even credentials in build-time arguments. Using a pipeline that has a SAST (Static application security testing) task can eliminate the risk of pushing vulnerable code to the main code base.

Considering the above reasoning, we can say that this huge commitment — that moved many people out of their comfort zone — made a lot of sense actually.

## 🤔 What is CI/CD?

If you read this article, you’re probably aware what CI/CD is, however, I felt important to write down just the basics as a refresher or as a quick introduction.

Back in the old days software delivery was a bit more complicated. First of all, you had to make sure that your software is properly tested. It was important to carefully compose your test cases because changing and delivering your application took more time and you wanted to make sure that adjusting some part of your code will not mess up another part of it. You also had to consider the slightly different environment of your clients which often made the software break. In terms of code quality and linting, peer-reviews had a lot more relevance not to mention the quality and elaboration of the documentation itself, especially in case of larger projects. Considering all of these, we can imagine the potential risks and compare this process with the same process in a cloud environment where you can easily rollout or rollback changes in no time.

CI/CD — which stands for continuous integration and continuous delivery — was a solution to this manual, slow and inflexible workflow. It’s a method that makes frequent software delivery more flexible by automating the different tasks (e.g., opensource vulnerability scanning, code linting, secret scanning, testing, image vulnerability scanning) of the whole software delivery process.

Continuous Integration is basically the automation process of the development team: It’s about preparing the code for pushing it to the shared repository. Continuous Delivery on the other hand is the automation process of the operations team: It’s about deploying the code into production environment. There are specific tools that help us to automate the integration and delivery processes. The framework that connects these tools, the development and operations teams and the integration and delivery phases is called CI/CD pipeline. The CI/CD pipeline can be customized based on specific requirements, business processes or security standards of an organization. The point is that no matter which pipeline solution (e.g., Travis CI, Jenkins, GitHub Actions, Tekton) you or your organization decides to work with, you will have the opportunity to customize your workflow based on specific requirements which makes this whole process agile.

We were really just scratching the surface here to understand the relevancy and functioning of the CI/CD pipelines. If you want to read more about CI/CD, I can highly recommend [this article](https://www.redhat.com/en/topics/devops/what-is-ci-cd) from Red Hat.

## ⚔️ Travis CI vs Tekton

After dealing with the theory about CI/CD, we can jump back to my use case and examine the two CI/CD solutions. So, what’s the difference?

### Travis CI

Travis CI is a service. It runs on its own server, therefore, you can setup your pipeline in no time. It has its own hosted web UI for monitoring and managing your builds.

For customizing the steps and environment of your Travis pipeline, you would mostly use a YAML config file in the root folder of your application or in advanced use cases you can import other YAML files into your root config file. Travis CI offers a wide variety of options that can be tailored to specific use cases and requirements: You can install packages and services, define languages and execution environments, create different build stages which you can further customize using lifecycle hooks and conditions.

While I never had any difficulties to customize Travis for any of our applications — even though we also had some exceptional requirements — I have to admit that after using Tekton for a while, coming back to Travis felt like not having enough space. So, stating that Travis is not as much customizable as Tekton is a valid argument in my opinion, however, Travis can probably also cover most of your requirements when it comes to CI/CD.

A more important difference is that Tekton is opensource and Travis CI is not, so you can examine and therefore better understand the code base of Tekton which opens a lot of opportunities. Another important difference is that in contrast to Travis CI you need to setup Tekton in your own environment which gives you full control on what’s going on.

### Tekton

Tekton is a cloud-native solution that runs on Kubernetes. It’s object-oriented and modular which means that you can create reusable assets (called tasks) and integrate them in different workflows (called pipelines). In my case, when I developed the Ruby on Rails pipeline I only had to create four Rails-specific tasks, the rest of the tasks for my pipeline — approx. eight more — have been created earlier by other contributors. For example I didn’t have to recreate the git-clone task, as its usage is independent from the language. There is a registry called [Tekton Hub](https://hub.tekton.dev/) where you can find or upload reusable Tekton assets like tasks or pipelines. As a matter of fact, this is where I started my InnerSource contribution with Tekton, because I wanted to avoid duplication of work.

Tekton is easy to customize, in fact, it urges you to build your own assets and assemble them as a custom workflow. However, if you don’t find a reusable asset suitable for your use case, you’ll need to take on writing that asset by yourself. So, on one hand you have full control and responsibility, on the other hand you need to consider that setting everything will take more time than in case of Travis CI or other out-of-the-box pipeline solutions.

As for scalability, since Tekton runs in Kubernetes for scaling your workloads, you can apply horizontal or vertical scaling just like in case of a regular containerized application. You have two options for managing your custom Tekton resources: You can use the [Tekton Command-Line Interface](https://tekton.dev/docs/cli/), which works quite similar to [kubectl](https://kubernetes.io/docs/reference/kubectl/), or you can access your resources through the [Tekton Dashboard](https://tekton.dev/docs/dashboard/), which is a web UI that you need to host separately in Kubernetes.

As you can see Tekton is basically a DIY pipeline solution, that requires the understanding of different concepts like containers, Kubernetes and Tekton itself. Setting your own Tekton pipeline requires some preparation and learning, however, the learning curve is relatively shallow and it gives you a deeper understanding of some important DevOps concepts. For example, I worked a lot with Kubernetes before, but using it with Tekton gave me a greater insight into Kubernetes API resources and the components of Kubernetes in general. At this point it’s also important to mention that the [documentation](https://tekton.dev/docs/) of Tekton is well structured and easy to understand.

I will also leave this video here that I found useful while writing this article. Although, in this video the differences between Tekton and [Jenkins](https://www.jenkins.io/) are highlighted and evaluated, I found it quite useful for comparing Tekton with Travis CI:

<div className="flex justify-center">
    <iframe width="600" height="400" src="https://www.youtube.com/embed/7aSe1HQ2lXo?si=rr02PT32HqIllMnS" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
</div>

## 🤝🏻 InnerSource

I also wanted to touch on [InnerSource](https://about.gitlab.com/topics/version-control/what-is-innersource/) as for me it was a game-changer in our organization. So far, I couldn’t really participate in fancy projects that a developer would consider meaningful and exciting. Usually, in big companies such projects are outsourced to other countries considering the cost-efficiency or are driven directly from the US. Making the pipeline project InnerSource made it possible for developers around the globe within our organization to contribute to it and get in-depth knowledge about CI/CD pipeline functionality and DevOps in general.

The way I define InnerSource is the following:

> It’s a strategy to improve collaboration across different teams (also in different time zones) within an organization to achieve a common goal more effectively by communicating, making the code transparent while accepting and following the organization’s code of conduct.

InnerSource projects can increase the job satisfaction level of the developers tremendously. Since it’s based on communication, it also establishes a healthy culture around the project that can even outlive the project itself.

At the time when the Tekton solution was announced in our organization there were pipelines already created for Node.js, Java, Golang and Python, however, Ruby on Rails or Ruby in general was not covered. Our portfolio comprised several Rails-applications, moreover, other teams used the Rails-framework for their business-critical applications. We had around five months to develop a new workflow and to migrate the existing applications to this new solution. The need to secure business continuity and the opportunity to contribute to a meaningful project boosted my motivation level and moved me out of my comfort zone.

## 🧪 Contribution

Since Tekton is a cloud-native framework, the prerequisite to work with it is to have some knowledge and work experience with Kubernetes, Docker (or other container management tools) and Linux. Fortunately, I already had the chance to work on some other projects using these tools and technologies, so I had a pretty good understanding about the idea of containerization and container orchestration and I also felt comfortable working in a Linux environment.

Since I had the prerequisites, I started with reviewing the Tekton documentation. As I mentioned before, Tekton has an excellent and up-to-date documentation, so I was able to understand the core concepts quite easily. Once I had a better understanding I started to experiment with this technology in a local [minikube](https://minikube.sigs.k8s.io/docs/) cluster. I started to create some basic tasks, then some advanced ones with multiple steps. After that I used these building blocks in a pipeline resource. I also experimented with conditional executions, environment variables, workspaces and parameters.

Once I covered these basic use cases, I started to review the code base of the InnerSource pipeline project. At this point I learned about [kustomize](https://kustomize.io/) which is a Kubernetes native way for updating existing configurations. This tool was used in the project to customize default configurations of various manifests, so that new, slightly different ones could be created without code duplication. For example, we could create pipelines for different Ruby versions using this approach or we could also create different e2e test flows by omitting or including specific tasks.

[Podman](https://podman.io/) was another tool that I discovered during this project. This was the first time that instead of using Docker — which is the de facto standard container management tool (at least this is my impression so far) — I had to work with another container management tool. The front-end of both tools are pretty much the same meaning that you can use the same commands (e.g. container, image, run, build, inspect) with minor differences, so getting used to it was not a big deal. The main difference is at the back-end: Docker runs a service called daemon on your host while Podman is daemon-less. In a nutshell, the [Docker daemon](https://docs.docker.com/get-started/overview/#the-docker-daemon) is responsible for listening for Docker API requests and managing the Docker resources. It runs continuously in the background (even if no containers are running) and requires root level privilege. Due to this, it’s considered to be less secure because if your daemon gets compromised, all your containers gets compromised. Contrary to Docker, Podman is daemon-less: It runs containers as child-processes and it can run them with non-root privilege as well.

I don’t want to go through all the tools that I learned about during my journey, however, I just want draw the reader’s attention on two more:

1. **buildah**: A command-line tool that lets you build [OCI](https://opencontainers.org/) compliant container images. It was created for K8s clusters to eliminate the need to use Docker Daemon for building images in order to deal with the above mentioned security risk.
2. **skopeo**: A command-line utility that performs various operations on container images and image repositories. The coolest feature of skopeo is that you can inspect remote images without the need to pull them first, moreover you can also retrieve signing content.

Besides getting familiar with the tools listed above, I also had to understand the Ruby on Rails framework better and this was the point where I struggled the most. Although, I was familiar with this framework, I didn’t have in-depth knowledge mainly because I just inherited the Rails-applications and I only had to maintain them. Moreover, I always had ambivalent feelings about Ruby on Rails, let’s say it was a marriage of convenience. I believe it was the concept of the [Asset Pipeline](https://guides.rubyonrails.org/asset_pipeline.html) that I struggled the most with to understand, so I spent plenty of hours on debugging, reading the documentation, the application code itself and Stack Overflow questions, asking for advice from other Rails-developers within my organization and adjusting the pipeline based on the inputs I got. Long story short, I messed up a lot of things and course-corrected.

Once I overcame the challenges with Rails, it was quite fast to deliver a functioning pipeline, which was later adopted by other teams and was used as a basis for other Ruby language pipelines. It might sound like a cliché but my key takeaway from this project was that as a DevOps Developer I need to keep my eyes open and grab all the opportunities to get hands-on experience with new programming languages and frameworks even if I’m 90% sure that I will not use them in the future. Understanding the concepts of more languages and frameworks will help you to get the bigger picture and will highly reduce the time to adapt to new situations and environments in future projects.

## 🔬 Results

For our organization securing business continuity was obviously the most important result that I was able to support with this contribution. Besides, I think delivering a reusable asset that anyone can use globally put our local IT organization on the map. Since we also know how to work with Tekton and how we can contribute, we became self-sufficient meaning that if we have an application using an older tech stack that is not supported, we can just build a new workflow on our own.

As far as I’m concerned, this was my first time contributing to an InnerSource project and I dare to say that this was not my last time either. As a matter of fact, I have plenty of projects on my radar for next year. Moreover, I can’t emphasize enough that my most important result related to this project was the hands-on DevOps experience and the in-depth knowledge I gained, I’m glad I got this opportunity.

Last but not least, with the migration to this new CI/CD solution we got rid of third-party dependencies and our software supply chain is more secure and compliant with our company’s IT security standards which was the main reason we undertook this venture.
