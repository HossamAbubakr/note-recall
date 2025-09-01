import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const NOTE_DETECTION_TEMPLATE = `
You are an AI assistant that helps determine if a user's message contains a request or intent to save a note.

User message: {message}

**Instructions:**
- Look for keywords like "save", "note", "remember", "store", "keep", "write down", "document"
- Look for phrases like "save this", "save as note", "remember this", "write this down"
- Look for requests to save information, lists, tips, or any content for future reference
- Consider context - if someone asks for information and wants to save it, that's a note request

**Examples of note requests:**
- "Save the benefits of exercise as a note"
- "Remember this recipe"
- "Write down these tips"
- "Save this conversation"
- "Keep this information"
- "Document these steps"

**Examples of non-note requests:**
- "What are the benefits of exercise?" (just asking for information)
- "How do I cook pasta?" (just asking a question)
- "Hello" (greeting)

Does this message indicate a request or intent to save a note? 
Respond with just 'true' or 'false'.
`;

const model = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0,
});

const prompt = PromptTemplate.fromTemplate(NOTE_DETECTION_TEMPLATE);

export async function detectNoteIntent(message: string): Promise<boolean> {
  const formattedPrompt = await prompt.format({ message });
  const response = await model.invoke(formattedPrompt);
  return response.content.toString().trim().toLowerCase() === "true";
}
