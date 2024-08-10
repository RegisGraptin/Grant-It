# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

## Deploy

npx hardhat ignition deploy ./ignition/modules/GrantManager.ts --network localhost

### Optimism Sepolia

npx hardhat ignition deploy ./ignition/modules/GrantManager.ts --network optimismSepolia --reset

npx hardhat verify --network optimismSepolia 0x63aB4520B0dD24c11122e21b637B1bCAD0A7415b


## Contract deployed 

https://optimism-sepolia.blockscout.com/address/0x63aB4520B0dD24c11122e21b637B1bCAD0A7415b
