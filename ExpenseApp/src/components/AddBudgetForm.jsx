import { CurrencyDollarIcon } from "@heroicons/react/24/solid"
import { useEffect, useRef } from "react"
import { Form } from "react-router-dom"
import { useFetcher } from "react-router-dom"

const AddBudgetForm = () => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"

    const formRef = useRef()
    const focusRef = useRef()

    useEffect(()=>{
        if(!isSubmitting){
            formRef.current.reset()   // reset form 
            focusRef.current.focus() // focus on first input after forms resets
        }

    },[isSubmitting])
  return (
    <div>
      <div className="form-wrapper">
        <h2 className="h3">
            Create budget
        </h2>
        <fetcher.Form method="post" className="grid-sm" ref={formRef}>
            <div className="grid-xs">
                <label htmlFor="newBudget">Budget Name</label>
                <input type="text" name="newBudget" id="newBudget" placeholder="e.g., Groceries" required ref={focusRef}></input>
            </div>
            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Amount</label>
                <input type="number" step="0.01" name="newBudgetAmount" id="newBudgetAmount" placeholder="e.g., $300" required inputMode="decimal"></input>
            </div> 
            <input type="hidden" name="_action" value="createBudget" />
            <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                {
                    isSubmitting ? <span>Submitting Budget...</span> : (<>
                     <span>Create budget</span>
                     <CurrencyDollarIcon width={20} />
                    </>
                       
                    )
                }
            </button>
            
        </fetcher.Form>
      </div>
    </div>
  )
}

export default AddBudgetForm
