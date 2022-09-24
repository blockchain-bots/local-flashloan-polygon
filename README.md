# Local Flashloan Polygon

Flash loan PoC that runs locally and simulates addresses from the Polygon Mainnet

## Setup

Create a `.env` file containing parameter `ALCHEMY_API_KEY`. The value of this parameter should be a API key for the Polygon mainnet. 

### How to register Alchemy API key
1. Go to https://www.alchemy.com/
2. Create an account
3. On the alchemy dashboard, click `Create app`
4. Choose the `Polygon` chain

_This program will not run if you do not register the API key on the Polygon mainnet. Other chains or test networks have different addresses._

### How to run scripts
```
npm install
npx hardhat node
npx hardhat test
```
