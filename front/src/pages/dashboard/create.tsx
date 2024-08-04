import type { NextPage } from 'next';
import { Header } from '../../components/header';

import { useReadContract } from 'wagmi'

import { abi } from "../../components/contract_abi.json";
import { FormEvent } from 'react';

import { useWriteContract } from 'wagmi'

// 0xBd99a2B0d57d34a246172032E4afFa112F9cf108

const CreateGrantForm: NextPage = () => {

    const { 
        data: hash, 
        isPending, 
        writeContract 
    } = useWriteContract()

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        console.log(formData);

        let days = 2;

        const currentTime = new Date().getTime();
        const additionalTime = ((days * 24 * 60 * 60)) * 1000; // Convert seconds to milliseconds

        const futureTime = currentTime + additionalTime;
        const deadline = Math.floor(futureTime / 1000);


        // Write to smart contract
        writeContract({
            address: '0xBd99a2B0d57d34a246172032E4afFa112F9cf108',
            abi,
            functionName: 'createGrantProposal',
            args: [
                formData.get("title"), 
                formData.get("description"),
                formData.get("nb_projects"),
                deadline
            ],
            value: BigInt(100000000000000000) // TODO :: Need to see how we can pass it in the form 
        })

        // const response = await fetch('/api/submit', {
        //     method: 'POST',
        //     body: formData,
        // })

        // // Handle response if necessary
        // const data = await response.json()
        // // ...
    }

    return (
        <>
            <Header />
            <form onSubmit={onSubmit}>
                <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                    <div className="container max-w-screen-lg mx-auto">
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600">Create a grant</h2>
                            <p className="text-gray-500 mb-6">Create a new grant proposal.</p>

                            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                    <div className="text-gray-600">
                                        <p className="font-medium text-lg">Grant Information</p>
                                        <p>Please fill out all the fields.</p>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <div className="md:col-span-5">
                                                <label htmlFor="title">Title</label>
                                                <input type="text" name="title" id="title" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            </div>

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

                                            <div className="md:col-span-5">
                                                <label htmlFor="nb_projects">How many selected projects?</label>
                                                <input type="number" name="nb_projects" id="nb_projects" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            </div>

                                            <div className="md:col-span-5 text-right">
                                                <div className="inline-flex items-end">
                                                    <button disabled={isPending} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                        {isPending ? 'Confirming...' : 'Submit'}
                                                    </button>
                                                </div>
                                            </div>


                                            {hash && <div>Transaction Hash: {hash}</div>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default CreateGrantForm;
