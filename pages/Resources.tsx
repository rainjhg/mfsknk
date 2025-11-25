import React, { useState } from 'react';
import { INITIAL_RESOURCES, IMAGE_ASSETS } from '../constants';
import { Download, FileText, File, Search, Filter } from 'lucide-react';

const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [search, setSearch] = useState('');

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'manual', name: '상품설명서' },
    { id: 'application', name: '청약/신청서' },
    { id: 'education', name: '교육자료' },
    { id: 'marketing', name: '마케팅' },
  ];

  const filteredResources = INITIAL_RESOURCES.filter(res => {
    const matchesTab = activeTab === 'all' || res.category === activeTab;
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getFileIcon = (type: string) => {
    // Simplified icon logic
    return <FileText className="text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-bg">
       <div className="relative h-64 bg-primary">
        <img src={IMAGE_ASSETS.SUB_BG} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-10">
          <h1 className="text-3xl font-bold text-white">자료실</h1>
          <p className="text-blue-100 mt-2">영업 지원을 위한 각종 서식과 자료를 다운로드할 수 있습니다.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filter & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === cat.id 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="자료명 검색" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* File List */}
        <div className="bg-white shadow overflow-hidden rounded-md border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {filteredResources.map((resource) => (
              <li key={resource.id} className="hover:bg-gray-50 transition-colors">
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center min-w-0 flex-1 mr-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                        <span className="uppercase font-bold text-xs text-gray-500">{resource.fileType}</span>
                    </div>
                    <div className="ml-4 min-w-0">
                      <p className="text-base font-medium text-primary truncate">{resource.title}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <span>{categories.find(c => c.id === resource.category)?.name}</span>
                        <span className="text-gray-300">|</span>
                        <span>{resource.date}</span>
                        <span className="text-gray-300">|</span>
                        <span>{resource.size}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary bg-blue-50 hover:bg-blue-100 focus:outline-none transition-colors">
                      <Download className="h-4 w-4 mr-2" />
                      다운로드
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
           {filteredResources.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                    <File className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    검색된 자료가 없습니다.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Resources;