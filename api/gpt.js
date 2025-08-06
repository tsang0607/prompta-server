export default async function handler(req, res) {
  const userPrompt = req.body.prompt;

  if (!userPrompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'No response';

    res.status(200).json({ result: reply });

  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
}
