"""Parcel tracking API stubs."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def info() -> dict:
    """Placeholder endpoint for tracking."""
    return {"message": "Tracking endpoint"}
