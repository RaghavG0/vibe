"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
} from "lucide-react";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://instagram.com/vibewealth",
    label: "Instagram",
  },
  { icon: Twitter, href: "https://twitter.com/vibewealth", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/vibewealth", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-vibe-gray-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-b border-vibe-gray-800 pb-12 mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Stay in the <span className="text-vibe-purple-700">loop</span>
              </h3>
              <p className="text-vibe-gray-400 text-lg">
                Get weekly money tips, exclusive content, and early access to
                new features. No spam, just good vibes and better finances.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-vibe-gray-800 border border-vibe-gray-700 rounded-xl text-white placeholder-vibe-gray-400 focus:outline-none focus:border-vibe-purple-500 transition-colors"
                />
              </div>
              <button className="vibe-gradient text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center group cursor-pointer">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Brand and Social Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 vibe-gradient rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">VibeWealth</span>
          </div>

          <p className="text-vibe-gray-400 mb-6 max-w-sm mx-auto">
            The finance app that actually gets Gen Z. Built by young
            entrepreneurs who understand your financial journey.
          </p>

          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-vibe-gray-800 rounded-lg flex items-center justify-center hover:bg-vibe-purple-600 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </motion.div> 

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-vibe-gray-800 pt-8 text-center text-vibe-gray-400 text-sm"
        >
          © 2024 VibeWealth. All rights reserved. Made with 💜 for Gen Z.
        </motion.div>
      </div>
    </footer>
  )
}
