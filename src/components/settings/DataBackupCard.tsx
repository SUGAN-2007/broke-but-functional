import { useState, useRef } from 'react'
import { Download, Upload, Check, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DataBackupCardProps {
  exportCopied: boolean
  onExportJson: () => void
  onImportSuccess: () => void
}

export function DataBackupCard({ exportCopied, onExportJson, onImportSuccess }: DataBackupCardProps) {
  const [importStatus, setImportStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 1 MB limit check
    const MAX_SIZE = 1024 * 1024 // 1 MB
    if (file.size > MAX_SIZE) {
      setImportStatus({
        type: 'error',
        message: 'File exceeds 1 MB limit. Import rejected.',
      })
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    try {
      const text = await file.text()
      // Safe JSON parsing without eval
      const json = JSON.parse(text)

      // Dynamic import of storage and schema to keep bundle tight
      const { ExportImportPayloadSchema } = await import('@/types/schemas')
      const { saveStoredSettings, saveStoredTheme, saveStoredFinanceState } = await import('@/lib/storage')

      const validation = ExportImportPayloadSchema.safeParse(json)
      if (!validation.success) {
        setImportStatus({
          type: 'error',
          message: 'Invalid schema or unknown keys detected in backup file.',
        })
        if (fileInputRef.current) fileInputRef.current.value = ''
        return
      }

      const { settings, theme, financeState } = validation.data
      saveStoredSettings(settings)
      if (theme) saveStoredTheme(theme)
      if (financeState) saveStoredFinanceState(financeState)

      setImportStatus({
        type: 'success',
        message: 'Backup restored successfully from IndexedDB!',
      })
      onImportSuccess()
    } catch {
      setImportStatus({
        type: 'error',
        message: 'Failed to parse JSON file.',
      })
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

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
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {importStatus.type !== 'idle' && (
        <div
          className={`mt-3 p-2.5 rounded-[10px] text-xs font-medium flex items-center gap-2 ${
            importStatus.type === 'success'
              ? 'bg-safe-bg text-safe border border-safe/30'
              : 'bg-danger-bg text-danger border border-danger/30'
          }`}
          role="status"
        >
          {importStatus.type === 'success' ? (
            <Check size={14} className="shrink-0" />
          ) : (
            <AlertCircle size={14} className="shrink-0" />
          )}
          <span>{importStatus.message}</span>
        </div>
      )}
    </Card>
  )
}

