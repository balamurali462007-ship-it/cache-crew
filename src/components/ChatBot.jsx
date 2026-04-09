import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse } from '../data/chatResponses';
import './ChatBot.css';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: {
        title: '🌍 Welcome to MigrateAI Assistant!',
        analysis: "I'm here to help with your migration and travel questions. I can assist with visa requirements, cost of living, job markets, language prep, healthcare, and housing.",
        steps: [],
        tips: ['Try asking: "What visa do I need?"', 'Try: "How much does it cost to live in Canada?"', 'Try: "How do I find a job abroad?"'],
      },
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(input);
      setMessages((prev) => [...prev, { role: 'bot', content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'Visa requirements',
    'Cost of living',
    'Job opportunities',
    'Language tips',
  ];

  return (
    <>
      <motion.button
        id="chatbot-toggle"
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
      >
        <span className="chatbot-toggle__icon">{isOpen ? '✕' : '🤖'}</span>
        {!isOpen && <span className="chatbot-toggle__pulse" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="chatbot__header">
              <div className="chatbot__header-info">
                <div className="chatbot__avatar">🤖</div>
                <div>
                  <h3 className="chatbot__title">MigrateAI Assistant</h3>
                  <p className="chatbot__status">
                    <span className="chatbot__status-dot" />
                    Online — Ready to help
                  </p>
                </div>
              </div>
            </div>

            <div className="chatbot__messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chatbot__message chatbot__message--${msg.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  {msg.role === 'user' ? (
                    <div className="chatbot__user-text">{msg.content}</div>
                  ) : (
                    <div className="chatbot__bot-response">
                      <h4 className="chatbot__response-title">{msg.content.title}</h4>
                      <p className="chatbot__response-analysis">{msg.content.analysis}</p>

                      {msg.content.steps && msg.content.steps.length > 0 && (
                        <div className="chatbot__response-section">
                          <h5>📋 Steps</h5>
                          <ol className="chatbot__steps">
                            {msg.content.steps.map((step, j) => (
                              <li key={j}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {msg.content.tips && msg.content.tips.length > 0 && (
                        <div className="chatbot__response-section">
                          <h5>💡 Tips</h5>
                          <ul className="chatbot__tips">
                            {msg.content.tips.map((tip, j) => (
                              <li key={j}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="chatbot__message chatbot__message--bot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="chatbot__typing">
                    <span /><span /><span />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot__quick">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  className="chatbot__quick-btn"
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => {
                      setMessages((prev) => [...prev, { role: 'user', content: q }]);
                      setIsTyping(true);
                      setTimeout(() => {
                        const response = getAIResponse(q);
                        setMessages((prev) => [...prev, { role: 'bot', content: response }]);
                        setIsTyping(false);
                      }, 800);
                    }, 100);
                    setInput('');
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="chatbot__input-area">
              <input
                ref={inputRef}
                type="text"
                className="chatbot__input"
                placeholder="Ask about migration or travel..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="chatbot__send"
                onClick={handleSend}
                disabled={!input.trim()}
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
