import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BlockBetCollective", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, other] = await ethers.getSigners();

    const BlockBetCollective = await ethers.getContractFactory("BlockBetCollective");
    const blockBetCollective = await BlockBetCollective.deploy();

    const TestContract = await ethers.getContractFactory("TestContract");
    const testContract = await TestContract.deploy(blockBetCollective.address);

    return { owner, other, blockBetCollective, testContract };
  }

  describe("Tests", function () {
    it("Should be able to deploy", async function () {
      const { blockBetCollective } = await loadFixture(deployFixture);
      expect(await blockBetCollective.totalSupply()).to.equal(BigInt(0).toString())
    });

    it("Should be able to deposit funds", async function () {
      const { owner, blockBetCollective } = await loadFixture(deployFixture);

      const ONE_GWEI = 1_000_000_000;

      const depositAmount = ONE_GWEI;

      // Deposit first time
      await blockBetCollective.deposit_funds({ value: depositAmount });
      expect(await blockBetCollective.current_max_bet()).to.equal((depositAmount / 10).toString());
      expect(await blockBetCollective.totalSupply()).to.equal((depositAmount).toString());
      expect(await blockBetCollective.balanceOf(owner.address)).to.equal((depositAmount).toString());

      // Deposit second time
      await blockBetCollective.deposit_funds({ value: depositAmount });

      expect(await blockBetCollective.current_max_bet()).to.equal((2 * depositAmount / 10).toString());
      expect(await blockBetCollective.totalSupply()).to.equal((2 * depositAmount).toString());
      expect(await blockBetCollective.balanceOf(owner.address)).to.equal((2 * depositAmount).toString());
    });


    it("Should be able to withdraw funds", async function () {
      const { owner, blockBetCollective } = await loadFixture(deployFixture);

      const ONE_GWEI = 1_000_000_000;

      const depositAmount = ONE_GWEI;

      // Deposit 
      await blockBetCollective.deposit_funds({ value: depositAmount });
      expect(await blockBetCollective.current_max_bet()).to.equal((depositAmount / 10).toString());
      expect(await blockBetCollective.totalSupply()).to.equal((depositAmount).toString());
      expect(await blockBetCollective.balanceOf(owner.address)).to.equal((depositAmount).toString());

      // Withdraw
      await blockBetCollective.withdraw_funds(depositAmount);
      expect(await blockBetCollective.current_max_bet()).to.equal((0).toString());
      expect(await blockBetCollective.totalSupply()).to.equal((0).toString());
      expect(await blockBetCollective.balanceOf(owner.address)).to.equal((0).toString());
    });

    it("Should be able to bet", async function () {
      const { owner, other, blockBetCollective, testContract } = await loadFixture(deployFixture);

      const ONE_GWEI = 1_000_000_000;

      const depositAmount = ONE_GWEI * 100;

      // Deposit
      await blockBetCollective.deposit_funds({ value: depositAmount });
      expect(await blockBetCollective.current_max_bet()).to.equal((depositAmount / 10).toString());
      expect(await blockBetCollective.totalSupply()).to.equal((depositAmount).toString());
      expect(await blockBetCollective.balanceOf(owner.address)).to.equal((depositAmount).toString());

      // Doing a monte carlo simulation to check that our casino never runs out of funds
      for (let i = 0; i < 100; i++) {
        let old_current_max_bet = await blockBetCollective.current_max_bet();
        let old_balance_owner = await ethers.provider.getBalance(owner.address);

        const bedAmount = ONE_GWEI / 10;

        // Bet
        let tx = await testContract.bet({ value: bedAmount })

        if (await testContract.last_bet_invoke_won()) {
          // Bettor won
          console.log('won')

          let current_max_bet = await blockBetCollective.current_max_bet();
          expect(old_current_max_bet.sub(current_max_bet)).to.equal((bedAmount / 10).toString());

          let receipt = await tx.wait();

          const gasCostForTxn = receipt.gasUsed.mul(receipt.effectiveGasPrice)
          await testContract.connect(other).withdraw();

          expect(old_balance_owner.sub(await ethers.provider.getBalance(owner.address)).sub(gasCostForTxn)).to.equal((-bedAmount).toString());
        } else {
          // Bettor lost
          console.log('lost')

          let current_max_bet = await blockBetCollective.current_max_bet();
          expect(current_max_bet.sub(old_current_max_bet)).to.equal(((bedAmount) / 10).toString());

          let receipt = await tx.wait();

          const gasCostForTxn = receipt.gasUsed.mul(receipt.effectiveGasPrice)
          await testContract.connect(other).withdraw();

          expect(old_balance_owner.sub(await ethers.provider.getBalance(owner.address)).sub(gasCostForTxn)).to.equal((bedAmount).toString());
        }
      }
    });
  });
});

