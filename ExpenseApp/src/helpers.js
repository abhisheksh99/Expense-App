// Local Storage

import { json } from "react-router-dom"

export const fetchData =(key) => {
    return JSON.parse(localStorage.getItem(key))
}

// //delete item

// export const deleteItem =({key}) =>{
//     return localStorage.removeItem(key)
// }

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
    return localStorage.setItem("expenses",JSON.stringify([...existingExpenses,newExpense]))
}

//total spent by budget

export const calcutateSpentByBudget = (budgetId) =>{
    const expenses = fetchData("expenses") ?? []
    const budgetSpent= expenses.reduce((acc,expense) => {
        //check if expense.id = budget.id
        if(expense.budgetId!==budgetId) return acc
        //add the current to my total
        return acc+=expense.amount
    },0)
    return budgetSpent
}
//Formatting

export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    });
};

//formatting percentage
export const formatPercentage = (amount) => {
    return (amount / 100).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2 // Adjust as needed
    })
}

// FORMATTING
export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

//Get all items from localstorage
export const getAllMathcingItems = ({category,key,value}) =>{
    const data = fetchData(category) ?? []
    return data.filter((item)=>item[key]===value)
}

//delete item from local storage
export const deleteItem = ({key,id}) =>{
    const existingData = fetchData(key)
    if(id){
        const newData = existingData.filter((item) => item.id!==id)
        return localStorage.setItem(key,JSON.stringify(newData))
    }
    return localStorage.removeItem(key)
}