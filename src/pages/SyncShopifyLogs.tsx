import React, { useEffect, useState } from "react";
import { RefreshCw, XCircle, CheckCircle } from "lucide-react";

type LogEntry = {
  title: string;
  status: number;
  shopify_product_id?: string;
  message?: string;
};

const SyncShopifyLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sync_logs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.logs || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📜 Historique de Synchronisation Shopify</h1>
      {loading ? (
        <p>Chargement des logs...</p>
      ) : (
        <div className="space-y-2">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className="border rounded p-3 flex justify-between items-center bg-white shadow-sm"
            >
              <div>
                <strong>{log.title}</strong>
                <p className="text-sm text-gray-500">
                  {log.message || (log.status === 201 ? "Créé avec succès" : "Erreur inconnue")}
                </p>
              </div>
              <div>
                {log.status === 201 ? (
                  <CheckCircle className="text-green-600" />
                ) : (
                  <XCircle className="text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SyncShopifyLogs;
