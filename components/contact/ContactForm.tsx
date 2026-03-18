"use client";

import { useState, useId } from "react";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const inputBase =
  "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-50 placeholder:text-zinc-500 transition-colors duration-150 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formId = useId();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-4 py-10 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-400"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-zinc-50">Message sent</h3>
        <p className="text-sm text-zinc-400 max-w-xs">
          Thanks! We&apos;ve sent you a confirmation email. Olushola will
          personally follow up within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${formId}-heading`}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={`${formId}-name`}
          className="text-sm font-medium text-zinc-300"
        >
          Name <span className="text-blue-400">*</span>
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Jane Smith"
          value={form.name}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={`${formId}-email`}
          className="text-sm font-medium text-zinc-300"
        >
          Email <span className="text-blue-400">*</span>
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={`${formId}-phone`}
          className="text-sm font-medium text-zinc-300"
        >
          Phone{" "}
          <span className="text-zinc-500 font-normal">(optional)</span>
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+44 7700 900000"
          value={form.phone}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={`${formId}-message`}
          className="text-sm font-medium text-zinc-300"
        >
          Message <span className="text-blue-400">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          placeholder="Tell us about your business and what you need..."
          value={form.message}
          onChange={handleChange}
          className={cn(inputBase, "resize-none leading-relaxed")}
        />
      </div>

      {status === "error" && (
        <p
          className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
          role="alert"
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium rounded-lg",
          "bg-blue-500 text-white border border-blue-500",
          "hover:bg-blue-600 hover:border-blue-600",
          "transition-all duration-200 px-6 py-3 text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
          "disabled:opacity-60 disabled:cursor-not-allowed"
        )}
      >
        {status === "loading" ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
