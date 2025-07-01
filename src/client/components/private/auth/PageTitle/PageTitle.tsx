export const PageTitle = ({mainTitle, description}:Readonly<{mainTitle:string, description:string}>) => {
  return (
    <div className="w-full flex flex-col items-start">
      <h1 className="text-[32px] font-[600]">{mainTitle}</h1>
      <p className="text-start text-neutral-3 text-[12px]">
        {description}
      </p>
    </div>
  );
};
