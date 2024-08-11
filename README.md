# Grant It - Built for Superhack 2024
> Decentralized Grant Management Dashboard - Manage and visualize grants, submit your projects and get rewards

## Description 

Grant It is an innovative decentralized platform designed to streamline and simplify grant management, enabling grant owners to manage, track, and reward project teams efficiently. Built for the future of decentralized collaboration, Grant It empowers both grant owners and project teams to connect, collaborate, and achieve their goals seamlessly.

## How It Works
#### For Grant Owners:
1. Create & Announce Grants: Grant owners can easily create and publish grants for specific projects. They define the project scope, set the desired number of teams, and announce the prize reward for successful project completion.

2. Review & Select Teams: Teams can apply for available grants by submitting their proposals and listing their team members. Grant owners can review these applications and conduct necessary verifications. If the number of qualified teams exceeds the desired number, the platform will randomly select the required number of teams.

3. Track Progress: Once teams are selected, they begin work on the project. Teams can provide updates, ensuring the grant owner stays informed about progress.

4. Approve & Reward: Upon project completion, the grant owner reviews the final deliverables. If satisfied, they can approve the project and release the prize reward to the team.

#### For Teams:
1. Discover & Apply for Grants: Teams can browse through available grants, select ones that align with their skills, and submit their application, including the addresses of all team members ready to work on the project.

2. Work & Report: After being selected, teams work on the project and regularly update the grant owner on their progress.

3. Receive Rewards: Upon successful project completion and approval, teams receive the promised reward directly from the grant owner.

4. Grant It revolutionizes the grant management process, ensuring transparency, fairness, and efficiency for both grant owners and project teams. By leveraging decentralization, the platform eliminates traditional barriers, fostering a collaborative environment where innovative projects can thrive.


## How is it built?

The Dapp is built on Optimism. For the demo, we have deploy it on Optimism Sepolia, you can see the smart contract using Blockscout (https://optimism-sepolia.blockscout.com/address/0xC21672DB35dB448c7F06eE636401426274468089).

To ensure fairness in the selection process, our smart contract is using randomness. We achieve this by leveraging the Pyth Network, which provides a reliable source of randomness. This allows us to generate random numbers securely, ensuring unbiased selection when multiple teams apply for the same grant.


