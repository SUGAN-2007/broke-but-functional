import type { Connector, ImportedItem, SyncLogEntry } from '@/types/finance'

export const connectors: Connector[] = [
  {
    id: 'conn-sms',
    name: 'SMS Transaction Reader',
    sourceType: 'sms',
    status: 'needs-reconnect',
    needsReconnect: true,
    lastSync: '18 hours ago',
    itemsDetected: 14,
    description: 'Parses debit & credit notification alerts from SBI, HDFC, ICICI, Axis and Paytm without network storage.',
    autoAddBills: true,
  },
  {
    id: 'conn-upi',
    name: 'UPI Intent & App Feed',
    sourceType: 'upi',
    status: 'connected',
    lastSync: '12 mins ago',
    itemsDetected: 28,
    description: 'Intercepts transaction confirmation callbacks from Google Pay, PhonePe, Cred and BHIM.',
    autoAddBills: true,
  },
  {
    id: 'conn-pdf',
    name: 'Net Banking e-Statement',
    sourceType: 'bank_pdf',
    status: 'connected',
    lastSync: 'Yesterday, 8:40 PM',
    itemsDetected: 42,
    description: 'Local on-device parser for monthly bank account statements (HDFC, SBI, ICICI format support).',
    autoAddBills: false,
  },
]

export const importedInbox: ImportedItem[] = [
  {
    id: 'inbox-001',
    merchant: 'Swiggy',
    description: 'Swiggy delivery lunch order',
    amount: 349,
    date: 'Oct 10, 1:45 PM',
    dayNumber: 8,
    category: 'Food',
    source: 'SMS Alert (HDFC)',
  },
  {
    id: 'inbox-002',
    merchant: 'Google Play',
    description: 'Cloud storage recurring subscription',
    amount: 130,
    date: 'Oct 10, 11:20 AM',
    dayNumber: 8,
    category: 'Entertainment',
    source: 'UPI (GPay)',
  },
  {
    id: 'inbox-003',
    merchant: 'Cafe Coffee Day',
    description: 'Espresso & cold coffee',
    amount: 210,
    date: 'Oct 9, 6:15 PM',
    dayNumber: 7,
    category: 'Food',
    source: 'UPI (PhonePe)',
    isDuplicate: true,
  },
]

export const syncLogs: SyncLogEntry[] = [
  {
    id: 'log-001',
    message: 'Local regex rule matched 1 new Swiggy debit of ₹349',
    timestamp: 'Today, 1:46 PM',
    type: 'success',
  },
  {
    id: 'log-002',
    message: 'SMS parser session token expired; requires user re-authorization',
    timestamp: 'Today, 8:12 AM',
    type: 'warning',
  },
  {
    id: 'log-003',
    message: 'Auto-categorization applied "Food" to 3 recent transactions',
    timestamp: 'Oct 9, 8:15 PM',
    type: 'info',
  },
]

export const syncActivityLogs = syncLogs
export const syncInboxItems = importedInbox
