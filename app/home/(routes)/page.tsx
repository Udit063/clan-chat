import { auth, signOut } from "@/auth";
import { ModeToggle } from "@/components/toggle";
import { Button } from "@/components/ui/button";
import { getUserServer } from "@/data/server";

const HomePage = async () => {
  const session = await auth()
  const userId = session?.user?.id as string;

  const server = getUserServer(userId)
  console.log(server)

  if (!server) {
    return (
      <div>Create a server</div>
    )
  }

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
