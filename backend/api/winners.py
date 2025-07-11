"""Winning products API stubs."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def info() -> dict:
    """Placeholder endpoint for winners."""
    return {"message": "Winners endpoint"}
