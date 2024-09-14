// Local Storage

import { json } from "react-router-dom"

export const fetchData =(key) => {
    return JSON.parse(localStorage.getItem(key))
}

//delete item

export const deleteItem =({key}) =>{
    return localStorage.removeItem(key)
}

// create Budget

export const createBudget = ({
    name,amount
}) =>{
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudgets = fetchData("budgets") ??  []
    return localStorage.setItem("budgets",JSON.stringify([...existingBudgets,newItem]))
}

// generate random color
const generateRandomColor = () =>{
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength*34} 65% 50%`
}


// create an expense
export const createExpense = ({ name,amount,budgetId

}) =>{
    const newExpense={
        id: crypto.randomUUID(),
        name:name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId:budgetId

        
    }
    const existingExpenses = fetchData("expenses") ?? []
    return localStorage.setItem("expsense",JSON.stringify([...existingExpenses,newExpense]))
}