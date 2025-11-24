
'use client';

import { easeOut, motion } from 'framer-motion';
import Image from "next/image";
import { cn } from "@/lib/utils";
import { config } from "@/config";

type Interest = typeof config.user.interests[0];

interface MobileLayoutProps {
    interest: Interest;
    index: number;
    onImageClick: (src: string) => void;
}

export default function MobileLayout({ interest, onImageClick }: MobileLayoutProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: easeOut,
            },
        },
    };

    const images = [
        { src: interest.image1, alt: `${interest.name} detail 1`, className: "col-span-2 row-span-2" },
        { src: interest.image2, alt: `${interest.name} detail 2`, className: "col-span-1 row-span-1" },
        { src: interest.image3, alt: `${interest.name} detail 3`, className: "col-span-1 row-span-1" },
        { src: interest.image4, alt: `${interest.name} detail 4`, className: "col-span-1 row-span-1" },
        { src: interest.image5, alt: `${interest.name} detail 5`, className: "col-span-2 row-span-1" }
    ];

    return (
        <motion.div
            className="py-16 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="container space-y-8">
                <motion.div variants={itemVariants} className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <interest.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-3xl font-bold text-foreground">{interest.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-base">
                        {interest.description}
                    </p>
                </motion.div>

                <motion.div
                    className="relative h-96 grid grid-cols-3 grid-rows-3 gap-2"
                    variants={containerVariants}
                >
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className={cn("relative rounded-lg overflow-hidden shadow-lg cursor-pointer", img.className)}
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => onImageClick(img.src)}
                        >
                            <Image src={img.src} alt={img.alt} fill className="object-cover" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}
