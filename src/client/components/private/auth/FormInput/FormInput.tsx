import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@/client/components/shared/icons';

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
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    if (type === 'email') return 'email';
    if (type === 'password') return showPassword ? 'text' : 'password';
    return 'text';
  };

  return (
    <div className="flex flex-col gap-3">
      <label>{labelText}</label>
      <div className="relative">
        <input
          value={value}
          onChange={handleChange}
          className="shadow-input rounded-[12px] py-3 px-4 pr-12 border-[1px] border-neutral-3 outline-neutral-3 caret-neutral-3 bg-neutral-4 dark:bg-neutral-2 w-full"
          type={getInputType()}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-2 dark:text-neutral-4 hover:text-neutral-1 dark:hover:text-neutral-5 transition-colors cursor-pointer"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? (
              <EyeOffIcon width={20} height={20} />
            ) : (
              <EyeIcon width={20} height={20} />
            )}
          </button>
        )}
      </div>
      {children}
    </div>
  );
};
