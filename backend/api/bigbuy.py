"""API routes for BigBuy integration."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def info() -> dict:
    """Placeholder endpoint for BigBuy."""
    return {"message": "BigBuy endpoint"}
