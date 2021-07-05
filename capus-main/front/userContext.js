import React from 'react';

export const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

export const withUser = Component => props => (
  <UserContext.Consumer>
    {store => <Component {...props} {...store} />}
  </UserContext.Consumer>
);
