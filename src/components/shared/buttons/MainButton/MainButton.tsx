export const MainButton = ({
    handleClick,
    text
}:Readonly<{
    handleClick:()=>void,
    text:string
}>) =>{
    return(
        <button 
            onClick={handleClick}
            className="
                py-2 px-10 
                bg-primary-1 hover:bg-alert-red 
                text-neutral-5 
                rounded-[12px] 
                cursor-pointer
                "
        >
          {text}
        </button>
    )
}