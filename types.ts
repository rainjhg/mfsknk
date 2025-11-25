export interface Member {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  joinDate: string;
  status: 'active' | 'leave';
}

export interface ScheduleEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  type: 'branch' | 'team' | 'meeting';
  description?: string;
}

export interface Resource {
  id: string;
  title: string;
  category: 'manual' | 'application' | 'education' | 'marketing';
  date: string;
  fileType: 'pdf' | 'ppt' | 'doc' | 'xls';
  size: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isNotice?: boolean;
}

export type ViewMode = 'calendar' | 'list';