"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { FormField, PageSection } from "@/lib/getPage";
import RichText from "@/components/shared/RichText";

interface FormFieldRendererProps {
  field: FormField;
  value: any;
  onChange: (name: string, value: any) => void;
  error?: string;
  isSubmitting?: boolean;
}

function FormFieldRenderer({ field, value, onChange, error, isSubmitting }: FormFieldRendererProps) {
  const label = field?.lable ?? field?.name;

  const baseInputClass = `w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-white/30 outline-none backdrop-blur transition-all duration-300 focus:bg-white/[0.07] focus:ring-2 focus:ring-fuchsia-500/20 ${error
      ? "border-red-500 bg-red-500/5 focus:border-red-500"
      : "border-white/10 bg-white/5 focus:border-fuchsia-400/50"
    }`;

  const renderError = () => {
    if (!error) return null;
    return (
      <span className="mt-1 block text-xs font-semibold text-red-400">
        {error}
      </span>
    );
  };

  switch (field?.type) {
    case "textarea":
      return (
        <div className="space-y-2">
          {label ? (
            <label htmlFor={field?.name} className="block text-sm font-medium text-white/70">
              {label}
              {field?.required ? <span className="ml-1 text-fuchsia-400">*</span> : null}
            </label>
          ) : null}
          <textarea
            id={field?.name}
            name={field?.name}
            placeholder={field?.placeholder}
            required={field?.required}
            disabled={isSubmitting}
            rows={4}
            value={value ?? ""}
            onChange={(e) => onChange(field?.name || "", e.target.value)}
            className={`${baseInputClass} resize-none`}
          />
          {renderError()}
        </div>
      );

    case "select":
    case "dropdown": {
      const options = Array.isArray(field?.options) ? field.options : [];
      return (
        <div className="space-y-2">
          {label ? (
            <label htmlFor={field?.name} className="block text-sm font-medium text-white/70">
              {label}
              {field?.required ? <span className="ml-1 text-fuchsia-400">*</span> : null}
            </label>
          ) : null}
          <select
            id={field?.name}
            name={field?.name}
            required={field?.required}
            disabled={isSubmitting}
            value={value ?? ""}
            onChange={(e) => onChange(field?.name || "", e.target.value)}
            className={`${baseInputClass} cursor-pointer`}
          >
            <option value="" className="bg-[#151515]">
              {field?.placeholder ?? "Select..."}
            </option>
            {options.map((opt, i) => {
              const optLabel = typeof opt === "string" ? opt : opt?.label;
              const optValue = typeof opt === "string" ? opt : opt?.value;
              return (
                <option key={`${optValue}-${i}`} value={optValue} className="bg-[#151515]">
                  {optLabel}
                </option>
              );
            })}
          </select>
          {renderError()}
        </div>
      );
    }

    case "radio": {
      const options = Array.isArray(field?.options) ? field.options : [];
      return (
        <div className="space-y-2">
          {label ? (
            <label className="block text-sm font-medium text-white/70">
              {label}
              {field?.required ? <span className="ml-1 text-fuchsia-400">*</span> : null}
            </label>
          ) : null}
          <div className="flex flex-wrap gap-4">
            {options.map((opt, i) => {
              const optLabel = typeof opt === "string" ? opt : opt?.label;
              const optValue = typeof opt === "string" ? opt : opt?.value;
              return (
                <label
                  key={`${optValue}-${i}`}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 ${
                    value === optValue
                      ? "border-fuchsia-500/50 bg-fuchsia-500/10 text-white"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
                >
                  <input
                    type="radio"
                    name={field?.name}
                    value={optValue}
                    disabled={isSubmitting}
                    checked={value === optValue}
                    onChange={() => onChange(field?.name || "", optValue)}
                    className="size-3.5 accent-fuchsia-500"
                  />
                  {optLabel}
                </label>
              );
            })}
          </div>
          {renderError()}
        </div>
      );
    }

    case "checkbox":
      return (
        <div className="space-y-1">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              name={field?.name}
              required={field?.required}
              disabled={isSubmitting}
              checked={!!value}
              onChange={(e) => onChange(field?.name || "", e.target.checked)}
              className="size-4 rounded border-white/20 bg-white/5 text-fuchsia-500 accent-fuchsia-500 disabled:opacity-50"
            />
            {label}
            {field?.required ? <span className="text-fuchsia-400">*</span> : null}
          </label>
          {renderError()}
        </div>
      );

    case "submit":
      return (
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Submitting...
            </span>
          ) : (
            label ?? field?.placeholder ?? "Submit"
          )}
        </button>
      );

    default: {
      const inputType = field?.type === "email" ? "email" : "text";
      return (
        <div className="space-y-2">
          {label ? (
            <label htmlFor={field?.name} className="block text-sm font-medium text-white/70">
              {label}
              {field?.required ? <span className="ml-1 text-fuchsia-400">*</span> : null}
            </label>
          ) : null}
          <input
            type={inputType}
            id={field?.name}
            name={field?.name}
            placeholder={field?.placeholder}
            required={field?.required}
            disabled={isSubmitting}
            value={value ?? ""}
            onChange={(e) => onChange(field?.name || "", e.target.value)}
            className={baseInputClass}
          />
          {renderError()}
        </div>
      );
    }
  }
}

export default function FormSection({ section }: { section?: PageSection }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!section) return null;
  const fields = section?.fields;

  function handleChange(name: string, value: any) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Dynamically clear validation error when input changes
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    // Validate fields dynamically — no hardcoded field names
    const newErrors: Record<string, string> = {};
    fields?.forEach((field) => {
      if (!field.name || field.type === "submit") return;

      const val = formData[field.name];

      // Required check
      if (field.required && (val === undefined || val === null || val === "" || val === false || (typeof val === "string" && !val.trim()))) {
        newErrors[field.name] = `${field.lable ?? field.name} is required`;
      }

      // Email format validation
      if (field.type === "email" && val) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(val))) {
          newErrors[field.name] = "Please enter a valid email address";
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Debug: log the payload before submitting
    console.log("Submitting:", formData);

    try {
      const response = await fetch("http://localhost:1337/api/anime-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            formData: formData,
            formName: "anime-request",
          },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => "");
        throw new Error(
          errorBody
            ? `Submission failed: ${errorBody}`
            : `Submission failed: ${response.statusText}`
        );
      }

      setFormData({});
      setErrors({});
      setSubmitted(true);
    } catch (err: any) {
      console.error("Error submitting form data:", err);
      setSubmitError(err.message || "Error submitting form. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasSubmitField = fields?.some((f) => f.type === "submit");

  return (
    <section id="contact-form" className="relative w-full overflow-hidden bg-gradient-to-b from-transparent via-purple-950/10 to-transparent px-6 py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/[8%] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-2xl"
      >
        {section?.title ? (
          <h2 className="text-center text-3xl font-black tracking-tight text-white sm:text-4xl">
            {section.title}
          </h2>
        ) : null}

        {section?.description ? (
          <div className="mt-4 text-center text-white/60">
            {typeof section.description === "string" ? (
              <p>{section.description}</p>
            ) : (
              <RichText content={section.description} />
            )}
          </div>
        ) : null}

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-md sm:p-10">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-emerald-500/20 text-3xl text-emerald-400">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white">Thank you!</h3>
              <p className="mt-2 text-sm text-white/50">Your form has been submitted successfully.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm font-semibold text-fuchsia-300 hover:text-fuchsia-200 transition-colors"
              >
                Send another request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm font-medium text-red-400">
                  ⚠️ {submitError}
                </div>
              )}
              {fields?.map((field, index) => (
                <FormFieldRenderer
                  key={field?.name ?? `field-${index}`}
                  field={field}
                  value={field?.name ? formData[field.name] : undefined}
                  onChange={handleChange}
                  error={field?.name ? errors[field.name] : undefined}
                  isSubmitting={isSubmitting}
                />
              ))}

              {/* Fallback submit button if CMS doesn't include a submit field */}
              {!hasSubmitField && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
