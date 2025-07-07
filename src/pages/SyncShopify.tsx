import React from "react";
import { Button } from "@/components/ui/button";
import { syncProductsToShopify } from "@/lib/shopify";

const SyncShopify = () => {
  const handleSync = async () => {
    const res = await syncProductsToShopify();
    alert(res.success ? "Produits synchronisés ✅" : "Erreur ❌");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Synchroniser avec Shopify</h1>
      <Button onClick={handleSync}>Lancer la synchronisation</Button>
    </div>
  );
};

export default SyncShopify;
