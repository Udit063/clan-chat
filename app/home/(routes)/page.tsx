import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const HomePage = async () => {
  const session = await auth()
  return (
    <div>
      {session && (
        <form action={async () => {
          "use server"
          await signOut()
        }}>
          <Button className='bg-black text-white mr-4' type='submit'>Sign Out</Button>
        </form>)
      }
    </div>
  )
}
export default HomePage;
