'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { generateContent } from '../actions/generate'
import { saveCompetitiveAnalysis } from '../actions/saveCompetitiveAnalysis'
import { toast } from "sonner"

interface CompetitorProgram {
  programName: string;
  objectives: string;
  advantages: string;
  disadvantages: string;
}

interface ModuleContent {
  title: string;
  sections: {
    heading: string;
    content: string | CompetitorProgram[];
  }[];
}

interface ModuleProps {
  title: string
  inputPlaceholder: string
  outputStructure: Record<string, string>
}

export default function Module({ title, inputPlaceholder, outputStructure }: ModuleProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<ModuleContent | null>(null)
  const [feedback, setFeedback] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    try {
      const result = await generateContent(title, input, outputStructure)
      if (result.success && result.data) {
        setOutput(result.data)
      } else {
        toast.error(result.error || 'Failed to generate content')
      }
    } catch (error) {
      toast.error('An error occurred while generating content')
      console.error('Error generating content:', error)
    }
    setIsLoading(false)
  }

  const handleFeedback = async () => {
    setIsLoading(true)
    try {
      const result = await generateContent(
        title,
        input,
        outputStructure,
        output?.sections.reduce((acc, section) => ({...acc, [section.heading]: section.content}), {}),
        feedback
      )
      if (result.success && result.data) {
        setOutput(result.data)
        setFeedback('')
      } else {
        toast.error(result.error || 'Failed to process feedback')
      }
    } catch (error) {
      toast.error('An error occurred while processing feedback')
      console.error('Error processing feedback:', error)
    }
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (!output) return

    setIsSaving(true)
    try {
      const competitorPrograms = output.sections.find(section => section.heading === "Competitor Programs")?.content as CompetitorProgram[]
      const marketGaps = output.sections.find(section => section.heading === "Market Gaps")?.content as string
      const recommendations = output.sections.find(section => section.heading === "Recommendations")?.content as string

      if (!competitorPrograms || !marketGaps || !recommendations) {
        throw new Error('Missing required data for saving competitive analysis')
      }

      const analysisData = {
        companyName: input,
        competitors: competitorPrograms,
        marketGaps,
        recommendations
      }

      const result = await saveCompetitiveAnalysis(analysisData)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.error || 'Failed to save competitive analysis')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      toast.error(`Error saving competitive analysis: ${errorMessage}`)
      console.error('Error saving competitive analysis:', error)
    }
    setIsSaving(false)
  }

  const renderContent = (content: string | CompetitorProgram[]) => {
    if (typeof content === 'string') {
      return <p className="text-muted-foreground whitespace-pre-wrap">{content}</p>
    }

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program Name</TableHead>
              <TableHead>Objectives</TableHead>
              <TableHead>Advantages</TableHead>
              <TableHead>Disadvantages</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.map((program, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{program.programName}</TableCell>
                <TableCell>{program.objectives}</TableCell>
                <TableCell>{program.advantages}</TableCell>
                <TableCell>{program.disadvantages}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder={inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mb-4"
          rows={3}
        />
        <Button onClick={handleGenerate} disabled={isLoading || !input} className="w-full">
          {isLoading ? 'Generating...' : 'Generate Content'}
        </Button>
        {output && (
          <div className="mt-6 space-y-6">
            <h2 className="text-2xl font-bold">{output.title}</h2>
            {output.sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold">{section.heading}</h3>
                {renderContent(section.content)}
              </div>
            ))}
            <Button onClick={handleSave} disabled={isSaving} className="w-full">
              {isSaving ? 'Saving...' : 'Save Competitive Analysis'}
            </Button>
          </div>
        )}
      </CardContent>
      {output && (
        <CardFooter className="flex flex-col gap-4">
          <Textarea
            placeholder="Provide feedback for revision"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full"
            rows={3}
          />
          <Button onClick={handleFeedback} disabled={isLoading || !feedback} className="w-full">
            {isLoading ? 'Processing...' : 'Submit Feedback'}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

