"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type FormState = { name: string; email: string; phone: string; message: string };
const empty: FormState = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState(empty); const [errors, setErrors] = useState<Partial<FormState>>({}); const [sent, setSent] = useState(false);
  const update = (key: keyof FormState, value: string) => setForm({ ...form, [key]: value });
  const submit = (event: React.FormEvent) => {
    event.preventDefault(); const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Enter a phone number.";
    if (form.message.trim().length < 10) next.message = "Tell us a little more about your stay.";
    setErrors(next); if (!Object.keys(next).length) { setSent(true); setForm(empty); }
  };
  if (sent) return <div className="contact-success" role="status"><Check /><h2>Message received.</h2><p>This is a portfolio demo, so nothing was sent—but the form flow is working beautifully.</p><button className="text-link" onClick={() => setSent(false)}>Send another</button></div>;
  return <form className="contact-form" onSubmit={submit} noValidate>
    <label>Name<input value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" aria-invalid={!!errors.name} />{errors.name ? <span role="alert">{errors.name}</span> : null}</label>
    <label>Email<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" aria-invalid={!!errors.email} />{errors.email ? <span role="alert">{errors.email}</span> : null}</label>
    <label>Phone<input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" aria-invalid={!!errors.phone} />{errors.phone ? <span role="alert">{errors.phone}</span> : null}</label>
    <label>Message<textarea rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} aria-invalid={!!errors.message} />{errors.message ? <span role="alert">{errors.message}</span> : null}</label>
    <button className="button button-dark" type="submit">Send enquiry</button>
  </form>;
}
