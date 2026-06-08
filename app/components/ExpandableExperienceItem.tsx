"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExpandableExperienceItemProps {
    title: string;
    role: string;
    children: React.ReactNode;
    link?: string;
}

export function ExpandableExperienceItem({ title, role, children, link }: ExpandableExperienceItemProps) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="group cursor-pointer py-4"
            onClick={() => setOpen((v) => !v)}
        >
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-black dark:text-white">{title}</span>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-gray-400 dark:text-gray-500 underline underline-offset-2 hover:text-black dark:hover:text-white"
                        >
                            link
                        </a>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 dark:text-gray-500">{role}</span>
                    <ChevronDown
                        className={`h-3.5 w-3.5 shrink-0 text-gray-300 dark:text-gray-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {/* Expands on click using the grid-rows 0fr -> 1fr trick */}
            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="max-w-xl pt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
