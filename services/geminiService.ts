
import { GoogleGenAI, Type, Modality } from "@google/genai";

export const getGeminiChatResponse = async (
  message: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[]
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [...history, { role: 'user', parts: [{ text: message }] }],
    config: {
      systemInstruction: `Vous êtes l'assistant spirituel de l'église "Le Tabernacle de la Foi". 
      Votre mission est d'accompagner les fidèles avec amour, sagesse biblique et empathie. 
      Répondez aux questions sur la foi, proposez des prières et guidez les membres dans leur vie chrétienne au sein du Tabernacle.`,
      thinkingConfig: { thinkingBudget: 32768 }
    },
  });
  return response.text || "La connexion spirituelle est momentanément interrompue.";
};

export const getBibleChapterText = async (book: string, chapter: number): Promise<{verses: {number: number, text: string}[]}> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Donne-moi le texte intégral du chapitre ${chapter} du livre de ${book} dans la version Louis Segond. Réponds uniquement en JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verses: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                number: { type: Type.INTEGER },
                text: { type: Type.STRING }
              },
              required: ["number", "text"]
            }
          }
        },
        required: ["verses"]
      }
    }
  });
  return JSON.parse(response.text || '{"verses": []}');
};

export const getBibleAudio = async (text: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Lis ce texte biblique solennellement : ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
};

export const getChapterExplanation = async (book: string, chapter: number): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Donne une explication théologique et pratique courte du chapitre ${chapter} de ${book} pour un fidèle du Tabernacle de la Foi.`,
  });
  return response.text || "Que l'Esprit de vérité vous éclaire.";
};

export const generateMeditation = async (verse: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Donne une méditation courte (2-3 lignes) pour ce verset : ${verse}. Soyez encourageant.`,
  });
  return response.text || "Que la paix de Dieu soit votre partage.";
};

export const getQuizQuestion = async (difficulty: string): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Génère une question de quiz biblique captivante de niveau ${difficulty} pour les fidèles de l'église "Le Tabernacle de la Foi". 
    La question doit porter sur des faits bibliques, des personnages ou des enseignements profonds. 
    L'explication doit être riche en sagesse spirituelle. Réponds uniquement au format JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING, description: "La question posée." },
          options: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Quatre options de réponse."
          },
          correctAnswer: { 
            type: Type.INTEGER, 
            description: "L'index de la bonne réponse (0-3)."
          },
          explanation: { 
            type: Type.STRING, 
            description: "Une méditation théologique expliquant pourquoi c'est la bonne réponse."
          }
        },
        required: ["question", "options", "correctAnswer", "explanation"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

export const generatePhotoCaption = async (description: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Génère une légende spirituelle et poétique pour cette photo du Tabernacle de la Foi : ${description}`,
  });
  return response.text?.trim() || "Un instant de foi gravé dans la lumière.";
};
