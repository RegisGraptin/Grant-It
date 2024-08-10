import { Address } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import { abi, address } from "./contract_abi.json";

export const ProjectCard = (props: any) => {

    const { address: userAddress } = useAccount();

    const STATUS = {
        0: ["Pending", "bg-blue-100 text-blue-800"],
        1: ["Eligible", "bg-green-100 text-green-800"],
        2: ["Accepted", "bg-yellow-100 text-yellow-800"],
        3: ["Rejected", "bg-red-100 text-red-800"],
        4: ["Canceled", "bg-red-100 text-red-800"],
        5: ["Verified", "bg-green-100 text-green-800"],
        6: ["Done", "bg-green-100 text-green-800"],
    }

    const {
        data: hash,
        error,
        isPending,
        writeContract
    } = useWriteContract()

    function acceptProject(projectId: Number) {
        
        console.log(projectId)

        writeContract({
            address: address as Address,
            abi,
            functionName: 'setEligibleProject',
            args: [
                props.grantDetail[0],
                ""+projectId
            ]
        })
    }
    
    function isGrantOwner() {
        return props.grantDetail[8] === userAddress;
    }

    return <>
        <div key={"project_" + props.projectDetail.grantId + "_"+ props.projectDetail.projectId} className="p-6 mb-1 bg-white border border-gray-200 rounded-lg shadow">

            <div className="flex">
                <h2 className="flex-1">{props.projectDetail.result.title}</h2>
                
                <div>
                    <span className={STATUS[props.projectDetail.result.status][1] + " text-sm font-medium me-5 px-2.5 py-0.5 rounded"}>
                        {STATUS[props.projectDetail.result.status][0]}
                    </span>
                </div>

                {/* Action on the team */}
                <div>
                {error && (
                    <div>Error: {(error as BaseError).shortMessage || error.message}</div>
                )}
                    {isGrantOwner() && (
                        <button
                            type="button"
                            className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            disabled={isPending}
                            onClick={() => acceptProject(props.projectDetail.result.projectId)}
                        >
                            {isPending ? 'Confirming...' : 'Accept'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    </>
}
