"use client";
import { Button } from "@/components/ui/button";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import jsPDF from "jspdf";
import moment from "moment";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

export default function MyTicketsPage() {
  const AxiosPrivate = useAxiosPrivate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await AxiosPrivate.get("/api/events/my-tickets");
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTickets();
  }, []);

  const handleDownload = (ticket) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(ticket.eventName, 10, 20);
    doc.setFontSize(12);
    doc.text(`Ticket ID: ${ticket.ticketId}`, 10, 30);
    doc.text(`Date: ${moment(ticket.date).format("DD MMM YYYY")}`, 10, 40);
    doc.text(`Time: ${moment(ticket.time, "HH:mm").format("hh:mm A")}`, 10, 50);
    doc.text(`Status: ${ticket.used ? "Used" : "Valid"}`, 10, 60);

    const canvas = document.getElementById(ticket.ticketId);
    if (canvas) {
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 120, 20, 60, 60);
    }
    doc.save(`ticket-${ticket.ticketId}.pdf`);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">My Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket.ticketId}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p>
                <strong>{ticket.eventName}</strong>
              </p>
              <p>Ticket ID: {ticket.ticketId}</p>
              <p>Date: {moment(ticket.date).format("DD MMM YYYY")}</p>
              <p>Time: {moment(ticket.time, "HH:mm").format("hh:mm A")}</p>
              <p>Status: {ticket.used ? "Used" : "Valid"}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <QRCodeCanvas
                id={ticket.ticketId}
                value={ticket.ticketId}
                size={100}
              />
              <Button onClick={() => handleDownload(ticket)}>
                Download PDF
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
