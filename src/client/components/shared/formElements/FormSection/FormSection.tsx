export const FormSection = ({children}:Readonly<{children:React.ReactNode}>) =>{
  return(
    <div className="flex flex-col items-start lg:flex-row gap-4 lg:gap-8">
      {children}
    </div>
  )
}