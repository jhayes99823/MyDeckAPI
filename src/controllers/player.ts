import PlayerManager from "../lib/player/player.manager";

exports.getPlayerBySessionidandName = async (req, res) => {
  const { sessionId, name } = req.body;
  const mgr = PlayerManager.getInstance();

  const player = await mgr.getPlayerBySessionidandName(name, sessionId);

  res.json(player);
};

exports.drawCard = async (req, res) => {
  const { sessionId, name, pileName, amount } = req.body;

  console.log("req.body ", req.body);

  const mgr = PlayerManager.getInstance();

  const player = await mgr.drawCard(name, pileName, sessionId, amount);

  res.json(player);
};
