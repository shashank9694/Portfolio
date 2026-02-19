
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function enhancePortfolioContent(currentTitle: string, currentAbout: string): Promise<{ title: string, about: string }> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a world-class Blockchain Developer advocate and copywriter. Based on the following current title: "${currentTitle}" and about section: "${currentAbout}", generate a more premium, technical, and high-authority version. Use terminology like "Immutable", "Trustless", "Scalability", "EVM", "Smart Contract Security". Keep it punchy and professional for a high-level engineer. Return as JSON with keys 'title' and 'about'.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      title: result.title || currentTitle,
      about: result.about || currentAbout
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { title: currentTitle, about: currentAbout };
  }
}
