'use client';

import { config } from "@/config";
import { AnimatePresence } from 'framer-motion';
import { useState } from "react";
import { cn } from "@/lib/utils";
import Lightbox from "@/components/Lightbox";
import DesktopLayout from "./components/DesktopLayout";
import TabletLayout from "./components/TabletLayout";
import MobileLayout from "./components/MobileLayout";
import useScreenSize from "@/hooks/use-screen-size";

export default function About() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const screenSize = useScreenSize();

    const renderInterest = (interest: typeof config.user.interests[0], index: number) => {
        if (screenSize === 'sm') {
            return <MobileLayout interest={interest} index={index} onImageClick={setSelectedImage} />;
        }
        if (screenSize === 'md') {
            return <TabletLayout interest={interest} index={index} onImageClick={setSelectedImage} />;
        }
        return <DesktopLayout interest={interest} index={index} onImageClick={setSelectedImage} />;
    }

    return (
        <section
            id="about"
            className="relative bg-background"
        >
            <div className={cn("flex flex-col items-center justify-center text-center", screenSize !== '2xl' ? 'py-20 px-4' : 'h-screen snap-start')}>
                <div className="container">
                    <h2 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-foreground/90">
                        A Little About Me
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        I believe in the power of curiosity. Here are a few of the things that inspire me and fuel my creativity.
                    </p>
                </div>
            </div>
            <div className={cn("relative z-10", screenSize !== '2xl' ? 'divide-y divide-border' : '')}>
                {config.user.interests.map((interest, index) => (
                    <div key={interest.name}>
                        {renderInterest(interest, index)}
                    </div>
                ))}
            </div>
            <AnimatePresence>
                {selectedImage && (
                    <Lightbox selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                )}
            </AnimatePresence>
        </section>
    );
}
