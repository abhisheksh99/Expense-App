//assets
import { Form, NavLink } from "react-router-dom"
import logomark from "../assets/logomark.svg"


import { TrashIcon } from '@heroicons/react/24/solid'


const Nav = ({userName}) => {
  return (
    <nav>
        <NavLink to="/" aria-label="Go To Home">
        <img src={logomark} alt="logo" height={30}/>
        <span>Expense Home</span>
        </NavLink>
        {userName && (
            <Form method="post" action="/logout" onSubmit={(e)=>{
                if(!confirm("Delete user and all data?")){
                    e.preventDefault()
                }
            }}>
                <button type="submit" className="btn btn--warning">
                    <span>Delete User</span>
                    <TrashIcon width={20} />
                </button>

            </Form>
        )}
       
    </nav>
  )
}

export default Nav