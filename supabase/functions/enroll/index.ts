import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@4.0.0";

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

const resend = new Resend(Deno.env.get("RESEND_ENROLL_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const VALID_LEVELS = ["a1.1", "a1.2", "a2.1", "a2.2", "b1.1", "b1.2", "b2.1", "b2.2", "unsure"];

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
}

async function checkRateLimit(
  supabase: any,
  email: string,
  formType: string,
): Promise<{ allowed: boolean; message?: string }> {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  // Check email rate limit (3 enrollments per day per email)
  const { data: emailLimits, error } = await supabase
    .from("rate_limit_tracker")
    .select("*")
    .eq("identifier", email)
    .eq("form_type", formType)
    .gte("window_start", oneDayAgo);

  if (error) {
    console.error("Rate limit check error:", error);
    return { allowed: true };
  }

  const totalCount = emailLimits?.reduce((sum: number, record: any) => sum + record.submission_count, 0) || 0;

  if (totalCount >= 3) {
    return {
      allowed: false,
      message: "Too many enrollment submissions. Please contact us directly at harsh@germanmitharsh.com",
    };
  }

  await supabase.from("rate_limit_tracker").insert({
    identifier: email,
    form_type: formType,
    submission_count: 1,
    window_start: new Date().toISOString(),
  });

  return { allowed: true };
}

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const clientIP = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Read payload (accepts either { body: {...} } or top-level fields)
    const rawPayload: any = await req.json();
    const incoming = rawPayload?.body ?? rawPayload;

    // helper to remove zero-width / BOM / non-printable
    const stripInvisible = (s: string) =>
      s
        ?.toString()
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/[^\x20-\x7E]/g, "") ?? "";

    // normalize + sanitize fields we rely on
    const formData: EnrollFormData = {
      name: stripInvisible(String(incoming?.name ?? "")).trim(),
      email: stripInvisible(String(incoming?.email ?? "")).trim(),
      phone: stripInvisible(String(incoming?.phone ?? "")).trim(),
      level: stripInvisible(String(incoming?.level ?? ""))
        .trim()
        .toLowerCase(),
      message: stripInvisible(String(incoming?.message ?? "")).trim(),
      startDate: stripInvisible(String(incoming?.startDate ?? "")).trim(),
      coupon: stripInvisible(String(incoming?.coupon ?? "")).trim(),
      honeypot: stripInvisible(String(incoming?.honeypot ?? "")).trim(),
    };

    // Honeypot check
    if (formData.honeypot) {
      console.log("Honeypot triggered, likely spam");
      return new Response(JSON.stringify({ ok: false, error: "Invalid submission" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.level) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate name
    if (formData.name.length > 120) {
      return new Response(JSON.stringify({ ok: false, error: "Name must be less than 120 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid email address" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate phone
    if (!validatePhone(formData.phone)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid phone number" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate course level
    if (!VALID_LEVELS.includes(formData.level)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid course level" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check rate limit
    const rateLimitCheck = await checkRateLimit(supabase, formData.email, "enroll");
    if (!rateLimitCheck.allowed) {
      return new Response(JSON.stringify({ ok: false, error: rateLimitCheck.message }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create submission record
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

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save submission");
    }

    const submissionId = submission.id;
    let studentEmailSent = false;

    // Send owner notification email
    try {
      const ownerEmailHTML = generateOwnerEmailHTML(formData, submissionId);

      const ownerEmailResponse = await resend.emails.send({
        from: "German mit Harsh <enroll@germanmitharsh.com>",
        to: ["harsh@germanmitharsh.com"],
        replyTo: formData.email,
        subject: `[Enrollment] ${sanitizeInput(formData.name)} - ${sanitizeInput(formData.level)}`,
        html: ownerEmailHTML,
      });

      console.log("Owner notification sent:", ownerEmailResponse);

      // Send student confirmation email
      const studentEmailHTML = generateStudentConfirmationHTML(formData);

      const studentEmailResponse = await resend.emails.send({
        from: "Harsh - German mit Harsh <harsh@germanmitharsh.com>",
        to: [formData.email],
        subject: `Thanks for enrolling - Next steps for ${sanitizeInput(formData.level)}`,
        html: studentEmailHTML,
      });

      console.log("Student confirmation sent:", studentEmailResponse);
      studentEmailSent = true;

      // Update submission status
      await supabase
        .from("form_submissions")
        .update({
          status: "sent",
          resend_message_id: ownerEmailResponse.id,
          resend_response: {
            owner: ownerEmailResponse,
            student: studentEmailResponse,
          },
        })
        .eq("id", submissionId);

      return new Response(
        JSON.stringify({
          ok: true,
          id: submissionId,
          student_email_sent: studentEmailSent,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    } catch (emailError: any) {
      console.error("Email sending error:", emailError);

      // Retry once for transient errors
      if (emailError.statusCode >= 500) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
          const retryOwnerResponse = await resend.emails.send({
            from: "German mit Harsh <enroll@germanmitharsh.com>",
            to: ["harsh@germanmitharsh.com"],
            replyTo: formData.email,
            subject: `[Enrollment] ${sanitizeInput(formData.name)} - ${sanitizeInput(formData.level)}`,
            html: generateOwnerEmailHTML(formData, submissionId),
          });

          const retryStudentResponse = await resend.emails.send({
            from: "Harsh - German mit Harsh <harsh@germanmitharsh.com>",
            to: [formData.email],
            subject: `Thanks for enrolling - Next steps for ${sanitizeInput(formData.level)}`,
            html: generateStudentConfirmationHTML(formData),
          });

          await supabase
            .from("form_submissions")
            .update({
              status: "sent",
              resend_message_id: retryOwnerResponse.id,
              resend_response: {
                owner: retryOwnerResponse,
                student: retryStudentResponse,
              },
            })
            .eq("id", submissionId);

          return new Response(
            JSON.stringify({
              ok: true,
              id: submissionId,
              student_email_sent: true,
            }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        } catch (retryError: any) {
          console.error("Retry failed:", retryError);
        }
      }

      // Mark as failed
      await supabase
        .from("form_submissions")
        .update({
          status: "failed",
          error_message: emailError.message,
          resend_response: emailError,
        })
        .eq("id", submissionId);

      return new Response(
        JSON.stringify({ ok: false, error: "Failed to send email. Please try again or contact us directly." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
  } catch (error: any) {
    console.error("Enrollment form error:", error);
    return new Response(JSON.stringify({ ok: false, error: error.message || "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
