"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ExpenseTracker } from "@/components/expense-tracker"
import { CurrencyConverter } from "@/components/currency-converter"
import { BudgetAlerts } from "@/components/budget-alerts"
import { CostSavingTips } from "@/components/cost-saving-tips"
import { CollaborativePlanning } from "@/components/collaborative-planning"

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-12 md:py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Innovative Travel Features
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Powerful tools to manage your travel budget, track expenses, and collaborate with your group in real-time
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <ExpenseTracker />
            <CurrencyConverter />
            <BudgetAlerts />
            <CostSavingTips />
            <div className="lg:col-span-2">
              <CollaborativePlanning />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
