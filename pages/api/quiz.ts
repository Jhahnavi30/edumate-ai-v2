import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { topic } = req.body;

  try {
    const groqRes = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'Generate 3 multiple-choice questions with 4 options and the correct answer clearly marked. Return as JSON array like: [{question, options, answer}].',
          },
          {
            role: 'user',
            content: `Generate a quiz for: ${topic}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const raw = groqRes.data.choices[0].message.content;
    const jsonStart = raw.indexOf('[');
    const jsonEnd = raw.lastIndexOf(']') + 1;
    const questions = JSON.parse(raw.slice(jsonStart, jsonEnd));
    
    res.status(200).json({ questions });
  } catch (err: any) {
    console.error('Quiz API error:', err?.response?.data || err.message);
    res.status(500).json({ questions: [] });
  }
}
