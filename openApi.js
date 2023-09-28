

const express = require('express');
const app = express();
const OpenAI = require('openai');

const apiKey = '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';
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const openaiInstance = new OpenAI({
    apiKey: apiKey,
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
    // category = text; // Set your desired category here
    if (category == "Sports") {
        const stream = await openaiInstance.chat.completions.create({
            model: 'text-davinci-003',
            // model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `
          Generate 10 questions about ${subCategory}. 
          All questions should be unique dont generate the same question again ever.
         Please follow the insturctions given bellow and genrate accordingly.
        Instructions:
                  A) Generate questions about ${subCategory} FIFA World Cup, Positions,
                   Clubs, World Records, Women's Football, Rules ,  Tournaments,  Records,
                    Football Basics, Football Legends , data before 2022 only,
                   For these questions Keyword should according to the question .
                  B) Questions should have MCSQ'S with 1 correct option.
                  C) Also the detailed description of why the option is correct. 
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
app.post('/startquiz', async (req, res) => {
    console.log("abc");
    console.log("qasim", req.body);

    const category = req.body.mainCategory
    const subcategory = req.body.subCategory

    const quest = await generateChat(category, subcategory);
    parsedQuest = JSON.parse(quest);

    const imageUrls = [];

    for (let i = 0; i < parsedQuest.questions.questions.length; i++) {
        try {
            console.log(`---------------------------${i}---------------------`);
            console.log("(keuword", parsedQuest.questions.questions[i].keyword);
            console.log("(Questions", parsedQuest.questions.questions);
            const image = await gifsApi(parsedQuest.questions.questions[i].keyword);
            parsedQuest.questions.questions[i].image = image;
            console.log(`---------------------------${i}---------------------`);
        } catch (error) {
            console.error("1 error", error);

        }
    }

    res.send({ questions: parsedQuest });
});



app.get("/questions", async (req, res) => {
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




// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







// const axios = require('axios');
// const OpenAI = require('openai');
// const express = require('express');
// const app = express();
// const key = "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"
// const openaiInstance = new OpenAI({
//     apiKey: key,
// });
// const categories = [
//     'music',
//     'film_and_tv',
//     'geography',
//     'food_and_drink',
//     'general_knowledge',
// ];
// const difficulties = ['easy', 'medium', 'hard'];
// const selectedCategory = "film_and_tv"
// const selectedDifficulty = 'easy'
// const fetchTriviaQuestions = async () => {
//     console.log("trivia fun called");
//     var array = []
//     try {
//         const triviaApiUrl = `https://the-trivia-api.com/api/questions?limit=10&categories=${selectedCategory}&difficulty=${selectedDifficulty}`;
//         const response = await axios.get(triviaApiUrl);
//         //console.log(response.data);

//         for (const item of response.data) {
//             const question = item.question;
//             await generateKeywords(question).then((res) => {
//                 console.log(res);
//                 array.push({
//                     "data": { data: response.data, keyword: res },
//                     // "keyword": res
//                 })
//             }).catch((err) => {
//                 console.log(err);
//             })
//         }
//         console.log("latest arrat");
//         return array
//     } catch (error) {
//         console.error('Error fetching trivia questions:', error.message);
//     }
// };
// async function generateKeywords(question) {
//     console.log('Calling OpenAI chat completion...', question);
//     try {
//         const stream = await openaiInstance.chat.completions.create({
//             model: 'gpt-3.5-turbo',
//             messages: [
//                 {
//                     role: 'user',
//                     content: `please read these ${question} and then extract a keyword not more then 3 words from question and provide json response"
//                     question : ${question},
//                     keywords:  keyword`,
//                 },
//             ],
//             stream: true,
//         });
//         receivedString = await processStream(stream);
//         // console.log(receivedString);
//         const parsedResponse = JSON.parse(receivedString);
//         return parsedResponse;
//     } catch (err) {
//         console.error('Error generating keywords:', err);
//         return '';
//     }
// }
// // Rest of your code...
// async function processStream(stream) {
//     try {
//         let receivedData = '';
//         for await (const chunk of stream) {
//             if (chunk.object === 'chat.completion.chunk') {
//                 receivedData += chunk.choices[0].delta.content;
//             }
//         }
//         return receivedData;
//     } catch (err) {
//         return err;
//     }
// }
// app.get('/trivia', function (req, res) {
//     try {
//         fetchTriviaQuestions().then((response) => {
//             res.send(response)
//         })
//     } catch (err) { console.log(er); }
// })
// app.listen(3000, (res) => {
//     console.log("server listening on port 3000");
// })


