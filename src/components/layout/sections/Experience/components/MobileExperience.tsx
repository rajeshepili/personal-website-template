
'use client';

import { motion, easeOut } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { experiences } from "../index";
import { Briefcase, Camera, Globe, PenSquare, Rocket, GraduationCap, Mountain } from "lucide-react";

const ICONS = [Rocket, PenSquare, Camera, Briefcase, Globe, GraduationCap, Mountain];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
};


function ExperienceItem({ experience, index, isLast }: { experience: typeof experiences[0], index: number, isLast: boolean }) {
    const Icon = ICONS[index % ICONS.length];
    
    return (
        <motion.div 
            className="flex gap-4"
            variants={itemVariants}
        >
            <div className="relative flex flex-col items-center">
                <div 
                    className="bg-background p-1.5 rounded-full border-2 border-primary z-10"
                >
                    <Icon className="h-5 w-5 text-primary" />
                </div>
                {!isLast && <div className="flex-1 w-0.5 bg-border -mb-6" />}
            </div>

            <div className="flex-1 pb-10">
                 <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
                    <Card className="shadow-md">
                        <CardHeader className="gap-1">
                            <p className="text-xs text-muted-foreground">{experience.period}</p>
                            <CardTitle className="text-lg">{experience.role}</CardTitle>
                            <p className="text-sm text-primary font-medium">{experience.company}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">{experience.description}</p>
                            {experience.achievements && (
                                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                                    {experience.achievements.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function MobileExperience() {
    return (
        <motion.div 
            className="flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            {experiences.map((exp, index) => (
                <ExperienceItem 
                    key={exp.role + exp.company}
                    experience={exp} 
                    index={index} 
                    isLast={index === experiences.length - 1} 
                />
            ))}
        </motion.div>
    )
}
