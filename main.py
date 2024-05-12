from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import numpy as np
import pandas as pd

from PIL import Image
from io import BytesIO
import tensorflow as tf

from ChatGPT_API import OpenAIHelper

import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:*"
]

app.add_middleware(
    CORSMiddleware,
    
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = "sk-proj-XuKNWEKdiupI5DPVcLRRT3BlbkFJQ2GHFEig8WC0a1dTN2Xc"  # Gerçek API anahtarınızı buraya yerleştirin

helper = OpenAIHelper(api_key)
#OPENAI ver == 0.28


#MODEL = tf.keras.models.load_model("../ai_hackathon/patato1")
MODEL_patato = tf.keras.models.load_model('models/patato2.h5', compile=False)
CLASS_NAMES_patato = ["Early Blight", "Late Blight", "Healthy"]

MODEL_tomato = tf.keras.models.load_model('models/tomato10.h5', compile=False)

CLASS_NAMES_tomato = ['Tomato_Bacterial_spot',
 'Tomato_Early_blight',
 'Tomato_Late_blight',
 'Tomato_Leaf_Mold',
 'Tomato_Septoria_leaf_spot',
 'Tomato_Spider_mites_Two_spotted_spider_mite',
 'Tomato__Target_Spot',
 'Tomato_Tomato_YellowLeaf_Curl_Virus',
 'Tomato__Tomato_mosaic_virus',
 'Tomato_healthy']

tomato_diseases = {
    'Tomato_Bacterial_spot': 'Domates Bakteriyel Lekesi',
    'Tomato_Early_blight': 'Domates Erken Yanıklığı',
    'Tomato_Late_blight': 'Domates Geç Yanıklığı',
    'Tomato_Leaf_Mold': 'Domates Yaprak Küfü',
    'Tomato_Septoria_leaf_spot': 'Domates Septoria Yaprak Lekesi',
    'Tomato_Spider_mites_Two_spotted_spider_mite': 'Domates Örümcek Akarı (İki Noktalı Örümcek Akarı)',
    'Tomato__Target_Spot': 'Domates Hedef Lekesi',
    'Tomato_Tomato_YellowLeaf_Curl_Virus': 'Domates Sarı Yaprak Kıvırcıklık Virüsü',
    'Tomato__Tomato_mosaic_virus': 'Domates Mozaik Virüsü'
}



@app.get("/ping")
async def ping():
    return {"message": "pong"}


def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data))
    image = image.resize((256, 256))
    return np.array(image)


@app.post("/predict/patato")
async def predict_patato(file: UploadFile = File(...), promptt = " "):
    #bytes = await file.read()
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    
    predictions = MODEL_patato.predict(img_batch)
    
    predicted_class = CLASS_NAMES_patato[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])

    ans = " "
    if confidence <= 0.7:
        ans += "Confidence is not enough to say good or bad surely. "

    if predicted_class == "Healthy":
        ans += "The plant is looks pretty good :)"
    else:
        content = '''Patates için bir tarım danışmanısınız, size gelen veriler ışığında bütün olasılıkları değerlendirmeli ve neyden kaynaklandığını bulmalısınız. ,  bütün olasılıkları maddeler şeklinde çıktı vermelisiniz. Ek olarak hangi durumlarda nasıl ilaçlar kullanılır bunu da yazmalısınız ve onu eklerken Sorun Sebepleri: ve Çözümler: (İlaçların isimleri) olacak şekilde 3 tane madde şekilde sonuç vermelisin..'''
        prompt = helper.prompt_generator("patates", predicted_class, confidence, promptt)
        result = helper.chat_completion(content, prompt)

        ans += helper.answer(result)
    
    return {
		'class': predicted_class,
		'confidence': float(confidence),
        'result': ans
	}
    
@app.post("/predict/tomato")
async def predict_tomato(file: UploadFile = File(...), promptt = " "):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)

    predictions = MODEL_tomato.predict(img_batch)

    predicted_class = CLASS_NAMES_tomato[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    
    ans = " "
    if confidence <= 0.7:
        ans += "Confidence is not enough to say good or bad surely. "
    
    if predicted_class == "Tomato_healthy":
        ans += "The plant is looks pretty good :)"

    else:
        content = '''Domates için bir tarım danışmanısınız, size gelen veriler ışığında bütün olasılıkları değerlendirmeli ve neyden kaynaklandığını bulmalısınız. ,  bütün olasılıkları maddeler şeklinde çıktı vermelisiniz. Ek olarak hangi durumlarda nasıl ilaçlar kullanılır bunu da yazmalısınız ve onu eklerken Sorun Sebepleri: ve Çözümler: (İlaçların isimleri) olacak şekilde 3 tane madde şekilde sonuç vermelisin.'''
        prompt = helper.prompt_generator("domates", predicted_class, confidence, promptt)
        result = helper.chat_completion(content, prompt)

        ans += helper.answer(result)

    
    if predicted_class == "Tomato_healthy":
        disease = "Tomato is healty	"
    else:
        disease = tomato_diseases[predicted_class]

    return {
		'class': disease,
		'confidence': float(confidence),
        'result': ans

	}
    

@app.get("/results/waste")
async def waste_comp():
    #https://eizin.cevre.gov.tr/Rapor/BelgeArama.aspx ## code=020103: Bitki dokusu atiklari
    return{
        ["TUZLA DERİ OSB GERİ DÖNÜŞÜM ANONİM ŞİRKETİ", "İSTANBUL", "Atıktan Türetilmiş Yakıt (ATY) Hazırlama Tesisi"],
        ["ATIKSA ENTEGRE ATIK YUÖNETİMİ TİCARET LİMİTED ŞİRKETİ BAŞKÖY ŞUBESİ", "İZMİR", "Tehlikesiz Atık Geri Kazanım"],
        ["KARTALLAR EGE GERİ DÖNÜŞÜM ENERJİ ÜRETİM ANONİM ŞİRKETİ", "ARTVİN",  "Tehlikesiz Atık Geri Kazanım"],
        ["SAKA AĞAÇ ENDÜSTRİSİ SANAYİ VE TİCARET LİMİTED ŞİRKETİ", "BOLU", "Ömrünü Tamamlamış Lastik Geri Kazanım"],
        ["KUZEY İSTANBUL ÇEVRE YÖNETİMİ SAN. TİC. A.Ş. ODAYERİ ŞUBESİ", "İZMİR", "Biyobozunur Atık İşleme -Biyometanizasyon"], 
    }

@app.get("/results/cure")
async def cure_comp():
    #https://eizin.cevre.gov.tr/Rapor/BelgeArama.aspx ## code=020103: Bitki dokusu atiklari
    return{
        ["Bayer", "Turkiye'deki ilaç sektorunde oncu Alman menseili 161 yillik kuresel sirket"],
        ["Syngenta", "Turkiyede ilaç ve tohum destegi sunan Isveç menseili inovasyonel sirket"],
        ["DRT", "Ortulu tarimda profesyonel tarim çozumleri sunan alti kitada hizmet veren yerli sirket"],
    }

