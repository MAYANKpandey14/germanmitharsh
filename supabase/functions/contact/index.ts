import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  honeypot?: string;
}

const resend = new Resend(Deno.env.get('RESEND_CONTACT_API_KEY'));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Validation functions
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

async function checkRateLimit(
  supabase: any,
  identifier: string,
  formType: string
): Promise<{ allowed: boolean; message?: string }> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  
  // Check IP rate limit (5 per hour)
  const { data: ipLimits, error } = await supabase
    .from('rate_limit_tracker')
    .select('*')
    .eq('identifier', identifier)
    .eq('form_type', formType)
    .gte('window_start', oneHourAgo);

  if (error) {
    console.error('Rate limit check error:', error);
    return { allowed: true }; // Allow on error
  }

  const totalCount = ipLimits?.reduce((sum: number, record: any) => 
    sum + record.submission_count, 0) || 0;

  if (totalCount >= 5) {
    return { 
      allowed: false, 
      message: 'Too many submissions. Please try again in an hour.' 
    };
  }

  // Update rate limit tracker
  await supabase.from('rate_limit_tracker').insert({
    identifier,
    form_type: formType,
    submission_count: 1,
    window_start: new Date().toISOString()
  });

  return { allowed: true };
}

function generateContactEmailHTML(data: ContactFormData, submissionId: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Contact Form Submission</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px; color: #666; font-size: 16px;">
                You have received a new contact form submission from your website.
              </p>
              
              <!-- Contact Details Table -->
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
                    <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: 600; color: #333;">
                    Phone
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef; color: #666;">
                    ${sanitizeInput(data.phone)}
                  </td>
                </tr>
                ` : ''}
                ${data.subject ? `
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #e9ecef; font-weight: 600; color: #333;">
                    Subject
                  </td>
                  <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e9ecef; color: #666;">
                    ${sanitizeInput(data.subject)}
                  </td>
                </tr>
                ` : ''}
              </table>
              
              <!-- Message -->
              <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 12px; color: #333; font-size: 16px; font-weight: 600;">Message:</h3>
                <div style="padding: 16px; background-color: #f8f9fa; border-left: 4px solid #667eea; border-radius: 4px; color: #666; line-height: 1.6; white-space: pre-wrap;">${sanitizeInput(data.message)}</div>
              </div>
              
              <!-- Metadata -->
              <div style="padding: 16px; background-color: #f8f9fa; border-radius: 4px; font-size: 12px; color: #999;">
                <p style="margin: 0 0 4px;"><strong>Submission ID:</strong> ${submissionId}</p>
                <p style="margin: 0;"><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' })} (Berlin Time)</p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #999; font-size: 12px;">
                This email was automatically generated from your website contact form.
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
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get client info
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Parse request body
    const formData: ContactFormData = await req.json();

    // Honeypot check
    if (formData.honeypot) {
      console.log('Honeypot triggered, likely spam');
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid submission' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate name
    if (formData.name.length > 120) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Name must be less than 120 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate message
    if (formData.message.length < 10 || formData.message.length > 5000) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Message must be between 10 and 5000 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate phone if provided
    if (formData.phone && !validatePhone(formData.phone)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid phone number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limit
    const rateLimitCheck = await checkRateLimit(supabase, clientIP, 'contact');
    if (!rateLimitCheck.allowed) {
      return new Response(
        JSON.stringify({ ok: false, error: rateLimitCheck.message }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create submission record
    const { data: submission, error: dbError } = await supabase
      .from('form_submissions')
      .insert({
        form_type: 'contact',
        payload_json: formData,
        ip_address: clientIP,
        user_agent: userAgent,
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save submission');
    }

    const submissionId = submission.id;

    // Send email via Resend
    try {
      const emailHTML = generateContactEmailHTML(formData, submissionId);
      
      const emailResponse = await resend.emails.send({
        from: 'German mit Harsh <noreply@germanmitharsh.com>',
        to: ['support@germanmitharsh.com'],
        replyTo: formData.email,
        subject: `[Contact Form] New enquiry from ${sanitizeInput(formData.name)}`,
        html: emailHTML
      });

      console.log('Email sent successfully:', emailResponse);

      // Update submission status
      await supabase
        .from('form_submissions')
        .update({
          status: 'sent',
          resend_message_id: emailResponse.id,
          resend_response: emailResponse
        })
        .eq('id', submissionId);

      return new Response(
        JSON.stringify({ ok: true, id: submissionId }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (emailError: any) {
      console.error('Email sending error:', emailError);

      // Retry once for transient errors
      if (emailError.statusCode >= 500) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
          const retryResponse = await resend.emails.send({
            from: 'German mit Harsh <noreply@germanmitharsh.com>',
            to: ['support@germanmitharsh.com'],
            replyTo: formData.email,
            subject: `[Contact Form] New enquiry from ${sanitizeInput(formData.name)}`,
            html: generateContactEmailHTML(formData, submissionId)
          });

          await supabase
            .from('form_submissions')
            .update({
              status: 'sent',
              resend_message_id: retryResponse.id,
              resend_response: retryResponse
            })
            .eq('id', submissionId);

          return new Response(
            JSON.stringify({ ok: true, id: submissionId }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        } catch (retryError: any) {
          console.error('Retry failed:', retryError);
        }
      }

      // Mark as failed
      await supabase
        .from('form_submissions')
        .update({
          status: 'failed',
          error_message: emailError.message,
          resend_response: emailError
        })
        .eq('id', submissionId);

      return new Response(
        JSON.stringify({ ok: false, error: 'Failed to send email. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error: any) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ ok: false, error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
