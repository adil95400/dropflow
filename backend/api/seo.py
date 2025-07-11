"""SEO optimization API endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def info() -> dict:
    """Placeholder endpoint for SEO."""
    return {"message": "SEO endpoint"}
