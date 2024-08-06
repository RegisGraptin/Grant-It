
import { VscGitStashApply } from "react-icons/vsc";
import { GrView } from "react-icons/gr";
import { useState } from "react";
import { ApplyProjectModal } from "./apply_project_modal";

export const GrantCard = (props: any) => {

    console.log(props.grantDetail);

    const [showApplyProject, setShowApplyProject] = useState(false);

    return (
        <>
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
                <div className="flex">
                    <a href="#" className="flex-1">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                            #{Number(props.grantDetail[0]) + 1} - {props.grantDetail[1]}
                        </h5>
                    </a>
                    {/* <p className="mb-3 font-normal text-gray-700">
                    {props.grantDetail[2]}
                </p> */}
                    <div className="flex-2">
                        
                        <button 
                            onClick={() => setShowApplyProject(true)} 
                            type="button" 
                            className="mr-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <VscGitStashApply className="w-4 h-4 text-white me-2 mr-2" />
                            Apply
                        </button>

                        <button type="button" className="mr-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <GrView className="w-4 h-4 text-white me-2 mr-2" />
                            View Projects
                        </button>
                    </div>
                </div>
                <ApplyProjectModal 
                    show={showApplyProject} 
                    close={() => setShowApplyProject(false)} 
                    grantProposalId={props.grantDetail[0]}
                />
            </div>

        </>
    )

}

<button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
Toggle modal
</button>
