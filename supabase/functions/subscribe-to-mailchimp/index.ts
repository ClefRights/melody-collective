import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MailchimpListMember {
  email_address: string;
  status: string;
  merge_fields: {
    FNAME?: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, name } = await req.json();
    const MAILCHIMP_API_KEY = Deno.env.get('MAILCHIMP_API_KEY');
    const AUDIENCE_ID = "YOUR_AUDIENCE_ID"; // Replace with your actual audience ID

    if (!MAILCHIMP_API_KEY) {
      throw new Error('Missing MailChimp API key');
    }

    // Extract datacenter from API key
    const [, datacenter] = MAILCHIMP_API_KEY.split('-');

    const subscriber: MailchimpListMember = {
      email_address: email,
      status: 'pending', // Double opt-in
      merge_fields: {
        FNAME: name,
      },
    };

    const response = await fetch(
      `https://${datacenter}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify(subscriber),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Failed to subscribe');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});