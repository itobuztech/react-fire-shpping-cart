import React from 'react';

import '../Styles/pagination.css';

export default function Pagination() {
  return (
   <>
      <div className='px-6 py-3 border-t border-gray-100'>
              <div className='flex items-center justify-between pb-4'>
                <div className='buttons'>
                  <button type='button' className='button active'>
                    1
                  </button>
                  <button type='button' className='button'>
                    2
                  </button>
                  <button type='button' className='button'>
                    3
                  </button>
                </div>
                <small>Page 1 of 3</small>
              </div>
            </div>
   </>
  );
}
