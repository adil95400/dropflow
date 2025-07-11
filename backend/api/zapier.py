"""Zapier integration API stubs."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def info() -> dict:
    """Placeholder endpoint for Zapier."""
    return {"message": "Zapier endpoint"}
