
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBirthdayWish = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topK: 40,
        topP: 0.9,
      }
    });
    
    return response.text || "Happy Birthday Khushi! May your day be as amazing as you are!";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Happy Birthday Khushi! Wishing you a world of happiness today!";
  }
};
