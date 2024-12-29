'use server'

import { kv } from '../kv'

interface CompetitorProgram {
  programName: string;
  objectives: string;
  advantages: string;
  disadvantages: string;
}

interface CompetitiveAnalysis {
  companyName: string;
  competitors: CompetitorProgram[];
  marketGaps: string;
  recommendations: string;
}

export async function saveCompetitiveAnalysis(analysis: CompetitiveAnalysis) {
  try {
    const key = `competitiveAnalysis:${analysis.companyName}`
    await kv.set(key, JSON.stringify(analysis))
    return { success: true, message: 'Competitive analysis saved successfully' }
  } catch (error) {
    console.error('Error saving competitive analysis:', error)
    return { success: false, error: 'Failed to save competitive analysis' }
  }
}

