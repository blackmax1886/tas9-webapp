import AuthGuard from './AuthGuard'

const RootLayout = ({ children }: { children: JSX.Element }) => {
  return <>{children}</>
}

const GuardLayout = ({ children }: { children: JSX.Element }) => {
  return <AuthGuard>{children}</AuthGuard>
}

export { RootLayout, GuardLayout }
