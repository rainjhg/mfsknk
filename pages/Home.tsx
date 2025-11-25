import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, FolderOpen, MessageSquare, ArrowRight, Bell, ChevronRight } from 'lucide-react';
import { IMAGE_ASSETS, TEAM_SLOGAN, INITIAL_SCHEDULES, INITIAL_MESSAGES } from '../constants';

const Home: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  // Filter mock schedules for demonstration; logically showing upcoming
  const upcomingSchedules = INITIAL_SCHEDULES.slice(0, 3);
  const recentNotice = INITIAL_MESSAGES.find(m => m.isNotice);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-primary h-96">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover mix-blend-multiply opacity-60"
            src={IMAGE_ASSETS.HERO_BG}
            alt="Office Building"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
            {TEAM_SLOGAN}
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            체계적인 일정 관리와 신속한 정보 공유로 성공을 앞당깁니다.<br/>
            메트라이프 금융서비스 권나경 팀의 디지털 워크스페이스입니다.
          </p>
          <div className="mt-10">
            <Link
              to="/schedule"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg shadow-lg transition-transform transform hover:-translate-y-1"
            >
              이번 주 일정 확인하기
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 w-full pb-12">
        
        {/* Quick Stats / Notice */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8 border-l-4 border-accent flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-start gap-4 mb-4 md:mb-0">
            <div className="p-3 bg-red-50 rounded-full text-red-500">
              <Bell size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">최신 공지사항</h3>
              <p className="text-gray-600 mt-1">{recentNotice?.content || '등록된 공지사항이 없습니다.'}</p>
            </div>
          </div>
          <Link to="/chat" className="text-sm font-semibold text-primary hover:text-blue-700 whitespace-nowrap flex items-center">
            대화방 바로가기 <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Quick Links */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">바로가기</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardCard
                title="팀원 관리"
                desc="팀원 연락처 및 현황 조회"
                icon={<Users className="h-6 w-6 text-white" />}
                color="bg-blue-500"
                link="/members"
              />
              <DashboardCard
                title="일정 안내"
                desc="지점 및 팀 주요 일정 확인"
                icon={<Calendar className="h-6 w-6 text-white" />}
                color="bg-indigo-500"
                link="/schedule"
              />
              <DashboardCard
                title="자료실"
                desc="영업 자료 및 신청서 다운로드"
                icon={<FolderOpen className="h-6 w-6 text-white" />}
                color="bg-emerald-500"
                link="/resources"
              />
              <DashboardCard
                title="팀 대화방"
                desc="실시간 소통 및 공지사항"
                icon={<MessageSquare className="h-6 w-6 text-white" />}
                color="bg-orange-400"
                link="/chat"
              />
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">주요 일정 요약</h2>
              <Link to="/schedule" className="text-sm text-primary hover:underline">전체보기</Link>
            </div>
            <div className="space-y-4">
              {upcomingSchedules.map((schedule) => (
                <div key={schedule.id} className="flex items-start space-x-3 pb-4 border-b last:border-0 border-gray-100">
                  <div className="flex-shrink-0 w-12 text-center">
                    <span className="block text-xs font-bold text-gray-500 uppercase">{new Date(schedule.date).toLocaleString('en-US', { month: 'short' })}</span>
                    <span className="block text-xl font-bold text-gray-800">{new Date(schedule.date).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{schedule.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{schedule.time} | {schedule.type === 'branch' ? '지점' : '팀'}</p>
                  </div>
                </div>
              ))}
              {upcomingSchedules.length === 0 && (
                 <p className="text-gray-500 text-sm">예정된 일정이 없습니다.</p>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
               <h3 className="text-sm font-semibold text-gray-900 mb-3">팀 목표 달성 현황</h3>
               {/* Mock Progress Bar */}
               <div className="mb-2 flex justify-between text-xs">
                 <span className="text-gray-600">이번 달 목표 (MDRT)</span>
                 <span className="text-primary font-bold">75%</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, desc, icon, color, link }) => (
  <Link to={link} className="group bg-white overflow-hidden rounded-lg shadow hover:shadow-xl transition-shadow duration-300 border border-gray-100">
    <div className="p-6 flex items-center">
      <div className={`flex-shrink-0 rounded-md p-3 ${color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div className="ml-5">
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
      </div>
      <div className="ml-auto">
        <ChevronRight className="text-gray-300 group-hover:text-primary" />
      </div>
    </div>
  </Link>
);

export default Home;