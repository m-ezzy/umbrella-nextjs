import React, { createContext, useReducer, ReactNode } from 'react'

// Define the initial state and action types
type AuthState = {
  isAuthenticated: boolean;
  user: null | { id: string; name: string };
}

type AuthAction =
  | { type: 'LOGIN'; payload: { id: string; name: string } }
  | { type: 'LOGOUT' }

// Define the initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

// Create the context
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({ state: initialState, dispatch: () => null });

// Create a reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

// Create the provider component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

// Export the context and provider
export { AuthContext, AuthProvider }
