export const FormLayout = ({
  children
}:Readonly<{
  children:React.ReactNode;
}>) =>{
  return(
    <form className="w-full flex flex-col gap-6">
      {children}
    </form>
  )
}