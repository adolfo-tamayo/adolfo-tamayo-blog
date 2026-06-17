import { openai } from "@ai-sdk/openai"
import { generateImage, NoImageGeneratedError } from "ai"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { authOptions } from "@/pages/api/auth/[...nextauth]"

export const maxDuration = 60

const requestSchema = z.object({
  prompt: z.string().trim().min(12).max(2000),
  model: z
    .enum(["gpt-image-2", "gpt-image-1.5", "gpt-image-1", "gpt-image-1-mini"])
    .default("gpt-image-2"),
  size: z.enum(["1024x1024", "1536x1024", "1024x1536"]).default("1024x1024"),
  quality: z.enum(["auto", "low", "medium", "high"]).default("auto"),
  background: z.enum(["auto", "opaque", "transparent"]).default("auto"),
  styleNote: z.string().trim().max(400).optional(),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 })
  }

  const parsed = requestSchema.safeParse(await req.json())

  if (!parsed.success) {
    return Response.json(
      {
        message: "Invalid image generation request.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const { prompt, model, size, quality, background, styleNote } = parsed.data
  const finalPrompt = [prompt, styleNote ? `Style guardrails: ${styleNote}` : null]
    .filter(Boolean)
    .join("\n\n")

  try {
    const { image, providerMetadata, warnings, usage } = await generateImage({
      model: openai.image(model),
      prompt: finalPrompt,
      size,
      providerOptions: {
        openai: {
          quality,
          background,
        },
      },
    })
    const openAIProviderMetadata = providerMetadata.openai as
      | { images?: Array<{ revisedPrompt?: string }> }
      | undefined

    return Response.json({
      image: `data:${image.mediaType};base64,${image.base64}`,
      mediaType: image.mediaType,
      prompt,
      revisedPrompt: openAIProviderMetadata?.images?.[0]?.revisedPrompt,
      model,
      size,
      quality,
      background,
      warnings,
      usage,
    })
  } catch (error) {
    console.error("Image generation failed", error)

    if (NoImageGeneratedError.isInstance(error)) {
      return Response.json(
        {
          message:
            "The image model did not return an image. Try a more concrete prompt or lower the requested quality.",
        },
        { status: 502 }
      )
    }

    return Response.json(
      {
        message:
          "Image generation failed. Check the OpenAI API key, model access, and prompt safety before trying again.",
      },
      { status: 500 }
    )
  }
}
