import { auth, signOut } from "@/auth";
import { ModeToggle } from "@/components/toggle";
import { Button } from "@/components/ui/button";

const HomePage = async () => {
  const session = await auth()
  return (
    <div className="h-full">
      {session && (
        <form action={async () => {
          "use server"
          await signOut()
        }}>
          <Button type='submit'>Sign Out</Button>
          <ModeToggle />
        </form>)
      }
    </div>
  )
}
export default HomePage;
