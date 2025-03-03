import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable.
const genAI = new GoogleGenerativeAI("AIzaSyBKlXZAY4Q8q_H-7-EcE5sToy67GSr8Qzk");

async function run() {
    // Choose a model that's appropriate for your use case.
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { maxOutputTokens: 100, temperature: 0.9 },
    });

    const prompt = "what is game of thrones?";

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text);
}

run();