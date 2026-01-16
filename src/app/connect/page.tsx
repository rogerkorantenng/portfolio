"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Github,
  Linkedin,
  Globe,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const socialLinks = [
  {
    href: profile.links.github,
    icon: Github,
    label: "GitHub",
    command: "git remote -v",
  },
  {
    href: profile.links.linkedin,
    icon: Linkedin,
    label: "LinkedIn",
    command: "net --connect",
  },
  {
    href: profile.links.blog,
    icon: Globe,
    label: "Blog",
    command: "curl blog",
  },
];

export default function ConnectPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "OPERATIVE_NAME required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "EMAIL required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid EMAIL format";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "SUBJECT required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "MESSAGE required";
    } else if (formData.message.length < 10) {
      newErrors.message = "MESSAGE too short (min 10 chars)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSuccess(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="fixed -left-32 top-1/4 h-96 w-96 rounded-full bg-[#00ffff]/5 blur-[120px] pointer-events-none" />
      <div className="fixed -right-32 bottom-1/4 h-96 w-96 rounded-full bg-[#ff00ff]/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#39ff14] mb-2">
            <div className="h-2 w-2 rounded-full bg-[#39ff14] animate-pulse" />
            <span>SYSTEM://SECURE_CONNECTION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold text-white mb-4">
            ESTABLISH <span className="text-[#00ffff]">CONNECTION</span>
          </h1>
          <p className="text-zinc-500 font-mono text-sm max-w-2xl mx-auto">
            {">"} Initialize secure communication channel.
            All transmissions are encrypted and processed with priority.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="border border-[#00ffff]/20 bg-black/50"
          >
            {/* Header */}
            <div className="border-b border-[#00ffff]/20 bg-gradient-to-r from-[#00ffff]/10 to-[#ff00ff]/10 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#39ff14]" />
                <span className="text-xs font-mono text-[#00ffff]">
                  TRANSMISSION_FORM
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-mono text-[#ff00ff] mb-2">
                  {">"} OPERATIVE_NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn(
                    "w-full bg-black/50 border px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 focus:outline-none transition-all",
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#00ffff]/30 focus:border-[#00ffff] focus:shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                  )}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs font-mono text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-mono text-[#ff00ff] mb-2">
                  {">"} EMAIL_ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    "w-full bg-black/50 border px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 focus:outline-none transition-all",
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#00ffff]/30 focus:border-[#00ffff] focus:shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                  )}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs font-mono text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-xs font-mono text-[#ff00ff] mb-2">
                  {">"} SUBJECT_LINE
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={cn(
                    "w-full bg-black/50 border px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 focus:outline-none transition-all",
                    errors.subject
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#00ffff]/30 focus:border-[#00ffff] focus:shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                  )}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-xs font-mono text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-mono text-[#ff00ff] mb-2">
                  {">"} MESSAGE_BODY
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={cn(
                    "w-full bg-black/50 border px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 focus:outline-none resize-none transition-all",
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#00ffff]/30 focus:border-[#00ffff] focus:shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                  )}
                  placeholder="Your message here..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs font-mono text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={cn(
                  "w-full py-3 px-6 font-mono text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2",
                  isSuccess
                    ? "bg-[#39ff14]/20 text-[#39ff14] border border-[#39ff14]"
                    : "bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff] hover:bg-[#00ffff]/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              >
                {isSuccess ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    TRANSMISSION_SUCCESSFUL
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-[#00ffff] border-t-transparent rounded-full animate-spin" />
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    SEND_TRANSMISSION
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Direct Contact */}
            <div className="border border-[#ff00ff]/20 bg-black/50 p-5">
              <div className="text-xs font-mono text-[#ff00ff] mb-4">
                {">"} DIRECT_CHANNELS
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-zinc-400 hover:text-[#00ffff] transition-colors group"
                >
                  <div className="p-2 border border-[#00ffff]/30 group-hover:border-[#00ffff] group-hover:bg-[#00ffff]/10 transition-all">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-600">EMAIL</div>
                    <div className="font-mono text-sm">{profile.email}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-zinc-400">
                  <div className="p-2 border border-[#00ffff]/30">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-600">PHONE</div>
                    <div className="font-mono text-sm">{profile.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-400">
                  <div className="p-2 border border-[#00ffff]/30">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-600">LOCATION</div>
                    <div className="font-mono text-sm">{profile.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="border border-[#00ffff]/20 bg-black/50 p-5">
              <div className="text-xs font-mono text-[#00ffff] mb-4">
                {">"} NETWORK_NODES
              </div>

              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-[#00ffff]/20 hover:border-[#00ffff] hover:bg-[#00ffff]/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="h-5 w-5 text-zinc-500 group-hover:text-[#00ffff]" />
                      <span className="font-mono text-sm text-white group-hover:text-[#00ffff]">
                        {link.label}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-600">
                      $ {link.command}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* ASCII Art */}
            <div className="border border-[#39ff14]/20 bg-black/50 p-5">
              <pre className="text-[10px] font-mono text-[#39ff14]/60 leading-tight">
{`
╔═══════════════════════════════════════╗
║                                       ║
║    CONNECTION STATUS: READY           ║
║    ENCRYPTION: ENABLED                ║
║    RESPONSE TIME: < 24 HOURS          ║
║                                       ║
║    > AWAITING YOUR TRANSMISSION       ║
║                                       ║
╚═══════════════════════════════════════╝
`}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
