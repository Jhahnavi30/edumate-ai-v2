import { useState } from 'react';
import axios from 'axios';

export default function Summarize() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('Summary will appear here...');

  const handleSummarize = async () => {
    setSummary('Summarizing...');
    try {
      const res = await axios.post('/api/summarize', { text });
      setSummary(res.data.summary);
    } catch (err) {
      setSummary('Error summarizing text.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 className="text-3xl font-bold mb-4">📝 AI Notes Summarizer</h1>
      <textarea
        rows={10}
        placeholder="Paste your notes here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />
      <button
        onClick={handleSummarize}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Summarize
      </button>
      <div className="mt-6 bg-gray-100 p-4 rounded text-black">
        {summary}
      </div>
    </div>
  );
}
