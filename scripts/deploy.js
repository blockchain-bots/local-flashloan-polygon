const hre = require("hardhat");

const LP_ADDRESSES_PROVIDER = "0xa97684ead0e402dc232d5a977953df7ecbab3cdb"

async function main() {

  const Contract = await hre.ethers.getContractFactory("FlashLoan");
  const flashLoan = await Contract.deploy(LP_ADDRESSES_PROVIDER);

  await flashLoan.deployed();

  console.log("Address:", flashLoan.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });