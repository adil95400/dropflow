from fastapi import APIRouter
import requests
import os

router = APIRouter()

SHOPIFY_STORE = os.getenv("SHOPIFY_STORE_DOMAIN")
ACCESS_TOKEN = os.getenv("SHOPIFY_ACCESS_TOKEN")

@router.post("/api/sync_products_bulk")
async def sync_products_bulk():
    headers = {
        "X-Shopify-Access-Token": ACCESS_TOKEN,
        "Content-Type": "application/json"
    }

    # Example list of products (normally from Supabase or DB)
    products = [
        {
            "title": "Produit A",
            "body_html": "<p>Description A</p>",
            "vendor": "DropFlow",
            "product_type": "Accessoire",
            "tags": ["importé", "IA"],
            "variants": [{"price": "19.99"}, {"price": "24.99"}]
        },
        {
            "title": "Produit B",
            "body_html": "<p>Description B</p>",
            "vendor": "DropFlow",
            "product_type": "Textile",
            "tags": ["nouveauté"],
            "variants": [{"price": "39.99"}]
        }
    ]

    results = []
    for p in products:
        res = requests.post(
            f"https://{SHOPIFY_STORE}/admin/api/2023-10/products.json",
            headers=headers,
            json={"product": p}
        )
        results.append({"title": p["title"], "status": res.status_code})

    return {"success": True, "results": results}
