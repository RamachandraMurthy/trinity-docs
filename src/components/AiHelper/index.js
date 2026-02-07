import React, { useState, useRef, useEffect, useCallback } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// ─── System prompt (lightweight, no hardcoded docs) ─────────────────────────
const SYSTEM_PROMPT = `You are Trinity AI Assistant, a helpful documentation chatbot for the Trinity Platform.
You answer questions based ONLY on the documentation context provided below.
If the context doesn't contain enough information to answer, say so honestly.
Be concise and helpful. Use markdown formatting.
Reference specific pages or sections when relevant.
Format code examples with proper syntax highlighting.

DOCUMENTATION CONTEXT:
`;

// ─── Gemini models ──────────────────────────────────────────────────────────
const GEMINI_MODELS = [
  { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
  { id: 'gemini-2.5-flash-preview-05-20', label: 'Gemini 2.5 Flash' },
  { id: 'gemini-2.5-pro-preview-05-06', label: 'Gemini 2.5 Pro' },
];

// ─── Relevance search engine ────────────────────────────────────────────────

/** Tokenize a string into lowercase words (3+ chars) */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s\-_.]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3);
}

/** Compute IDF values for the entire index (called once when index loads) */
function computeIDF(index) {
  const docCount = index.length;
  const df = {}; // document frequency for each term

  for (const chunk of index) {
    const seen = new Set();
    for (const kw of chunk.keywords) {
      if (!seen.has(kw)) {
        df[kw] = (df[kw] || 0) + 1;
        seen.add(kw);
      }
    }
  }

  const idf = {};
  for (const [term, freq] of Object.entries(df)) {
    idf[term] = Math.log((docCount + 1) / (freq + 1)) + 1;
  }
  return idf;
}

/**
 * Score and rank chunks by relevance to a query using TF-IDF.
 * Returns the top N chunks with their scores.
 */
function searchChunks(query, index, idf, topN = 6) {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  // Also check for bigrams (consecutive word pairs) for better phrase matching
  const queryBigrams = [];
  for (let i = 0; i < queryTokens.length - 1; i++) {
    queryBigrams.push(queryTokens[i] + ' ' + queryTokens[i + 1]);
  }

  const scored = index.map((chunk) => {
    let score = 0;
    const contentLower = chunk.content.toLowerCase();
    const titleLower = chunk.title.toLowerCase();

    // TF-IDF scoring
    for (const token of queryTokens) {
      if (chunk.keywords.includes(token)) {
        // Term frequency in this chunk
        const tf = chunk.keywords.filter((k) => k === token).length;
        const idfVal = idf[token] || 1;
        score += tf * idfVal;
      }
      // Title match bonus (titles are more important)
      if (titleLower.includes(token)) {
        score += 3;
      }
    }

    // Exact phrase bonus — if the query appears verbatim in content
    if (queryTokens.length >= 2) {
      const queryPhrase = queryTokens.join(' ');
      if (contentLower.includes(queryPhrase)) {
        score += 10;
      }
    }

    // Bigram bonus
    for (const bigram of queryBigrams) {
      if (contentLower.includes(bigram)) {
        score += 4;
      }
    }

    return { ...chunk, score };
  });

  return scored
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

// ─── Markdown renderer ──────────────────────────────────────────────────────

function MarkdownRenderer({ text }) {
  const html = text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n/g, '<br/>');

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function AiHelper() {
  const { siteConfig } = useDocusaurusContext();
  const apiKey = siteConfig.customFields?.geminiApiKey || '';
  const indexUrl = useBaseUrl('/ai-docs-index.json');

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm the Trinity AI Assistant. I have access to all the documentation — ask me anything about the Trinity platform!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('trinity-ai-model') || GEMINI_MODELS[0].id;
    }
    return GEMINI_MODELS[0].id;
  });
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [error, setError] = useState(null);

  // Docs index state
  const [docsIndex, setDocsIndex] = useState(null);
  const [idf, setIdf] = useState(null);
  const [indexStatus, setIndexStatus] = useState('loading'); // loading | ready | error

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load the docs index on mount
  useEffect(() => {
    let cancelled = false;
    async function loadIndex() {
      try {
        const res = await fetch(indexUrl);
        if (!res.ok) throw new Error(`Failed to load docs index: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setDocsIndex(data);
          setIdf(computeIDF(data));
          setIndexStatus('ready');
        }
      } catch (err) {
        console.error('Failed to load docs index:', err);
        if (!cancelled) {
          setIndexStatus('error');
        }
      }
    }
    loadIndex();
    return () => { cancelled = true; };
  }, [indexUrl]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const saveModel = useCallback((model) => {
    setSelectedModel(model);
    if (typeof window !== 'undefined') {
      localStorage.setItem('trinity-ai-model', model);
    }
    setShowModelPicker(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!apiKey) {
      setError('Gemini API key not configured. Please add REACT_APP_GOOGLE_API_KEY to the .env file.');
      return;
    }

    if (indexStatus !== 'ready' || !docsIndex) {
      setError('Documentation index is still loading. Please try again in a moment.');
      return;
    }

    const userQuery = input.trim();
    const userMessage = { role: 'user', content: userQuery };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Search for relevant documentation chunks
      const relevantChunks = searchChunks(userQuery, docsIndex, idf, 6);

      // Build context from the matched chunks
      let docsContext;
      if (relevantChunks.length === 0) {
        docsContext = 'No specific documentation found for this query. Answer based on your general knowledge of the Trinity platform, but let the user know the docs may not cover this topic.';
      } else {
        docsContext = relevantChunks
          .map((chunk, i) => `--- Document: ${chunk.title} (${chunk.path}) ---\n${chunk.content}`)
          .join('\n\n');
      }

      const systemInstruction = SYSTEM_PROMPT + docsContext;

      // Build conversation history for Gemini
      const contents = [];
      const historyMessages = [...messages.slice(1), userMessage];
      for (const msg of historyMessages) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [{ text: systemInstruction }],
            },
            generationConfig: {
              temperature: 0.3,
              topP: 0.8,
              topK: 40,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response. Please try again.";

      setMessages((prev) => [...prev, { role: 'assistant', content: aiText }]);
    } catch (err) {
      console.error('AI Helper error:', err);
      if (err.message.includes('API_KEY_INVALID') || err.message.includes('401')) {
        setError('Invalid API key. Please check REACT_APP_GOOGLE_API_KEY in the .env file.');
      } else {
        setError(err.message || 'Failed to get response. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Chat cleared! How can I help you with Trinity documentation?',
      },
    ]);
    setError(null);
  };

  const suggestedQuestions = [
    'How does the 7-step flow work?',
    'What are the security vulnerabilities?',
    'Explain the MCP integration',
    'What is the tech stack?',
  ];

  const currentModelLabel =
    GEMINI_MODELS.find((m) => m.id === selectedModel)?.label || 'Select Model';

  return (
    <>
      {/* Floating trigger button */}
      <button
        className={`${styles.triggerButton} ${isOpen ? styles.triggerHidden : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
        title="Ask Trinity AI"
      >
        <span className={styles.triggerIcon}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </span>
        <span className={styles.triggerLabel}>AI Assistant</span>
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className={styles.chatPanel}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderLeft}>
              <div className={styles.headerIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              </div>
              <div>
                <h3 className={styles.chatTitle}>Trinity AI</h3>
                <span className={styles.chatSubtitle}>
                  {indexStatus === 'ready'
                    ? `${docsIndex.length} doc chunks indexed`
                    : indexStatus === 'loading'
                    ? 'Loading docs...'
                    : 'Index unavailable'}
                </span>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.headerBtn} onClick={clearChat} title="Clear chat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
              <button className={styles.headerBtn} onClick={() => setIsOpen(false)} title="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Model Picker Bar */}
          <div className={styles.modelBar}>
            <button
              className={styles.modelPickerBtn}
              onClick={() => setShowModelPicker(!showModelPicker)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>{currentModelLabel}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={showModelPicker ? styles.chevronUp : ''}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {showModelPicker && (
              <div className={styles.modelDropdown}>
                {GEMINI_MODELS.map((m) => (
                  <button
                    key={m.id}
                    className={`${styles.modelOption} ${selectedModel === m.id ? styles.modelOptionActive : ''}`}
                    onClick={() => saveModel(m.id)}
                  >
                    <span className={styles.modelOptionDot} />
                    {m.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${
                  msg.role === 'user' ? styles.userMessage : styles.assistantMessage
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className={styles.messageAvatar}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                  </div>
                )}
                <div className={styles.messageContent}>
                  <MarkdownRenderer text={msg.content} />
                </div>
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <div className={styles.messageAvatar}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                </div>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            {error && <div className={styles.errorBanner}>{error}</div>}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {messages.length <= 1 && !isLoading && (
            <div className={styles.suggestions}>
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  className={styles.suggestionBtn}
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => {
                      inputRef.current?.form?.requestSubmit();
                    }, 50);
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form className={styles.inputForm} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className={styles.chatInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={indexStatus === 'ready' ? 'Ask about Trinity docs...' : 'Loading docs index...'}
              disabled={isLoading || indexStatus !== 'ready'}
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={isLoading || !input.trim() || indexStatus !== 'ready'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
