import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  
  const context=`we have two main entry gate in CEG
1)Kotturpuram entry
2)main gate entry
timing of the college 
8:30 am to 4:30pm 
class timing are strictly from 8:30am to 4:30 pm`
//TODO TASK 1
  const systemPrompt = `You are a security person for CEG guindy,you need to stop people and ask why if the perosn to enter out;
${context}`;
  const result = streamText({
    model: google('gemini-2.5-flash'),
     system: systemPrompt,
    messages: await convertToModelMessages(messages),

    //TODO TASK 2 - Tool Calling
    // tools,            // Uncomment to enable tool calling
    // maxSteps: 5,      // Allow multi-step tool use (model calls tool → gets result → responds)
  });

  return result.toUIMessageStreamResponse();
}
