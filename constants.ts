import { Member, ScheduleEvent, Resource, ChatMessage } from './types';
import { FileText, FileSpreadsheet, File, Presentation } from 'lucide-react';

export const APP_NAME = "권나경 팀 포털";
export const TEAM_SLOGAN = "더 높은 곳을 향한 동행";

export const INITIAL_MEMBERS: Member[] = [
  { id: '1', name: '권나경', position: '팀장 (Team Manager)', phone: '010-1234-5678', email: 'nk.kwon@metlife.com', joinDate: '2018-03-15', status: 'active' },
  { id: '2', name: '김철수', position: 'FSR (Senior)', phone: '010-2345-6789', email: 'cs.kim@metlife.com', joinDate: '2019-05-20', status: 'active' },
  { id: '3', name: '이영희', position: 'FSR', phone: '010-3456-7890', email: 'yh.lee@metlife.com', joinDate: '2020-11-02', status: 'active' },
  { id: '4', name: '박준형', position: 'FSR', phone: '010-4567-8901', email: 'jh.park@metlife.com', joinDate: '2021-01-15', status: 'active' },
  { id: '5', name: '최수진', position: 'FSR (Rookie)', phone: '010-5678-9012', email: 'sj.choi@metlife.com', joinDate: '2023-08-01', status: 'active' },
];

export const INITIAL_SCHEDULES: ScheduleEvent[] = [
  { id: '1', title: '지점 전체 조회', date: '2024-05-02', time: '08:30', type: 'branch', description: '5월 전략 공유 및 시상' },
  { id: '2', title: '팀 주간 회의', date: '2024-05-07', time: '10:00', type: 'team', description: '주간 활동 점검 및 RP 연습' },
  { id: '3', title: '상품 교육 (종신보험)', date: '2024-05-08', time: '09:00', type: 'branch', description: '신상품 특징 및 세일즈 포인트' },
  { id: '4', title: '권나경 팀 회식', date: '2024-05-10', time: '18:30', type: 'team', description: '장소: 강남역 고기집' },
  { id: '5', title: 'VIP 고객 초청 세미나', date: '2024-05-15', time: '14:00', type: 'meeting', description: '상속 증여 세미나' },
];

export const INITIAL_RESOURCES: Resource[] = [
  { id: '1', title: '2024년 5월 변액보험 운용 설명서', category: 'manual', date: '2024-05-01', fileType: 'pdf', size: '2.4MB' },
  { id: '2', title: '신규 고객 상담 신청서 양식', category: 'application', date: '2024-04-20', fileType: 'doc', size: '150KB' },
  { id: '3', title: '법인 CEO 플랜 제안서 (템플릿)', category: 'marketing', date: '2024-03-15', fileType: 'ppt', size: '5.1MB' },
  { id: '4', title: '달러 종신보험 세일즈 포인트', category: 'education', date: '2024-02-28', fileType: 'pdf', size: '1.8MB' },
  { id: '5', title: '고객 관리 대장 (엑셀)', category: 'manual', date: '2024-01-10', fileType: 'xls', size: '89KB' },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  { id: '1', sender: '권나경 팀장', content: '[공지] 이번 주 금요일 회식 장소가 변경되었습니다. 확인 부탁드립니다.', timestamp: '2024-05-08 14:20', isNotice: true },
  { id: '2', sender: '김철수', content: '넵 알겠습니다! 팀장님.', timestamp: '2024-05-08 14:25' },
  { id: '3', sender: '이영희', content: '이번 달 마감 일정 다시 한번 체크 부탁드려요~', timestamp: '2024-05-09 09:15' },
  { id: '4', sender: '박준형', content: '지금 지점 교육장으로 이동 중입니다.', timestamp: '2024-05-09 09:30' },
];

export const IMAGE_ASSETS = {
  HERO_BG: "https://loremflickr.com/1600/900/skyscraper,building",
  SUB_BG: "https://loremflickr.com/1600/400/office,abstract",
};