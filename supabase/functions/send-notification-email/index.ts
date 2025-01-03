import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormData {
  email?: string;
  songTitle?: string;
  writerName?: string;
  writerShare?: string;
  userPublisherShare?: string;
  clefRightsShare?: string;
  proName?: string;
  proNumber?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormData = await req.json();
    console.log('Received form data:', formData);

    const emailContent = `
      New Form Submission:
      
      Email: ${formData.email || 'Not provided'}
      Song Title: ${formData.songTitle || 'Not provided'}
      Writer Name: ${formData.writerName || 'Not provided'}
      Writer Share: ${formData.writerShare || 'Not provided'}%
      User Publisher Share: ${formData.userPublisherShare || 'Not provided'}%
      ClefRights Share: ${formData.clefRightsShare || 'Not provided'}%
      PRO Name: ${formData.proName || 'Not provided'}
      PRO Number: ${formData.proNumber || 'Not provided'}
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ClefRights <onboarding@resend.dev>",
        to: ["mythoimusicpublishing@gmail.com"],
        subject: "New ClefRights Form Submission",
        html: emailContent.replace(/\n/g, '<br>'),
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Resend API error:', error);
      throw new Error('Failed to send email');
    }

    const data = await res.json();
    console.log('Email sent successfully:', data);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});