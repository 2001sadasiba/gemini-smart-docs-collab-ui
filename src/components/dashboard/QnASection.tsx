import React, { useState } from 'react';

interface QnASectionProps {
    isVisible: boolean;
}

const QnASection: React.FC<QnASectionProps> = ({ isVisible }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAskQuestion = async () => {
        if (!question.trim()) return;

        try {
            setIsLoading(true);
            setAnswer('Thinking...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            setAnswer(
                'This is a simulated answer from Gemini AI. In the real application, this would be generated based on your team\'s documents.'
            );
        } catch (err) {
            setAnswer('Failed to get answer from AI');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="qna-section">
            <h3>Ask Our AI Assistant About Your Documents</h3>
            <div className="qna-input">
                <input
                    type="text"
                    placeholder="Ask a question about your team's knowledge..."
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleAskQuestion()}
                    disabled={isLoading}
                />
                <button
                    className="btn-primary"
                    onClick={handleAskQuestion}
                    disabled={!question.trim() || isLoading}
                >
                    {isLoading ? 'Thinking...' : 'Ask'}
                </button>
            </div>
            {answer && (
                <div className="answer">
                    <h4>AI Response:</h4>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default QnASection;