'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { config } from "@/config";

type Interest = typeof config.user.interests[0];

interface DesktopLayoutProps {
    interest: Interest;
    index: number;
    onImageClick: (src: string) => void;
}

export default function DesktopLayout({ interest, index, onImageClick }: DesktopLayoutProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const isEven = index % 2 === 0;

    const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0.8, 1, 1, 0.8]);

    const image1Y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
    const image1X = useTransform(scrollYProgress, [0, 1], isEven ? ['-10%', '10%'] : ['10%', '-10%']);
    const image1Rotate = useTransform(scrollYProgress, [0, 1], isEven ? [-4, 4] : [4, -4]);

    const image2Y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
    const image2X = useTransform(scrollYProgress, [0, 1], isEven ? ['5%', '-5%'] : ['-5%', '5%']);
    const image2Rotate = useTransform(scrollYProgress, [0, 1], isEven ? [5, -5] : [-5, 5]);

    const image3Y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
    const image3Scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    const image4Y = useTransform(scrollYProgress, [0, 1], ['25%', '-25%']);
    const image4X = useTransform(scrollYProgress, [0, 1], isEven ? ['-20%', '20%'] : ['20%', '-20%']);
    const image4Rotate = useTransform(scrollYProgress, [0, 1], isEven ? [-8, 8] : [8, -8]);

    const image5Y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
    const image5X = useTransform(scrollYProgress, [0, 1], isEven ? ['15%', '-15%'] : ['-15%', '15%']);

    const images = [
        { src: interest.image1, alt: `${interest.name} detail 1` },
        { src: interest.image2, alt: `${interest.name} detail 2` },
        { src: interest.image3, alt: `${interest.name} detail 3` },
        { src: interest.image4, alt: `${interest.name} detail 4` },
        { src: interest.image5, alt: `${interest.name} detail 5` }
    ];

    const desktopImages = [
        { style: { y: image1Y, x: image1X, scale: image3Scale, rotate: image1Rotate }, className: "absolute inset-0 rounded-lg overflow-hidden shadow-2xl" },
        { style: { y: image2Y, x: image2X, rotate: image2Rotate }, className: "absolute top-0 left-0 h-2/5 w-1/3 rounded-md overflow-hidden shadow-lg border-4 border-background -translate-x-1/4 -translate-y-1/4" },
        { style: { y: image3Y }, className: "absolute bottom-0 right-0 h-1/2 w-1/2 rounded-md overflow-hidden shadow-lg border-4 border-background translate-x-1/4 translate-y-1/4 z-10" },
        { style: { y: image4Y, x: image4X, rotate: image4Rotate }, className: "absolute bottom-0 left-0 h-1/3 w-1/2 rounded-md overflow-hidden shadow-lg border-4 border-background -translate-x-1/4 translate-y-1/4" },
        { style: { y: image5Y, x: image5X }, className: "absolute top-0 right-0 h-1/2 w-2/5 rounded-md overflow-hidden shadow-lg border-4 border-background translate-x-1/4 -translate-y-1/4" }
    ];

    return (
        <motion.div
            ref={ref}
            className="h-screen flex items-center justify-center snap-center"
            style={{ opacity, scale }}
        >
            <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-40 items-center">
                <div className={cn("relative h-[50vh] w-full", isEven ? 'md:order-last' : '')}>
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            style={desktopImages[i].style}
                            className={desktopImages[i].className}
                            layoutId={img.src}
                            onClick={() => onImageClick(img.src)}
                        >
                            <Image src={img.src} alt={img.alt} fill className="object-cover cursor-pointer" />
                        </motion.div>
                    ))}
                </div>
                <div className="space-y-4 relative z-20">
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
