'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MainButton } from 'app/components/shared/buttons/MainButton';
import { useState } from 'react';

const mutation = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3000/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            email: email,
            password: password
          }
        })
      });
      
      const responseData = await response.json();
      
      // Verificar si hay errores en la respuesta
      if (responseData.errors) {
        // Extraer el mensaje de error
        const errorMessage = responseData.errors[0]?.message || 'Error en la autenticación';
        setError(errorMessage);
        setLoading(false);
        return;
      }
      
      // Verificar si la respuesta contiene los datos esperados
      if (responseData.data?.login) {
        const { token, user } = responseData.data.login;
        
        // Guardar token en localStorage
        localStorage.setItem('auth_token', token);
        
        // Guardar información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        console.log('Login exitoso:', user);
        
        // Redirigir a la página principal
        router.push('/');
      } else {
        setError('Formato de respuesta inválido');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('Error al conectar con el servidor');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      <div className="m-4 flex-1 lg:flex-0 flex flex-col gap-10">
        <div className="my-4 lg:my-0 flex justify-center lg:justify-start">
          <div className="relative w-54 lg:w-27 h-16 lg:h-8">
            <Link className="cursor-pointer" href="/">
              <Image src="/images/logo.png" fill alt="logo" />
            </Link>
          </div>
        </div>

        <div className="mx-4 lg:mx-14 lg:my-20 flex-1 flex flex-col justify-start items-center gap-8">
          <div className="w-full flex flex-col items-center lg:items-start">
            <h1 className="text-[32px] font-[600]">Iniciar sesión</h1>
            <p className="text-center lg:text-start text-neutral-3 text-[12px]">
              Por favor, inicie sesión para continuar con su cuenta.
            </p>
          </div>
          <form className="w-[300px] lg:w-[400px] flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-3">
              <label>Correo Electrónico</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="shadow-input rounded-[12px] py-2 px-4 border border-neutral-3"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>Contraseña</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="shadow-input rounded-[12px] py-2 px-4 border border-neutral-3"
                type="password"
              />
              <Link href="/recovery-password" className="text-[12px]">
                ¿Te olvidaste tu contraseña?
              </Link>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <MainButton text={loading ? "Iniciando sesión..." : "Iniciar sesión"} handleClick={handleLogin} disabled={loading} />
          </form>
        </div>
      </div>
      <div className="hidden lg:block relative flex-1">
        <Image
          className="object-cover"
          src="/images/login-image.png"
          alt="image-login"
          fill
        />
      </div>
    </div>
  );
}
