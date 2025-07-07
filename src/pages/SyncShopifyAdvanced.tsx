import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { syncAllProductsToShopify } from "@/lib/shopify";
import { CheckCircle, AlertCircle } from "lucide-react";

const SyncShopifyAdvanced = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleAdvancedSync = async () => {
    setStatus("loading");
    const res = await syncAllProductsToShopify();
    setStatus(res.success ? "success" : "error");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🛠️ Sync Produits - Version Avancée</h1>
      <p>Ce module permet de synchroniser tous les produits vers Shopify (variantes, SEO, images...)</p>
      <Button onClick={handleAdvancedSync} disabled={status === "loading"}>
        {status === "loading" ? "Synchronisation..." : "Lancer la synchronisation complète"}
      </Button>
      {status === "success" && (
        <div className="text-green-600 flex items-center gap-2">
          <CheckCircle size={18} /> Produits synchronisés avec succès !
        </div>
      )}
      {status === "error" && (
        <div className="text-red-600 flex items-center gap-2">
          <AlertCircle size={18} /> Erreur de synchronisation.
        </div>
      )}
    </div>
  );
};

export default SyncShopifyAdvanced;
