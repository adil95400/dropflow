from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import uuid

router = APIRouter()

# Simuler une base de données temporaire
users_db = {}

class RegisterInput(BaseModel):
    email: EmailStr
    password: str
    full_name: str

@router.post("/register")
def register_user(data: RegisterInput):
    if data.email in users_db:
        raise HTTPException(status_code=400, detail="Utilisateur déjà inscrit")

    user_id = str(uuid.uuid4())
    users_db[data.email] = {
        "id": user_id,
        "email": data.email,
        "full_name": data.full_name,
        "password": data.password  # 🔒 À ne pas faire en prod ! (doit être hashé)
    }

    return {"message": "Inscription réussie", "user_id": user_id}
