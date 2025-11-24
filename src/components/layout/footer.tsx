
import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { config } from "@/config";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Footer() {
    return (
        <footer className="bg-muted/30 dark:bg-muted/20 py-8">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} {config.user.firstname} {config.user.lastname}. All rights reserved.
                </p>
                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={config.user.socials.twitter} target="_blank" rel="noopener noreferrer">
                                        <Twitter className="h-5 w-5" />
                                        <span className="sr-only">Twitter</span>
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Twitter</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={config.user.socials.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="h-5 w-5" />
                                        <span className="sr-only">GitHub</span>
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>GitHub</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={config.user.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="h-5 w-5" />
                                        <span className="sr-only">LinkedIn</span>
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>LinkedIn</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </footer>
    );
}
