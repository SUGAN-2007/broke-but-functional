import { Download, Upload } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DataBackupCardProps {
  exportCopied: boolean
  onExportJson: () => void
}

export function DataBackupCard({ exportCopied, onExportJson }: DataBackupCardProps) {
  return (
    <Card className="p-5">
      <h2 className="font-display font-[700] text-sm text-ink mb-1">Data Backup & Sync</h2>
      <p className="font-body text-xs text-ink-muted mb-4">
        Export your challenge state as a portable JSON snapshot or restore previous backup.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onExportJson}
          className="gap-1.5 text-xs font-semibold"
        >
          <Download size={14} />
          {exportCopied ? 'JSON Copied to Clipboard!' : 'Export Challenge Data (JSON)'}
        </Button>

        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] border border-border bg-surface hover:bg-surface-raised text-xs font-semibold text-ink cursor-pointer transition-colors">
          <Upload size={14} /> Import Backup
          <input
            type="file"
            accept=".json"
            className="sr-only"
            onChange={() => alert('Simulated import: Data restored successfully.')}
          />
        </label>
      </div>
    </Card>
  )
}
