import {
  Bell,
  CalendarDays,
  Database,
  FileSpreadsheet,
  Instagram,
  MessageCircle,
  MessagesSquare,
  Plug,
  Send,
  type LucideIcon,
} from "lucide-react";

export const platformIconByLabel: Record<string, LucideIcon> = {
  WhatsApp: MessageCircle,
  "Facebook Messenger": MessagesSquare,
  "Instagram DM": Instagram,
  Telegram: Send,
  "Website Chat": MessageCircle,
  "Google Sheets": FileSpreadsheet,
  "Google Calendar": CalendarDays,
  CRM: Database,
  "Telegram Notifications": Bell,
  "Other APIs": Plug,
};
