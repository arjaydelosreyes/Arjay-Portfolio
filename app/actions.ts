'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(_: unknown, formData: FormData) {
  const name    = (formData.get('name')    as string)?.trim()
  const email   = (formData.get('email')   as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!name || !email || !message) {
    return { error: 'All fields are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address.' }
  }

  // Strip characters that could inject extra headers (CR, LF, angle brackets, etc.)
  const safeName = name.replace(/[\r\n<>"',;:]/g, '').trim()

  try {
    await resend.emails.send({
      from:    'Portfolio Contact <onboarding@resend.dev>',
      to:      'arjay09.adr43@gmail.com',
      replyTo: safeName ? `${safeName} <${email}>` : email,
      subject: `Message from ${name} — Arjay Delos Reyes Portfolio`,
      text:    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })
    return { success: true }
  } catch {
    return { error: 'Something went wrong. Try emailing me directly.' }
  }
}
