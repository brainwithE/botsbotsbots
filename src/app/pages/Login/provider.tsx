import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
interface Props {
  children: React.ReactNode;
}

const LoginContext = React.createContext<any>({});

export function useLogin() {
  return React.useContext(LoginContext);
}

export function LoginProvider(props: Props) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const loginUser = async data => {
    try {
      setLoading(true);
      const user = await login(data);
      console.log(user);
      setLoading(false);
    } catch (error) {
      console.error('Invalid credentials', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContext.Provider value={{ loading, loginUser }}>
      {props.children}
    </LoginContext.Provider>
  );
}
