# Hackyfolio ~ Portfolio for Devs 🚀

A clean, fast personal portfolio built with Next.js. Edit one JSON file, get a full website. 🚀

<p align="center">
  <img width="700" alt="Portfolio screenshot" src="https://github.com/user-attachments/assets/67dfde3b-577e-4fcb-9f84-aa4824341ece" />
</p>

The whole site is driven by a single data file: [`app/data/portfolio.json`](app/data/portfolio.json). You write your content there, and the page renders it for you. You should not need to touch any code to make this your own.

It also has two views, toggled with a switch in the bottom bar:

- **Human mode**: the normal, good-looking website.
- **Agent mode**: the same content as plain Markdown text, friendly for AI agents and scrapers. This is generated from the same JSON, so it can never go out of sync.

## How it works (the one idea)

Think of your portfolio as a stack of **sections**: a hero, an experience list, a project, a contact card, and so on.

- Each section is one entry in the `sections` list inside `portfolio.json`.
- Each entry has a `type` (which kind of section it is) and `data` (what goes in it).
- For every `type`, there is a matching component that knows how to draw it.

So the flow is simple:

```
portfolio.json  ->  picks a component by "type"  ->  shows your data on the page
```

To reorder sections, move them up or down in the JSON. To remove one, delete its block. To change wording, edit its text. That is it.

## Quick start

You need [Node.js](https://nodejs.org) (version 18 or newer) installed.

```bash
# 1. install dependencies
npm install

# 2. run the local dev server
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser. As you edit files, the page updates on its own.

To build the production version locally:

```bash
npm run build
npm run start
```

## Make it yours

### The fast way: let an AI agent do it 🤖

This project is built to be AI-friendly, so the quickest path is to hand the work to a coding agent like [Claude Code](https://www.anthropic.com/claude-code) (or your favorite agentic coding tool).

Try this:

1. Open the project in your AI coding tool.
2. Give it your raw material: your resume, a LinkedIn export, an old "about me" doc, or even a few messy notes.
3. Ask it to fill in your details. For example:
   > "Read `app/data/portfolio.json` to learn the structure, then rewrite it using my resume attached here. Keep the same schema, drop sections I do not need, and run `npm run build` when done."

The agent reads the schema (this README and the section files explain it), structures your content into the JSON, and you get a working portfolio in minutes instead of hours. You can then tweak the wording by hand.

If you would rather do it yourself, read on. It is still simple.

### The manual way

Almost everything lives in [`app/data/portfolio.json`](app/data/portfolio.json). Open it and change the words.

The file has three top-level parts:

| Part | What it holds |
|------|---------------|
| `meta` | Your site URL, calendar link, and email. |
| `socials` | Your social links (used in the bottom bar and the contact card). |
| `sections` | The ordered list of everything shown on the page. |

Then swap the images in the `public/` folder (`me.png` and `youtube-profile.png`) for your own, keeping the same file names, or update the image paths in the JSON.

### Writing text with formatting

Most text fields accept simple Markdown:

- `**bold**` makes text bold.
- `[click here](https://example.com)` makes a link.

Some sections take a `body` made of **blocks**. A block is either a paragraph (a normal string) or a bullet list (an object with a `list`). Example:

```json
"body": [
  "I built **MetaWiper**, a tool that cleaned image metadata.",
  { "list": ["First point", "Second point", "Third point"] },
  "A closing paragraph with a [link](https://example.com)."
]
```

### The sections you can use

Each `type` maps to a component in [`app/components/sections/`](app/components/sections/). Open any component file to see the exact fields it accepts (its `*Data` type is right at the top).

| `type` | What it shows |
|--------|---------------|
| `hero` | Photo, name, pronunciation, live local time, and intro lines. |
| `experience` | A featured current role plus a clickable "Previously" list. |
| `techStack` | Your skills, as a scrolling row that expands into categories. |
| `expandableCard` | A single titled card with a "read more" body. Good for a story. |
| `project` | A project with a description, a stats grid, and a link. |
| `youtube` | A channel header with a list of videos. |
| `education` | A simple list of schools or courses. |
| `github` | A GitHub contributions graph (just give it a username). |
| `publications` | Research papers with an abstract you can expand. |
| `recommendations` | Quotes from people, with name and role. |
| `contact` | Call-to-action buttons and your social links. |

## For the curious: project layout

```
app/
  data/
    portfolio.json        <- YOUR CONTENT lives here
    generateMarkdown.ts   <- turns the JSON into agent-mode Markdown
  components/
    sections/             <- one component per section type
    sections/registry.tsx <- connects each "type" to its component
    RichText.tsx          <- renders the **bold** / [links] / bullet lists
    Collapsible.tsx       <- the "read more / read less" boxes
    SectionShell.tsx      <- the title + spacing wrapper around a section
    icons.tsx             <- maps icon names (like "github") to icons
  page.tsx                <- thin shell that loops over your sections
public/                   <- images and static files
```

### Adding a brand new kind of section

Only needed if none of the existing types fit. Three steps:

1. Create a component in `app/components/sections/`, for example `AwardsSection.tsx`. Export the component and a type that describes its `data`.
2. Register it in `app/components/sections/registry.tsx`: add it to the `Section` list and add one `case` in `SectionRenderer`.
3. Add a matching block (with your new `type`) to `sections` in `portfolio.json`.

If you forget step 2, the build will warn you, so it is hard to get wrong.

## Deploy

The easiest host is [Vercel](https://vercel.com), made by the same team behind Next.js. It is free for personal sites.

1. Push your code to a GitHub repository.
2. Go to Vercel, click **New Project**, and import that repository.
3. Accept the defaults and click **Deploy**.

That is all. Every time you push a change to GitHub, Vercel rebuilds and ships it. To use your own domain, add it under the project's **Domains** settings.

Any host that runs Next.js works too (Netlify, Cloudflare, your own server with `npm run build && npm run start`), but Vercel is the smoothest path.

## Notes for AI agents

If you are an assistant helping someone build their portfolio with this template:

- Treat [`app/data/portfolio.json`](app/data/portfolio.json) as the source of truth. Editing content means editing this file, not the components.
- Each section's exact schema is the `*Data` type exported at the top of its file in [`app/components/sections/`](app/components/sections/). Read it before writing data.
- Text fields support inline `**bold**` and `[links](url)`. A `body` field is an array of blocks: strings (paragraphs) or `{ "list": [...] }` (bullets).
- The bottom-bar links and the contact card both read from the top-level `socials` list. Update it once.
- Do not duplicate content into a separate Markdown file. The agent-mode view is generated by [`app/data/generateMarkdown.ts`](app/data/generateMarkdown.ts) from the same JSON.
- Run `npm run build` to verify changes. A missing section `case` or a wrong field type will fail the type check.
