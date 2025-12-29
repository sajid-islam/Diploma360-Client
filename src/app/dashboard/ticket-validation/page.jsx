"use client";

import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function TicketValidatorPage() {
  const AxiosPrivate = useAxiosPrivate();
  const [ticketId, setTicketId] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);

  const validateTicket = async (id) => {
    if (!id) return toast.error("Ticket ID required");
    try {
      const res = await AxiosPrivate.post("/api/events/validate-ticket", {
        ticketId: id,
      });
      setScanResult(res.data);
      toast.success(`Valid: ${res.data.eventName} — ${res.data.user}`);
    } catch (err) {
      setScanResult(err.response?.data?.message || "Invalid ticket");
      toast.error(err.response?.data?.message || "Validation failed");
    }
  };

  useEffect(() => {
    let html5Qrcode;
    const qrRegionId = "qr-reader";

    if (typeof window !== "undefined") {
      html5Qrcode = new Html5Qrcode(qrRegionId);
      html5Qrcode
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedText) => validateTicket(decodedText),
          (errorMessage) => {}
        )
        .catch((err) => console.error("Camera start failed:", err));

      scannerRef.current = html5Qrcode;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => scannerRef.current.clear());
      }
    };
  }, []);

  return (
    <div>
      <DashboardHeader page="Ticket Validator" />

      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center">🎟 Ticket Validator</h2>

        <div className="flex gap-2">
          <Input
            placeholder="Enter Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="flex-1"
          />
          <Button onClick={() => validateTicket(ticketId)}>Validate</Button>
        </div>

        {scanResult && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-sm">
            {typeof scanResult === "string" ? (
              <p className="text-red-500 font-semibold">{scanResult}</p>
            ) : (
              <>
                <p>
                  <strong>Event:</strong> {scanResult.eventName}
                </p>
                <p>
                  <strong>User:</strong> {scanResult.user}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {scanResult.used ? "Already Used" : "Valid"}
                </p>
              </>
            )}
          </div>
        )}

        <div className="text-center my-2 text-gray-500">OR Scan QR Code</div>

        <div className="border rounded-lg overflow-hidden shadow-md p-2">
          <div id="qr-reader" style={{ width: "100%", minHeight: "300px" }} />
        </div>
      </div>
    </div>
  );
}
