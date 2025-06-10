export const TitleSection = ({
  children, name, description
}:Readonly<{
  children:React.ReactNode, name:string, description:string
}>) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
      <div className="w-full">
        <p className="text-[36px] font-[600] mb-2">{name}</p>
        <p>
          {description}
        </p>
      </div>
      <div className="w-full flex justify-center lg:justify-end min-w-[260px] flex-1">
        {children}
      </div>
    </div>
  );
};
