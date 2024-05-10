from fastapi import FastAPI
from pydantic import BaseModel, Field
import uvicorn

import PIL


app = FastAPI()


@app.get("/ping")
async def ping():
    return {"message": "pong"}


if __name__ == '__main__':
    uvicorn.run(app, host="localhost", port=8000)

