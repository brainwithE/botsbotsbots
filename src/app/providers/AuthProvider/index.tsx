/**
 *
 * AuthProvider
 *
 */
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { signIn, logout, getUser } from '../../../utils/firebase';

interface Props {
  children: React.ReactNode;
}

const AuthContext = React.createContext<any>({ isAuthenticated: false });

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider(props: Props) {
  const history = useHistory();
  const [isUserAuthenticated, setIsUserAuthenticated] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);

  const login = async data => {
    const user = await signIn(data.email, data.password);

    if (user) {
      setIsUserAuthenticated(true);
    }

    if (!user) {
      throw new Error('Invalid credentials');
    }
  };

  const checkAuth = async () => {
    setIsAuthenticating(true);
    console.log('checking auth');
    const user = await getUser();

    if (user) {
      setIsUserAuthenticated(true);
    }

    if (!user) {
      history.push('/');
      setIsUserAuthenticated(false);
    }
    setIsAuthenticating(false);
  };

  const logoutUser = async () => {
    await logout();
    setIsUserAuthenticated(false);
  };

  React.useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!isUserAuthenticated) {
      history.push('/');
    }

    if (isUserAuthenticated) {
      history.push('/dashboard');
    }
  }, [history, isUserAuthenticated]);

  if (isAuthenticating) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider
      value={{
        isUserAuthenticated,
        isAuthenticating,
        login,
        checkAuth,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
