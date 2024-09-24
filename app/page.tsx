import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className=" flex flex-col items-center justify-center">
        <div className="h-[40rem] flex flex-col items-center justify-center">
          <BackgroundBeamsWithCollision>
            <TextHoverEffect text="Clan Chat" />
          </BackgroundBeamsWithCollision>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-4xl text-neutral-400 font-semibold">Group chat that is all fun and games</p>
          <Button className="w-36" variant="secondary"><Link href="/login">Login</Link></Button>
        </div>
      </div>    </main>
  );
}
