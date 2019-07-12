import { createSelector } from 'redux-starter-kit'
import parseDate from 'date-fns/parse'

export const getPopulatedBudgets = createSelector(
  ['data.budget', 'diff.budget'],
  (serverBudgets, diffBudgets) => {
    const result = {}
    const budgets = { ...serverBudgets, ...diffBudgets }
    for (const id in budgets) {
      result[id] = {
        ...budgets[id],
        date: +parseDate(budgets[id].date),
        changed: budgets[id].changed * 1000,
      }
    }
    return result
  }
)

export const getBudgetsToSync = state => state.diff.budget

export const getBudgetsByMonthAndTag = createSelector(
  [getPopulatedBudgets],
  budgets => {
    const result = {}
    for (const id in budgets) {
      const budget = budgets[id]
      const { date, tag } = budget
      if (!result[date]) {
        result[date] = {}
      }
      result[date][tag] = budget
    }
    return result
  }
)