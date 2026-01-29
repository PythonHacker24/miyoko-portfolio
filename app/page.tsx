"use client";

import Image from "next/image";
import { Github, Linkedin, Twitter, Youtube, Calendar } from "lucide-react";
import { ExperienceItem } from "./components/ExperienceItem";
import { GithubGraph } from "./components/GithubGraph";
import { TechStack } from "./components/TechStack";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, X } from "lucide-react";

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
);

export default function Home() {
  const [time, setTime] = useState<string>("");
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-3 pt-16 text-black selection:bg-black selection:text-white pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden">
      <main className="flex w-full max-w-2xl flex-col items-center text-center">
        {/* Profile Image */}
        <div className="relative mb-2 h-40 w-40 grayscale filter sm:h-56 sm:w-56">
          <Image
            src="/me.png" // User's photo
            alt="Profile"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/60 to-transparent backdrop-blur-[1px]" />
        </div>

        {/* Hero Text */}
        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl">
          Aditya Patil
        </h1>

        {/* Phonetic Pronunciation (Aesthetic touch often found in minimal portfolios) */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 sm:text-sm">
          <span>/əˈdɪtjə pɑːˈtiːl/</span>
          <span className="text-gray-300">•</span>
          <span>noun</span>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1.5 min-w-[90px] sm:min-w-[100px]">
            <span className="tabular-nums text-xs sm:text-sm">{time || "00:00:00"}</span>
            <span className="text-[10px] uppercase tracking-wider sm:text-xs">IST</span>
          </div>
        </div>

        <div className="mb-10 w-full space-y-4 text-left text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
          <p>
            a full-stack developer and <span className="underline underline-offset-4">product builder</span> with deep experience across engineering, product strategy, and user-centric design.
          </p>
          <p>
            a <span className="underline underline-offset-4">polymath</span> who bridges technical architecture with business outcomes to create impactful, scalable solutions.
          </p>
        </div>

        {/* Experience Section */}
        <div className="mb-16 w-full text-left">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            Experience
          </h2>
          <div className="space-y-12">
            <ExperienceItem
              title="Entrepreneur First"
              role="Founder in Residence"
              collapsible={true}
              link="https://www.joinef.com/"
            >
              <div className="space-y-2">
                <p>As a Founder in Residence at Entrepreneurs First (EF), a premier global talent investor and startup accelerator known for backing exceptional individuals to build transformative companies from scratch, I am fully immersed in designing and developing cutting-edge Agentic AI systems.</p>
                <p>Actively building autonomous, goal-driven AI agents that shift from suggestion-based tools to proactive execution, enabling seamless human-AI collaboration and redefining task automation, decision-making, and operations.</p>
                <p>Driving a bold vision for the future of computing: making traditional web browsing obsolete, turning personal data into the primary interface (your "homepage"), and empowering agentic systems to independently handle complex responsibilities.</p>
                <p>Hustling full-time in a high-intensity, ambition-fueled environment surrounded by world-class cofounders, mentors, and resources - leveraging EF's structured support (including coaching, community, and potential funding pathways) to explore, validate, and iterate ideas at pace.</p>
                <p>Positioning myself at the forefront of a paradigm shift in AI, tackling hard technical and conceptual challenges to create meaningful, scalable impact in the emerging agentic era.</p>
                <p>This role highlights my entrepreneurial drive, deep technical expertise in AI systems, and commitment to pioneering the next wave of intelligent, autonomous technology.</p>
              </div>
            </ExperienceItem>

            <ExperienceItem
              title="Google Summer of Code 2025"
              role="Emory University School of Medicine, Atlanta, USA"
              collapsible={true}
              link="https://minimalistbook.com/gsoc-final-report-2025/"
            >
              <div className="space-y-2">
                <p>Designed and developed a comprehensive system for managing Access Control List (ACL) permissions across multiple Linux file system servers, including NFS and BeeGFS, demonstrating expertise in large-scale distributed systems and secure file management.</p>
                <p>Built a robust backend capable of processing millions of permission change requests, showcasing proficiency in high-performance computing and scalability.</p>
                <p>Implemented two Linux systemd daemons communicating via Unix sockets: one for gRPC-based backend interactions and another for executing ACL changes, highlighting skills in daemon development, inter-process communication, and system-level programming.</p>
                <p>Created a user-friendly Next.js frontend enabling secure login, backend communication, and scheduling of permission requests, illustrating full-stack development capabilities and focus on intuitive user experiences.</p>
              </div>
            </ExperienceItem>

            <ExperienceItem
              title="Professional Freelancer (Technical GTM)"
              role="Technical Writer, Tel Aviv, Israel"
              collapsible={true}
              link="https://www.upwork.com/freelancers/~0172a072394ece49bb?viewMode=1"
            >
              <div className="space-y-2">
                <p>Authored comprehensive, highly technical documentation (50+ pages) for a Software Composition Analysis (SCA) tool, including detailed guides on advanced features such as reachability analysis - focusing on identifying truly exploitable vulnerabilities in open-source dependencies to reduce noise and prioritize remediation in secure software development lifecycles.</p>
                <p>Ghostwrote in-depth content on Reachability Analysis for the CTO of a security company, explaining how it enhances SCA by determining whether detected vulnerabilities are actually reachable and exploitable in the application's codebase - delivering clear, authoritative thought leadership material suitable for blogs, whitepapers, or technical marketing.</p>
                <p>Deployed and configured Flipt (an open-source, Git-native feature flagging platform) on cloud infrastructure to support video production workflows for a feature flagging provider; troubleshot and resolved operational issues to ensure reliable, production-ready performance in a dynamic environment.</p>
                <p>Developed custom scraping tools for a proxy provider targeting real estate platforms, enabling efficient data extraction while adhering to technical and ethical constraints; rapidly produced high-quality articles and technical write-ups on the tools, scraping methodologies, and platform integrations to support knowledge sharing and client deliverables.</p>
              </div>
            </ExperienceItem>

            <ExperienceItem
              title="Engineering Intern"
              role="Athena Consulting Ltd. Dubai"
              collapsible={true}
            >
              <div className="space-y-2">
                <p>Led the complete system design and deployment architecture for Eumlet, a UAE-based B2B Web3 payments and financial platform (built on Next.js), on AWS infrastructure. Configured Debian EC2 instances, Application Load Balancer (ALB), and NGINX reverse proxy under senior guidance - ensuring high availability, scalability, and secure handling of financial transactions in a regulated environment.</p>
                <p>Engineered automated CI/CD pipelines using GitHub Actions for seamless build, test, and deployment workflows, with direct integration and manual orchestration to EC2 targets - demonstrating strong expertise in modern DevOps practices, infrastructure as code principles, and zero-downtime deployments for production fintech applications.</p>
                <p>Managed a team of 4 developers while simultaneously supporting two high-value clients: Lunarspace and Concordium (a privacy-focused Layer-1 blockchain platform) - balancing tight deadlines, client expectations, and resource constraints in a fast-paced environment. Authored comprehensive legal and technical developer handbooks to standardize onboarding, compliance, and best practices for new recruits.</p>
                <p>Collaborated remotely with BGTrade (China-based financial platform team) on global security audits and production deployments of sensitive financial systems - coordinating across time zones and cultures to identify vulnerabilities, implement hardening measures, and ensure secure, compliant rollouts in cross-border fintech ecosystems.</p>
              </div>
            </ExperienceItem>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16 w-full text-left">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            Education
          </h2>
          <div className="space-y-12">
            <ExperienceItem
              title="National Institute of Technology Hamirpur"
              role="Electrical Engineering"
            >
              <p>2022 - Surviving</p>
            </ExperienceItem>
          </div>
        </div>

        {/* Contributions Section */}
        <div className="mb-16 w-full text-left">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            GitHub Contributions
          </h2>
          <GithubGraph />
        </div>

        {/* Research Publications Section */}
        <div className="mb-16 w-full text-left">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            Research Publications
          </h2>
          <div className="space-y-12">
            <ExperienceItem
              title="Cross-Compatible Encryption Adapter for Securing Legacy Modbus Devices"
              role=""
              collapsible={true}
              collapsedHeight="max-h-40"
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400 font-medium">
                    2025 17th International Conference on COMmunication Systems and NETworks (COMSNETS)
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <p className="text-gray-600">Authors: Aditya Patil; T. S. Sreeram</p>
                    <a
                      href="https://doi.org/10.1109/COMSNETS63942.2025.10885597"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-medium text-black underline underline-offset-4 hover:text-gray-600"
                    >
                      View Publication
                    </a>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Abstract</p>
                  <p>Supervisory Control and Data Acquisition systems are the backbone of managing critical infrastructure in modern industrial control systems, spanning sectors from power generation to logistics. However, these systems face significant challenges due to threats from malicious actors. The Modbus protocol, despite its known lack of security features, is still used in many industries managing critical infrastructure due to the high cost of replacing existing systems. As a result, these legacy systems remain vulnerable to potentially damaging threats. This paper proposes an adapter device for enhancing the security of the Modbus protocol without replacing devices in legacy systems. The proposed adapter is cost-efficient, provides cross-platform support, and is easy to install, update, and maintain.</p>
                </div>
              </div>
            </ExperienceItem>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-16 w-full text-left">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            Tech Stack
          </h2>
          <TechStack />
        </div>

        {/* Videos Section */}
        <div className="mb-16 w-full text-left">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            Explainer Videos
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Here is how I explain complex systems on my {" "}
            <a
              href="https://www.youtube.com/@theracecondition"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline underline-offset-4 hover:text-gray-600"
            >
              YouTube Channel
            </a>
          </p>
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm transition-all hover:shadow-md grayscale hover:grayscale-0 duration-500">
            <iframe
              src="https://www.youtube.com/embed/m84tBP_4DWE"
              title="Explaining Complex Systems"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>

        {/* Writings & Blogs Section */}
        <div className="mb-16 w-full text-left">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            Writings & Blogs
          </h2>
          <p className="w-full text-lg leading-relaxed text-gray-600">
            I host my thoughts on{" "}
            <a
              href="https://medium.com/@adityapatil24680"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline underline-offset-4 transition-colors hover:text-gray-600"
            >
              Medium
            </a>{" "}
            rather than building a custom site. Instead of overengineering and reinventing the wheel, I prefer leveraging a mature platform that lets me focus on what matters: sharing insights on AI systems, product strategy, and technical architecture.
          </p>
        </div>

        {/* Library Section */}
        <div className="mb-16 w-full text-left">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            Library
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {[
              { title: "Linux Kernel Development", author: "Robert Love" },
              { title: "Hacking: The Art of Exploitation", author: "Jon Erickson" },
              { title: "Linux in a Nutshell", author: "Ellen Siever, Stephen Figgins, Robert Love, and Arnold Robbins" },
              { title: "Linux Kernel in a Nutshell", author: "Greg Kroah-Hartman" },
              { title: "The Art of Electronics", author: "Paul Horowitz and Winfield Hill" },
              { title: "Nmap Cookbook", author: "Nicholas Marsh" }
            ].map((book) => (
              <div key={book.title} className="group flex flex-col gap-1 transition-all">
                <span className="text-sm font-medium text-black group-hover:underline underline-offset-4 decoration-gray-200 transition-all">
                  {book.title}
                </span>
                <span className="text-xs text-gray-400">
                  {book.author}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Thing about me Section */}
        <div className="mb-16 w-full text-left">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            Thing about me
          </h2>
          <div className="space-y-6">
            <p className="w-full text-lg leading-relaxed text-gray-600">
              Beyond engineering and build systems, I find balance in the tactile and the thoughtful. Whether it&apos;s exploring the nuances of complex architectures or spending time in the real world, my approach to life is driven by curiosity and a desire to understand how things work at their core.
            </p>

            <div className="flex justify-center">
              <div className="relative h-[250px] w-full max-w-sm grayscale hover:grayscale-0 transition-all duration-700 sm:h-[350px]" style={{ maskImage: "radial-gradient(circle, black 40%, transparent 95%)", WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 95%)" }}>
                <Image
                  src="/casual.png"
                  alt="Casual photo"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>

            <p className="w-full text-lg leading-relaxed text-gray-600">
              I believe that the best products are built by people who have a diverse range of interests. It&apos;s the unique combination of technical depth and human perspective that allows us to create technology that actually resonates.
            </p>
          </div>
        </div>

        {/* Get in Touch Section */}
        <div className="mb-16 w-full text-left">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            Get in Touch
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-600">
              Connect with me on{" "}
              <a
                href="https://linkedin.com/in/adityapatil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline underline-offset-4 hover:text-gray-600"
              >
                LinkedIn
              </a>{" "}
              or{" "} shoot an {" "}
              <a
                href="mailto:adityapatil24680@gmail.com"
                className="text-black underline underline-offset-4 hover:text-gray-600"
              >
                email
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Glass Island Navbar */}
      <nav className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 sm:gap-6 sm:px-6">
        <button
          onClick={() => setShowQR(true)}
          className="text-gray-500 transition-colors hover:text-black hover:scale-110"
          aria-label="Show QR Code"
        >
          <QrCode className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-gray-200" />
        <a
          href="https://github.com/PythonHacker24"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:text-black hover:scale-110"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/aditya-patil-260a631b2/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:text-black hover:scale-110"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="https://x.com/firecaffeine"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:text-black hover:scale-110"
        >
          <Twitter className="h-5 w-5" />
        </a>
        <a
          href="https://youtube.com/@theracecondition"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:text-black hover:scale-110"
        >
          <Youtube className="h-5 w-5" />
        </a>
        <a
          href="https://discord.gg/ry4YCJaShK"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:text-black hover:scale-110"
        >
          <DiscordIcon className="h-5 w-5" />
        </a>
        <a
          href="https://cal.com/adi-patil/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:text-black hover:scale-110"
        >
          <Calendar className="h-5 w-5" />
        </a>
      </nav>

      {/* QR Code Modal */}
      {showQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={() => setShowQR(false)}
        >
          <div
            className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute -right-3 -top-3 rounded-full bg-black p-2 text-white transition-transform hover:scale-110"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <QRCodeSVG
              value="https://www.justaditya.com/"
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

