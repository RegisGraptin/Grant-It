


export const GrantCard = (props: any) => {

    console.log(props.grantDetail);

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
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                            See Projects
                        </a>

                        <button type="button" className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-3 h-3 text-white me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                            </svg>
                            Apply
                        </button>
                    </div>
                </div>
            </div>

        </>
    )

}