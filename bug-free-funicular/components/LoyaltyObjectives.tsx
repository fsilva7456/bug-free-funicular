import Module from './Module'

export default function LoyaltyObjectives() {
  return (
    <Module
      title="Loyalty and Customer Engagement Objectives"
      inputPlaceholder="Describe your business goals and target audience..."
      outputStructure={{
        "Business Goals": "Aligned business goals for the loyalty program",
        "Target Audience": "Detailed description of the defined target audience",
        "Engagement Metrics": "Key engagement metrics to track and improve",
        "Loyalty Objectives": "Specific, measurable loyalty program objectives"
      }}
    />
  )
}

