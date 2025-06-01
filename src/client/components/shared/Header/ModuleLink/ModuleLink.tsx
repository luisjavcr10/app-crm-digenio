import Link from "next/link"

export const ModuleLink= ({
  href, 
  moduleTitle,
  pathname
}:Readonly<{
  href:string, 
  moduleTitle:string,
  pathname:string
}>) => {
  return (
    <Link 
        href={href}
        className={`text-[12px] cursor-pointer hover:text-primary-2 ${pathname === href ? "text-primary-1 font-[600]" : ""}`}
    >
        {moduleTitle}
    </Link>
  )
}