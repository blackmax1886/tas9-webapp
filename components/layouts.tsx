import AuthGuard from './auth_guard'

const RootLayout = ({ children }: { children: JSX.Element }) => {
  return <>{children}</>
}

const GuardLayout = ({ children }: { children: JSX.Element }) => {
  return <AuthGuard>{children}</AuthGuard>
}

export { RootLayout, GuardLayout }
