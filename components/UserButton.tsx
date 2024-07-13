interface UserButtonProps {
  id: string;
  name: string;
}

export const UserButton = async ({ id, name }: UserButtonProps) => {

  return (
    <button className="h-[48px] w-[48px] bg-neutral-800 flex text-xl text-primary items-center justify-center rounded-full">
      {name?.slice(0, 1)}
    </button>
  )
}
