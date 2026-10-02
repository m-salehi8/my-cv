export interface ContactPayload {
  name: string;
  contact: string;
  message: string;
  type?: string;
  website?: string; // honeypot
}

export async function sendContact(payload: ContactPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
