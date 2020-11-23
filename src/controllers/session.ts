import SessionManager from "../lib/session/session.manager";

exports.newSession = async (req, res) => {
  const mgr = SessionManager.getInstance();
  const session = await mgr.CreateSession(req.body);

  res.json(session);
};
