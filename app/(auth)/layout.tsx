import Image from "next/image"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-main">
      <Image
        src="/images/robot.png"
        alt="robot"
        width={500}
        height={500}
        className="z-0 fixed md:left-0 w-[200px] md:w-[500px]  md:top-5"
      />
      <Image
        src="/images/robot2.png"
        alt="robot2"
        width={500}
        height={500}
        className="z-0 fixed bottom-0  md:right-0 "
      />
      <div className="relative z-10">
        {children}
      </div>

    </div>
  )
}

export default AuthLayout

