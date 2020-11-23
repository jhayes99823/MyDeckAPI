import PlayerManager from "../lib/player/player.manager";

exports.getPlayerBySessionidandName = async (req, res) => {
  const { sessionId, name } = req.body;
  const mgr = PlayerManager.getInstance();

  const player = await mgr.getPlayerBySessionidandName(name, sessionId);

  res.json(player);
};

exports.draw = async (req, res) => {
  const { sessionId, name, pileName, amount } = req.body;
  const mgr = PlayerManager.getInstance();

  const player = await mgr.draw(name, pileName, sessionId, amount);

  res.json(player);
};

exports.discard = async (req, res) => {
  const { sessionId, name, pileName, cards } = req.body;
  const mgr = PlayerManager.getInstance();

  const player = await mgr.discard(name, pileName, sessionId, cards);

  res.json(player);
};
