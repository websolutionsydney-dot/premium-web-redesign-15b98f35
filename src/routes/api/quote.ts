import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/quote")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            name?: string;
            email?: string;
            company?: string;
            phone?: string;
            project?: string[];
            brief?: string;
          };

          const { name, email, company, phone, project, brief } = body;

          if (!name || !email || !brief) {
            return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
          }
          if (name.length > 200 || email.length > 320 || brief.length > 5000) {
            return Response.json({ ok: false, error: "Payload too large" }, { status: 400 });
          }

          const apiKey = process.env.RESEND_API_KEY;
          if (!apiKey) {
            return Response.json({ ok: false, error: "Email service not configured" }, { status: 500 });
          }

          const esc = (s: string) =>
            s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

          const projects = Array.isArray(project) ? project.join(", ") : project || "—";

          const html = `
            <h2>New project brief</h2>
            <p><strong>Name:</strong> ${esc(name)}</p>
            <p><strong>Email:</strong> ${esc(email)}</p>
            <p><strong>Company:</strong> ${esc(company || "—")}</p>
            <p><strong>Phone:</strong> ${esc(phone || "—")}</p>
            <p><strong>Project type:</strong> ${esc(projects)}</p>
            <p><strong>Brief:</strong></p>
            <p style="white-space:pre-wrap">${esc(brief)}</p>
          `;

          const from = process.env.RESEND_FROM || "Web Solution Sydney <onboarding@resend.dev>";
          const to = process.env.QUOTE_TO || "ryan@websolutionsydney.com.au";

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from,
              to: [to],
              reply_to: email,
              subject: `New brief from ${name}`,
              html,
            }),
          });

          if (!res.ok) {
            const errBody = await res.text();
            console.error(`Resend failed [${res.status}]: ${errBody}`);
            return Response.json({ ok: false, error: `Email provider error [${res.status}]` }, { status: 502 });
          }

          return Response.json({ ok: true });
        } catch (err) {
          console.error("quote route error", err);
          return Response.json({ ok: false, error: "Unexpected error" }, { status: 500 });
        }
      },
    },
  },
});
