export const Card = ({
    title, 
    description,
}:Readonly<{
    title:string,
    description:string
}>) =>{
    return(
        <div className="flex flex-col items-center justify-center gap-5 text-center border border-neutral-3 rounded-[12px] 
       py-4 px-6">
          <p className="text-[34px] font-[600]">{title}</p>
          <p className="text-[14px]">
            {description}
          </p>
        </div>
    )
}