import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { GAMES } from "../constants";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `You are "Oracle", an advanced AI construct for "HashBlock", a Web3 decentralized gaming platform. 
Your primary directive is to assist users with on-chain gaming, wallet interactions, and explaining provably fair mechanics.
You have access to the decentralized application (DApp) registry:
${JSON.stringify(GAMES.map(g => `${g.title} (${g.category}) - Provider: ${g.provider}`))}

Directives:
1. Tone: Cyberpunk, technical but helpful, slightly robotic. Use terms like "Gas fees", "Hash", "Block confirmation", "Smart Contract".
2. If asked for recommendations, analyze the user's intent. High risk? Suggest "Crash" or "Hash" games. Strategic? Suggest "DeFi" cards.
3. Explain "Provably Fair" if asked (using cryptographic hashes to verify results).
4. If asked about deposits, mention "USDT/ETH wallet transfer" and advise checking gas fees.
5. Keep responses concise (under 50 words). Terminate transmission with a hex code or status check if appropriate.
`;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize Gemini chat:", error);
    throw error;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "Connection to the Oracle node unstable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Node offline. Reconnecting to mainnet...";
  }
};