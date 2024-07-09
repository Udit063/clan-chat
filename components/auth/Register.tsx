import { CardWrapper } from "./CardWrapper"
export const Register = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <CardWrapper headerLabel="Join Now" backLabel="Already have an account" backLabelHref="/login" description="create a new account to start a new conversation">
        <div>Hello</div>
      </CardWrapper>
    </div>
  )
}
