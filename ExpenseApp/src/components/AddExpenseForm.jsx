import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { useEffect, useRef } from "react"
import { useFetcher } from "react-router-dom"
import { Form } from "react-router-dom"

function AddExpenseForm({ budgets }) {
    const fetcher = useFetcher()
    const formRef = useRef()
    const focusRef = useRef()
    const isSubmitting = fetcher.state ==="submitting"

    useEffect(() => {
        if(!isSubmitting){
            formRef.current.reset() // reset form 
            focusRef.current.focus() // focus on first input after forms reset

        }
       
    },[isSubmitting])

    return (
        <div className="form-wrapper">
            <h2 className="h3">Add New {" "}
                <span className="accent">
                    {budgets.length === 1 && `${budgets.map((budget) => budget.name)}`}
                </span>Expense
            </h2>
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                <div className="expense-inputs">
                    <div className="grid-sm">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input
                            type="text"
                            name="newExpense"
                            id="newExpense"
                            placeholder="e.g., Coffee"
                            ref={focusRef}
                            required
                        />
                    </div>

                    <div className="grid-sm">
                        <label htmlFor="newExpenseAmount">Expense Amount</label>
                        <input
                            type="number"
                            name="newExpenseAmount"
                            id="newExpenseAmount"
                            placeholder="e.g., $1.20"
                            step="0.01"
                            inputMode="decimal"
                            required
                        />
                    </div>
                </div>

                <div className="grid-sm" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Expense Category</label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>
                        {
                            budgets
                                .sort((a, b) => a.createdAt - b.createdAt)
                                .map((budget) => (
                                    <option key={budget.id} value={budget.id}>{budget.name}</option>
                                ))
                        }
                    </select>
                </div>
                <input type="hidden" name="_action" value="createExpense"/>
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                {
                    isSubmitting ? <span>Submitting Expense...</span> : (<>
                     <span>Add Expense</span>
                     <PlusCircleIcon width={20} />
                    </>
                       
                    )
                }
            </button>
            </fetcher.Form> 
        </div>
    )
}

export default AddExpenseForm
