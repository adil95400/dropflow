"""Shopify synchronization API stubs."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def info() -> dict:
    """Placeholder endpoint for Shopify."""
    return {"message": "Shopify endpoint"}
