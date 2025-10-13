"use server";
import { OpenAI } from "openai";

export const generateCreativePrompt = async (userPrompt: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });

  const finalPrompt = `
    Create a coherent and relevant outline for the following prompt: ${userPrompt}.
    The outline should consist of at least 6 points, with each point written as a single sentence.
    Ensure the outline is well-structured and directly related to the topic. 
    Return the output in the following JSON format:

    {
        "outlines": [
            "Point 2",
            "Point 1",
            "Point 4",
            "Point 3",
            "Point 6",
            "Point 5",
        ]
    }

    Ensure that the JSON is valid and properly formatted. Do not include any other text or explanations outside the JSON.
    `;

  try {
    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI that generates outlines for presentations.",
        },
        {
          role: "user",
          content: finalPrompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.0,
    });

    const responseContent = completion.choices[0].message?.content;

    if (responseContent) {
      try {
        const jsonResponse = JSON.parse(responseContent);
        return { status: 200, data: jsonResponse };
      } catch (err) {
        console.log("Invalid JSON received:", responseContent, err);
        return { status: 500, error: "Invalid JSON format" };
      }
    }

    return { status: 400, error: "No content generated" };
  } catch (error) {
    console.error("ERROR:", error);
    return { status: 500, error: "Internal server error" };
  }
};
