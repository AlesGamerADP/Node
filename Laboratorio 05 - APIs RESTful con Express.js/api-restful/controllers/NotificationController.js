const NotificationService = require("../services/NotificationService");
const service = new NotificationService();

exports.list = (req, res) => {
  res.status(200).json(service.list());
};

exports.create = async (req, res) => {
  const { type, message, ticketId } = req.body;
  const notification = await service.create(type, message, ticketId);
  res.status(201).json(notification);
};
