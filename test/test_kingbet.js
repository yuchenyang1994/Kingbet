const KingBetFactory = artifacts.require("KingBetFactory");
const KingBet = artifacts.require("KingBet");

let kingbetFactory;
let kingbet;

contract("KingBetFactory", accounts => {
    beforeEach(async () => {
        kingbetFactory = await KingBetFactory.deployed({from: accounts[0]});
        await kingbetFactory.crateMetabet(1, 1599663194 + 86400, {from: accounts[0]});
        let kingbet_address = await kingbetFactory.getMetaBet(1);
        kingbet = await KingBet.at(kingbet_address);

    });

    it("should deploy KingBet and KingBetFactory", async () => {
        assert.ok(kingbetFactory);
        assert.ok(kingbet)
    });
    
    it("should bet team", async () => {
        let account_1 = accounts[1];
        let account_2 = accounts[2];
        await kingbet.bet(1, {from: account_1, value: web3.utils.toWei('2', 'ether')});
        await kingbet.bet(2, {from: account_2, value: web3.utils.toWei('2', 'ether')});
        let total = await kingbet.getBalance();
        assert.equal(web3.utils.fromWei(total, 'ether'), '4');
    });
});
