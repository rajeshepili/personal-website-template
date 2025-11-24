
'use client';

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { experiences } from "../index";
import { Briefcase, Camera, Globe, PenSquare, Rocket, GraduationCap, Mountain } from "lucide-react";

const ICONS = [Rocket, PenSquare, Camera, Briefcase, Globe, GraduationCap, Mountain];

function ExperienceItem({ experience, index }: { experience: typeof experiences[0], index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const isEven = index % 2 === 0;

    const variants = {
        hidden: { opacity: 0, x: isEven ? -100 : 100, scale: 0.95 },
        visible: { opacity: 1, x: 0, scale: 1 }
    };

    const Icon = ICONS[index % ICONS.length];

    return (
        <div ref={ref} className="relative mb-12 last:mb-0">
            <motion.div
                className="absolute left-1/2 top-4 -translate-x-1/2 bg-background p-1.5 rounded-full border-2 border-primary"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
            >
                <Icon className="h-5 w-5 text-primary" />
            </motion.div>
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={variants}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                    "w-[calc(50%-2.5rem)]",
                    isEven ? "mr-auto" : "ml-auto"
                )}
            >
                <motion.div whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.2 } }}>
                    <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className={cn("gap-1", isEven ? 'items-end text-right' : 'items-start text-left')}>
                            <p className="text-xs text-muted-foreground">{experience.period}</p>
                            <CardTitle className="text-xl">{experience.role}</CardTitle>
                            <p className="text-sm text-primary font-medium">{experience.company}</p>
                        </CardHeader>
                        <CardContent className={cn("space-y-4", isEven ? 'text-right' : 'text-left')}>
                            <p className="text-sm text-muted-foreground">{experience.description}</p>
                            {experience.achievements && (
                                <ul className={cn("text-sm text-muted-foreground list-disc space-y-1", isEven ? 'list-inside text-right' : 'pl-4')}>
                                    {experience.achievements.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function DesktopExperience() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start center', 'end center'],
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div ref={targetRef} className="mt-12">
            <motion.div
                className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"
                style={{ scaleY, originY: 0 }}
                aria-hidden="true"
            />

            {experiences.map((exp, index) => (
                <ExperienceItem key={exp.role + exp.company} experience={exp} index={index} />
            ))}
        </div>
    )
}
