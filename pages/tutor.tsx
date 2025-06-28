import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function Tutor() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse("Thinking...");

    try {
      const res = await axios.post('/api/ask', { prompt: input });
      setResponse(res.data.answer);
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">💬 AI Chat Tutor</h1>

      <textarea
        rows={5}
        placeholder="Ask a question like 'What is Machine Learning?'"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>

      {response && (
        <div className="mt-6 bg-gray-100 p-4 rounded text-black prose max-w-none">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
