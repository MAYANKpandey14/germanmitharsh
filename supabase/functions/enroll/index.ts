// supabase/functions/enroll/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EnrollFormData {
  name: string;
  email: string;
  phone: string;
  level: string;
  message?: string;
  startDate?: string;
  coupon?: string;
  honeypot?: string;
}

const VALID_LEVELS = ["a1.1", "a1.2", "a2.1", "a2.2", "b1.1", "b1.2", "b2.1", "b2.2", "unsure"];

function stripInvisible(s: string) {
  return (
    s
      ?.toString()
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .replace(/[^\x20-\x7E]/g, "") ?? ""
  );
}
function sanitize(input = "") {
  return stripInvisible(String(input)).trim().replace(/[<>]/g, "");
}
// small wrapper used by templates (keeps your template calls unchanged)
function sanitizeInput(input = "") {
  return sanitize(input);
}
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone: string) {
  const digits = (phone || "").replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 20;
}

/* ----------------- Keep the exact HTML templates below (unchanged) ----------------- */

function generateOwnerEmailHTML(data: EnrollFormData, submissionId: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Enrollment Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">🎓 New Enrollment Request</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 16px;">
                  Course Level: ${sanitizeInput(data.level)}
                </p>
              </div>
              
              <!-- Student Details Table -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: 600; color: #333; width: 30%;">
                    Name
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef; color: #666;">
                    ${sanitizeInput(data.name)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: 600; color: #333;">
                    Email
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef; color: #666;">
                    <a href="mailto:${data.email}" style="color: #f59e0b; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: 600; color: #333;">
                    Phone
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef; color: #666;">
                    <a href="tel:${data.phone}" style="color: #f59e0b; text-decoration: none;">${sanitizeInput(data.phone)}</a>
                  </td>
                </tr>
                ${
                  data.startDate
                    ? `
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: 600; color: #333;">
                    Preferred Start
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef; color: #666;">
                    ${sanitizeInput(data.startDate)}
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  data.coupon
                    ? `
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: 600; color: #333;">
                    Coupon Code
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef; color: #666;">
                    ${sanitizeInput(data.coupon)}
                  </td>
                </tr>
                `
                    : ""
                }
              </table>
              
              ${
                data.message
                  ? `
              <!-- Additional Notes -->
              <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px; color: #333; font-size: 16px; font-weight: 600;">Additional Notes:</h3>
                <div style="padding: 16px; background-color: #f8f9fa; border-left: 4px solid #f59e0b; border-radius: 4px; color: #666; line-height: 1.6; white-space: pre-wrap;">${sanitizeInput(data.message)}</div>
              </div>
              `
                  : ""
              }
              
              <!-- Action Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="mailto:${data.email}" style="display: inline-block; background-color: #f59e0b; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  Reply to Student
                </a>
              </div>
              
              <!-- Metadata -->
              <div style="padding: 16px; background-color: #f8f9fa; border-radius: 4px; font-size: 12px; color: #999;">
                <p style="margin: 0 0 4px;"><strong>Submission ID:</strong> ${submissionId}</p>
                <p style="margin: 0;"><strong>Submitted:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" })} (Berlin Time)</p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #999; font-size: 12px;">
                This email was automatically generated from your website enrollment form.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function generateStudentConfirmationHTML(data: EnrollFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enrollment Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0 0 12px; color: #ffffff; font-size: 28px; font-weight: 700;">Thanks for Enrolling! 🎉</h1>
              <p style="margin: 0; color: #e5e7eb; font-size: 16px;">We're excited to be part of your German learning journey</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px; color: #666; font-size: 16px; line-height: 1.6;">
                Hello ${sanitizeInput(data.name)},
              </p>
              
              <p style="margin: 0 0 24px; color: #666; font-size: 16px; line-height: 1.6;">
                Thank you for choosing <strong>German mit Harsh</strong> to master the German language! We've received your enrollment request for <strong>${sanitizeInput(data.level)}</strong> and will get back to you shortly.
              </p>
              
              <!-- Enrollment Summary -->
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px; color: #333; font-size: 18px; font-weight: 600;">Your Enrollment Summary</h3>
                <table style="width: 100%;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Course Level:</strong></td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">${sanitizeInput(data.level)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Name:</strong></td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">${sanitizeInput(data.name)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">${data.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-size: 14px;"><strong>Phone:</strong></td>
                    <td style="padding: 8px 0; color: #333; font-size: 14px; text-align: right;">${sanitizeInput(data.phone)}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Next Steps -->
              <div style="margin-bottom: 32px;">
                <h3 style="margin: 0 0 16px; color: #333; font-size: 18px; font-weight: 600;">What Happens Next?</h3>
                <ul style="margin: 0; padding-left: 20px; color: #666; line-height: 1.8;">
                  <li style="margin-bottom: 8px;">We'll review your enrollment within the next 24 hours</li>
                  <li style="margin-bottom: 8px;">You'll receive a call or email to schedule your free consultation</li>
                  <li style="margin-bottom: 8px;">During the consultation, we'll discuss your goals and create a personalized learning plan</li>
                  <li style="margin-bottom: 8px;">Once confirmed, you'll receive course materials and class schedule</li>
                </ul>
              </div>
              
              <!-- Quick Actions -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 32px; border-radius: 4px;">
                <p style="margin: 0 0 12px; color: #92400e; font-weight: 600;">Questions or need to reach us sooner?</p>
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  📧 Email: <a href="mailto:support@germanmitharsh.com" style="color: #d97706; text-decoration: none;">support@germanmitharsh.com</a><br>
                  📱 WhatsApp: <a href="https://wa.me/4915511330861" style="color: #d97706; text-decoration: none;">+49 15511330861</a>
                </p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="https://wa.me/4915511330861?text=Hi%20Harsh!%20I%20just%20enrolled%20for%20${encodeURIComponent(data.level)}%20course" style="display: inline-block; background-color: #667eea; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  Chat on WhatsApp
                </a>
              </div>
              
              <p style="margin: 24px 0 0; color: #666; font-size: 14px; line-height: 1.6; text-align: center;">
                We're looking forward to helping you achieve fluency in German!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 8px; color: #999; font-size: 12px;">
                German mit Harsh - Master Conversational German
              </p>
              <p style="margin: 0; color: #999; font-size: 12px;">
                If you didn't request this enrollment, please ignore this email or <a href="mailto:support@germanmitharsh.com" style="color: #667eea; text-decoration: none;">contact us</a>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/* ----------------- end templates ----------------- */

const resend = new Resend(Deno.env.get("RESEND_ENROLL_API_KEY") || "");
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const clientIP = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Accept either { body: {...} } or top-level JSON
    // let raw: any = {};
    // try {
    //   raw = await req.json();
    // } catch (e) {
    //   // invalid JSON
    //   return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
    //     status: 400,
    //     headers: { ...corsHeaders, "Content-Type": "application/json" },
    //   });
    // }
    // const incoming = raw?.body ?? raw ?? {};
    // Robust body parsing (accepts both { body: {...} } or top-level JSON).
    let raw: any = {};
    let rawText = "";
    try {
      // read text first (safer and avoids unexpected parse errors)
      rawText = await req.text();
    } catch (e) {
      console.warn("Failed to read body text:", (e as Error)?.message ?? e);
      rawText = "";
    }

    // If there is no body at all
    if (!rawText || rawText.trim() === "") {
      console.log("Empty request body received");
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Empty request body. Ensure Content-Type: application/json and a valid JSON payload is sent.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Try parse the raw text into JSON
    try {
      raw = JSON.parse(rawText);
    } catch (parseErr) {
      // If parse fails, sometimes clients send a JSON string in `body` field, e.g. { body: "{\"name\":\"...\"}" }
      // Try to detect that and salvage it.
      try {
        const maybe = JSON.parse(rawText); // rethrow normally, but keep for clarity
        raw = maybe;
      } catch {
        // Try a heuristic: rawText might already be a quoted JSON string (double-encoded)
        // e.g. rawText === "{\"body\":\"{\\\"name\\\":\\\"abc\\\"}\"}"
        // Attempt to extract a JSON substring that looks like an object
        const firstBrace = rawText.indexOf("{");
        const lastBrace = rawText.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          const candidate = rawText.slice(firstBrace, lastBrace + 1);
          try {
            raw = JSON.parse(candidate);
            console.log("Recovered JSON by slicing rawText candidate");
          } catch (recoverErr) {
            console.warn("Could not recover JSON from rawText:", (recoverErr as Error)?.message ?? recoverErr);
            return new Response(JSON.stringify({ ok: false, error: "Invalid JSON", rawText }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
        } else {
          console.warn("JSON parse failed and no recoverable candidate:", (parseErr as Error)?.message ?? parseErr);
          return new Response(JSON.stringify({ ok: false, error: "Invalid JSON", rawText }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }
    }

    // Accept either nested `body` or top-level
    let incoming: any = raw?.body ?? raw ?? {};

    // If incoming is a string (common when client stringifies body), parse it
    if (typeof incoming === "string") {
      try {
        incoming = JSON.parse(incoming);
        console.log("Parsed incoming.body string into object");
      } catch (e) {
        console.warn("incoming is string but not valid JSON:", (e as Error)?.message ?? e);
        return new Response(
          JSON.stringify({ ok: false, error: "Invalid nested JSON string in 'body'", incoming: String(incoming) }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    // Final debug log so we can see exactly what shape arrived
    console.log("INCOMING (post-parse):", JSON.stringify(incoming));

    // Normalize fields
    const formData: EnrollFormData = {
      name: sanitize(incoming.name),
      email: sanitize(incoming.email).toLowerCase(),
      phone: sanitize(incoming.phone),
      level: sanitize(incoming.level).toLowerCase(),
      message: sanitize(incoming.message),
      startDate: sanitize(incoming.startDate),
      coupon: sanitize(incoming.coupon),
      honeypot: sanitize(incoming.honeypot),
    };

    // Honeypot
    if (formData.honeypot) {
      console.log("Honeypot triggered:", formData.honeypot);
      return new Response(JSON.stringify({ ok: false, error: "Invalid submission" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate required fields (explicit messages)
    if (!formData.name) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required field: name" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!formData.email || !isValidEmail(formData.email)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid or missing email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!formData.phone || !isValidPhone(formData.phone)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid or missing phone" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!formData.level) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required field: level" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!formData.message) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required field: message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Normalize level to a canonical VALID_LEVELS member (tolerant)
    let matched = VALID_LEVELS.find((v) => v === formData.level);
    if (!matched) matched = VALID_LEVELS.find((v) => formData.level.includes(v));
    if (!matched) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid course level", received: formData.level }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    formData.level = matched;

    // Best-effort DB insert (non-fatal)
    let submissionId: string | null = null;
    try {
      const { data: submission, error: dbError } = await supabase
        .from("form_submissions")
        .insert({
          form_type: "enroll",
          payload_json: formData,
          ip_address: clientIP,
          user_agent: userAgent,
          status: "pending",
        })
        .select()
        .single();

      if (!dbError && submission && (submission as any).id) submissionId = (submission as any).id;
      if (dbError) console.warn("DB insert warning (non-fatal):", dbError);
    } catch (dbErr) {
      console.warn("DB error (non-fatal):", dbErr);
    }

    // Build the exact HTML emails using your templates (they remain unchanged)
    const ownerEmailHTML = generateOwnerEmailHTML(formData, submissionId ?? "n/a");
    const studentEmailHTML = generateStudentConfirmationHTML(formData);

    // Send emails via Resend
    try {
      const ownerResp = await resend.emails.send({
        from: "German mit Harsh <enroll@germanmitharsh.com>",
        to: ["harsh@germanmitharsh.com"],
        replyTo: formData.email,
        subject: `[Enrollment] ${formData.name} - ${formData.level}`,
        html: ownerEmailHTML,
      });

      const studentResp = await resend.emails.send({
        from: "Harsh - German mit Harsh <harsh@germanmitharsh.com>",
        to: [formData.email],
        subject: `Thanks for enrolling - Next steps for ${formData.level}`,
        html: studentEmailHTML,
      });

      // Update DB record to sent (best-effort)
      if (submissionId) {
        try {
          await supabase
            .from("form_submissions")
            .update({
              status: "sent",
              resend_message_id: (ownerResp as any).id ?? null,
              resend_response: { owner: ownerResp, student: studentResp },
            })
            .eq("id", submissionId);
        } catch (uErr) {
          console.warn("DB update warning (non-fatal):", uErr);
        }
      }

      return new Response(JSON.stringify({ ok: true, id: submissionId }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (emailErr: any) {
      console.error("Email sending error:", emailErr);
      // mark failed in DB if possible (best-effort)
      if (submissionId) {
        try {
          await supabase
            .from("form_submissions")
            .update({ status: "failed", error_message: emailErr?.message ?? String(emailErr) })
            .eq("id", submissionId);
        } catch (_) {
          /* ignore */
        }
      }
      return new Response(JSON.stringify({ ok: false, error: "Failed to send email" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ ok: false, error: err?.message ?? "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
