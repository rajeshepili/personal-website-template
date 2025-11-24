'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { config } from "@/config";

type Interest = typeof config.user.interests[0];

interface TabletLayoutProps {
    interest: Interest;
    index: number;
    onImageClick: (src: string) => void;
}

export default function TabletLayout({ interest, index, onImageClick }: TabletLayoutProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const isEven = index % 2 === 0;

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const mainImageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
    const accentImageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

    return (
        <motion.div
            ref={ref}
            className="py-24"
            style={{ opacity }}
        >
            <div className="container grid md:grid-cols-2 gap-12 md:gap-16 items-center px-4">
                <div className={cn("relative h-[60vh]", isEven ? 'md:order-last' : '')}>
                    <motion.div
                        className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl cursor-pointer"
                        style={{ y: mainImageY }}
                        onClick={() => onImageClick(interest.image1)}
                    >
                        <Image src={interest.image1} alt={interest.name} fill className="object-cover" />
                    </motion.div>
                    <motion.div
                        className="absolute bottom-0 h-1/3 w-1/2 rounded-md overflow-hidden shadow-lg border-4 border-background cursor-pointer"
                        style={{
                            y: accentImageY,
                            right: isEven ? 'auto' : '-10%',
                            left: isEven ? '-10%' : 'auto'
                        }}
                        onClick={() => onImageClick(interest.image2)}
                    >
                        <Image src={interest.image2} alt={`${interest.name} detail 2`} fill className="object-cover" />
                    </motion.div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <interest.icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-bold text-foreground">{interest.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg md:text-xl">
                        {interest.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
