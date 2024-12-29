'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CompetitiveAnalysis from './components/CompetitiveAnalysis'
import LoyaltyObjectives from './components/LoyaltyObjectives'
import ProgramMechanics from './components/ProgramMechanics'
import TestingPlan from './components/TestingPlan'

export default function LoyaltyProgramDesigner() {
  const [activeTab, setActiveTab] = useState("competitive-analysis")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Loyalty Program Designer</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="competitive-analysis">Competitive Analysis</TabsTrigger>
          <TabsTrigger value="loyalty-objectives">Loyalty Objectives</TabsTrigger>
          <TabsTrigger value="program-mechanics">Program Mechanics</TabsTrigger>
          <TabsTrigger value="testing-plan">Testing Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="competitive-analysis">
          <CompetitiveAnalysis />
        </TabsContent>
        <TabsContent value="loyalty-objectives">
          <LoyaltyObjectives />
        </TabsContent>
        <TabsContent value="program-mechanics">
          <ProgramMechanics />
        </TabsContent>
        <TabsContent value="testing-plan">
          <TestingPlan />
        </TabsContent>
      </Tabs>
    </div>
  )
}

