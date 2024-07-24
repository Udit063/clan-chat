import { ChannelType } from "@prisma/client"
import { Hash, Headset, Video } from "lucide-react";

interface ChannelHeaderProps {
  name: string;
  type: ChannelType;
}

const iconsMap = {
  [ChannelType.TEXT]: <Hash size={30} />,
  [ChannelType.AUDIO]: <Headset size={30} />,
  [ChannelType.VIDEO]: <Video size={30} />
}

export const ChannelHeader = ({ name, type }: ChannelHeaderProps) => {
  return (
    <div className="w-full  shadow-lg shadow-[#05040F] border-main py-3 px-8">
      <div className="flex items-center gap-2">
        {iconsMap[type]}
        <h1 className="text-3xl">{name}</h1>
      </div>
    </div>
  )
}
