"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profile } from "@/config";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.section
      className="h-screen flex flex-col justify-center items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Avatar Section */}
      <Avatar className="w-32 h-32 mb-6 border-4 border-white rounded-full shadow-lg">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <AvatarImage src={profile.avatar} alt="User Avatar" />
        </motion.div>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      {/* Text Content */}
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="text-4xl font-extrabold mb-4">{`Hi, I'm ${profile.firstname} ${profile.lastname}`}</h1>
        <p className="text-lg mb-6 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique ducimus culpa amet, id tenetur, quas optio commodi debitis illum ipsa eius? Vel labore odit corrupti modi at explicabo nesciunt temporibus.
        </p>

        {/* Call-to-Action Button */}
        <motion.button
          className="px-6 py-3 bg-indigo-800 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          whileTap={{ scale: 0.95 }}
        >
          Get in Touch
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
