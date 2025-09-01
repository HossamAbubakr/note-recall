import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { SYSTEM_TEMPLATE } from "./promptTemplates";

const model = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", SYSTEM_TEMPLATE],
  ["human", "{input}"],
]);

export async function processMessageWithContext(
  message: string,
  conversationHistory?: Array<{ role: string; content: string }>
) {
  let fullPrompt: string;

  if (conversationHistory && conversationHistory.length > 0) {
    const historyText = conversationHistory
      .slice(-6)
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    fullPrompt = `Previous conversation context:\n${historyText}\n\nCurrent message: ${message}`;
  } else {
    fullPrompt = message;
  }

  const formattedPrompt = await prompt.format({ input: fullPrompt });
  const response = await model.invoke(formattedPrompt);
  return response.content.toString();
}
