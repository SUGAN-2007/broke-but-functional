import { useState } from 'react'
import { Share2, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ShareableRecapCardProps {
  shareTagline: string
}

export function ShareableRecapCard({ shareTagline }: ShareableRecapCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyRecap = () => {
    navigator.clipboard?.writeText(shareTagline)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <Card className="p-5 bg-brand text-brand-fg border-brand">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-display font-bold text-sm text-brand-fg">Shareable Challenge Card</p>
          <p className="font-body text-xs opacity-80 mt-1 max-w-[55ch]">
            "{shareTagline}"
          </p>
        </div>
        <Button
          variant="accent"
          size="sm"
          onClick={handleCopyRecap}
          className="self-start sm:self-auto gap-1.5 text-xs font-semibold"
        >
          {copied ? (
            <>
              <CheckCircle2 size={14} /> Copied to Clipboard
            </>
          ) : (
            <>
              <Share2 size={14} /> Copy Recap
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
