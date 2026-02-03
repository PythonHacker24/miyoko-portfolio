"use client";

import Image from "next/image";
import { Github, Linkedin, Youtube, Calendar, Bot, User, QrCode, X, ArrowRight, Music, Pause } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { ExperienceItem } from "./components/ExperienceItem";
import { GithubGraph } from "./components/GithubGraph";
import { TechStack } from "./components/TechStack";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { QRCodeSVG } from "qrcode.react";
import { ThemeToggle } from "./components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

import { PomodoroTimer } from "./components/PomodoroTimer";
import { NeuralNetworkSim } from "./components/NeuralNetworkSim";

import { getMarkdownContent } from "./data/content";

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
);

export default function Home() {
  const [time, setTime] = useState<string>("");
  const [showQR, setShowQR] = useState(false);
  const [mode, setMode] = useState<"human" | "agent">("human");

  const { setTheme, resolvedTheme } = useTheme();

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

  const markdownContent = getMarkdownContent(time);

  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);
  const [lofiVolume, setLofiVolume] = useState(1);
  const lofiRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (lofiRef.current) {
      lofiRef.current.volume = lofiVolume;
    }
  }, [lofiVolume]);

  useEffect(() => {
    return () => {
      if (lofiRef.current) {
        lofiRef.current.pause();
        lofiRef.current = null;
      }
    };
  }, []);

  const toggleLofi = () => {
    if (!lofiRef.current) {
      lofiRef.current = new Audio("/lofi.mp3");
      lofiRef.current.loop = true;
      lofiRef.current.volume = lofiVolume;
    }

    if (isLofiPlaying) {
      lofiRef.current.pause();
    } else {
      lofiRef.current.play().catch(e => console.error("Lofi play failed:", e));
    }
    setIsLofiPlaying(!isLofiPlaying);
  };

  const starPositions = useMemo(() => {
    return [...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className={`relative flex min-h-screen flex-col items-center bg-white dark:bg-black px-3 pt-16 text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300`}>
      {/* Easter Egg Effects */}
      <AnimatePresence>
        {showEasterEgg && (
          <>
            {/* Bluish Aura Edge Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] pointer-events-none shadow-[inset_0_0_150px_rgba(29,78,216,0.5)] dark:shadow-[inset_0_0_150px_rgba(59,130,246,0.4)] transition-opacity duration-1000"
            />
            {/* Twinkling Stars Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            >
              {starPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute h-[2px] w-[2px] bg-blue-500 dark:bg-white rounded-full shadow-[0_0_4px_rgba(59,130,246,0.8)] dark:shadow-[0_0_3px_white]"
                  style={{
                    top: pos.top,
                    left: pos.left,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: pos.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: pos.delay,
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <AnimatePresence mode="wait">
        {mode === "agent" ? (
          /* Agent Mode - Markdown View */
          <motion.main
            key="agent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-start text-left px-4 sm:px-0"
          >
            <pre
              className="w-full whitespace-pre-wrap font-mono text-sm leading-relaxed text-black dark:text-gray-300 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black antialiased"
              style={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Console", monospace' }}
            >
              {markdownContent}
            </pre>
          </motion.main>
        ) : (
          /* Human Mode - Original View */
          <motion.main
            key="human"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-center text-center"
          >
            {/* Profile Image - Easter Egg Trigger */}
            <button
              onClick={() => setShowEasterEgg(!showEasterEgg)}
              className="group relative mb-2 h-40 w-40 grayscale filter sm:h-56 sm:w-56 overflow-hidden cursor-pointer transition-all duration-500 hover:grayscale-0 active:scale-95"
              aria-label="Toggle Aura Mode"
            >
              <Image
                src="/me.png" // User's photo
                alt="Profile"
                fill
                className={`object-contain transition-all duration-700 ${showEasterEgg ? 'grayscale-0 scale-105' : 'grayscale'}`}
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-black dark:via-black/60 backdrop-blur-[1px]" />

              {/* Subtle Glow on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.3)] rounded-full pointer-events-none" />
            </button>

            {/* Hero Text */}
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl">
              Aditya Patil
            </h1>

            {/* Phonetic Pronunciation (Aesthetic touch often found in minimal portfolios) */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
              <span>/əˈdɪtjə pɑːˈtiːl/</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span>noun</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="tabular-nums text-xs sm:text-sm">{time || "00:00:00"}</span>
                  <span className="text-[10px] uppercase tracking-wider sm:text-xs">IST</span>
                </div>

                <span className="text-gray-300 dark:text-gray-700">•</span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">lofi</span>
                  <button
                    onClick={toggleLofi}
                    className="flex h-5 w-5 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-black dark:hover:text-white"
                    aria-label={isLofiPlaying ? "Pause Lofi" : "Play Lofi"}
                  >
                    {isLofiPlaying ? <Pause size={10} fill="currentColor" /> : <Music size={10} />}
                  </button>
                  <AnimatePresence>
                    {isLofiPlaying && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 40, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="flex h-5 items-center overflow-hidden"
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={lofiVolume}
                          onChange={(e) => setLofiVolume(parseFloat(e.target.value))}
                          className="h-[2px] w-8 cursor-pointer appearance-none rounded-full bg-gray-200 dark:bg-zinc-800 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-400 dark:[&::-webkit-slider-thumb]:bg-zinc-500 hover:[&::-webkit-slider-thumb]:bg-black dark:hover:[&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-400 dark:[&::-moz-range-thumb]:bg-zinc-500 hover:[&::-moz-range-thumb]:bg-black dark:hover:[&::-moz-range-thumb]:bg-white transition-all"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4 text-left text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
              <p>
                a full-stack developer and <a href="https://en.wikipedia.org/wiki/Product_design" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">product builder</a> with deep experience across engineering, product strategy, and user-centric design.
              </p>
              <p>
                a <a href="https://en.wikipedia.org/wiki/Polymath" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">polymath</a> who bridges technical architecture with business outcomes to create impactful, scalable solutions.
              </p>
            </div>

            <NeuralNetworkSim />

            {/* Experience Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Experience
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="Entrepreneur First"
                  role="Founder in Residence, Bengaluru"
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


            {/* In Between These Experiences Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                In Between These Experiences
              </h2>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                <ExperienceItem
                  title="The Product Building Journey"
                  role=""
                  collapsible={true}
                >
                  <div className="space-y-4">
                    <p>I've been building and experimenting on the product side for a long time. Each previous product always feels naive in hindsight, but looking back, I can see they were incrementally better, each iteration teaching me something new about users, infrastructure, and what it takes to build something people actually want.</p>

                    <p>It started with <span className="font-medium">MetaWiper</span> during my sophomore year, a tool that cleaned image metadata. No one would use it, but I was proud. It was my first real attempt at shipping something complete.</p>

                    <p>Next came <span className="font-medium">Stockic</span>, a news app where I spent months doing serious infrastructure work. This was where I learned to build systems that could scale, not just features that looked good.</p>

                    <p>Then I worked on <span className="font-medium">Gloss Card</span>, and for the first time, a customer actually wanted to buy it for their product. That validation, knowing someone saw enough value to pay, was a turning point.</p>

                    <p>After that, I built <span className="font-medium">NeuraLeap</span>, where I had the most meaningful user interactions yet, HRs from established firms. I worked on data pipelines capable of handling 50 million LinkedIn profiles and processing them with AI. The scale was different, the stakes were higher, and the technical challenges forced me to level up.</p>

                    <p>Most recently, I worked on <span className="font-medium">Meteor</span>, an AI SEO toolkit at Entrepreneurs First. This time, my product was being used by 6 YC-backed companies. Real users. Real traction. Real feedback loops.</p>

                    <p className="font-medium text-black">So yes, hard work and consistency pay off. Each product was a step forward, even when it didn't feel like it at the time.</p>
                  </div>
                </ExperienceItem>
              </div>
            </div>


            {/* Education Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
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
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                GitHub Contributions
              </h2>
              <GithubGraph />
            </div>

            {/* Research Publications Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
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
                      <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                        2025 17th International Conference on COMmunication Systems and NETworks (COMSNETS)
                      </p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <p className="text-gray-600 dark:text-gray-400">Authors: Aditya Patil; T. S. Sreeram</p>
                        <a
                          href="https://doi.org/10.1109/COMSNETS63942.2025.10885597"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          View Publication
                        </a>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">Abstract</p>
                      <p className="text-gray-600 dark:text-gray-400">Supervisory Control and Data Acquisition systems are the backbone of managing critical infrastructure in modern industrial control systems, spanning sectors from power generation to logistics. However, these systems face significant challenges due to threats from malicious actors. The Modbus protocol, despite its known lack of security features, is still used in many industries managing critical infrastructure due to the high cost of replacing existing systems. As a result, these legacy systems remain vulnerable to potentially damaging threats. This paper proposes an adapter device for enhancing the security of the Modbus protocol without replacing devices in legacy systems. The proposed adapter is cost-efficient, provides cross-platform support, and is easy to install, update, and maintain.</p>
                    </div>
                  </div>
                </ExperienceItem>
              </div>
            </div>

            {/* Tech Stack Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Tech Stack
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                I&apos;m a generalist at heart who can build with anything, but here&apos;s the core stack I&apos;ve spent the most time with:
              </p>
              <TechStack />
            </div>

            {/* Recommendations by Clients Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Recommendations by Clients
              </h2>
              <div className="space-y-8">
                {/* Roy Feldman Recommendation */}
                <div className="group border-l-2 border-gray-200 dark:border-gray-800 pl-6 transition-all hover:border-black dark:hover:border-white">
                  <div className="mb-3">
                    <a
                      href="https://www.linkedin.com/in/royhax/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                    >
                      Roy Feldman
                    </a>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    I've had the privilege to work with Aditya on several highly technical cybersecurity R&D projects involving design and implementation of defensive network components in Golang, network protocol research and analysis. He is a bright young engineer, extremely talented in hacking and cybersecurity, with a natural curiosity and passion for hacking, and a gift understanding how systems work, how to design and break them. I am certain that he will succeed in any endeavor he puts his mind to, in the realms of cybersecurity, engineering and beyond! :)
                  </p>
                </div>

                {/* Tom Granot Recommendation */}
                <div className="group border-l-2 border-gray-200 dark:border-gray-800 pl-6 transition-all hover:border-black dark:hover:border-white">
                  <div className="mb-3">
                    <a
                      href="https://www.linkedin.com/in/tomgranot/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                    >
                      Tom Granot
                    </a>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    It's not often that you get to talk to a person who is not only hungry for mentorship, but comes out of the gate with the attitude that enables him to learn so, so quickly on his feet.
                    <br /><br />
                    Aditya did research for highly technical content for me and independently navigated difficult situations without a lot of guidance. If you're looking for someone to research a technical topic for your content work, Aditya is disciplined, thorough and insistent on understanding things in depth before giving a final output.
                    <br /><br />
                    Keep on keeping on brother!
                  </p>
                </div>
              </div>
            </div>

            {/* Videos Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Explainer Videos
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                Here is how I explain complex systems on my {" "}
                <a
                  href="https://www.youtube.com/@theracecondition"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  YouTube Channel
                </a>
              </p>
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-gray-100 dark:border-gray-900 bg-gray-50 dark:bg-gray-950 shadow-sm transition-all hover:shadow-md grayscale hover:grayscale-0 duration-500">
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
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Writings & Blogs
              </h2>
              <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                I host my thoughts on{" "}
                <a
                  href="https://medium.com/@adityapatil24680"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black dark:text-white underline underline-offset-4 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Medium
                </a>{" "}
                rather than building a custom site. Instead of overengineering and reinventing the wheel, I prefer leveraging a mature platform that lets me focus on what matters: sharing insights on AI systems, product strategy, and technical architecture.
              </p>
            </div>

            {/* Library Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Library
              </h2>

              {/* Dev Subsection */}
              <div className="mb-8">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-600">
                  Dev
                </h3>
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
                      <span className="text-sm font-medium text-black dark:text-white group-hover:underline underline-offset-4 decoration-gray-200 dark:decoration-gray-800 transition-all">
                        {book.title}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {book.author}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Casual Reads Subsection */}
              <div className="mb-4">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-600">
                  Casual Reads
                </h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  {[
                    { title: "Hooked: How to Build Habit-Forming Products", author: "Nir Eyal" },
                    { title: "The Lean Startup", author: "Eric Ries" },
                    { title: "Zero to One", author: "Peter Thiel" },
                    { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson" },
                    { title: "Deep Work", author: "Cal Newport" },
                    { title: "The Anthology of Balaji Srinivasan", author: "Eric Jorgenson" }
                  ].map((book) => (
                    <div key={book.title} className="group flex flex-col gap-1 transition-all">
                      <span className="text-sm font-medium text-black dark:text-white group-hover:underline underline-offset-4 decoration-gray-200 dark:decoration-gray-800 transition-all">
                        {book.title}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {book.author}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note */}
              <p className="mt-6 text-xs italic text-gray-400 dark:text-gray-500">
                *and many more, these are just one of my best reads
              </p>
            </div>

            {/* Thing about me Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Thing about me
              </h2>
              <div className="space-y-6">
                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
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

                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
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
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Connect with me on{" "}
                  <a
                    href="https://www.linkedin.com/in/aditya-patil-260a631b2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    LinkedIn
                  </a>{" "}
                  or{" "} shoot an {" "}
                  <a
                    href="mailto:adityapatil24680@gmail.com"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    email
                  </a>
                </p>
              </div>
            </div>

            {/* Pomodoro Timer Section */}
            <PomodoroTimer />



          </motion.main>
        )}
      </AnimatePresence>

      {/* Glass Island Navbar */}
      <nav className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-4 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-zinc-900 sm:gap-6 sm:px-6">
        {/* Mode Toggle Switch */}
        <div className="flex items-center">
          <button
            onClick={() => setMode(mode === "human" ? "agent" : "human")}
            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 dark:bg-zinc-700 p-1 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none"
            role="switch"
            aria-checked={mode === "agent"}
            title={`Switch to ${mode === "human" ? "agent" : "human"} mode`}
          >
            <div
              className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white dark:bg-white shadow-sm transition duration-200 ease-in-out ${mode === "agent" ? "translate-x-5" : "translate-x-0"
                }`}
            >
              {mode === "human" ? (
                <User className="h-3 w-3 text-black" />
              ) : (
                <Bot className="h-3 w-3 text-black" />
              )}
            </div>
          </button>
        </div>
        <button
          onClick={() => setShowQR(true)}
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="Show QR Code"
        >
          <QrCode className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-gray-200 dark:bg-zinc-700" />
        <a
          href="https://github.com/PythonHacker24"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/aditya-patil-260a631b2/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="https://x.com/firecaffeine"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <FaXTwitter className="h-5 w-5" />
        </a>
        <a
          href="https://youtube.com/@theracecondition"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Youtube className="h-5 w-5" />
        </a>
        <a
          href="https://discord.gg/ry4YCJaShK"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <DiscordIcon className="h-5 w-5" />
        </a>
        <a
          href="https://cal.com/adi-patil/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Calendar className="h-5 w-5" />
        </a>
      </nav>

      {/* QR Code Modal */}
      {
        showQR && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 dark:bg-white/5 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          >
            <div
              className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute -right-3 -top-3 rounded-full bg-black dark:bg-white p-2 text-white dark:text-black transition-transform hover:scale-110"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="rounded-lg bg-white p-2">
                <QRCodeSVG
                  value="https://www.justaditya.com/"
                  size={200}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}

