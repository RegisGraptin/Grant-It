
import { BaseError, useWriteContract } from "wagmi";
import { useState } from "react";
import { abi, address } from "./contract_abi.json";
import { Address } from "viem";
import { FormEvent } from "react";

export const ApplyProjectModal = (props: any) => {

    const [teamInput, setTeamInput] = useState<string[]>([""]);

    const {
        data: hash,
        error,
        isPending,
        writeContract
    } = useWriteContract()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        console.log(formData);

        // Get the addresses
        // let address = teamInput.map((add) => add);
        console.log(teamInput);  

        // Write to smart contract
        writeContract({
            address: address as Address,
            abi,
            functionName: 'applyGrantProposal',
            args: [
                props.grantProposalId,
                teamInput,
                formData.get("title"),
                formData.get("description")
            ]
        })

    }

    function handleChange(i: number, event: any) {
        const values = [...teamInput];
        values[i] = event.target.value;
        setTeamInput(values);
    }


    function handleAdd() {
        const values = [...teamInput];
        values.push("");
        setTeamInput(values);
    }

    function handleRemove(i: number) {
        if (teamInput.length == 1) { return; }
        const values = [...teamInput];
        values.splice(i, 1);
        setTeamInput(values);
    }


    return (
        <>
            {props.show && (
                <div>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl w-6/12">

                        <form onSubmit={onSubmit}>

                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Apply your project
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => props.close(false)}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            x
                                        </span>
                                    </button>
                                </div>

                                
                                    <div className="relative p-6 flex-auto">

                                        <div className="md:col-span-5">
                                            <label htmlFor="title">Title</label>
                                            <input type="text" name="title" id="title" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>
                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                        </p>

                                        <div className="md:col-span-5">
                                            <label htmlFor="description">Descripton</label>
                                            <textarea
                                                id="description"
                                                name='description'
                                                rows={4}
                                                className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-50"
                                                placeholder="Description of the grant round...">
                                            </textarea>
                                        </div>




                                        <div className="md:col-span-5 pt-5">

                                            <div className="flex pb-5"> 
                                                <label htmlFor="title" className="flex-1">Add your team member addresses</label>

                                                <button 
                                                    type="button" 
                                                    onClick={() => handleAdd()}
                                                    className="flex-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Add Team Address
                                                </button>

                                            </div>
                                            

                                            {teamInput.map((field, idx) => {
                                                return (
                                                    <div key={`${idx}`}>
                                                        <div className="relative w-full">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter address"
                                                                value={field || ""}
                                                                onChange={(e) => handleChange(idx, e)}
                                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                                            />
                                                            <button 
                                                                type="button" 
                                                                onClick={() => handleRemove(idx)}
                                                                className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                            >
                                                                X
                                                            </button>
                                                        </div>

                                                    </div>
                                                );
                                            })}
                                        </div>


                                        {/* <div className="md:col-span-5 text-right pt-5"> */}
                                            {/* <div className="inline-flex items-end">
                                                <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    
                                                </button>
                                            </div>
                                        </div> */}
                                        {error && (
                                            <div>Error: {(error as BaseError).shortMessage || error.message}</div>
                                        )}

                                    </div>

                                
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => props.close(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        // type="button"
                                        // onClick={() => props.close(false)}
                                        disabled={isPending}
                                    >
                                        {isPending ? 'Confirming...' : 'Submit'}
                                    </button>
                                </div>

                            </div>

                            </form>



                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            )}
        </>
    )

}

