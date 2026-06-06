import { openai, type OpenAILanguageModelResponsesOptions } from "@ai-sdk/openai"
import { getServerSession } from "next-auth"
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai"
import { z } from "zod"

import { authOptions } from "@/pages/api/auth/[...nextauth]"

export const maxDuration = 30

type ReasoningEffort = "none" | "minimal" | "low" | "medium" | "high" | "xhigh"

const models = {
  "gpt-5.5": {
    label: "GPT-5.5",
    note: "Newest flagship for complex professional and agentic work.",
    reasoningEfforts: ["none", "low", "medium", "high", "xhigh"],
    defaultReasoningEffort: "medium",
  },
  "gpt-5.4": {
    label: "GPT-5.4",
    note: "Strong intelligence at a lower cost than GPT-5.5.",
    reasoningEfforts: ["none", "low", "medium", "high", "xhigh"],
    defaultReasoningEffort: "none",
  },
  "gpt-5.4-mini": {
    label: "GPT-5.4 mini",
    note: "Best default for fast, capable agent interactions.",
    reasoningEfforts: ["none", "low", "medium", "high", "xhigh"],
    defaultReasoningEffort: "none",
  },
  "gpt-5.4-nano": {
    label: "GPT-5.4 nano",
    note: "Current low-cost model for simple, high-volume tasks.",
    reasoningEfforts: ["none", "low", "medium", "high", "xhigh"],
    defaultReasoningEffort: "none",
  },
  "gpt-5-mini": {
    label: "GPT-5 mini",
    note: "Near-frontier quality for cost-sensitive workloads.",
    reasoningEfforts: ["minimal", "low", "medium", "high"],
    defaultReasoningEffort: "medium",
  },
  "gpt-5-nano": {
    label: "GPT-5 nano",
    note: "Fastest and cheapest GPT-5 option.",
    reasoningEfforts: ["minimal", "low", "medium", "high"],
    defaultReasoningEffort: "medium",
  },
  "gpt-4.1": {
    label: "GPT-4.1",
    note: "Non-reasoning baseline for instruction following and tool use.",
    reasoningEfforts: [],
    defaultReasoningEffort: null,
  },
} satisfies Record<
  string,
  {
    label: string
    note: string
    reasoningEfforts: readonly ReasoningEffort[]
    defaultReasoningEffort: ReasoningEffort | null
  }
>

const defaultSystem = [
  "You are an AI feature portfolio assistant embedded in Adolfo Tamayo's private site.",
  "Demonstrate a crisp, controllable chat experience with concise answers, practical reasoning, and transparent tool use.",
  "Prefer direct answers. When useful, call tools to inspect portfolio context, draft plans, or evaluate prompts.",
].join(" ")

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  }

  const {
    messages,
    model = "gpt-5.4-mini",
    reasoningEffort,
    system,
  }: {
    messages: UIMessage[]
    model?: keyof typeof models
    reasoningEffort?: ReasoningEffort
    system?: string
  } = await req.json()

  const selectedModel = model in models ? model : "gpt-5.4-mini"
  const selectedModelConfig = models[selectedModel]
  const supportedReasoningEfforts =
    selectedModelConfig.reasoningEfforts as readonly ReasoningEffort[]
  const selectedReasoningEffort =
    reasoningEffort && supportedReasoningEfforts.includes(reasoningEffort)
      ? reasoningEffort
      : selectedModelConfig.defaultReasoningEffort

  const result = streamText({
    model: openai(selectedModel),
    providerOptions: selectedReasoningEffort
      ? {
          openai: {
            reasoningEffort: selectedReasoningEffort,
          } satisfies OpenAILanguageModelResponsesOptions,
        }
      : undefined,
    system: system?.trim() || defaultSystem,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(4),
    tools: {
      getPortfolioContext: tool({
        description: "Return concise context about this AI portfolio and what the chat demo is meant to show.",
        inputSchema: z.object({
          focus: z
            .enum(["overview", "agent", "ui", "stack"])
            .default("overview")
            .describe("The kind of context the answer needs."),
        }),
        execute: async ({ focus }) => ({
          focus,
          site: "Private AI Portfolio inside Adolfo Tamayo's personal website.",
          purpose:
            "Show current AI engineering taste through small, controlled demos rather than product marketing.",
          stack: ["Next.js", "Vercel AI SDK 6", "AI Elements", "OpenAI provider", "NextAuth"],
          agentCapabilities: [
            "multi-step tool calling",
            "prompt and response streaming",
            "system-prompt control",
            "model selection",
            "downloadable transcript",
          ],
        }),
      }),
      draftExecutionPlan: tool({
        description: "Create a compact execution plan for an AI feature idea.",
        inputSchema: z.object({
          goal: z.string().describe("The feature or workflow the user wants to build."),
          horizon: z.enum(["today", "week", "month"]).default("week"),
        }),
        execute: async ({ goal, horizon }) => ({
          goal,
          horizon,
          plan: [
            "Define the user job and success signal.",
            "Map the model interaction, tools, and failure states.",
            "Build a thin streaming prototype with eval prompts.",
            "Add instrumentation for latency, cost, and answer quality.",
          ],
        }),
      }),
      inspectPrompt: tool({
        description: "Inspect a prompt for clarity, missing constraints, and likely model behavior.",
        inputSchema: z.object({
          prompt: z.string().describe("The prompt text to inspect."),
        }),
        execute: async ({ prompt }) => ({
          length: prompt.length,
          hasExplicitGoal: /\b(build|write|analyze|compare|draft|summarize|plan|explain)\b/i.test(prompt),
          hasConstraints: /\b(must|avoid|only|do not|don't|format|limit|tone)\b/i.test(prompt),
          recommendation:
            "Make the desired output, constraints, and acceptance bar explicit before asking for a final answer.",
        }),
      }),
    },
  })

  return result.toUIMessageStreamResponse({
    onError: () => "The model request failed. Check the configured OpenAI API key and try again.",
  })
}
