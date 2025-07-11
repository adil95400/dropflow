from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import (
    auth,
    bigbuy,
    crm,
    seo,
    shopify,
    tracking,
    winners,
    zapier,
)

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
app.include_router(bigbuy.router, prefix="/api/bigbuy")
app.include_router(crm.router, prefix="/api/crm")
app.include_router(seo.router, prefix="/api/seo")
app.include_router(shopify.router, prefix="/api/shopify")
app.include_router(tracking.router, prefix="/api/tracking")
app.include_router(winners.router, prefix="/api/winners")
app.include_router(zapier.router, prefix="/api/zapier")

