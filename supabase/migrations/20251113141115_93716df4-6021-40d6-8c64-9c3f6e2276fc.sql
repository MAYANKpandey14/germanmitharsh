-- Create form_submissions table for logging all form submissions
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type TEXT NOT NULL CHECK (form_type IN ('contact', 'enroll')),
  payload_json JSONB NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  resend_message_id TEXT,
  resend_response JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index for faster queries
CREATE INDEX idx_form_submissions_form_type ON public.form_submissions(form_type);
CREATE INDEX idx_form_submissions_created_at ON public.form_submissions(created_at DESC);
CREATE INDEX idx_form_submissions_status ON public.form_submissions(status);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write (edge functions will use service role)
CREATE POLICY "Service role full access"
  ON public.form_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add trigger for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create rate_limit_tracker table for rate limiting
CREATE TABLE IF NOT EXISTS public.rate_limit_tracker (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL, -- IP or email
  form_type TEXT NOT NULL,
  submission_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_rate_limit_identifier ON public.rate_limit_tracker(identifier, form_type, window_start);

ALTER TABLE public.rate_limit_tracker ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access rate limit"
  ON public.rate_limit_tracker
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);