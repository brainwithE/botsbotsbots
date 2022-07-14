import { useAlert } from 'app/providers/AlertProvider';
import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
interface Props {
  children: React.ReactNode;
}

const LoginContext = React.createContext<any>({});

export function useLogin() {
  return React.useContext(LoginContext);
}

export function LoginProvider(props: Props): JSX.Element {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { alert } = useAlert();

  const loginUser = async data => {
    try {
      setLoading(true);

      await login(data);
    } catch (error: any) {
      alert(error.message, 'error');
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
