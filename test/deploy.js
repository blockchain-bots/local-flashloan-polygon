const {expect} = require("chai");
const hre = require("hardhat");

describe("Deploy a Flash Loan", function () {

  const DAI = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
  const DAI_WHALE = "0xdfD74E3752c187c4BA899756238C76cbEEfa954B";
  const POOL_ADDRESS_PROVIDER = "0xa97684ead0e402dc232d5a977953df7ecbab3cdb";

  const FUND_AMOUNT = hre.ethers.utils.parseUnits("0.0000002", "ether");
  const BORROW_AMOUNT = hre.ethers.utils.parseUnits("0.0000001", "ether");

  let flashLoan;
  let token;
  beforeEach(async () => {

    token = await hre.ethers.getContractAt("IERC20", DAI);
    const contract = await hre.ethers.getContractFactory("FlashLoan");

    flashLoan = await contract.deploy(POOL_ADDRESS_PROVIDER);

    await flashLoan.deployed();

  })

  it("Take a flash loan and return it", async () => {

    await hre.network.provider.request({method: "hardhat_impersonateAccount", params: [DAI_WHALE]});
    const signer = await hre.ethers.getSigner(DAI_WHALE);
    const transfer = await token.connect(signer).transfer(flashLoan.address, FUND_AMOUNT);
    await transfer.wait();

    const tx = await flashLoan.flashLoan(DAI, BORROW_AMOUNT);
    await tx.wait();

    const remainingBalance = await token.balanceOf(flashLoan.address);
    expect(remainingBalance.lt(FUND_AMOUNT)).to.be.true;

  }).timeout(100000);

});
