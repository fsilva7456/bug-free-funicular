'use server'

import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

const CompetitorProgramSchema = z.object({
  programName: z.string(),
  objectives: z.string(),
  advantages: z.string(),
  disadvantages: z.string()
})

const ModuleContentSchema = z.object({
  title: z.string(),
  sections: z.array(z.object({
    heading: z.string(),
    content: z.string().or(z.array(CompetitorProgramSchema).length(5))
  }))
})

type ModuleContent = z.infer<typeof ModuleContentSchema>

export async function generateContent(
  module: string,
  input: string,
  outputStructure: Record<string, string>,
  previousOutput?: Record<string, string> | null,
  feedback?: string
): Promise<{ success: boolean; data?: ModuleContent; error?: string }> {
  try {
    const prompt = `
      Module: ${module}
      Company: ${input}
      ${previousOutput ? `Previous Output: ${JSON.stringify(previousOutput)}` : ''}
      ${feedback ? `User Feedback: ${feedback}` : ''}
      
      Please generate a competitive analysis for ${input}'s loyalty program, including 5 competitors.
      Provide the output in the following JSON structure:
      {
        "title": "Competitive Analysis for ${input}",
        "sections": [
          {
            "heading": "Competitor Programs",
            "content": [
              {
                "programName": "Name of the competitor's program",
                "objectives": "Program objectives",
                "advantages": "Program advantages",
                "disadvantages": "Program disadvantages"
              },
              ... (repeat for 5 competitors)
            ]
          },
          {
            "heading": "Market Gaps",
            "content": "Identified market gaps and opportunities"
          },
          {
            "heading": "Recommendations",
            "content": "Strategic recommendations based on competitive analysis"
          }
        ]
      }

      Ensure that the sections correspond to the following structure:
      ${Object.entries(outputStructure).map(([key, description]) => `"${key}": "${description}"`).join('\n')}
    `

    const { text } = await generateText({
      model: openai('gpt-4'),
      prompt,
      temperature: 0.7,
      maxTokens: 2000,
    })

    const parsedOutput = JSON.parse(text)
    const validatedOutput = ModuleContentSchema.parse(parsedOutput)

    return { success: true, data: validatedOutput }
  } catch (error) {
    console.error('Error generating content:', error)
    return { success: false, error: 'Failed to generate content. Please try again.' }
  }
}

