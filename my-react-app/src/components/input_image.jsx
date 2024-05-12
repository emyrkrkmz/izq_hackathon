import React, { useState, useRef, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ImageDropAndUpload() {
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [textData, setTextData] = useState(''); // TextArea için state
    const fileInputRef = useRef(null);
    const {selected, data_isready, data_isready_set, setResult} = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (data_isready === 1) {
            navigate('/results');
            data_isready_set(0);
        } else {
            navigate('/tasks');
        }
    }, [data_isready, navigate, data_isready_set]);

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
        fileInputRef.current.click();
        
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

        let formData = new FormData();
        formData.append('file', imageFile);
        formData.append('text', textData); 
        
        try {
            const url = selected === "domates" ? "http://127.0.0.1:8000/predict/tomato" : "http://127.0.0.1:8000/predict/patato";
            const result = await axios.post(url, formData);
            console.log('Sunucu yanıtı:', textData);
            setResult(result.data);
            data_isready_set(1);
            alert('Resim ve metin başarıyla yüklendi.');
        } catch (error) {
            console.error('Yükleme hatası:', error);
            alert('Resim ve metin yüklenirken bir hata oluştu.');
        }
    };

    const handleTextChange = (event) => {
        setTextData(event.target.value);
    };

    const t = (selected === "domates" || selected === "patates");

    return (
        <div style={{padding: '10px', border: '1px solid #ccc', marginTop:'20px' }} >
            <div
                onClick={onClick}
                onDragOver={onDragOver}
                onDrop={onDrop}
                style={{
                    width: '260px',
                    height: '260px',
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
            <textarea
                value={textData}
                onChange={handleTextChange}
                style={{ width: '100%', height: '60px', marginTop: '10px' }}
                placeholder="Eklemek istediğiniz metni buraya yazın..."
            ></textarea>
            <button onClick={handleSubmit}
                disabled={!t}
                style={{ 
                    marginTop: '20px',
                    width: '100%' ,
                    backgroundColor:'black',
                    color:'white',
                    height: '40px',
                    borderRadius:'1rem',
                    fontSize:'20px',
                    fontWeight:'bold',
                    cursor:'pointer',
                    display:'block'
                }}
            >
                Gönder
            </button>
        </div>
    );
}

export default ImageDropAndUpload;
