import express from "express";

const app = express();
app.use(express.json()); // to parse JSON request bodies

// --- Utility functions ---
function generateTicketId() {
  const prefix = "TKT";
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomPart}`;
}

function generateDeviceId() {
  const prefix = "device";
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomPart}`;
}

function generateVoIPProvisionId() {
  const prefix = "VOIP";
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomPart}`;
}

// In-memory storage for tickets (for demo purposes)
const tickets = {};

// --- POST: Create ticket ---
app.post("/itms/create-ticket", (req, res) => {
  console.log("create ticket request received");
  const { requesterId, deskNo } = req.body;

  if (!requesterId || !deskNo) {
    return res.status(400).json({
      error: "requesterId and deskNo are required fields.",
    });
  }

  const ticketId = generateTicketId();

  // Store mock ticket data
  tickets[ticketId] = {
    ticketId,
    requesterId,
    deskNo,
    status: "Open", // default status
    createdAt: new Date().toISOString(),
  };

  res.json({ ticketId });
});

// --- POST: Warehouse job ---
app.post("/warehouse/create-job", (req, res) => {
  console.log("create Warehouse job");
  const { requesterId, deskNo } = req.body;

  if (!requesterId || !deskNo) {
    return res.status(400).json({
      error: "requesterId and deskNo are required fields.",
    });
  }

  res.json({ deviceId: generateDeviceId() });
});

// --- POST: VoIP Provision ---
app.post("/voip/provision", (req, res) => {
  console.log("create VoIP provision request");
  const { requesterId, deskNo } = req.body;

  if (!requesterId || !deskNo) {
    return res.status(400).json({
      error: "requesterId and deskNo are required fields.",
    });
  }

  res.json({ voipProvisionId: generateVoIPProvisionId() });
});

// --- ✅ NEW GET: Get ticket status ---
app.get("/itms/ticket/:ticketId", (req, res) => {
  const { ticketId } = req.params;
  console.log(`Fetching status for ticket ${ticketId}`);

  const ticket = tickets[ticketId];

  if (!ticket) {
    return res.status(200).json({
      error: `Ticket with ID ${ticketId} not found.`,
    });
  }

  // Return minimal info (can be expanded)
  res.json({
    ticketId: ticket.ticketId,
    status: ticket.status,
    requesterId: ticket.requesterId,
    deskNo: ticket.deskNo,
    createdAt: ticket.createdAt,
  });
});

// --- Start the server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
