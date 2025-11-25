import React, { useState } from 'react';
import { INITIAL_MEMBERS, IMAGE_ASSETS } from '../constants';
import { Member } from '../types';
import { Plus, Trash2, Phone, Mail, User, Search } from 'lucide-react';

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simple mock add function
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newMember: Member = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      position: formData.get('position') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    setMembers([...members, newMember]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const filteredMembers = members.filter(m => 
    m.name.includes(searchTerm) || m.position.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-bg">
       {/* Sub Page Header */}
       <div className="relative h-64 bg-primary">
        <img src={IMAGE_ASSETS.SUB_BG} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-10">
          <h1 className="text-3xl font-bold text-white">팀원 명단</h1>
          <p className="text-blue-100 mt-2">권나경 팀의 소중한 팀원 현황입니다.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="이름 또는 직급 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary w-full sm:w-auto justify-center"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            팀원 등록
          </button>
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="px-6 py-5 flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                    <User size={24} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-bold text-gray-900 truncate">{member.name}</p>
                  <p className="text-sm text-gray-500 truncate">{member.position}</p>
                </div>
                <div>
                    <button onClick={() => handleDelete(member.id)} className="text-gray-400 hover:text-red-500 p-2">
                        <Trash2 size={18} />
                    </button>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                        <Phone className="mr-2 h-4 w-4 text-gray-400" />
                        {member.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Mail className="mr-2 h-4 w-4 text-gray-400" />
                        {member.email}
                    </div>
                    <div className="text-xs text-gray-400 pt-2">
                        입사일: {member.joinDate}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
            <div className="text-center py-12 text-gray-500">
                검색 결과가 없습니다.
            </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsModalOpen(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddMember}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">새 팀원 등록</h3>
                  <div className="space-y-4">
                    <input required name="name" placeholder="이름" className="w-full p-2 border rounded" />
                    <input required name="position" placeholder="직급" className="w-full p-2 border rounded" />
                    <input required name="phone" placeholder="연락처" className="w-full p-2 border rounded" />
                    <input required name="email" type="email" placeholder="이메일" className="w-full p-2 border rounded" />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                    등록
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;