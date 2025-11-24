'use client';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const posts = [
    {
        title: "My Journey into Photography",
        description: "Exploring the world through a lens. A collection of my favorite shots and the stories behind them.",
        tags: ["Photography", "Travel", "Storytelling"],
        imageUrl: "https://picsum.photos/seed/10/600/400",
        imageHint: "camera landscape",
        link: "/blog/my-journey-into-photography"
    },
    {
        title: "The Art of Sourdough",
        description: "From starter to loaf, a deep dive into the satisfying process of baking my own bread from scratch.",
        tags: ["Cooking", "Baking", "DIY"],
        imageUrl: "https://picsum.photos/seed/11/600/400",
        imageHint: "artisan bread",
        link: "/blog/the-art-of-sourdough"
    },
    {
        title: "A Weekend in the Mountains",
        description: "Disconnecting from the digital world and finding peace on a solo hiking trip.",
        tags: ["Hiking", "Nature", "Mindfulness"],
        imageUrl: "https://picsum.photos/seed/12/600/400",
        imageHint: "mountain trail",
        link: "/blog/a-weekend-in-the-mountains"
    }
];

function PostCard({ post, index }: { post: typeof posts[0], index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

    return (
        <motion.div
            ref={ref}
            key={post.title}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        >
            <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group bg-card">
                <div className="relative h-48 overflow-hidden">
                    <motion.div className="absolute inset-0" style={{ y }}>
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={post.imageHint}
                        />
                    </motion.div>
                </div>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        {post.title}
                        <Link href={post.link}>
                            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col grow">
                    <p className="text-muted-foreground text-sm mb-4 grow">{post.description}</p>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                        {post.tags.map(tag => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <motion.section
            id="projects"
            className="py-20 md:py-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Latest Posts
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        A few thoughts and stories from my life.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <PostCard key={post.title} post={post} index={index} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
