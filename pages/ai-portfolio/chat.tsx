import { useMemo, useState } from "react"
import { getServerSession, type Session } from "next-auth"
import { signOut } from "next-auth/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { useChat } from "@ai-sdk/react"
import {
  Activity,
  Braces,
  Brain,
  Check,
  ChevronsUpDown,
  Download,
  Eraser,
  MessagesSquare,
  SquareFunction,
} from "lucide-react"

import {
  Conversation,
  ConversationContent,
  ConversationDownload,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import { Loader } from "@/components/ai-elements/loader"
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message"
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorName,
  ModelSelectorTrigger,
} from "@/components/ai-elements/model-selector"
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input"
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion"
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@/components/ai-elements/tool"
import AIToolsLayout from "@/components/ai-tools-layout"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { authOptions } from "../api/auth/[...nextauth]"

const models = [
  {
    id: "gpt-5.5",
    name: "GPT-5.5",
    description: "Newest flagship for complex professional and agentic work.",
    group: "Frontier",
    reasoningEfforts: ["none", "low", "medium", "high", "xhigh"],
    defaultReasoningEffort: "medium",
  },
  {
    id: "gpt-5.4",
    name: "GPT-5.4",
    description: "Strong intelligence at a lower cost than GPT-5.5.",
    group: "Frontier",
    reasoningEfforts: ["none", "low", "medium", "high", "xhigh"],
    defaultReasoningEffort: "none",
  },
  {
    id: "gpt-5.4-mini",
    name: "GPT-5.4 mini",
    description: "Best default for fast, capable agent interactions.",
    group: "Efficient",
    reasoningEfforts: ["none", "low", "medium", "high", "xhigh"],
    defaultReasoningEffort: "none",
  },
  {
    id: "gpt-5.4-nano",
    name: "GPT-5.4 nano",
    description: "Current low-cost model for simple, high-volume tasks.",
    group: "Efficient",
    reasoningEfforts: ["none", "low", "medium", "high", "xhigh"],
    defaultReasoningEffort: "none",
  },
  {
    id: "gpt-5-mini",
    name: "GPT-5 mini",
    description: "Near-frontier quality for cost-sensitive workloads.",
    group: "Efficient",
    reasoningEfforts: ["minimal", "low", "medium", "high"],
    defaultReasoningEffort: "medium",
  },
  {
    id: "gpt-5-nano",
    name: "GPT-5 nano",
    description: "Fastest and cheapest GPT-5 option.",
    group: "Efficient",
    reasoningEfforts: ["minimal", "low", "medium", "high"],
    defaultReasoningEffort: "medium",
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    description: "Non-reasoning baseline for instruction following and tool use.",
    group: "Baseline",
    reasoningEfforts: [],
    defaultReasoningEffort: null,
  },
] as const

const starterPrompts = [
  "Use your tools to explain what this AI portfolio chat demonstrates.",
  "Inspect this prompt: Build an agent that drafts investor updates from rough notes.",
  "Draft a one-week execution plan for a document collaboration copilot.",
]

const defaultSystemPrompt =
  "Be direct, technical, and practical. Use tools when they make the answer more inspectable. Keep answers compact unless asked to go deep."

type ModelId = (typeof models)[number]["id"]
type ReasoningEffort = "none" | "minimal" | "low" | "medium" | "high" | "xhigh"

const reasoningEffortLabels: Record<ReasoningEffort, string> = {
  none: "None",
  minimal: "Minimal",
  low: "Low",
  medium: "Medium",
  high: "High",
  xhigh: "Extra high",
}

const isToolPart = (part: UIMessage["parts"][number]) => part.type.startsWith("tool-")

const ChatScreen = ({ session }: { session: Session }) => {
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState<ModelId>("gpt-5.4-mini")
  const [reasoningEffort, setReasoningEffort] = useState<ReasoningEffort>("none")
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false)
  const [systemPrompt, setSystemPrompt] = useState(defaultSystemPrompt)

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), [])

  const { messages, sendMessage, status, stop, error, clearError, setMessages } = useChat({
    transport,
    experimental_throttle: 50,
  })

  const isRunning = status === "submitted" || status === "streaming"
  const selectedModelMeta = models.find((model) => model.id === selectedModel) ?? models[0]

  const sendText = async (text: string) => {
    const trimmed = text.trim()

    if (!trimmed || isRunning) {
      return
    }

    setInput("")
    clearError()
    await sendMessage(
      { text: trimmed },
      {
        body: {
          model: selectedModel,
          reasoningEffort,
          system: systemPrompt,
        },
      }
    )
  }

  const handleSubmit = (message: PromptInputMessage) => {
    void sendText(message.text)
  }

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <AIToolsLayout title="AI Portfolio - Chat" session={session} signOut={signOut}>
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.18em] text-muted-foreground">
            AI Portfolio
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] sm:text-7xl">
            Agent chat
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            A controllable chat surface using Vercel AI SDK streaming, AI Elements, model selection, system steering, and server-side tools.
          </p>
        </div>

        <aside className="border-l border-border pl-5">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Runtime
          </p>
          <div className="mt-4 grid gap-3 text-sm leading-6">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>{status === "ready" ? "Ready" : status}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <SquareFunction className="h-4 w-4" aria-hidden="true" />
              <span>3 server tools</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="flex h-[42rem] min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-background/70">
          <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">Conversation</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Streaming UI messages with markdown, tool parts, and transcript export.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 ? (
                <ConversationDownload
                  aria-label="Download transcript"
                  className="static rounded-md"
                  messages={messages}
                  filename="ai-portfolio-chat.md"
                  title="Download transcript"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                </ConversationDownload>
              ) : null}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setMessages([])}
                disabled={messages.length === 0 || isRunning}
              >
                <Eraser className="h-4 w-4" aria-hidden="true" />
                Clear
              </Button>
            </div>
          </div>

          <Conversation className="min-h-0 flex-1">
            <ConversationContent className="min-h-full p-5">
              {messages.length === 0 ? (
                <ConversationEmptyState
                  icon={<MessagesSquare className="h-10 w-10" />}
                  title="Start a controlled run"
                  description="Try a prompt below and inspect how the model streams, calls tools, and responds."
                />
              ) : (
                messages.map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent
                      className={cn(
                        message.role === "user"
                          ? "max-w-[min(85%,36rem)] rounded-2xl bg-muted px-4 py-3 text-foreground"
                          : "max-w-3xl text-sm leading-7"
                      )}
                    >
                      {message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <MessageResponse key={`${message.id}-${index}`}>
                              {part.text}
                            </MessageResponse>
                          )
                        }

                        if (isToolPart(part)) {
                          const toolPart = part as any

                          return (
                            <Tool key={`${message.id}-${index}`}>
                              <ToolHeader type={toolPart.type} state={toolPart.state} />
                              <ToolContent>
                                <ToolInput input={toolPart.input} />
                                <ToolOutput output={toolPart.output} errorText={toolPart.errorText} />
                              </ToolContent>
                            </Tool>
                          )
                        }

                        return null
                      })}
                    </MessageContent>
                  </Message>
                ))
              )}
              {status === "submitted" ? (
                <Message from="assistant" aria-live="polite">
                  <MessageContent className="text-muted-foreground">
                    <div className="flex items-center gap-2 text-sm">
                      <Loader size={14} />
                      <span>Thinking</span>
                    </div>
                  </MessageContent>
                </Message>
              ) : null}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border p-4">
            {error ? (
              <div className="mb-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error.message}
              </div>
            ) : null}

            <Suggestions className="mb-3">
              {starterPrompts.map((suggestion) => (
                <Suggestion
                  key={suggestion}
                  suggestion={suggestion}
                  onClick={handleSuggestion}
                  disabled={isRunning}
                />
              ))}
            </Suggestions>

            <PromptInput onSubmit={handleSubmit} className="bg-background">
              <PromptInputBody>
                <PromptInputTextarea
                  value={input}
                  onChange={(event) => setInput(event.currentTarget.value)}
                  placeholder="Ask the agent to plan, inspect a prompt, or explain the stack..."
                  className="min-h-24"
                />
              </PromptInputBody>
              <PromptInputFooter>
                <ModelSelector open={modelSelectorOpen} onOpenChange={setModelSelectorOpen}>
                  <ModelSelectorTrigger asChild>
                    <PromptInputButton
                      type="button"
                      className="max-w-[13rem] justify-start px-2 text-xs"
                      aria-label={`Select model. Current model: ${selectedModelMeta.name}`}
                    >
                      <ModelSelectorLogo provider="openai" />
                      <span className="truncate">{selectedModelMeta.name}</span>
                      <ChevronsUpDown className="ml-1 h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                    </PromptInputButton>
                  </ModelSelectorTrigger>
                  <ModelSelectorContent
                    title="Choose a model"
                    description="The selection applies to your next message."
                  >
                    <ModelSelectorInput placeholder="Search by name or capability..." />
                    <ModelSelectorList>
                      <ModelSelectorEmpty>No model found.</ModelSelectorEmpty>
                      {["Frontier", "Efficient", "Baseline"].map((group) => (
                        <ModelSelectorGroup key={group} heading={group}>
                          {models
                            .filter((model) => model.group === group)
                            .map((model) => (
                              <ModelSelectorItem
                                key={model.id}
                                value={`${model.name} ${model.id} ${model.description}`}
                                onSelect={() => {
                                  setSelectedModel(model.id)
                                  if (model.defaultReasoningEffort) {
                                    setReasoningEffort(model.defaultReasoningEffort)
                                  }
                                  setModelSelectorOpen(false)
                                }}
                                className={cn(
                                  "gap-3",
                                  selectedModel === model.id && "border-foreground/25 bg-muted/70"
                                )}
                              >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                                  <ModelSelectorLogo provider="openai" className="h-4 w-4" />
                                </span>
                                <div className="min-w-0 flex-1">
                                  <ModelSelectorName className="font-medium">
                                    {model.name}
                                  </ModelSelectorName>
                                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                    {model.description}
                                  </p>
                                </div>
                                <Check
                                  className={cn(
                                    "h-4 w-4",
                                    selectedModel === model.id ? "opacity-100" : "opacity-0"
                                  )}
                                  aria-hidden="true"
                                />
                              </ModelSelectorItem>
                            ))}
                        </ModelSelectorGroup>
                      ))}
                    </ModelSelectorList>
                  </ModelSelectorContent>
                </ModelSelector>
                {selectedModelMeta.reasoningEfforts.length > 0 ? (
                  <PromptInputSelect
                    value={reasoningEffort}
                    onValueChange={(value) => setReasoningEffort(value as ReasoningEffort)}
                  >
                    <PromptInputSelectTrigger
                      className="h-8 w-auto gap-1.5 px-2 text-xs"
                      aria-label="Reasoning effort"
                    >
                      <Brain className="h-3.5 w-3.5" aria-hidden="true" />
                      <PromptInputSelectValue />
                    </PromptInputSelectTrigger>
                    <PromptInputSelectContent>
                      {selectedModelMeta.reasoningEfforts.map((effort) => (
                        <PromptInputSelectItem key={effort} value={effort}>
                          {reasoningEffortLabels[effort]}
                        </PromptInputSelectItem>
                      ))}
                    </PromptInputSelectContent>
                  </PromptInputSelect>
                ) : (
                  <span className="inline-flex h-8 items-center gap-1.5 px-2 text-xs text-muted-foreground">
                    <Brain className="h-3.5 w-3.5" aria-hidden="true" />
                    No reasoning
                  </span>
                )}
                <PromptInputSubmit
                  status={status}
                  onStop={() => void stop()}
                  disabled={!input.trim() && !isRunning}
                />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>

        <aside className="grid content-start gap-4">
          <section className="rounded-lg border border-border bg-background/70 p-5">
            <div className="flex items-center gap-2">
              <Braces className="h-4 w-4 text-accent" aria-hidden="true" />
              <h2 className="text-sm font-medium">System control</h2>
            </div>
            <textarea
              value={systemPrompt}
              onChange={(event) => setSystemPrompt(event.currentTarget.value)}
              className="mt-4 min-h-40 w-full resize-y rounded-md border border-border bg-background p-3 text-sm leading-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            />
          </section>

          <section className="rounded-lg border border-border bg-background/70 p-5">
            <h2 className="text-sm font-medium">Agent tools</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">
              <li>getPortfolioContext</li>
              <li>draftExecutionPlan</li>
              <li>inspectPrompt</li>
            </ul>
          </section>
        </aside>
      </section>
    </AIToolsLayout>
  )
}

export default ChatScreen

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: { session: JSON.parse(JSON.stringify(session)) },
  }
}
