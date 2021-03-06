import React from 'react';

import '../Styles/pagination.css';

export default function Pagination() {
  return (
   <>
      <div className='px-6 py-3 border-t border-gray-100'>
              <div className='flex justify-center pb-6 pt-4'>
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
              </div>
            </div>
   </>
  );
}
