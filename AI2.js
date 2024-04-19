const apiUrl = 'https://api.openchatkit.com/chat';

async function askAI(question) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: question,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}

// Example usage:
const question = 'What is the capital of France?';
askAI(question)
  .then(data => {
    console.log('AI response:', data);
  })
  .catch(error => {
    console.error('Error asking AI:', error);
  });