import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { NavLink } from 'react-router-dom'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'

function Landing() {
  return (
    <div>
      <div id="hero-section" className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <header className="container mx-auto px-4 pt-24 pb-16 text-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="h-fit text-5xl font-bold bg-gradient-to-bl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">
                Manage Contacts Seamlessly, Grow Your Network Effortlessly!
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Powerful, intuitive contact management to streamline your business, boost relationships, and fuel growth.</p>
            </div>

            <div className="flex gap-4 justify-center pt-4">
              <NavLink to="/login">
                <button className="bg-violet-500 text-white  p-3 rounded-md">
                  Get Started <ChevronRightIcon />
                </button>
              </NavLink>

              <button className="bg-violet-500 text-white  p-3 rounded-md">
                Learn More <LightbulbOutlinedIcon />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div id=""></div>
    </div>
  )
}

export default Landing
