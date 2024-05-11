from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel, Field
import numpy as np

from PIL import Image
from io import BytesIO
import tensorflow as tf

import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

app = FastAPI()

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
async def predict_patato(file: UploadFile = File(...)):
    #bytes = await file.read()
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    
    predictions = MODEL_patato.predict(img_batch)
    
    predicted_class = CLASS_NAMES_patato[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    
    return {
		'class': predicted_class,
		'confidence': float(confidence)
	}
    
@app.post("/predict/tomato")
async def predict_tomato(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)

    predictions = MODEL_tomato.predict(img_batch)

    predicted_class = CLASS_NAMES_tomato[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    
    if predicted_class == "Tomato_healthy":
        disease = "Tomato is healty	"
    else:
        disease = tomato_diseases[predicted_class]

    return {
		'class': disease,
		'confidence': float(confidence)
	}
    
