export const profileBuilder = user => {
  const { uid, displayName, email, isAnonymous, providerData } = user;

  return { uid, displayName, email, isAnonymous, providerData };
};
