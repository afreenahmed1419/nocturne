"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeLeft, fadeRight } from "@/lib/animations";

const subjects = [
  "General Inquiry",
  "Wholesale",
  "Press",
  "Collaboration",
];

export default function ContactContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email";
    if (!formData.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent border px-4 py-3 text-parchment/90 text-sm placeholder-parchment/20 focus:outline-none focus:border-gold/60 transition-colors duration-300 ${
      errors[field] ? "border-red-500/50" : "border-gold/20 hover:border-gold/40"
    }`;

  return (
    <section className="section-padding bg-transparent">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16"
      >
        {/* Form */}
        <motion.div variants={fadeLeft}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4 py-16"
            >
              <div className="w-12 h-px bg-gold" />
              <h3 className="font-serif text-3xl text-parchment mt-4">
                Message received.
              </h3>
              <p className="text-parchment/50 leading-relaxed">
                We read everything. We&rsquo;ll respond within 48 hours. Thank you for reaching out.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: subjects[0], message: "" }); }}
                className="btn-outline mt-6 w-fit"
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <h2 className="font-serif text-2xl text-parchment mb-2">Send a Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass("name")}
                    aria-label="Your name"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass("email")}
                    aria-label="Your email"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`${inputClass("subject")} bg-[#0E0E10]`}
                  aria-label="Subject"
                >
                  {subjects.map((s) => (
                    <option key={s} value={s} className="bg-charcoal text-parchment">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <textarea
                  placeholder="Your message..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass("message")} resize-none`}
                  aria-label="Your message"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button type="submit" className="btn-gold w-fit">
                Send Message
              </button>
            </form>
          )}
        </motion.div>

        {/* Info */}
        <motion.div variants={fadeRight} className="flex flex-col gap-10">
          <div>
            <p className="text-caption text-gold/60 mb-4">Direct</p>
            <a
              href="mailto:hello@nocturne.co"
              className="font-serif text-2xl text-parchment hover:text-gold transition-colors duration-300"
            >
              hello@nocturne.co
            </a>
          </div>

          <div>
            <p className="text-caption text-gold/60 mb-4">Social</p>
            <p className="text-parchment/70">@nocturne.scents</p>
            <p className="text-parchment/40 text-sm mt-1">Instagram · TikTok · Pinterest</p>
          </div>

          <div>
            <p className="text-caption text-gold/60 mb-4">Location</p>
            <p className="text-parchment/70">Based in London.</p>
            <p className="text-parchment/40 text-sm mt-1">Shipped worldwide.</p>
          </div>

          {/* Decorative map illustration */}
          <div className="mt-4">
            <LocationIllustration />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function LocationIllustration() {
  return (
    <svg viewBox="0 0 300 200" width="100%" className="max-w-xs opacity-50" fill="none" aria-hidden="true">
      {/* Abstract city grid */}
      <line x1="50" y1="100" x2="250" y2="100" stroke="#C7A15A" strokeWidth="0.5" opacity="0.3" />
      <line x1="150" y1="40" x2="150" y2="160" stroke="#C7A15A" strokeWidth="0.5" opacity="0.3" />
      <line x1="50" y1="130" x2="250" y2="130" stroke="#C7A15A" strokeWidth="0.3" opacity="0.2" />
      <line x1="50" y1="70" x2="250" y2="70" stroke="#C7A15A" strokeWidth="0.3" opacity="0.2" />
      <line x1="100" y1="40" x2="100" y2="160" stroke="#C7A15A" strokeWidth="0.3" opacity="0.2" />
      <line x1="200" y1="40" x2="200" y2="160" stroke="#C7A15A" strokeWidth="0.3" opacity="0.2" />

      {/* River */}
      <path d="M50 115 Q100 108 150 112 Q200 116 250 108" stroke="#C7A15A" strokeWidth="1" opacity="0.4" fill="none" />

      {/* Location marker */}
      <circle cx="150" cy="95" r="8" stroke="#C7A15A" strokeWidth="1" fill="rgba(199,161,90,0.15)" />
      <circle cx="150" cy="95" r="2" fill="#C7A15A" />
      <path d="M150 87 L150 75" stroke="#C7A15A" strokeWidth="0.8" />
      <path d="M144 75 L156 75" stroke="#C7A15A" strokeWidth="0.6" />

      {/* Outer border */}
      <rect x="30" y="30" width="240" height="140" rx="2" stroke="#C7A15A" strokeWidth="0.4" opacity="0.2" />
    </svg>
  );
}
