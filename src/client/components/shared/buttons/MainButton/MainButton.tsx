export const MainButton = ({
    handleClick,
    text,
    disabled = false
}:Readonly<{
    handleClick:()=>void,
    text:string,
    disabled?: boolean
}>) =>{
    return(
        <button 
            onClick={handleClick}
            disabled={disabled}
            className={`
                py-2 px-10 
                ${disabled ? 'bg-gray-400' : 'bg-primary-1 hover:bg-alert-red'} 
                text-neutral-5 
                rounded-[12px] 
                ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                transition-all duration-200
                `}
        >
          {text}
        </button>
    )
}