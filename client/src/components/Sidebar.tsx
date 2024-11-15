import { NavLink } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ContactsIcon from '@mui/icons-material/Contacts'
function Sidebar() {
  const sidebarItems = [
    {
      item: 'DashBoard',
      icon: <DashboardIcon />,
      to: '/login/dashboard',
    },
    {
      item: 'Add Contact',
      icon: <PersonAddIcon />,
      to: '/login/add',
    },
    {
      item: 'Contacts',
      icon: <ContactsIcon />,
      to: '/login/contacts',
    },
  ]
  return (
    <div id="sidebar" className="flex flex-col justify-around">
      <div className="p-4 flex flex-col space-y-3">
        {sidebarItems.map((sidebarItem, index) => (
          <NavLink className="rounded-md p-3  hover:text-[#836FFF] flex items-center justify-start gap-4  shadow-sm" to={sidebarItem.to} key={index}>
            <div>{sidebarItem.icon}</div>
            <div>{sidebarItem.item}</div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
