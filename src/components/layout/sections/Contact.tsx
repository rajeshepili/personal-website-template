'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { easeOut, motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Share2 } from "lucide-react";
import Link from "next/link";
import { config } from "@/config";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="py-20 md:py-32 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Let&apos;s Connect
              </h2>
              <p className="text-lg text-muted-foreground">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something great.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Me</h3>
                  <a href={`mailto:${config.user.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {config.user.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Share2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Follow Me</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={config.user.socials.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={config.user.socials.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={config.user.socials.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Card className="shadow-lg border-border/50 bg-card">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Send a Message
              </CardTitle>
              <CardDescription className="text-md text-muted-foreground pt-1">
                I&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your Email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your Message"
                    className="min-h-[120px]"
                  />
                </div>
                <div className="">
                  <Button type="submit" size="lg" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-30"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl opacity-30"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
    </motion.section>
  );
}
