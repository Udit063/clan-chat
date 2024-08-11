import { NavigationSidebar } from "@/components/bars/NavigationSidebar"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-main">
      <div className=" h-full w-[72px] flex flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <div className="pl-[72px] h-full w-full ">
        {children}
      </div>
    </div>
  )
}

export default MainLayout
