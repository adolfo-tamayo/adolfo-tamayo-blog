import { getServerSession } from "next-auth/next"
import authOptions from "./auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from 'next'
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage, AIChatMessage, BaseChatMessage } from "langchain/schema";

interface ChatMessageFromAPI {
    role: string
    content: string
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get session from request
    const session = await getServerSession(req, res, authOptions)
    // If no session, return 401
    if (!session) {
        res.status(401).json({ message: 'Unauthorized' })
        return
    }

    // Instantiate chat model
    const { model, previousMessages, message } = req.body
    const chatLlm = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: model,
        temperature: 0.9
    })
    // Convert messages to LLM format
    const messagesForLLM: BaseChatMessage[] = [];
    [...previousMessages, { content: message, role: 'user'}].map((message: ChatMessageFromAPI) => {
        switch (true) {
            case (message.role === 'user'):
                messagesForLLM.push(new HumanChatMessage(message.content))
                break
            case (message.role === 'system'):
                // multiline string:
                const systemMessage = `
                    This is how the user wants you to behave:
                    ${message.content}
                    If you output code, please make sure to start with \'\'\' (without the \\ ) and the language you are writing the code in.
                    For example:
                    \`\`\`python
                    print("Hello World")
                `;
                messagesForLLM.push(new SystemChatMessage(systemMessage))
                break
            case (message.role === 'assistant'):
                messagesForLLM.push(new AIChatMessage(message.content))
            default:
                break
        }
    });
    // Call LLM
    const response = await chatLlm.call(messagesForLLM);

    // Return response
    res.status(200).json({ message: response.text })
}