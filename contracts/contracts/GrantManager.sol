// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { IEntropyConsumer } from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import { IEntropy } from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

enum ProjectStatus {
    Pending,  // Waiting review from grant proposer
    Eligible, // Eligible for the grant
    Accepted, // Project choosen for the grant
    Rejected, // Not Eligible for the grant
    Canceled, // Cancel by the team
    Verified, // Project verified by the grant owner
    Done      // Project Done
}

struct GrantProposition {
    uint256 id;
    string title;
    string description;
    uint256 numberSelectedProject;
    uint256 prize;
    uint256 creationTime;
    uint256 endApplyTime;
    uint256 numberSubmittedProject;
    address owner;
}

struct ProjectGrantProposal {
    uint256 grantId;
    uint256 projectId;
    address[] teams;
    string title;
    string description;
    uint256 creationTime;
    ProjectStatus status;
}

struct RandomnessConfiguration {
    uint256 numberEligibleProjects;
    bytes32 randomNumber;
    bool needRandomness;
    bool haveRandomResult;
}

contract GrantManager is Ownable, IEntropyConsumer {

    // Entropy Contract Addresses - Optimism Sepolia
    IEntropy entropy = IEntropy(0x4821932D0CDd71225A6d914706A621e0389D7061);

    uint256 public currentGrantId;
    mapping (uint256 => GrantProposition) public grantPropositions;

    mapping (uint256 => mapping (uint256 => ProjectGrantProposal)) grantPropositionProjects;

    mapping (uint256 => RandomnessConfiguration) grantRandomnessConfiguration;

    mapping (uint64 => uint256) sequenceGrantId;

    // Events
    event NewGrantProposal(uint indexed grantId, string title);
    event NewGrantProject(uint indexed grantId, uint indexed projectId, string title);
    event NewEligibleProject(uint indexed grantId, uint indexed projectId);
  
    // Access functions
    function getGrantPropositionProjects(uint256 grantId, uint256 projectId) view public returns (ProjectGrantProposal memory) {
        return grantPropositionProjects[grantId][projectId];
    }

    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }

    // FIXME :: Only for Demo purpose
    function setEndTime(uint256 grantProposalId) public {
        grantPropositions[grantProposalId].endApplyTime = 0;
    }

    constructor () Ownable(msg.sender) {
        currentGrantId = 0;
    }

    function createGrantProposal(
        string calldata _title, 
        string calldata _description, 
        uint256 _numberSelectedProject,
        uint256 _endApplyTime
    ) public payable {
        require(_endApplyTime > block.timestamp, "INVALID_END_APPLY_TIME");

        grantPropositions[currentGrantId] = GrantProposition({
            id: currentGrantId,
            title: _title,
            description: _description,
            numberSelectedProject: _numberSelectedProject,
            prize: msg.value,
            creationTime: block.timestamp,
            endApplyTime: _endApplyTime,
            numberSubmittedProject: 0,
            owner: msg.sender
        });
        
        emit NewGrantProposal(currentGrantId, _title);
        
        currentGrantId++;
    }

    function applyGrantProposal(
        uint256 grantProposalId,
        address[] memory _teams,
        string memory _title,
        string memory _description
    ) public {
        require(grantProposalId < currentGrantId, "INVALID_GRANT_PROPOSAL_ID");
        require(grantPropositions[grantProposalId].endApplyTime > block.timestamp, "NO_MORE_APPLICATION");

        // Retrieve project id based on the grant
        uint256 _projectId = grantPropositions[grantProposalId].numberSubmittedProject;
        grantPropositions[grantProposalId].numberSubmittedProject++;

        // Create new project
        grantPropositionProjects[grantProposalId][_projectId] = ProjectGrantProposal({
            grantId: grantProposalId,
            projectId: _projectId,
            teams: _teams,
            title: _title,
            description: _description,
            creationTime: block.timestamp,
            status: ProjectStatus.Pending
        });

        emit NewGrantProject(grantProposalId, _projectId, _title);
    }


    function setEligibleProject(
        uint256 grantProposalId,
        uint256 projectId
    ) public {
        require(grantProposalId < currentGrantId, "INVALID_GRANT_PROPOSAL_ID");
        require(projectId < grantPropositions[grantProposalId].numberSubmittedProject, "INVALID_PROJECT_ID");
        require(grantPropositions[grantProposalId].owner == msg.sender, "INVALID_GRANT_OWNER");

        grantPropositionProjects[grantProposalId][projectId].status = ProjectStatus.Eligible;

        emit NewEligibleProject(grantProposalId, projectId);
    }

    function endApplication(
        uint256 grantProposalId,
        bytes32 randomNumber
    ) public payable {
        require(grantProposalId < currentGrantId, "INVALID_GRANT_PROPOSAL_ID");
        // FIXME :: remove for demo purpose
        // require(grantPropositions[grantProposalId].endApplyTime <= block.timestamp, "STILL_APPLICATION"); 
        require(grantPropositions[grantProposalId].owner == msg.sender, "INVALID_GRANT_OWNER");

        // Count number of elligible project
        uint256 n_eligible = 0;
        for (uint i = 0; i < grantPropositions[grantProposalId].numberSubmittedProject; i++) {
            if (grantPropositionProjects[grantProposalId][i].status == ProjectStatus.Eligible) {
                n_eligible++;
            }
        }

        // More eligible projects than expected
        if (n_eligible > grantPropositions[grantProposalId].numberSelectedProject) {
            
            // Request Pyth Oracle to generate a random number
            address provider = entropy.getDefaultProvider();
            uint fee = entropy.getFee(provider);
            uint64 sequenceNumber = entropy.requestWithCallback{value: fee}(provider, randomNumber);

            // Save the sequence Number to track it
            sequenceGrantId[sequenceNumber] = grantProposalId;

            grantRandomnessConfiguration[grantProposalId] = RandomnessConfiguration({
                numberEligibleProjects: n_eligible,
                randomNumber: 0,
                needRandomness: true,
                haveRandomResult: false
            });
        } else {
            grantRandomnessConfiguration[grantProposalId] = RandomnessConfiguration({
                numberEligibleProjects: n_eligible,
                randomNumber: 0,
                needRandomness: false,
                haveRandomResult: false
            });
        }
    }

    function entropyCallback(
        uint64 sequenceNumber,
        address, // provider
        bytes32 randomNumber
    ) internal override {
        // Retrieve the grant ID project
        uint256 grantProposalId = sequenceGrantId[sequenceNumber];

        // Store the generated number 
        grantRandomnessConfiguration[grantProposalId].randomNumber = randomNumber;
        grantRandomnessConfiguration[grantProposalId].haveRandomResult = true;
    }
    

    function selectProject(
        uint256 grantProposalId
    ) public {
        require(grantProposalId < currentGrantId, "INVALID_GRANT_PROPOSAL_ID");
        // FIXME :: Demo purpose
        // require(grantPropositions[grantProposalId].endApplyTime <= block.timestamp, "STILL_APPLICATION");
        require(grantPropositions[grantProposalId].owner == msg.sender, "INVALID_GRANT_OWNER");
        require(grantRandomnessConfiguration[grantProposalId].numberEligibleProjects > 0, "NO_ELIGIBLE_PROJECTS");

        if (grantRandomnessConfiguration[grantProposalId].needRandomness) {

            uint256 numberEligibleProjects = grantRandomnessConfiguration[grantProposalId].numberEligibleProjects;

            // Random selection
            uint256 j = 0;
            uint256[] memory eligibleProjectIds = new uint256[](numberEligibleProjects);

            for (uint i = 0; i < grantPropositions[grantProposalId].numberSubmittedProject; i++) {
                if (grantPropositionProjects[grantProposalId][i].status == ProjectStatus.Eligible) {
                    eligibleProjectIds[j] = i;
                }
            }

            // Get the random number generated by Pyth
            uint256 randomNumber = uint256(grantRandomnessConfiguration[grantProposalId].randomNumber);

            // Randomly choose one project until we have reach the total number of project that can be selected
            for (uint256 i = 0 ; i < grantPropositions[grantProposalId].numberSelectedProject; i++) {
                // Create a new random number
                uint256 selectedProject = uint256(keccak256(abi.encodePacked(randomNumber + i))) % (numberEligibleProjects - i);

                // Pull to the start the selected project
                uint256 swap = eligibleProjectIds[i];
                eligibleProjectIds[i] = eligibleProjectIds[i + selectedProject];
                eligibleProjectIds[i + selectedProject] = swap;

                // Set the project accepted
                grantPropositionProjects[grantProposalId][eligibleProjectIds[i]].status = ProjectStatus.Accepted;
            }

        } else {
            for (uint i = 0; i < grantPropositions[grantProposalId].numberSubmittedProject; i++) {
                if (grantPropositionProjects[grantProposalId][i].status == ProjectStatus.Eligible) {
                    grantPropositionProjects[grantProposalId][i].status = ProjectStatus.Accepted;
                }
            }
        }

    }

}
