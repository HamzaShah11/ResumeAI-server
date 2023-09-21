

// const express = require('express');
// const app = express();
// const cors = require('cors'); // Import the 'cors' middleware
// const OpenAI = require('openai');
// const fs = require('fs');
// const pdf = require('pdf-parse');
// const SerpApi = require('google-search-results-nodejs');
// const axios = require('axios');

// const apiUrl = 'https://api.openai.com/v1/images/generations';

// const apiKeydale = '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';

// // Set your OpenAI API key
// const apiKey = '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';
// const bodyParser = require('body-parser'); // Import bodyParser to parse JSON data
// app.use(bodyParser.json());
// app.use(cors());
// // Initialize OpenAI instance
// const openaiInstance = new OpenAI({
//   apiKey: apiKey,
// });

// // Specify the path to the PDF file


// let category = "";
// let receivedString = "";

// async function processStream(stream) {
//   let receivedData = '';
//   for await (const chunk of stream) {
//     if (chunk.object === 'chat.completion.chunk') {
//       receivedData += chunk.choices[0].delta.content;
//     }
//   }
//   return receivedData;
// }

// async function generateChat(category, subCategory) {
//   console.log('Calling OpenAI chat completion...');
//   //category = "sports"; // Set your desired category here
//   const stream = await openaiInstance.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'user',
//         content: `I want to make questions for quiz for different categories. Generate 10 questions about  "${category}" from "${subCategory}".
//          Each question should have four options. Also give one main keyword of each
//          question specific to given category and subcategory. Please also provide the correct answer with each question ,and also the
//          description of why the option is correct. Give the data in JSON format. As an example give the data in this type of
//          JSON formate so i can easily use it in frontend"{
//           "questions": {
//               "category": "movies",
//               "questions": [
//                   {
//                       "question": "question",
//                       "options": [
//                           "option A",
//                           "option B",
//                           "option C",
//                           "option D"
//                       ],
//                       "keyword": "Keyword",
//                       "answer": "answer",
//                       "description": "description",
//                   },

//               ]
//           }
//       }"`,
//       },
//     ],
//     stream: true,
//   });

//   // Process and receive data as a single string
//   receivedString = await processStream(stream);
//   // console.log('Received data:', receivedString);

//   // Extract JSON portion from the response
//   const startIndex = receivedString.indexOf('{');
//   const endIndex = receivedString.lastIndexOf('}');
//   const jsonResponse = receivedString.substring(startIndex, endIndex + 1);

//   return jsonResponse;
// }


// // const SerpApi = require('google-search-results-nodejs');
// const apiKeygg = "e56bf139ece33616de7232a0eae005f9a1960fbf69f56098fa2d9674678f807c";
// const search = new SerpApi.GoogleSearch(apiKeygg);

// // Function to generate images for a given person's name
// // async function generateImagesOfPerson(personName) {
// //   console.log("in generate image");
// //   const params = {
// //     q: `${personName} images`,
// //     tbm: "isch", // This parameter restricts the search to image results
// //     engine: "google_images"
// //   };

// //   return new Promise((resolve, reject) => {

// //     const callback = function (data) {
// //       const imageResults = data.images_results || [];
// //       const imageUrls = imageResults.map(result => result.original);
// //       if (imageUrls.length > 0) {
// //         resolve(imageUrls[0]); // Resolve with the first image URL
// //       } else {
// //         reject("No images found for this person."); // Reject if no images are found
// //       }
// //     };
// //     // Show result as JSON
// //     search.json(params, callback);
// //   });
// // }

// async function generateImageFromDale(prompt) {
//   return new Promise(async (resolve, reject) => {
//     let imag = "";
//     console.log("In dalle");

//     try {
//       const response = await axios.post(apiUrl, {
//         prompt: prompt,
//         model: 'image-alpha-001',
//         size: '256x256',
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apiKeydale}`
//         }
//       });
//       // console.log("response of image", response);
//       imag = response.data.data[0].url;
//       console.log("Here's the image URL:", imag);
//       resolve(imag);
//     } catch (error) {
//       console.error("Error:", error);
//       reject(error);
//     }
//   });
// }

// // Example usage:

// // Assume "app" is your Express.js app
// let parsedQuest = null;
// app.post('/startquiz', async (req, res) => {
//   const { cate, subcate } = req.body; // Get the "cate" property from the JSON request body
//   // const { subcate } = req.body; // Get the "cate" property from the JSON request body
//   console.log('Received category:', cate, subcate);

//   // Here, you can use the "cate" value to generate the quiz questions or perform other actions
//   const quest = await generateChat(cate, subcate); // Assuming generateChat returns a JSON string

//   // Parse the JSON string
//   parsedQuest = JSON.parse(quest);
//   console.log("first questions", parsedQuest);

//   // Define an array to store image URLs
//   const imageUrls = [];

//   // Loop through the questions and add the "image" field
//   for (let i = 0; i < parsedQuest.questions.questions.length; i++) {
//     try {
//       console.log("(keyword", parsedQuest.questions.questions[i].keyword);
//       const image = await generateImageFromDale(parsedQuest.questions.questions[i].keyword);
//       parsedQuest.questions.questions[i].image = image;
//     } catch (error) {
//       console.error("1 error", error);
//       // Handle the case where no images are found for a person
//       // You can either use a default image or handle this as per your requirements
//       // imageUrls.push("https://example.com/default-image.jpg");
//     }
//   }

//   // Assign image URLs to each question
//   // parsedQuest.questions.forEach((question, index) => {
//   //   question.image = imageUrls[index];
//   // });

//   console.log("answer is", parsedQuest);
//   res.send({ questions: parsedQuest });
// });



// // const prompt = 'iron man movie director';








// app.get("/questions", async (req, res) => {
//   // try {

//   // console.log("in questions");
//   // if (parsedQuest.questions[i].image) {

//   // }


//   res.send({ ans: parsedQuest })



//   // } catch (error) {

//   // }
// });



// // Start the server
// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const app = express();
const cors = require('cors'); // Import the 'cors' middleware
const OpenAI = require('openai');
const fs = require('fs');
const pdf = require('pdf-parse');
const SerpApi = require('google-search-results-nodejs');
const axios = require('axios');

const apiUrl = 'https://api.openai.com/v1/images/generations';

const apiKeydale = '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';

// Set your OpenAI API key
const apiKey = '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';
const bodyParser = require('body-parser'); // Import bodyParser to parse JSON data
app.use(bodyParser.json());
app.use(cors());
// Initialize OpenAI instance
const openaiInstance = new OpenAI({
    apiKey: apiKey,
});

// Specify the path to the PDF file


let category = "";
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
    if (category == "Movies") {
        const stream = await openaiInstance.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are helpful assistant that generate question'
                },
                {
                    role: 'user',
                    content: ` Generate 10 questions about "${category} of ${subCategory}. All questions should be unique.
        Please follow the insturctions given bellow and genrate accordingly.
        Instructions:
                  A) 4 questions should be from the stories of the movies, In these questions Keyword should be movie name.
                  B) 3 questions should be about the main characters of the movies, In these questions Keyword should be Character name.
                  C) 2 questions should be Genre of the movies, In these questions Keyword should be movie name.
                  D) 1 question should be related to award of the movie, In these questions Keyword should award with award name.
                  E) Questions should have MCSQ'S with 1 correct option.
                  F) Also the description of why the option is correct
        Return the responce in the format defined below
        "{
          "questions": {
              "category": "movies",
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
    } else if (category == "Sports") {
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
    } else if (category == "History") {
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
                  E) Questions should have MCSQ'S with 1 correct option.
                  F) Also the description of why the option is correct
        Return the responce in the format defined below
        "{
          "questions": {
              "category": "movies",
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
    }

}


// const SerpApi = require('google-search-results-nodejs');
const apiKeygg = "e56bf139ece33616de7232a0eae005f9a1960fbf69f56098fa2d9674678f807c";
const search = new SerpApi.GoogleSearch(apiKeygg);


async function generateImagesOfPerson(personName) {
    console.log("in generate image");
    const params = {
        q: `${personName} images`,
        tbm: "isch",
        engine: "google_images"
    };

    return new Promise((resolve, reject) => {

        const callback = function (data) {
            const imageResults = data.images_results || [];
            const imageUrls = imageResults.map(result => result.original);
            if (imageUrls.length > 0) {
                resolve(imageUrls[0]);
            } else {
                reject("No images found for this person.");
            }
        };

        search.json(params, callback);
    });
}

async function generateImageFromDale(prompt) {
    return new Promise(async (resolve, reject) => {
        let imag = "";
        console.log("In dalle");

        try {
            const response = await axios.post(apiUrl, {
                prompt: prompt,
                model: 'image-alpha-001',
                size: '256x256',
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKeydale}`
                }
            });

            imag = response.data.data[0].url;
            console.log("Here's the image URL:", imag);
            resolve(imag);
        } catch (error) {
            console.error("Error:", error);
            reject(error);
        }
    });
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
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});