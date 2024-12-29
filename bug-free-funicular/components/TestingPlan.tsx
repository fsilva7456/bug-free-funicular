import Module from './Module'

export default function TestingPlan() {
  return (
    <Module
      title="Testing and Validation Plan"
      inputPlaceholder="Provide information about your target market and testing resources..."
      outputStructure={{
        "Testing Objectives": "Clear, measurable objectives for program testing",
        "Methodologies": "Detailed testing methodologies and approaches",
        "Key Performance Indicators": "Specific KPIs to measure program success",
        "Timeline and Milestones": "Proposed testing timeline with key milestones"
      }}
    />
  )
}

