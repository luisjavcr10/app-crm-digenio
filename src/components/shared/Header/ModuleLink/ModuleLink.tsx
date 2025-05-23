import Link from "next/link"

export const ModuleLink= ({href, moduleTitle}:Readonly<{href:string, moduleTitle:string}>) => {
  return (
    <Link 
        href={href}
        className="text-[12px] cursor-pointer"
    >
        {moduleTitle}
    </Link>
  )
}