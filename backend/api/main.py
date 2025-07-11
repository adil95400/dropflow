from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import auth

app = FastAPI()

# Autoriser CORS pour le frontend local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclure routes auth
app.include_router(auth.router, prefix="/api")