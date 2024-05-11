import React, { useState, useRef } from 'react';

function ImageDropAndUpload() {
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState('');
    const fileInputRef = useRef(null);

    const onDragOver = (event) => {
        event.preventDefault(); // Varsayılan davranışı önle
    };

    const onDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            processFile(event.dataTransfer.files[0]);
        }
    };

    const onClick = () => {
        fileInputRef.current.click(); // input elementine tıkla
    };

    const onFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            processFile(event.target.files[0]);
        }
    };

    const processFile = (file) => {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        if (!imageFile) {
            alert('Lütfen bir resim dosyası yükleyin.');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch('https://your-backend-url.com/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log('Sunucu yanıtı:', result);
            alert('Resim başarıyla yüklendi.');
        } catch (error) {
            console.error('Yükleme hatası:', error);
            alert('Resim yüklenirken bir hata oluştu.');
        }
    };

    return (
        <div style={{ width: '260px', height: '260px', padding: '10px', border: '1px solid #ccc',marginTop:'20px' }}>
            <div
                onClick={onClick}
                onDragOver={onDragOver}
                onDrop={onDrop}
                style={{
                    width: '100%',
                    height: '100%',
                    border: '2px dashed #aaa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${preview})`,
                    backgroundPosition:'center',
                    cursor: 'pointer'
                }}
            >
                {!preview && <p>Tıklayın veya sürükleyip bırakın</p>}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{ display: 'none' }} 
            />
            <button onClick={handleSubmit} style={{ 
            marginTop: '20px',
            width: '100%' ,
            backgroundColor:'black',
            color:'white',
            height: '40px',
            borderRadius:'1rem',
            fontSize:'20px',
            fontWeight:'bold'

            }}>
                Gönder
            </button>
        </div>
    );
}

export default ImageDropAndUpload;
