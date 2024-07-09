import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { ArrowUpRight, ChromeIcon } from "lucide-react";
import { Button } from "../ui/button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backLabel: string;
  backLabelHref: string;
  description: string;
}

export const CardWrapper = ({ children, headerLabel, backLabel, backLabelHref, description }: CardWrapperProps) => {
  return (
    <Card className="w-full mx-3 xl:mx-0 xl:w-1/4 flex bg-layer text-white flex-col border-second_text shadow-sm shadow-second_text">
      <CardHeader className="text-center">
        <CardTitle >{headerLabel}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        <Button className="w-full mt-4 flex gap-4 bg-gray-800 hover:bg-second_text hover:text-main duration-800 text-lg">
          <p>Continue with Google</p>
          <ChromeIcon />
        </Button>
      </CardContent>

      <CardFooter>
        <Link href={backLabelHref} className="flex">
          <p>{backLabel}</p>
          <ArrowUpRight size={20} />
        </Link>
      </CardFooter>
    </Card>
  )
}
