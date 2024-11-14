import { NavLink } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
      <nav className="fixed flex justify-between w-full top-0  bg-background/80 backdrop-blur-md border-b pr-[30px] p-[20px]">
        <NavLink to="/">Logo</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </div>
  )
}
