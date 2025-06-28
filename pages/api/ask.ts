import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  try {
    const groqRes = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: 'You are a helpful AI tutor.' },
          { role: 'user', content: prompt }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = groqRes.data.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (err: any) {
    console.error('Groq API error:', err?.response?.data || err.message);
    res.status(500).json({ answer: 'Something went wrong with Groq API.' });
  }
}
