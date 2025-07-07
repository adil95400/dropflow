from fastapi import APIRouter
import requests
import os

router = APIRouter()

SHOPIFY_STORE = os.getenv("SHOPIFY_STORE_DOMAIN")
ACCESS_TOKEN = os.getenv("SHOPIFY_ACCESS_TOKEN")

@router.post("/api/sync_product")
async def sync_product():
    headers = {
        "X-Shopify-Access-Token": ACCESS_TOKEN,
        "Content-Type": "application/json"
    }
    product_data = {
        "product": {
            "title": "Produit Test DropFlow",
            "body_html": "<strong>Produit ajouté via DropFlow</strong>",
            "vendor": "DropFlow",
            "product_type": "Dropshipping",
            "variants": [{"price": "19.99"}]
        }
    }

    url = f"https://{SHOPIFY_STORE}/admin/api/2023-10/products.json"
    response = requests.post(url, headers=headers, json=product_data)

    return {"success": response.status_code == 201, "status": response.status_code}
