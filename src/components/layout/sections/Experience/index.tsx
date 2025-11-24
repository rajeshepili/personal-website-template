
'use client';

import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import DesktopExperience from './components/DesktopExperience';
import MobileExperience from './components/MobileExperience';

export const experiences = [
    {
        role: "Lead Content Strategist",
        company: "Bright-Ideas Inc.",
        period: "2022 - Present",
        description: "Leading a team to develop and execute content strategies that drive engagement and growth. I specialize in creating compelling narratives across various digital platforms, ensuring a cohesive brand voice that resonates with our target audience.",
        achievements: [
            "Increased organic traffic by 150% through targeted SEO and content initiatives.",
            "Developed and launched a new blog series that became the top source of lead generation.",
            "Mentored a team of 4 junior writers, improving content quality and output."
        ]
    },
    {
        role: "Freelance Writer & Editor",
        company: "Various Publications",
        period: "2020 - 2022",
        description: "Authored articles on travel, technology, and culture for a range of online magazines. I honed my skills in adapting my voice to different audiences and delivering high-quality content under tight deadlines.",
        achievements: [
            "Published over 50 articles in publications like 'Wired' and 'The Nomad'.",
            "Edited a collection of short stories for an independent publishing house.",
            "Built a strong personal brand and a network of editors and clients."
        ]
    },
    {
        role: "Published Photographer",
        company: "Wanderlust Magazine",
        period: "2018 - 2020",
        description: "Captured and curated photo essays that tell compelling visual stories, with a focus on landscapes and human connection. My work was featured in several issues, bringing remote corners of the world to the magazine's readers.",
        achievements: [
            "Shot the cover photo for the 'Winter Escapes' 2019 edition.",
            "Traveled to 15 countries on assignment to document local cultures.",
            "Held a solo exhibition of my work at a local art gallery."
        ]
    },
    {
        role: "Marketing Assistant",
        company: "Creative Solutions",
        period: "2017 - 2018",
        description: "Assisted in the creation of marketing campaigns, managed social media channels, and learned the fundamentals of brand storytelling in a fast-paced environment. This role was my entry into the world of digital marketing.",
        achievements: [
            "Grew the company's Instagram following from 1k to 10k in one year.",
            "Coordinated a successful product launch campaign that exceeded sales targets by 20%.",
            "Wrote and designed the weekly company newsletter."
        ]
    },
    {
        role: "Travel Blogger",
        company: "My Personal Blog",
        period: "2016 - 2017",
        description: "Started this blog to document my travels, share my passion for storytelling, and connect with a community of fellow explorers. It taught me the basics of web development, SEO, and audience engagement.",
        achievements: [
            "Reached 20,000 monthly unique visitors within the first year.",
            "Collaborated with tourism boards in Southeast Asia on promotional content.",
            "Self-published an ebook guide to budget travel."
        ]
    },
    {
        role: "Creative Intern",
        company: "Artisan Digital",
        period: "Summer 2015",
        description: "My first foray into the professional creative world. I supported the design and content teams, learning from experienced professionals and contributing to a variety of client projects.",
        achievements: [
            "Assisted in the design of a major client's website redesign.",
            "Contributed to brainstorming sessions for new ad campaigns.",
            "Learned to use Adobe Creative Suite in a professional setting."
        ]
    }
];

export default function Experience() {
    const isMobile = useIsMobile();

    return (
        <section
            id="experience"
            className="py-20 md:py-32 bg-muted/30 dark:bg-muted/20"
        >
            <div className="container max-w-4xl mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        My Journey
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        A few milestones from my creative and professional path.
                    </p>
                </motion.div>

                <div className="relative">
                    {isMobile ? <MobileExperience /> : <DesktopExperience />}
                </div>
            </div>
        </section>
    );
}
