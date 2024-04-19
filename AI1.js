const apiUrl = 'https://api.openchatkit.com/chat';
const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const maxTurns = 5; // Maximum number of turns in the conversation

async function askAI(question) {
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
  return data;
}

async function converseWithAI(question, turn = 1) {
  if (turn > maxTurns) {
    console.log('Maximum number of turns reached. Ending conversation.');
    return;
  }

  console.log(`Turn ${turn}:`);
  const response = await askAI(question);
  console.log('AI Response:', response.result.answer);

  const followUpQuestion = await getFollowUpQuestion(response.result.answer);
  if (followUpQuestion) {
    console.log('Your turn:');
    converseWithAI(followUpQuestion, turn + 1);
  } else {
    console.log('End of conversation.');
  }
}

// Example usage:
const startingQuestion = 'What is the capital of France?';
converseWithAI(startingQuestion);

// Helper function to get follow-up question
async function getFollowUpQuestion(answer) {
  const userInput = await getUserInput();
  if (userInput) {
    return userInput;
  } else {
    return null;
  }
}

// Helper function to get user input
function getUserInput() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.question('> ', (answer) => {
      readline.close();
      resolve(answer);
    });
  });
}