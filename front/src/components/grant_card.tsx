
import crypto from "crypto";

import { VscClose, VscGitStashApply } from "react-icons/vsc";
import { GrView } from "react-icons/gr";
import { useState } from "react";
import { ApplyProjectModal } from "./apply_project_modal";
import { BaseError, useAccount, useReadContracts, useWriteContract } from 'wagmi'

import { abi, address } from "./contract_abi.json";
import { Address } from "viem";
import { ProjectCard } from "./project_card";

export const GrantCard = (props: any) => {

    const { address: userAddress } = useAccount();

    const [showApplyProject, setShowApplyProject] = useState(false);
    const [showListProjects, setShowListProjects] = useState(true);

    const { data: projectsDetail, isLoading: projectsDetailLoading } = useReadContracts({
        contracts: Array.from({ length: Number(props.grantDetail[7]) }).map(
            (_, index) => ({
                abi,
                address: address as Address,
                functionName: "getGrantPropositionProjects",
                args: [props.grantDetail[0], index],
            })
        ),
    });

    const {
        data: hash,
        error,
        isPending,
        writeContract
    } = useWriteContract()


    function endApplication() {
        let randomNumber = crypto.randomBytes(32).toString("hex");

        writeContract({
            address: address as Address,
            abi,
            functionName: 'endApplication',
            args: [
                ""+props.grantDetail[0],
                "0x"+randomNumber
            ],
            value: BigInt(10000000000000)
        })
    }

    function selectProject() {
        writeContract({
            address: address as Address,
            abi,
            functionName: 'selectProject',
            args: [
                ""+props.grantDetail[0],
            ]
        })
    }


    function isGrantOwner() {
        return props.grantDetail[8] === userAddress;
    }

    return (
        <>
            <div className="pb-5">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <div className="flex">
                        <a href="#" className="flex-1">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                #{Number(props.grantDetail[0]) + 1} - {props.grantDetail[1]}
                            </h5>
                        </a>


                        <div className="flex-2">
                            <button
                                onClick={() => setShowApplyProject(true)}
                                type="button"
                                className="mr-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <VscGitStashApply className="w-4 h-4 text-white me-2 mr-2" />
                                Apply
                            </button>

                            <button
                                onClick={() => setShowListProjects(!showListProjects)}
                                type="button"
                                className="mr-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <GrView className="w-4 h-4 text-white me-2 mr-2" />
                                {showListProjects ? "Hide" : "View"} Projects
                            </button>

                            {isGrantOwner() && (
                                <button
                                    onClick={() => endApplication()}
                                    disabled={isPending}
                                    type="button"
                                    className="mr-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <VscClose className="w-4 h-4 text-white me-2 mr-2" />
                                    {isPending ? 'Confirming...' : 'End Application'}
                                </button>
                            )}

{error && (
                                    <div>Error: {(error as BaseError).shortMessage || error.message}</div>
                                )}


                            {isGrantOwner() && (
                                <button
                                    onClick={() => selectProject()}
                                    disabled={isPending}
                                    type="button"
                                    className="mr-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <VscClose className="w-4 h-4 text-white me-2 mr-2" />
                                    {isPending ? 'Confirming...' : 'Select Project'}
                                </button>
                            )}

                        </div>
                    </div>

                    <ApplyProjectModal
                        show={showApplyProject}
                        close={() => setShowApplyProject(false)}
                        grantProposalId={props.grantDetail[0]}
                    />

                </div>

                {projectsDetail && showListProjects && (
                    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
                        {projectsDetail && projectsDetail.map(function (projectDetail, i) {
                            console.log(projectDetail.result);
                            return <ProjectCard grantDetail={props.grantDetail} projectDetail={projectDetail} />
                        })}
                    </div>
                )}

            </div>
        </>
    )

}
