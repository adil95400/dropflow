"""Basic CRM API placeholders."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def info() -> dict:
    """Placeholder endpoint for CRM."""
    return {"message": "CRM endpoint"}
