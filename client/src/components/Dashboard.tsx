import StatsCard from './DashboardCard'
import ChevronRight from '@mui/icons-material/ChevronRight'
export default function Dashboard() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-4 grid-rows-5 gap-8">
        <div className="col-span-2 row-span-2">
          <StatsCard title="Total Contacts" value={20} icon={<ChevronRight />} />
        </div>
        <div className="col-span-2 row-span-2 col-start-3">
          <StatsCard title="Total Contacts" value={20} icon={<ChevronRight />} />
        </div>
        <div className="col-span-2 row-span-2 row-start-3">
          <StatsCard title="Total Contacts" value={20} icon={<ChevronRight />} />
        </div>
        <div className="col-span-2 row-span-2 col-start-3 row-start-3">
          <StatsCard title="Total Contacts" value={20} icon={<ChevronRight />} />
        </div>
      </div>
    </div>
  )
}
