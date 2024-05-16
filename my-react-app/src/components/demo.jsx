import React, { Component } from 'react'
import './temel/temel.css'
class Demo extends Component {
  render () {
   return(
      <div className='temel_demo'>
         <div className='başlik' style={{display:'flex', justifyContent:'center',flexDirection:'column',alignItems:'center'}} >
            <img style={{display:'blok',width:'50%',marginTop:'30px'}} src='https://static.ticimax.cloud/cdn-cgi/image/width=540,quality=99/43995/uploads/blog/yenilenmis-telefonlar-neden-doga-dostudu-2d1a.jpeg'></img>
            <h3 style={{display:'blok',width:'50%'}}  >
               Tarımdaki verimliliği artırmak amacıyla  bitkilerdeki hastalıkları tespit etmek ve olası çözümler getirmek
               üzerine kurulmus yapay zeka ile güçlendirilmiş bir web ürünü...
            </h3>
         </div>

      </div>
   )
  };
}

export default Demo;