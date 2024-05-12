import React, { Component } from 'react'
import './temel.css'; // Navbar özel CSS
import ImageUploadForm from '../input_image'
class Main extends Component {
  render () {
   return(
      <div className='temel'>
         <div className='başlik'> 
            Lütfen ürün seçip fotoğraf yükleyin,
         </div>
         <ImageUploadForm/>

      </div>
   )
  };
}

export default Main;