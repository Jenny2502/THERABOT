const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/chat', async (req, res) => {
  const message = req.query.message;

  // Send the user's message to the ChatGPT API
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
      max_tokens: 500,
      temperature: 0.6,
      model: 'gpt-3.5-turbo',
    }, {
      headers: {
        'Authorization': 'Bearer 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' 
      }
    });

  res.send(response.data.choices[0].message.content);
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});

app.get('/faq', (req, res) => {
  res.sendFile(__dirname + '/public/faq.html');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
