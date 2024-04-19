const apiUrl = 'https://api.openchatkit.com/chat';
const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key

async function askAI(question, turn = 1) {
  if (turn > 5) {
    console.log('Conversation limit reached.');
    return;
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query: question,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  console.log(`AI response (Turn ${turn}):`, data);

  if (data.type === 'message') {
    const followUpQuestion = await promptUserForQuestion(data.text);
    if (followUpQuestion) {
      await askAI(followUpQuestion, turn + 1);
    }
  } else {
    console.log('Conversation ended.');
  }
}

// Helper function to prompt the user for a follow-up question
function promptUserForQuestion(aiResponse) {
  console.log(`AI says: ${aiResponse}`);
  const userQuestion = prompt('Enter your follow-up question (or press Enter to end conversation):');
  return userQuestion.trim() === '' ? null : userQuestion;
}

// Example usage:
const initialQuestion = 'What is the capital of France?';
askAI(initialQuestion);