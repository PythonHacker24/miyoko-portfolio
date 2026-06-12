import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";

import { ThemeToggle } from "../components/ThemeToggle";
import { CodeBlock } from "../components/docs/CodeBlock";
import { PromptCard } from "../components/docs/PromptCard";

export const metadata: Metadata = {
  title: "Docs — Hackyfolio",
  description: "How to build and customize a JSON-driven portfolio.",
};

const REPO_URL = "https://github.com/PythonHacker24/yo-hackyfolio";

const SETUP_PROMPT = `You are helping me build my personal portfolio website from an open-source template called Hackyfolio. It is a Next.js site where ALL content lives in ONE JSON file (app/data/portfolio.json) and fixed components render it. I should only ever edit that JSON, never the component code.

Work through these steps in order:

1) Set up the project:
   - git clone ${REPO_URL}.git my-portfolio
   - cd my-portfolio
   - npm install
   - npm run dev  (then tell me to open http://localhost:3000)

2) Learn the schema BEFORE editing anything. Read:
   - CLAUDE.md (the full schema guide)
   - app/data/portfolio.json (current example content)
   - the exported *Data types at the top of each file in app/components/sections/

3) Collect MY real information. Ask me to paste my resume, LinkedIn, or any notes, and parse whatever I give you. I will need to provide:
   - name, role/title, short bio, location and timezone
   - work experience (companies, roles, dates, what I did)
   - skills / tech stack
   - projects, education, publications, YouTube or other links (only what applies)
   - social links (GitHub, LinkedIn, X, etc.), email, calendar link
   - a profile photo (tell me to drop it into the public/ folder)
   Ask follow-up questions only for missing essentials. Do not invent facts.

4) Rewrite app/data/portfolio.json using ONLY my real information:
   - keep the same schema and the same section "type" values
   - delete sections I have no data for; reorder them if I want a different order
   - rich text uses the Block format: a string is a paragraph, {"list": [...]} is bullets, and **bold** + [text](url) work inline
   - update the top-level "meta" (siteUrl, calendarUrl, email) and "socials"

5) Verify:
   - run npm run build and fix any type error or missing field it reports
   - confirm the site looks right at http://localhost:3000

6) When done, summarize what changed and walk me through deploying to Vercel (push to GitHub, import the repo at vercel.com, click Deploy).

Rules: app/data/portfolio.json is the single source of truth. Do not hardcode content in components, do not add a second data file, and ask before deleting anything you are unsure about. Start now with step 1.`;

const NAV = [
  { id: "setup", label: "One-paste setup" },
  { id: "purpose", label: "Purpose" },
  { id: "quick-start", label: "Quick start" },
  { id: "idea", label: "Core idea" },
  { id: "data", label: "The data file" },
  { id: "sections", label: "Section types" },
  { id: "blocks", label: "Rich text" },
  { id: "socials", label: "Socials" },
  { id: "arrange", label: "Rearrange" },
  { id: "extend", label: "New sections" },
  { id: "deploy", label: "Deploy" },
];

function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mb-16 w-full scroll-mt-24">
      <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
        {children}
      </div>
    </section>
  );
}

function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-[0.85em] text-black dark:text-white">
      {children}
    </code>
  );
}

export default function DocsPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white dark:bg-black px-3 pt-16 text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300">
      {/* Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <main className="flex w-full max-w-3xl flex-col text-left">
        {/* Header */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-black dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>

        <div className="mb-4 flex flex-wrap items-end gap-x-3 gap-y-1">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Hackyfolio</h1>
          <span className="mb-1.5 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Documentation
          </span>
        </div>
        <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          A JSON-driven personal portfolio built with Next.js. Write your content in one file,
          and the page builds itself. No component editing required.
        </p>

        {/* On this page */}
        <nav className="mb-16 flex flex-wrap gap-2">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full bg-gray-100 dark:bg-zinc-900 px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:-translate-y-0.5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <DocSection id="setup" title="One-paste setup">
          <p>
            The fastest way to build your own: open your AI coding tool (
            <a href="https://www.anthropic.com/claude-code" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">
              Claude Code
            </a>
            , Cursor, or similar), paste the prompt below, and follow along. It clones the repo,
            installs it, asks you for your details, writes your <C>portfolio.json</C>, and verifies
            the build. You just answer its questions.
          </p>
          <PromptCard prompt={SETUP_PROMPT} />
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Tip: have your resume or LinkedIn handy. Paste it when the assistant asks, and it will
            structure everything for you.
          </p>
        </DocSection>

        <DocSection id="purpose" title="What is this">
          <p>
            Most portfolios mix content and code, so changing a job title means digging through
            JSX. Hackyfolio splits them apart. All your content lives in a single data file. A set
            of fixed components reads that file and renders the page.
          </p>
          <p>The result: you edit text, not code. And it ships with two views.</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              <span className="font-medium text-black dark:text-white">Human mode</span> &mdash; the
              normal, good-looking website.
            </li>
            <li>
              <span className="font-medium text-black dark:text-white">Agent mode</span> &mdash; the
              same content as plain Markdown, generated from the same data, friendly for AI agents
              and scrapers. Toggle it with the switch in the bottom bar.
            </li>
          </ul>
        </DocSection>

        <DocSection id="quick-start" title="Quick start">
          <p>
            You need <C>Node.js</C> 18 or newer. Clone the repo from{" "}
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">
              GitHub
            </a>
            , then install and run:
          </p>
          <CodeBlock label="terminal">{`# clone the repo
git clone ${REPO_URL}.git
cd yo-hackyfolio

# install dependencies
npm install

# run the local dev server
npm run dev`}</CodeBlock>
          <p>
            Open <C>http://localhost:3000</C> and edit away. The page reloads as you save. To build
            the production version:
          </p>
          <CodeBlock label="terminal">{`npm run build
npm run start`}</CodeBlock>
          <p>
            Tip: the fastest way to fill this in is to hand your resume to an AI coding agent like
            Claude Code and ask it to populate the data file. The repo includes a{" "}
            <C>CLAUDE.md</C> that teaches agents the schema.
          </p>
        </DocSection>

        <DocSection id="idea" title="The core idea">
          <p>One file drives everything. The flow looks like this:</p>
          <CodeBlock>{`app/data/portfolio.json
  -> SectionRenderer  (picks a component by "type")
    -> one component per section type
      -> rendered on the page`}</CodeBlock>
          <p>
            The page loops over an ordered <C>sections</C> array and renders each one. The order in
            the file is the order on the page. The agent-mode Markdown view is generated from the
            same JSON, so the two views can never drift apart.
          </p>
        </DocSection>

        <DocSection id="data" title="The data file">
          <p>
            Everything lives in <C>app/data/portfolio.json</C>. It has three top-level parts:
          </p>
          <CodeBlock label="app/data/portfolio.json">{`{
  "meta":     { "siteUrl": "...", "calendarUrl": "...", "email": "..." },
  "socials":  [ { "label": "GitHub", "href": "...", "icon": "github" } ],
  "sections": [ /* ordered list of sections, see below */ ]
}`}</CodeBlock>
          <p>Each section is a small object with a type, a title, and its data:</p>
          <CodeBlock label="a section">{`{
  "type": "experience",
  "title": "Experience",
  "data": { /* shape depends on the type */ }
}`}</CodeBlock>
          <p>
            The <C>hero</C> section is the only one without a <C>title</C>.
          </p>
        </DocSection>

        <DocSection id="sections" title="Section types">
          <p>
            These are the built-in types. Each maps to a component in{" "}
            <C>app/components/sections/</C>. Open a component to see its exact <C>*Data</C> type at
            the top of the file.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-left text-gray-500 dark:text-gray-500">
                  <th className="px-4 py-3 font-semibold">type</th>
                  <th className="px-4 py-3 font-semibold">What it shows</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                {[
                  ["hero", "Photo, name, pronunciation, live local time, intro lines."],
                  ["experience", "A featured current role plus a clickable 'Previously' list."],
                  ["techStack", "Skills as a scrolling row that expands into categories."],
                  ["expandableCard", "A single titled card with a read-more body."],
                  ["project", "A project with description, a stats grid, and a link."],
                  ["youtube", "A channel header with a list of videos."],
                  ["education", "A list of schools or courses."],
                  ["github", "A GitHub contributions graph (give it a username)."],
                  ["publications", "Papers with an abstract you can expand."],
                  ["recommendations", "Quotes from people, with name and role."],
                  ["contact", "Call-to-action buttons and your social links."],
                ].map(([type, desc]) => (
                  <tr key={type} className="border-b border-gray-100 dark:border-zinc-900 last:border-0">
                    <td className="px-4 py-3 align-top">
                      <C>{type}</C>
                    </td>
                    <td className="px-4 py-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>A typical section, the project type, looks like this:</p>
          <CodeBlock label="a project section">{`{
  "type": "project",
  "title": "Coolest Experiment",
  "data": {
    "name": "Double Dart",
    "link": "https://example.com",
    "subtitle": "a short tagline",
    "body": [ "A paragraph with **bold** and a [link](https://x.com)." ],
    "stats": [ { "value": "201", "label": "sign-ups in 3 days" } ],
    "footerLink": { "label": "Read more", "url": "https://example.com" }
  }
}`}</CodeBlock>
        </DocSection>

        <DocSection id="blocks" title="Rich text (the Block type)">
          <p>
            Anywhere you see a <C>body</C> or <C>intro</C> field, the value is an array of
            &ldquo;blocks&rdquo;. A block is either a paragraph (a plain string) or a bullet list
            (an object with a <C>list</C>):
          </p>
          <CodeBlock label="body example">{`"body": [
  "A paragraph. Supports **bold** and [links](https://example.com).",
  { "list": ["First bullet", "Second bullet with **bold**"] },
  "Another paragraph after the list."
]`}</CodeBlock>
          <p>
            Inline formatting works inside any string: <C>**bold**</C> and{" "}
            <C>[text](url)</C>. That is the whole syntax.
          </p>
        </DocSection>

        <DocSection id="socials" title="Socials and icons">
          <p>
            The <C>socials</C> array is used in two places at once: the bottom navbar and the
            contact section. Edit it once, both update.
          </p>
          <CodeBlock label="a social link">{`{ "label": "GitHub", "href": "https://github.com/you", "icon": "github" }`}</CodeBlock>
          <p>
            Valid <C>icon</C> names: <C>github</C>, <C>linkedin</C>, <C>x</C>, <C>youtube</C>,{" "}
            <C>discord</C>, <C>medium</C>, <C>calendar</C>, <C>mail</C>. They map to real icons in{" "}
            <C>app/components/icons.tsx</C> &mdash; add more there if you need them.
          </p>
        </DocSection>

        <DocSection id="arrange" title="Rearrange or remove sections">
          <p>
            Want GitHub above Education? Move its block up in the <C>sections</C> array. The page
            renders in array order, so reordering the JSON reorders the page.
          </p>
          <p>
            To remove a section, delete its block. To hide one temporarily, cut it and paste it
            back later. No code touched either way.
          </p>
        </DocSection>

        <DocSection id="extend" title="Add a new section type">
          <p>Only needed if none of the built-in types fit. Four steps:</p>
          <CodeBlock>{`1. Create app/components/sections/AwardsSection.tsx
   -> export the component AND its AwardsData interface

2. In app/components/sections/registry.tsx
   -> add the variant to the Section union

3. In the same file's SectionRenderer
   -> add a case for "awards"

4. Add a block with "type": "awards" to portfolio.json`}</CodeBlock>
          <p>
            If you forget step 3, TypeScript errors at the <C>SectionRenderer</C> switch, so it is
            hard to get wrong. Run <C>npm run build</C> to confirm.
          </p>
        </DocSection>

        <DocSection id="deploy" title="Deploy">
          <p>
            The smoothest host is <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">Vercel</a>, by the team behind Next.js. It is free for personal sites.
          </p>
          <ol className="list-decimal list-inside space-y-1 pl-2">
            <li>Push your code to a GitHub repository.</li>
            <li>On Vercel, click New Project and import that repo.</li>
            <li>Accept the defaults and click Deploy.</li>
          </ol>
          <p>
            After that, every push to GitHub triggers a rebuild and redeploy. Add a custom domain
            under the project&apos;s Domains settings. Any Next.js host works too (Netlify,
            Cloudflare, your own server), but Vercel is the easiest path.
          </p>
        </DocSection>
      </main>

      {/* Bottom island nav, matching the portfolio */}
      <nav className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-5 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-zinc-900">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-300 transition-colors hover:text-black dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Portfolio
        </Link>
        <div className="h-5 w-px bg-gray-200 dark:bg-zinc-700" />
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-300 transition-colors hover:text-black dark:hover:text-white"
        >
          <Github className="h-5 w-5" /> View on GitHub
        </a>
      </nav>
    </div>
  );
}
