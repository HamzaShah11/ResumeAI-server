require('dotenv').config();
const express = require('express');
const router = express();
const OpenAI = require('openai');
const axios = require('axios');


const openaiInstance = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

let receivedString = "";

async function processStream(stream) {
    let receivedData = '';
    for await (const chunk of stream) {
        if (chunk.object === 'chat.completion.chunk') {
            receivedData += chunk.choices[0].delta.content;
        }
    }
    return receivedData;
}

async function generateChat(category, subCategory) {
    console.log('Calling OpenAI chat completion...');


    const stream = await openaiInstance.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: `First dont generate previously asked question again.
          Generate 10 questions about "${category} of ${subCategory}. 
          All questions should be unique dont generate the same question again ever.
         Please follow the insturctions given bellow and genrate accordingly.
        Instructions:
                  A) 3 questions should be about  different ${subCategory} players, data before 2022 only, For these questions Keyword should be fifa tv winners fifa world cup .
                  B) 3 questions should be about different ${subCategory} rules, if any question relates to the offside,offside flag,offside position,offside then keyword should be offside flag.
                  C) 2 questions should be about different ${subCategory} worldcup wining trophy, For these questions Keyword should be country flags.
                  D) 1 question should be about different ${subCategory} penalty, For these questions Keyword should be penalty 2d.
                  E) 1 question should be about different  ${subCategory} stadium, For these questions Keyword should be big football grounds
                  F) Questions should have MCSQ'S with 1 correct option.
                  G) Also the detailed description of why the option is correct. 
        Return the responce in the format defined below
        "{
          "questions": {
              "category": "sports",
              "questions": [
                  {
                      "question": "question'?",
                      "options": [
                          "options",
                          "options",
                          "options",
                          "options"
                      ],
                      "keyword": "keyword",
                      "answer": "answer",
                      "description": "description'.",
                  }
              ]
          }
      }"`,
            },
        ],
        stream: true,
    });
    console.log("1");
    receivedString = await processStream(stream);
    console.log("2");

    const startIndex = receivedString.indexOf('{');
    const endIndex = receivedString.lastIndexOf('}');
    const jsonResponse = receivedString.substring(startIndex, endIndex + 1);

    return jsonResponse;
}

async function gifsApi(prompt) {
    try {
        const API_KEY = '2RW0PgMHUEaVyf7CiNCo4lOOeefN9fzl';
        const searchQuery = prompt;

        const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
            params: {
                q: searchQuery,
                api_key: API_KEY,
                limit: 1,
            },
        });
        var abc = [];
        var gifsData = response.data.data;
        gifsData.forEach((gif) => {
            abc = gif.images.fixed_height.url;
        });
        return abc
        //res.send(abc)
    } catch (error) {
        return error
        console.error('Error fetching GIFs:', error);
    }
}
let parsedQuest = null;
router.post('/startquiz', async (req, res) => {
    const { cate, subcate } = req.body;
    const quest = await generateChat(cate, subcate);
    parsedQuest = JSON.parse(quest);

    const imageUrls = [];

    for (let i = 0; i < parsedQuest.questions.questions.length; i++) {
        try {
            console.log("(keuword", parsedQuest.questions.questions[i].keyword);
            const image = await gifsApi(parsedQuest.questions.questions[i].keyword);
            parsedQuest.questions.questions[i].image = image;
        } catch (error) {
            console.error("1 error", error);

        }
    }

    res.send({ questions: parsedQuest });
});



router.get("/questions", async (req, res) => {
    try {
        console.log("questions hit");

        if (parsedQuest) {

            res.send({ ans: parsedQuest });
        } else {

            res.send("No questions available");
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;



// // Start the server
// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });