'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { Button } from './ui/button';

interface LightboxProps {
    selectedImage: string;
    setSelectedImage: (image: string | null) => void;
}

export default function Lightbox({ selectedImage, setSelectedImage }: LightboxProps) {
    if (!selectedImage) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20 hover:text-white z-50 h-10 w-10"
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                }}
                aria-label="Close image viewer"
            >
                <XIcon className="h-6 w-6" />
            </Button>
            <AnimatePresence>
                <motion.div
                    layoutId={selectedImage}
                    className="relative w-full h-full max-w-5xl max-h-[90vh]"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <Image
                        src={selectedImage}
                        alt="Enlarged view"
                        fill
                        className="object-contain"
                    />
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
