const { Resend } = require('resend');

let resend;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  if (!resend) {
    return res.status(500).json({ ok: false, error: 'Server missing RESEND_API_KEY environment variable.' });
  }

  try {
    const payload = req.body || {};
    
    const { data, error } = await resend.emails.send({
      from: 'hello@cdhrentals.com',
      to: 'office@cdhrentals.com',
      replyTo: payload.email || 'hello@cdhrentals.com',
      subject: 'New Dispatch Request',
      html: `
        <h2>New Dispatch Request</h2>
        <p><strong>Tonnage:</strong> ${payload.tonnage || 'N/A'}</p>
        <p><strong>Region:</strong> ${payload.region || 'N/A'}</p>
        <p><strong>Needed By:</strong> ${payload.neededBy || 'N/A'}</p>
        <p><strong>Phone:</strong> ${payload.phone || 'N/A'}</p>
        <p><strong>Email:</strong> ${payload.email || 'N/A'}</p>
        <p><strong>Description:</strong> ${payload.description || 'N/A'}</p>
      `
    });

    if (error) {
      console.error(error);
      return res.status(500).json({ ok: false, error: error.message });
    }

    res.status(200).json({ ok: true, received: payload, id: data?.id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ ok: false, error: 'Failed to process request' });
  }
}
