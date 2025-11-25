import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} MetLife Financial Services Kwon Nakyeong Team. All rights reserved.
            </p>
            <p className="text-center text-sm text-gray-300 mt-2">
              본 사이트는 팀 내부 업무 지원 및 정보 공유를 목적으로 운영됩니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;