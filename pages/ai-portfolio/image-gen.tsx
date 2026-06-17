import { useMemo, useState } from "react"
import Image from "next/image"
import { getServerSession, type Session } from "next-auth"
import { signOut } from "next-auth/react"
import {
  Download,
  ImageIcon,
  Loader2,
  WandSparkles,
} from "lucide-react"

import AIToolsLayout from "../../components/ai-tools-layout"
import { authOptions } from "../api/auth/[...nextauth]"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type ImageModel = "gpt-image-2" | "gpt-image-1.5" | "gpt-image-1" | "gpt-image-1-mini"
type ImageSize = "1024x1024" | "1536x1024" | "1024x1536"
type ImageQuality = "auto" | "low" | "medium" | "high"
type ImageBackground = "auto" | "opaque" | "transparent"

type GeneratedImage = {
  id: string
  image: string
  prompt: string
  revisedPrompt?: string
  model: ImageModel
  size: ImageSize
  quality: ImageQuality
  background: ImageBackground
  createdAt: string
}

const modelOptions: Array<{ value: ImageModel; label: string; note: string }> = [
  {
    value: "gpt-image-2",
    label: "GPT Image 2",
    note: "Latest OpenAI image model for polished text-to-image output.",
  },
  {
    value: "gpt-image-1.5",
    label: "GPT Image 1.5",
    note: "High-quality previous-generation GPT Image model.",
  },
  {
    value: "gpt-image-1",
    label: "GPT Image 1",
    note: "Stable baseline for image generation and editing workflows.",
  },
  {
    value: "gpt-image-1-mini",
    label: "GPT Image 1 mini",
    note: "Lower-latency option for fast prompt iteration.",
  },
]

const presetPrompts = [
  {
    label: "Founder workspace",
    prompt:
      "Editorial hero image for a technical founder's personal site: a quiet workspace with a laptop, notes, and startup event badge, minimal composition, natural light, premium but understated.",
  },
  {
    label: "Document copilot",
    prompt:
      "A product-style visual for an AI document copilot: clean document drafts, inline comments, citations, and human review markers arranged on a neutral desk, no readable text.",
  },
  {
    label: "Agent workflow",
    prompt:
      "A crisp visual metaphor for agent workflows: connected task nodes, tool calls, and a human approval checkpoint rendered as a refined editorial illustration, no text.",
  },
  {
    label: "Studio prompt lab",
    prompt:
      "A minimal image-generation playground output: studio scene with prompt cards, image thumbnails, and careful lighting, restrained palette, no logos, no text.",
  },
]

const styleNote =
  "Keep the composition minimal, realistic or editorial, with no readable text unless the prompt explicitly requests it. Avoid generic neon AI aesthetics."

const selectContentClassName = "border-border bg-[var(--popover)] text-popover-foreground shadow-xl"

const ImageGen = ({ session }: { session: Session }) => {
  const [prompt, setPrompt] = useState(presetPrompts[0].prompt)
  const [model, setModel] = useState<ImageModel>("gpt-image-2")
  const [size, setSize] = useState<ImageSize>("1024x1024")
  const [quality, setQuality] = useState<ImageQuality>("auto")
  const [background, setBackground] = useState<ImageBackground>("auto")
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [activeImageId, setActiveImageId] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const activeImage = useMemo(
    () => images.find((image) => image.id === activeImageId) ?? images[0],
    [activeImageId, images]
  )

  const selectedModel = modelOptions.find((option) => option.value === model)
  const previewAspect =
    size === "1536x1024" ? "aspect-[3/2]" : size === "1024x1536" ? "aspect-[2/3]" : "aspect-square"

  const generate = async () => {
    if (!prompt.trim() || isGenerating) {
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/image-gen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          model,
          size,
          quality,
          background,
          styleNote,
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.message ?? "Image generation failed.")
      }

      const generatedImage: GeneratedImage = {
        id: crypto.randomUUID(),
        image: payload.image,
        prompt: payload.prompt,
        revisedPrompt: payload.revisedPrompt,
        model: payload.model,
        size: payload.size,
        quality: payload.quality,
        background: payload.background,
        createdAt: new Date().toISOString(),
      }

      setImages((currentImages) => [generatedImage, ...currentImages].slice(0, 8))
      setActiveImageId(generatedImage.id)
    } catch (generateError) {
      setError(
        generateError instanceof Error
          ? generateError.message
          : "Image generation failed."
      )
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <AIToolsLayout session={session} signOut={signOut} title="AI Portfolio - Image generation">
      <section className="grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Live
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-none sm:text-5xl">
            Image generation
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            A protected playground for prompt craft, model selection, and fast visual iteration using AI SDK image generation.
          </p>
        </div>
        <aside className="border-l border-border pl-5">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Stack
          </p>
          <p className="mt-4 text-sm leading-6">
            AI SDK{" "}
            <span className="text-muted-foreground">generateImage</span>
            <br />
            OpenAI{" "}
            <span className="text-muted-foreground">GPT Image 2</span>
          </p>
        </aside>
      </section>

      <section className="mt-10">
        <div className="min-w-0 border border-border bg-background">
          <div className="grid gap-5 border-b border-border p-5 xl:grid-cols-[minmax(0,1fr)_34rem] xl:items-start">
            <div>
              <h2 className="text-2xl font-semibold">Prompt workspace</h2>
              <p className="mt-2 max-w-2xl text-sm leading-5 text-muted-foreground">
                Generate, inspect, keep a short local history, and download the strongest output.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Model</span>
                <Select value={model} onValueChange={(value: ImageModel) => setModel(value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClassName}>
                    {modelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Size</span>
                <Select value={size} onValueChange={(value: ImageSize) => setSize(value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClassName}>
                    <SelectItem value="1024x1024">Square</SelectItem>
                    <SelectItem value="1536x1024">Landscape</SelectItem>
                    <SelectItem value="1024x1536">Portrait</SelectItem>
                  </SelectContent>
                </Select>
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Quality</span>
                <Select value={quality} onValueChange={(value: ImageQuality) => setQuality(value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClassName}>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Background</span>
                <Select
                  value={background}
                  onValueChange={(value: ImageBackground) => setBackground(value)}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClassName}>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="opaque">Opaque</SelectItem>
                    <SelectItem value="transparent">Transparent</SelectItem>
                  </SelectContent>
                </Select>
              </label>
            </div>
          </div>

          <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="min-w-0 border-b border-border p-5 xl:border-b-0 xl:border-r">
              <div className={cn("relative w-full overflow-hidden bg-muted/35", previewAspect)}>
                {activeImage ? (
                  <Image
                    src={activeImage.image}
                    alt="Generated AI image"
                    fill
                    unoptimized
                    sizes="(min-width: 1280px) 720px, 100vw"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full min-h-[18rem] flex-col items-center justify-center gap-4 p-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background">
                      {isGenerating ? (
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-hidden="true" />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-medium">
                        {isGenerating ? "Generating image" : "No image yet"}
                      </p>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                        Start with a preset or write a concrete visual prompt.
                      </p>
                    </div>
                  </div>
                )}

                {isGenerating && activeImage ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-sm">
                    <div className="inline-flex items-center gap-3 border border-border bg-background px-4 py-3 text-sm font-medium">
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Generating next image
                    </div>
                  </div>
                ) : null}
              </div>

              {images.length > 0 ? (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="grid w-full grid-cols-4 gap-3 sm:w-auto sm:grid-cols-6">
                    {images.map((image) => (
                      <button
                        key={image.id}
                        type="button"
                        onClick={() => setActiveImageId(image.id)}
                        className={cn(
                          "relative aspect-square w-full overflow-hidden border bg-muted transition hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 sm:w-14",
                          image.id === activeImage?.id ? "border-foreground" : "border-border"
                        )}
                        aria-label="Show generated image"
                      >
                        <Image
                          src={image.image}
                          alt=""
                          fill
                          unoptimized
                          sizes="120px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  {activeImage ? (
                    <Button asChild variant="outline" size="sm" className="shrink-0">
                      <a href={activeImage.image} download="ai-portfolio-image.png">
                        <Download className="h-4 w-4" aria-hidden="true" />
                        Download
                      </a>
                    </Button>
                  ) : null}
                </div>
              ) : (
                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                  {selectedModel?.note} Outputs stay in this browser session until you leave or refresh.
                </p>
              )}
            </div>

            <form
              className="flex min-w-0 flex-col gap-4 p-5"
              onSubmit={(event) => {
                event.preventDefault()
                generate()
              }}
            >
              <label className="grid gap-2">
                <span className="text-sm font-medium">Prompt</span>
                <Textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  className="min-h-32 resize-none bg-background text-sm leading-6 shadow-none"
                  placeholder="Describe the image you want to generate..."
                />
              </label>

              <div className="grid gap-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">Presets</p>
                  <p className="text-xs text-muted-foreground">Load a starting point</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {presetPrompts.map((preset, index) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setPrompt(preset.prompt)}
                      className="rounded-md border border-border bg-background px-3 py-2 text-left text-sm transition hover:border-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                    >
                      <span className="block text-xs text-muted-foreground">0{index + 1}</span>
                      <span className="block truncate font-medium">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                {styleNote}
              </p>

              {error ? (
                <div className="border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm leading-6 text-destructive">
                  {error}
                </div>
              ) : null}

              <Button type="submit" className="mt-auto" disabled={isGenerating || prompt.trim().length < 12}>
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <WandSparkles className="h-4 w-4" aria-hidden="true" />
                )}
                Generate
              </Button>
            </form>
          </div>
        </div>
      </section>
    </AIToolsLayout>
  )
}

export default ImageGen

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
