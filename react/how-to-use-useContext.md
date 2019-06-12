# A Quick Guidance to `useContext`

Ref:

- [TECHTIP: USER MANAGEMENT WITH REACT HOOKS](https://codious.io/user-management-with-react-hooks/)

1.  create `UserProvider`(to provide context in App.tsx) and `useUser`(the entry to get context data)

```js
import React, { createContext, useContext, useEffect, useState } from 'react';

interface State {
  user: object;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: State = {
  user: {},
  accessToken: '',
  setAccessToken: (() => null) as React.Dispatch<React.SetStateAction<string>>
};

const UserContext = createContext(initialState);

export function UserProvider({ children }: { children: any }) {
  const [accessToken, setAccessToken] = useState('hello');
  const [user, setUser] = useState({ name: 'abc' });
  return (
      <UserContext.Provider value={{ user, accessToken, setAccessToken }}>
        {children}
      </UserContext.Provider>
      )
}

export const useUser = () => useContext(UserContext);

```

2.  in `App.tsx`, just add `UserProvider` and wrap other components.

```js
import { UserProvider } from "./lib/userContext";

const App: React.FC = () => {
  return (
    <UserProvider>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </UserProvider>
  );
};
```

3. how to use context in common components?

```js
import { useUser } from "../../lib/userContext";
const myComponent = () => {
  const { accessToken, setAccessToken } = useUser();
  setAccessToken("New token");
  console.log("token: ", accessToken);
};
```
