import { Camera, Feather, Mountain, Music, Plane, Utensils } from "lucide-react";

interface Interest {
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    description: string;
}

interface SocialLinks {
    twitter: string;
    github: string;
    linkedin: string;
}

interface Config {
    website: {
        name: string;
    };
    user: {
        firstname: string;
        lastname: string;
        email: string;
        interests: Interest[];
        socials: SocialLinks;
    };
}

export const config: Config = {
    website: {
        name: "John's Musings"
    },
    user: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        socials: {
            twitter: "https://twitter.com",
            github: "https://github.com",
            linkedin: "https://linkedin.com",
        },
        interests: [
            {
                name: "Photography",
                icon: Camera,
                image1: "https://picsum.photos/seed/p1-1/800/600",
                image2: "https://picsum.photos/seed/p1-2/600/400",
                image3: "https://picsum.photos/seed/p1-3/600/400",
                image4: "https://picsum.photos/seed/p1-4/600/400",
                image5: "https://picsum.photos/seed/p1-5/600/400",
                description: "Capturing fleeting moments and telling stories through a lens. I find beauty in the everyday and the extraordinary, from golden-hour landscapes to candid street portraits. It's a journey of seeing the world differently, one frame at a time. The interplay of light and shadow fascinates me, and I'm constantly learning new techniques to convey emotion and atmosphere in my work."
            },
            {
                name: "Creative Writing",
                icon: Feather,
                image1: "https://picsum.photos/seed/p2-1/800/600",
                image2: "https://picsum.photos/seed/p2-2/600/400",
                image3: "https://picsum.photos/seed/p2-3/600/400",
                image4: "https://picsum.photos/seed/p2-4/600/400",
                image5: "https://picsum.photos/seed/p2-5/600/400",
                description: "Weaving words into narratives that explore human emotion, adventure, and the quiet corners of life. Whether it's a short story, poetry, or a blog post, I love the challenge of crafting a compelling world with language. For me, writing is not just about telling a story; it's about building a connection with the reader and inviting them into a shared experience."
            },
            {
                name: "Hiking",
                icon: Mountain,
                image1: "https://picsum.photos/seed/p3-1/800/600",
                image2: "https://picsum.photos/seed/p3-2/600/400",
                image3: "https://picsum.photos/seed/p3-3/600/400",
                image4: "https://picsum.photos/seed/p3-4/600/400",
                image5: "https://picsum.photos/seed/p3-5/600/400",
                description: "There's nothing quite like the peace of a mountaintop. I seek out trails that challenge my body and calm my mind, finding solace and inspiration in the rhythm of my footsteps on the earth. Each hike is a meditation, a chance to disconnect from the noise of daily life and reconnect with the raw, untamed beauty of the natural world."
            },
            {
                name: "Cooking",
                icon: Utensils,
                image1: "https://picsum.photos/seed/p4-1/800/600",
                image2: "https://picsum.photos/seed/p4-2/600/400",
                image3: "https://picsum.photos/seed/p4-3/600/400",
                image4: "https://picsum.photos/seed/p4-4/600/400",
                image5: "https://picsum.photos/seed/p4-5/600/400",
                description: "The kitchen is my canvas. I love experimenting with flavors, techniques, and fresh, local ingredients to create meals that are both comforting and exciting. It's a delicious form of creative expression that engages all the senses. From baking sourdough to mastering a new pasta dish, the process is as rewarding as the final plate."
            },
            {
                name: "Indie Music",
                icon: Music,
                image1: "https://picsum.photos/seed/p5-1/800/600",
                image2: "https://picsum.photos/seed/p5-2/600/400",
                image3: "https://picsum.photos/seed/p5-3/600/400",
                image4: "https://picsum.photos/seed/p5-4/600/400",
                image5: "https://picsum.photos/seed/p5-5/600/400",
                description: "Discovering hidden gems and supporting independent artists is my favorite way to find the soundtrack to my life. I'm always on the hunt for unique sounds and authentic voices that resonate on a deeper level. My playlists are a eclectic mix of genres, reflecting a constant search for music that feels genuine and tells a story."
            },
            {
                name: "Traveling",
                icon: Plane,
                image1: "https://picsum.photos/seed/p6-1/800/600",
                image2: "https://picsum.photos/seed/p6-2/600/400",
                image3: "https://picsum.photos/seed/p6-3/600/400",
                image4: "https://picsum.photos/seed/p6-4/600/400",
                image5: "https://picsum.photos/seed/p6-5/600/400",
                description: "Exploring new cultures, landscapes, and perspectives. Every journey is a story waiting to be written, an opportunity to learn, and a chance to expand my understanding of the world and my place in it. Whether it's a bustling city or a remote village, I travel to listen, observe, and connect with the heart of a place."
            }
        ]
    },
};
