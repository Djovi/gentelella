const response = await fetch('https://agent.tinyfish.ai/v1/automation/run-sse', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.TINYFISH_API_KEY!,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://rechainglobal.com',
    goal: 'Navigate to the website\'s API documentation page, extract all available service endpoints, authentication methods, and request/response schemas. Use the extracted information to construct API calls that can programmatically restart services and enable AI-driven automation across the platform. Return the endpoint details and sample request payloads in a structured format.\n\nInput Parameters:\n{\n  "url": "https://rechainglobal.com"\n}',
  }),
});

const reader = response.body?.getReader();
if (!reader) throw new Error('Missing response body');

const decoder = new TextDecoder();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(decoder.decode(value));
}