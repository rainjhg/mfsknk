import React, { useState } from 'react';
import { INITIAL_SCHEDULES, IMAGE_ASSETS } from '../constants';
import { ViewMode } from '../types';
import { Calendar as CalendarIcon, List, Clock, MapPin } from 'lucide-react';

const Schedule: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  
  // Helper to check if a date string matches current calendar cell
  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return INITIAL_SCHEDULES.filter(s => s.date === dateStr);
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Sub Page Header */}
      <div className="relative h-64 bg-primary">
        <img src={IMAGE_ASSETS.SUB_BG} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-10">
          <h1 className="text-3xl font-bold text-white">일정 안내</h1>
          <p className="text-blue-100 mt-2">지점 및 팀의 주요 일정을 확인하세요.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
             <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-200 rounded-full">&lt;</button>
             <h2 className="text-2xl font-bold text-gray-800">
               {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
             </h2>
             <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-200 rounded-full">&gt;</button>
          </div>
          
          <div className="flex bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md flex items-center text-sm font-medium transition-all ${viewMode === 'calendar' ? 'bg-white text-primary shadow' : 'text-gray-600'}`}
            >
              <CalendarIcon size={16} className="mr-2" /> 달력형
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md flex items-center text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow' : 'text-gray-600'}`}
            >
              <List size={16} className="mr-2" /> 목록형
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-6 text-sm">
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>지점 일정</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>팀 일정</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>미팅</div>
        </div>

        {viewMode === 'calendar' ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 text-center text-gray-500 text-sm py-3">
              <div className="text-red-500">일</div>
              <div>월</div>
              <div>화</div>
              <div>수</div>
              <div>목</div>
              <div>금</div>
              <div className="text-blue-500">토</div>
            </div>
            <div className="grid grid-cols-7 auto-rows-fr">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[120px] border-b border-r border-gray-100 bg-gray-50/50 p-2"></div>
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const events = getEventsForDate(day);
                return (
                  <div key={day} className="min-h-[120px] border-b border-r border-gray-100 p-2 relative hover:bg-blue-50/20 transition-colors">
                    <span className={`text-sm font-medium ${day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? 'bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-gray-700'}`}>
                      {day}
                    </span>
                    <div className="mt-2 space-y-1">
                      {events.map(event => (
                        <div 
                          key={event.id} 
                          className={`text-xs px-1.5 py-0.5 rounded truncate text-white cursor-pointer
                            ${event.type === 'branch' ? 'bg-blue-500' : event.type === 'team' ? 'bg-green-500' : 'bg-purple-500'}
                          `}
                          title={`${event.time} ${event.title}`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-lg shadow overflow-hidden divide-y divide-gray-200">
             {INITIAL_SCHEDULES.sort((a,b) => a.date.localeCompare(b.date)).map(event => (
               <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                   <div className="flex items-start space-x-4">
                     <div className={`flex-shrink-0 w-1.5 h-12 rounded-full ${event.type === 'branch' ? 'bg-blue-500' : event.type === 'team' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                     <div>
                       <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                       <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                     </div>
                   </div>
                   <div className="mt-4 sm:mt-0 text-right text-sm text-gray-500 space-y-1">
                     <div className="flex items-center sm:justify-end text-gray-900 font-medium">
                       {event.date}
                     </div>
                     <div className="flex items-center sm:justify-end">
                       <Clock size={14} className="mr-1" /> {event.time}
                     </div>
                     <div className="flex items-center sm:justify-end capitalize">
                        <MapPin size={14} className="mr-1" />
                        {event.type === 'branch' ? '지점 내' : event.type === 'team' ? '회의실/외부' : '고객사'}
                     </div>
                   </div>
                 </div>
               </div>
             ))}
             {INITIAL_SCHEDULES.length === 0 && (
                 <div className="p-8 text-center text-gray-500">등록된 일정이 없습니다.</div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;