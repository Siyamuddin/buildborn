"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { Frame } from "@/components/frame"
import { SectionIndex } from "@/components/section-index"
import { inquiryKinds } from "@/lib/fallback"
import type { SectionCopy } from "@/lib/types"

type InquiryProps = {
  email: string
  copy: SectionCopy
  submitLabel: string
}

type InquiryFields = {
  name: string
  email: string
  kind: string
  note: string
}

type InquiryErrors = Partial<Record<keyof InquiryFields, string>>

const emptyFields: InquiryFields = {
  name: "",
  email: "",
  kind: inquiryKinds[0],
  note: "",
}

const fieldClass = "mt-2 h-12 w-full border border-line bg-sheet px-3 text-base text-ink"

export const Inquiry = ({ email, copy, submitLabel }: InquiryProps) => {
  const [fields, setFields] = useState<InquiryFields>(emptyFields)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [honey, setHoney] = useState("")
  const [opened, setOpened] = useState(false)

  const handleChange = (key: keyof InquiryFields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setOpened(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (honey.trim().length > 0) return

    const nextErrors: InquiryErrors = {}
    if (fields.name.trim().length < 2) nextErrors.name = "Add your name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) nextErrors.email = "Add a valid email."
    if (fields.note.trim().length < 12) nextErrors.note = "A short paragraph is enough."
    if (fields.note.trim().length > 2000) nextErrors.note = "Keep the note under 2,000 characters."

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setOpened(false)
      return
    }

    const subject = `Inquiry — ${fields.kind}`
    const body = [
      `Name: ${fields.name.trim().replace(/\s+/g, " ")}`,
      `Email: ${fields.email.trim()}`,
      `Work: ${fields.kind}`,
      "",
      fields.note.trim(),
    ].join("\n")

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  return (
    <section id="inquiry" className="scroll-mt-20">
      <Frame className="grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <SectionIndex index="06" label="Contact" />
          <h2 className="mt-8 font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-ink">
            {copy.heading}
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">{copy.body}</p>
          <p className="mt-8 text-sm text-ink">
            <a href={`mailto:${email}`} className="text-accent underline decoration-line underline-offset-4">
              {email}
            </a>
          </p>
        </div>
        <form className="md:col-span-6 md:col-start-7" onSubmit={handleSubmit} noValidate>
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="company_website">Company website</label>
            <input
              id="company_website"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              value={honey}
              onChange={(event) => setHoney(event.target.value)}
            />
          </div>
          <Field label="Name" id="name" error={errors.name}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className={fieldClass}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </Field>
          <Field label="Email" id="email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={fields.email}
              onChange={(event) => handleChange("email", event.target.value)}
              className={fieldClass}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </Field>
          <div className="mt-5">
            <label htmlFor="kind" className="text-sm text-ink">
              What should be built
            </label>
            <select
              id="kind"
              name="kind"
              value={fields.kind}
              onChange={(event) => handleChange("kind", event.target.value)}
              className={fieldClass}
            >
              {inquiryKinds.map((kind) => (
                <option key={kind} value={kind}>
                  {kind}
                </option>
              ))}
            </select>
          </div>
          <Field label="Note" id="note" error={errors.note}>
            <textarea
              id="note"
              name="note"
              rows={6}
              value={fields.note}
              onChange={(event) => handleChange("note", event.target.value)}
              className="mt-2 w-full border border-line bg-sheet px-3 py-3 text-base leading-relaxed text-ink"
              aria-invalid={errors.note ? true : undefined}
              aria-describedby={errors.note ? "note-error" : undefined}
            />
          </Field>
          <button type="submit" className="mt-6 inline-flex h-12 items-center bg-accent px-5 text-sm text-paper">
            {submitLabel}
          </button>
          {opened ? (
            <p className="mt-4 text-sm leading-relaxed text-muted" role="status">
              Your email app should open with this note. If it does not, write directly to {email}.
            </p>
          ) : null}
        </form>
      </Frame>
    </section>
  )
}

type FieldProps = {
  id: string
  label: string
  error?: string
  children: ReactNode
}

const Field = ({ id, label, error, children }: FieldProps) => (
  <div className="mt-5 first:mt-0">
    <label htmlFor={id} className="text-sm text-ink">
      {label}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} className="mt-2 text-sm text-accent">
        {error}
      </p>
    ) : null}
  </div>
)
