// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

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


contract GrantManager is Ownable {
    
    uint256 public currentGrantId;
    mapping (uint256 => GrantProposition) public grantPropositions;

    mapping (uint256 => mapping (uint256 => ProjectGrantProposal)) public grantPropositionProjects;

    event NewGrantProposal(uint indexed grantId, string title);
    event NewGrantProject(uint indexed grantId, uint indexed projectId, string title);
  
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
            numberSubmittedProject: 0
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
        require(grantPropositions[grantProposalId].endApplyTime < block.timestamp, "NO_MORE_APPLICATION");

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




}
