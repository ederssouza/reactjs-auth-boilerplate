export type Props = {
  text?: string
}

function ErrorState(props: Props) {
  const { text = 'An internal error occurred on the server' } = props

  return <div>{text}</div>
}

export default ErrorState
