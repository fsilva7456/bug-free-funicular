import Module from './Module'

export default function CompetitiveAnalysis() {
  return (
    <Module
      title="Competitive Analysis"
      inputPlaceholder="Enter your company name to analyze 5 competitors' loyalty programs..."
      outputStructure={{
        "Competitor Programs": "Table with 5 competitors, columns: Program Name, Objectives, Advantages, Disadvantages",
        "Market Gaps": "Identified market gaps and opportunities",
        "Recommendations": "Strategic recommendations based on competitive analysis"
      }}
    />
  )
}

