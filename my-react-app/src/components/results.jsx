import React, { useContext } from 'react';
import './temel/temel.css';
import { GlobalContext } from '../context/GlobalState';

function Results() {
  const { result } = useContext(GlobalContext);
   console.log(result)
  // result ya da result['data'] undefined ise bir yedek içerik göster
  if (!result || !result['data']) {
    return <div className="temel_results">Yükleniyor veya veri mevcut değil...</div>;
  }

  console.log(result['data']);  // Konsolda veriyi logla, debug için faydalı

  return (
    <div className='temel_results'>
      <div className=''>
        <h2>SONUÇLAR</h2>
      </div>
      <div className=''>
        <div className=''>
          {result['data']}  // Veriyi burada göster
        </div>
        <div className=''>
          aab
        </div>
      </div>
      <div className=''>
        aaa
      </div>
    </div>
  );
}

export default Results;
