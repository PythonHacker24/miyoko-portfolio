"use client";

const technologies = [
    { name: "Next.js", slug: "nextdotjs" },
    { name: "Go", slug: "go" },
    { name: "Python", slug: "python" },
    { name: "Hugging Face", slug: "huggingface" },
    { name: "TypeScript", slug: "typescript" },
    { name: "React", slug: "react" },
    { name: "Tailwind CSS", slug: "tailwindcss" },
    { name: "GitHub", slug: "github" },
    { name: "Git", slug: "git" },
    { name: "Docker", slug: "docker" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "FastAPI", slug: "fastapi" },
    { name: "MongoDB", slug: "mongodb" },
    { name: "Shadcn UI", slug: "shadcnui" },
    { name: "Redis", slug: "redis" },
    { name: "Vercel", slug: "vercel" },
];

export function TechStack() {
    return (
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-infinite-scroll">
                <div className="flex gap-12 py-4 pr-12">
                    {technologies.map((tech, index) => (
                        <div key={index} className="flex flex-col items-center justify-center gap-2">
                            <div className="h-10 w-10 transition-all duration-300">
                                <img
                                    src={`https://cdn.simpleicons.org/${tech.slug}`}
                                    alt={tech.name}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-12 py-4 pr-12">
                    {technologies.map((tech, index) => (
                        <div key={index + technologies.length} className="flex flex-col items-center justify-center gap-2">
                            <div className="h-10 w-10 transition-all duration-300">
                                <img
                                    src={`https://cdn.simpleicons.org/${tech.slug}`}
                                    alt={tech.name}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
