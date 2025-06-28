import { useState } from 'react';
import axios from 'axios';

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function Quiz() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const generateQuiz = async () => {
    setSubmitted(false);
    setUserAnswers([]);
    try {
      const res = await axios.post('/api/quiz', { topic });
      setQuestions(res.data.questions);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = (qIndex: number, selected: string) => {
    const updated = [...userAnswers];
    updated[qIndex] = selected;
    setUserAnswers(updated);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (q.answer === userAnswers[i]) score++;
    });
    return score;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 className="text-3xl font-bold mb-4">❓ AI Quiz Generator</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter a topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border rounded p-2"
        />
        <button
          onClick={generateQuiz}
          className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700"
        >
          Generate Quiz
        </button>
      </div>

      {questions.length > 0 && (
        <div className="bg-gray-100 p-4 rounded">
          {questions.map((q, i) => (
            <div key={i} className="mb-6">
              <p className="font-medium">{i + 1}. {q.question}</p>
              {q.options.map((opt, j) => {
                const isCorrect = opt === q.answer;
                const isSelected = userAnswers[i] === opt;

                let style = 'ml-2';
                if (submitted) {
                  style += isCorrect ? ' text-green-600 font-bold' : '';
                  if (isSelected && !isCorrect) style += ' text-red-600 line-through';
                }

                return (
                  <label key={j} className="block mt-1 cursor-pointer">
                    <input
                      type="radio"
                      name={`q-${i}`}
                      value={opt}
                      onChange={() => handleSelect(i, opt)}
                      disabled={submitted}
                    />
                    <span className={style}>{opt}</span>
                  </label>
                );
              })}
            </div>
          ))}

          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Answers
            </button>
          ) : (
            <>
              <div className="mt-4 font-bold text-lg">
                Score: {getScore()} / {questions.length}
              </div>

              <div className="mt-6 bg-white text-black p-4 rounded border">
                <h2 className="text-xl font-semibold mb-2">✅ Correct Answers:</h2>
                <ul className="list-disc list-inside">
                  {questions.map((q, idx) => (
                    <li key={idx}>
                      <p className="font-medium">{idx + 1}. {q.question}</p>
                      <p className="text-green-700">✔ {q.answer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
