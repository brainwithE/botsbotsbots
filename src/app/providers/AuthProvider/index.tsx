/**
 *
 * AuthProvider
 *
 */
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { profileBuilder } from 'utils/builders';
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
  const [userProfile, setUserProfile] = React.useState<any>();

  const login = async data => {
    const user = await signIn(data.email, data.password);

    if (user) {
      setIsUserAuthenticated(true);

      const profile = profileBuilder(user);
      setUserProfile(profile);
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

      const profile = profileBuilder(user);
      setUserProfile(profile);
    }

    if (!user) {
      setIsUserAuthenticated(false);
    }
    setIsAuthenticating(false);
  };

  const logoutUser = async () => {
    await logout();
    setIsUserAuthenticated(false);
    setUserProfile(null);
  };

  React.useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isUserAuthenticated) {
      history.push('/');
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
        userProfile,
        login,
        checkAuth,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
