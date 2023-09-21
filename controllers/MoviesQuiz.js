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
    try {
        let receivedData = '';
        for await (const chunk of stream) {
            if (chunk.object === 'chat.completion.chunk') {
                receivedData += chunk.choices[0].delta.content;
            }
        }
        return receivedData;
    } catch (err) {
        return err;
    }
}

async function generateChat(category, subCategory) {
    console.log('Calling OpenAI chat completion...');
    try {
        const stream = await openaiInstance.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: ` Generate 10 questions about "${category} of ${subCategory}. All questions should be unique.
        Please follow the insturctions given bellow and genrate accordingly.
        Instructions:
                  A) 4 questions should be from the stories of the movies, In these questions Keyword should be movie name.
                  B) 3 questions should be about the main characters of the movies, In these questions Keyword should be Character name.
                  C) 2 questions should be Genre of the movies, In these questions Keyword should be movie name.
                  D) 1 question should be related to award of the movie, In these questions Keyword should award with award name.
                  E) Questions should have MCSQ'S with 1 correct option. do not mention alphabetical bullets 
                  F) Generate short options and its length should be less then 10 words.
                  G) Also the description of 7-8 lines and also why the option is correct.
        Return the responce in the format defined below
        "{
          "questions": {
              "category": "movies",
              "questions": [
                  {
                      "question": "question'?",
                      "options": [
                          "option1" this is index 1 of options array.  
                        "option2" this is index 2 of options array 
                         "option3" this is index 3 of options array 
                          "option4" this is index 4 of options array 
                      ],
                      "keyword": "keyword",
                      "answer": "correct option full",
                      "description": "description'.",
                  }
              ]
          }
      }"`,
                },
            ],
            stream: true,
        });

        receivedString = await processStream(stream);
        const startIndex = receivedString.indexOf('{');
        const endIndex = receivedString.lastIndexOf('}');
        const jsonResponse = receivedString.substring(startIndex, endIndex + 1);
        return jsonResponse;

    } catch (err) {
        return err;
    }
}
async function gifsApi(prompt) {
    try {

        const searchQuery = prompt;

        const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
            params: {
                q: searchQuery,
                api_key: process.env.GIPHY_API_KEY,
                limit: 1,
            },
        });
        var abc = [];
        var gifsData = response.data.data;
        gifsData.forEach((gif) => {
            abc = gif.images.fixed_height.url;
        });
        return abc

    } catch (error) {
        return error

    }
}
var parsedQuest;


router.post('/startquiz', async (req, res) => {

    try {
        console.log(
            req.body
        );
        const cate = req.body.mainCategory;
        const subcategory = req.body.subCategory
        // const { mainCategory, subCategory } = req.body;

        const quest = await generateChat(cate, subcategory);
        parsedQuest = JSON.parse(quest);
        for (let i = 0; i < parsedQuest.questions.questions.length; i++) {
            console.log(`---------------------------${i}---------------------`);
            console.log("(keyword", parsedQuest.questions.questions[i].keyword);
            console.log("(Questions", parsedQuest.questions.questions);
            const image = await gifsApi(parsedQuest.questions.questions[i].keyword);
            parsedQuest.questions.questions[i].image = image;
            console.log(`---------------------------${i}---------------------`);
        }
        res.status(200).json({
            message: "success",
            questions: parsedQuest
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error, Please Try Again",
            error: error
        })
    }

});
router.get("/questions", async (req, res) => {
    try {

        if (parsedQuest) {
            res.status(200).json({
                ans: parsedQuest
            })
        } else {
            res.status(204).json({
                message: "No questions avaliable"
            })
        }

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;