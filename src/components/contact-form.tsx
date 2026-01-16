"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("loading");

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
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

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 text-center dark:border-emerald-900 dark:from-emerald-950 dark:to-teal-950"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-emerald-900 dark:text-emerald-100">
          Message Sent Successfully!
        </h3>
        <p className="mt-2 text-emerald-700 dark:text-emerald-300">
          Thank you for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
        <Button
          variant="outline"
          className="mt-6 border-emerald-300 hover:bg-emerald-100 dark:border-emerald-700 dark:hover:bg-emerald-900"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-zinc-900 dark:text-white"
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1.5 flex items-center gap-1 text-sm text-red-500"
              >
                <AlertCircle className="h-4 w-4" />
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-zinc-900 dark:text-white"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-1.5 flex items-center gap-1 text-sm text-red-500"
              >
                <AlertCircle className="h-4 w-4" />
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-2 block text-sm font-medium text-zinc-900 dark:text-white"
        >
          Subject
        </label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          className={errors.subject ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        <AnimatePresence>
          {errors.subject && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-1.5 flex items-center gap-1 text-sm text-red-500"
            >
              <AlertCircle className="h-4 w-4" />
              {errors.subject}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-zinc-900 dark:text-white"
        >
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message..."
          rows={5}
          className={errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-1.5 flex items-center gap-1 text-sm text-red-500"
            >
              <AlertCircle className="h-4 w-4" />
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
