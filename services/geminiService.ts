
import { GoogleGenAI } from "@google/genai";
import { Campaign, Language } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Fix: Directly use process.env.API_KEY for initialization as per guidelines.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateThankYouLetter(campaign: Campaign, amount: number, donorName: string, lang: Language): Promise<string> {
    const campaignTitle = campaign.title[lang];
    const prompt = `Write a short, deeply heartfelt thank-you letter to a donor named ${donorName} who just contributed $${amount} to the neighborhood project "${campaignTitle}". 
    The response must be strictly in ${lang === 'ar' ? 'Arabic' : lang === 'fr' ? 'French' : 'English'}.
    Keep it under 100 words. Focus on the value of neighborhood unity and community spirit.`;
    
    try {
      // Fix: Use ai.models.generateContent directly with model name and contents.
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      // Fix: Access the text property directly on the GenerateContentResponse object.
      return response.text || "Thank you for being a great neighbor!";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Thank you for your generous support of our community!";
    }
  }
}

export const geminiService = new GeminiService();
