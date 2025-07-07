from fastapi import APIRouter
from typing import List

router = APIRouter()

# Stockage en mémoire (temporaire)
sync_logs: List[dict] = []

@router.get("/api/sync_logs")
async def get_logs():
    return {"logs": sync_logs}

# Fonction pour stocker dans les logs (appelée par sync_products_bulk)
def log_sync_entry(entry: dict):
    sync_logs.append(entry)
