import Groq from "groq-sdk";
import { SIRAJ_CONTEXT } from "./sirajContext";

const API_KEYS = [
  import.meta.env.VITE_GROQ_KEY_1,
  import.meta.env.VITE_GROQ_KEY_2,
  import.meta.env.VITE_GROQ_KEY_3,
  import.meta.env.VITE_GROQ_KEY_4,
].filter(Boolean);

if (API_KEYS.length === 0) {
  console.error(" No Groq API keys found in .env — check VITE_GROQ_KEY_*");
}


const clients = API_KEYS.map(
  (key) =>
    new Groq({
      apiKey: key,
      dangerouslyAllowBrowser: true,
    })
);


const failedKeys = new Set();
let currentKeyIndex = 0;


function shouldSwitchKey(error) {
  if (!error) return false;

  const status = error?.status || error?.response?.status;
  const message = String(error?.message || "").toLowerCase();

  if (status === 429) return true;
  if (message.includes("quota")) return true;
  if (message.includes("rate limit")) return true;
  if (message.includes("exceeded")) return true;

  if (status === 401) return true;
  if (status === 403) return true;
  if (message.includes("invalid api key")) return true;
  if (message.includes("unauthorized")) return true;
  if (message.includes("api key not valid")) return true;

  if (status === 402) return true;

  
  if (status === 400 || status === 404) return false;

  return false;
}


function getNextAvailableIndex() {
  const total = API_KEYS.length;

  for (let i = 1; i <= total; i++) {
    const nextIdx = (currentKeyIndex + i) % total;
    if (!failedKeys.has(nextIdx)) return nextIdx;
  }

  console.warn("All Groq keys failed. Resetting failure state.");
  failedKeys.clear();
  return currentKeyIndex;
}


export async function askSirajAI(userMessages, retryCount = 0) {
  const MAX_RETRIES = API_KEYS.length * 2;

  if (API_KEYS.length === 0) {
    throw new Error(
      "No Groq API keys configured. Add VITE_GROQ_KEY_1..4 to .env"
    );
  }

  if (retryCount >= MAX_RETRIES) {
    throw new Error("All API keys exhausted. Please try again later.");
  }

  const client = clients[currentKeyIndex];
  const keyNumber = currentKeyIndex + 1;

  try {
    const completion = await client.chat.completions.create({
      model: "openai/gpt-oss-120b", 
      temperature: 0.3,
      max_tokens: 800,
      messages: [
        { role: "system", content: SIRAJ_CONTEXT },
        ...userMessages,
      ],
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) throw new Error("Empty response from Groq");

    failedKeys.delete(currentKeyIndex);
    return reply;
  } catch (error) {
    const status = error?.status || error?.response?.status;
    const message = error?.message || "unknown";
    console.error(`Groq error on key #${keyNumber}:`, status, message);

    if (shouldSwitchKey(error)) {
      failedKeys.add(currentKeyIndex);
      const nextIdx = getNextAvailableIndex();
      if (nextIdx !== currentKeyIndex) {
        console.warn(`Switching key #${keyNumber} → #${nextIdx + 1}`);
        currentKeyIndex = nextIdx;
      }
      await new Promise((r) => setTimeout(r, 300));
      return askSirajAI(userMessages, retryCount + 1);
    }

    throw error;
  }
}

export function getKeyStatus() {
  return {
    total: API_KEYS.length,
    current: currentKeyIndex + 1,
    failed: Array.from(failedKeys).map((i) => i + 1),
    available: API_KEYS.length - failedKeys.size,
  };
}

export function resetKeys() {
  failedKeys.clear();
  currentKeyIndex = 0;
}