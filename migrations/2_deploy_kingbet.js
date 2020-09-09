const KingBetFactory = artifacts.require("KingBetFactory");

module.exports = function (deployer) {
  deployer.deploy(KingBetFactory);
};