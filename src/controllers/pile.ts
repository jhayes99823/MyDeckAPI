import PileManager from "../lib/pile/pile.manager";

exports.getPileBySessionIdandName = async (req, res) => {
  const { sessionId, name } = req.body;
  const mgr = PileManager.getInstance();
  const pile = await mgr.getPileInfoBySessionIdandName(name, sessionId);

  res.json(pile);
};

exports.shufflePileToPile = async (req, res) => {
  const { sessionId, to, from } = req.body;
  const mgr = PileManager.getInstance();
  const pile = await mgr.shufflePileToPile(to, from, sessionId);

  res.json(pile);
};
