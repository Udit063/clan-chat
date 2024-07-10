const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen h-full w-screen bg-main">
      {children}
    </div>
  )
}
export default HomeLayout;
