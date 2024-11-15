import { NavLink } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
export default function Navbar() {
  return (
    <div>
      <nav className="fixed flex justify-between w-full top-0  bg-background/80 backdrop-blur-md border-b pr-[30px] p-[20px]">
        <NavLink to="/">Logo</NavLink>
        <NavLink to="/profile">
          <Avatar alt="Remy Sharp" src="/profile.png" />
        </NavLink>
      </nav>
    </div>
  )
}
