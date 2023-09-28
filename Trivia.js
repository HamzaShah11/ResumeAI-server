

const axios = require('axios');
const OpenAI = require('openai');
const express = require('express');
const app = express();

const categories = [
    'music',
    'film_and_tv',
    'geography',
    'food_and_drink',
    'general_knowledge',
];

const difficulties = ['easy', 'medium', 'hard'];
const selectedCategory = "film_and_tv"
const selectedDifficulty = 'easy'

const fetchTrivia = async () => {
    var array = []
    var array2 = []
    try {
        var iamges = await fetchTriviaQuestionsWithImages();
        var questions = await fetchTriviaQuestions();

        array.push({
            iamges: iamges,
            questions: questions
        })
        for (let i = 0; i < array.length; i++) {
            if (i % 2 == 0) {
                array2[i] = array[0].iamges[i]
            } else {
                array2[i] = array[0].questions[i]
            }

        }
        // return array2;
        // console.log("iamgesssss", array[0].iamges[1]);
        // console.log("quetionsss", array[0].questions[1]);
        console.log(array2[0].iamges[1]);

    } catch (er) {
        console.log(er);
    }
}

const fetchTriviaQuestionsWithImages = async () => {
    console.log("images");
    try {
        const API_URL = `https://the-trivia-api.com/v2/questions?types=image_choice&categories=${selectedCategory}`;
        const response = await axios.get(API_URL);
        const triviaData = response.data;

        return triviaData
    } catch {
        console.error('Error fetching trivia questions:', error.message);

    }
}
const fetchTriviaQuestions = async () => {
    console.log("questions");
    try {
        const API_URL = `https://the-trivia-api.com/api/questions?limit=10&categories=${selectedCategory}&difficulty=${selectedDifficulty}`;
        const response = await axios.get(API_URL);
        const triviaData = response.data;

        return triviaData
    } catch {
        console.error('Error fetching trivia questions:', error.message);

    }
}

// app.get(`/trivia`, (req, res) => {
//     try {
//         fetchTrivia().then((resp) => {
//             res.send(resp)
//         })
//     } catch (err) {
//         res.send(err)
//     }
// })
// app.listen(3000, (res) => {
//     console.log(`Server is running on port 3000`);
// })

fetchTrivia()

