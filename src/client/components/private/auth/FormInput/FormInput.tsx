export const FormInput = ({
  children,
  type,
  value,
  labelText,
  handleChange
}:Readonly<{
  children?:React.ReactNode;
  type:'email'|'password'
  value:string;
  labelText:string;
  handleChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}>) => {
  return (
    <div className="flex flex-col gap-3">
      <label>{labelText}</label>
      <input
        value={value}
        onChange={handleChange}
        className="shadow-input rounded-[12px] py-3 px-4 border-[1px] border-neutral-3 outline-neutral-3 caret-neutral-3 bg-neutral-4"
        type={type==='email'? 'email' : 'password'}
      />
      {children}
    </div>
  );
};
