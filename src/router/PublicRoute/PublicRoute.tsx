import { ReactNode, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorState, Loader } from '@/components'
import { useSession } from '@/hooks'

type Props = {
  children: ReactNode
}

function PublicRoute(props: Props) {
  const { children } = props

  const { isAuthenticated } = useSession()

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <ErrorBoundary
      fallback={<ErrorState text="An error occurred in the application." />}
    >
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default PublicRoute
