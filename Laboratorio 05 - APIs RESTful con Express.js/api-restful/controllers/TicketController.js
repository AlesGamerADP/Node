const TicketService = require("../services/TicketService");
const service = new TicketService();
const NotificationService = require("../services/NotificationService");
const notificationService = new NotificationService();

exports.create = (req, res) => {
  const ticket = service.createTicket(req.body);
  res.status(201).json(ticket);
};

exports.list = (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 5; 

  const tickets = service.list();  
  const start = (page - 1) * limit;
  const paginatedTickets = tickets.slice(start, start + limit);

  res.status(200).json({
    page,
    limit,
    total: tickets.length,
    data: paginatedTickets
  });
};


exports.assign = (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const ticket = service.assignTicket(id, user);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.changeStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = service.changeStatus(id, status);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.delete = (req, res) => {
  try {
    service.deleteTicket(req.params.id);
    res.json({ message: "Ticket eliminado correctamente" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

exports.getNotifications = (req, res) => {
  const { id } = req.params; 
  const notifications = notificationService.list(); 
  const ticketNotifications = notifications.filter(n => n.ticketId === id);
  res.status(200).json(ticketNotifications);
};
