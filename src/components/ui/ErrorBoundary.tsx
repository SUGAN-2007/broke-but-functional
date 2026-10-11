import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from './button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in route:', error, errorInfo)
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 min-h-[300px] text-center rounded-[16px] border border-danger/30 bg-danger-bg/20">
          <div className="w-12 h-12 rounded-full bg-danger-bg border border-danger/30 flex items-center justify-center text-danger mb-3">
            <AlertTriangle size={24} />
          </div>
          <h2 className="font-display font-[700] text-lg text-ink">
            Something went wrong rendering this page
          </h2>
          <p className="font-body text-xs text-ink-muted mt-1 max-w-[40ch] mb-4">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={this.handleReset}
            className="gap-1.5 text-xs font-semibold"
          >
            <RotateCcw size={13} /> Reload Page
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
