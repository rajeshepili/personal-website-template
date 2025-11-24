
'use client';

import { Button } from "@/components/ui/button";
import { config } from "@/config";
import Link from "next/link";
import { motion, useScroll, useTransform, easeOut } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const contentY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "50%", "100%", "150%", "200%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const imageY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["0%", "25%", "50%", "75%", "100%"]);

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.8,
                ease: easeOut
            }
        })
    };

    return (
        <section
            ref={ref}
            className="relative h-screen flex items-center justify-center text-center overflow-hidden"
        >
            <motion.div
                className="absolute inset-0 -z-10"
                style={{ y: imageY }}
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
                <Image
                    src="https://picsum.photos/seed/hero/1920/1080"
                    alt="A scenic and tranquil background"
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint="dramatic landscape"
                />
            </motion.div>

            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

            <motion.div
                className="container relative"
                style={{ y: contentY, opacity: contentOpacity }}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground/90"
                    custom={0}
                    variants={textVariants}
                >
                    {config.website.name}
                </motion.h1>
                <motion.p
                    className="max-w-2xl mx-auto text-lg text-foreground/80 mt-4"
                    custom={1}
                    variants={textVariants}
                >
                    A personal blog by {config.user.firstname} {config.user.lastname}. Thoughts, stories, and creative explorations.
                </motion.p>
                <motion.div
                    className="mt-8"
                    custom={2}
                    variants={textVariants}
                >
                    <Button size="lg" asChild className="animate-pulse-subtle">
                        <Link href="#projects">Read My Latest Posts</Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
