export const FormLayout = ({children}:Readonly<{children:React.ReactNode}>) =>{
  return(
    <div className="text-[12px] w-full flex flex-col gap-6 pt-4 pb-8 px-6 border-b border-neutral-3 dark:border-neutral-2">
      {children}
    </div>
  )
}