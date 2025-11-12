/*
  AI chat frontend (client-side OpenAI calls)
  WARNING: This file includes a placeholder for the OpenAI API key and performs requests from the browser.
  Placing a secret API key in client-side code is insecure and will expose the key to anyone who inspects the site.
  Use this client-side approach only if you understand and accept the risk. For production, proxy requests through a backend.
*/

// Replace the value below with your OpenAI API key if you accept the security tradeoff.
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';
const MODEL = 'gpt-3.5-turbo';

// UI elements
const chatBtn = document.getElementById('ai-chat-launch-btn');
const chatPanel = document.getElementById('ai-chat-assist');
const chatClose = document.getElementById('ai-chat-close');
const chatBody = document.getElementById('ai-chat-body');
const chatInput = document.getElementById('ai-chat-input');
const chatForm = document.getElementById('ai-chat-input-area');
const chatSend = document.getElementById('ai-chat-send');

function openChat() { chatPanel.style.display = 'flex'; chatBtn.style.display = 'none'; chatInput.focus(); }
function closeChat() { chatPanel.style.display = 'none'; chatBtn.style.display = 'flex'; }
chatBtn.addEventListener('click', openChat);
chatClose.addEventListener('click', closeChat);

function appendMessage(role, text) {
  const cls = role === 'user' ? 'user' : 'bot';
  const avatar = role === 'user' ? '<i class="fa fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';
  const wrapper = document.createElement('div');
  wrapper.className = `ai-chat-msg ${cls}`;
  wrapper.innerHTML = `
    <div class="ai-chat-avatar">${avatar}</div>
    <div class="ai-chat-text"></div>
  `;
  wrapper.querySelector('.ai-chat-text').textContent = text;
  chatBody.appendChild(wrapper);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function setSending(isSending) {
  chatSend.disabled = isSending;
}

async function sendToOpenAI(prompt) {
  const systemMessage = {
    role: 'system',
    content: 'You are a helpful assistant for the Rechain Global website. Answer questions about features, pricing, integrations, and booking demos. If a user asks for sensitive or account-specific info, ask them to contact support.'
  };
  const userMessage = { role: 'user', content: prompt };

  const body = {
    model: MODEL,
    messages: [systemMessage, userMessage],
    max_tokens: 600,
    temperature: 0.2
  };

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error('OpenAI error: ' + text);
  }

  const data = await res.json();
  const reply = data?.choices?.[0]?.message?.content?.trim();
  return reply || "I'm sorry — I couldn't generate a reply.";
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = chatInput.value.trim();
  if (!msg) return;
  appendMessage('user', msg);
  chatInput.value = '';
  setSending(true);
  // Temporary typing indicator
  const typingEl = document.createElement('div');
  typingEl.className = 'ai-chat-msg bot';
  typingEl.innerHTML = `
    <div class="ai-chat-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="ai-chat-text">Typing...</div>
  `;
  chatBody.appendChild(typingEl);
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    if (!OPENAI_API_KEY || OPENAI_API_KEY === 'YOUR_OPENAI_API_KEY_HERE') {
      // If placeholder key is present, show a clear message to the user in the UI
      typingEl.querySelector('.ai-chat-text').textContent = "No API key provided. Please set OPENAI_API_KEY in ai.js (client-side key - insecure).";
      setSending(false);
      return;
    }
    const reply = await sendToOpenAI(msg);
    // remove typing
    chatBody.removeChild(typingEl);
    appendMessage('bot', reply);
  } catch (err) {
    console.error(err);
    typingEl.querySelector('.ai-chat-text').textContent = 'Error: ' + err.message;
  } finally {
    setSending(false);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});

// Optional: open chat if user types '?' in page
window.addEventListener('keydown', (e) => {
  if (e.key === '?') openChat();
});

// Ensure demo modal logic still works if present
try {
  const showDemoModal = () => { document.getElementById('demo-modal').style.display = 'flex'; document.getElementById('book-demo-form').style.display = 'block'; document.getElementById('demo-success').style.display = 'none'; };
  const closeDemoModal = () => { document.getElementById('demo-modal').style.display = 'none'; };
  document.getElementById('book-demo-btn').onclick = showDemoModal;
  document.getElementById('book-demo-btn-hero').onclick = showDemoModal;
  document.getElementById('footer-book-demo').onclick = showDemoModal;
  document.getElementById('close-demo-modal').onclick = closeDemoModal;
  document.getElementById('demo-modal').onclick = function(e) { if (e.target === this) closeDemoModal(); };
  document.getElementById('book-demo-form').onsubmit = async function(e) {
    e.preventDefault();
    const name = document.getElementById('demo-name').value;
    const email = document.getElementById('demo-email').value;
    const company = document.getElementById('demo-company').value;
    const message = document.getElementById('demo-message').value;
    const endpoint = 'https://formspree.io/f/xkgvorva';
    const payload = { name, email, company, message, _replyto: email, _subject: 'Book a Demo Request from Rechain Global Website' };
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) { document.getElementById('book-demo-form').style.display = 'none'; document.getElementById('demo-success').style.display = 'block'; setTimeout(() => { closeDemoModal(); }, 3000); } else { alert('Sorry, there was a problem submitting your request. Please try again later or email joel@rechainglobal.com directly.'); }
    } catch (err) { alert('Network error. Please try again or email joel@rechainglobal.com directly.'); }
  };
} catch (err) { /* ignore if elements missing */ }