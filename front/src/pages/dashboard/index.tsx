import type { NextPage } from 'next';
import { Header } from '../../components/header';

import { useReadContract, useReadContracts } from 'wagmi'

import { abi, address } from "../../components/contract_abi.json";
import { Address } from 'viem';

const Dashboard: NextPage = () => {


  const { data: owner } = useReadContract({
    address: address as Address,
    abi,
    functionName: 'owner',
    args: [],
  })

  const { data: lastGrantId, isLoading: lastGrantLoading } = useReadContract({
    address: address as Address,
    abi,
    functionName: 'currentGrantId',
    args: [],    
  })

  const { data: grantsDetail, isLoading: grantsDetailLoading } = useReadContracts({
    contracts: Array.from({ length: Number(lastGrantId) }).map(
      (_, index) => ({
        abi,
        address: address as Address,
        functionName: "grantPropositions",
        args: [index],
      })
    ),
  });

  return (
    <div>
        <Header />

        <section>
          {/* <article fro */}

          {lastGrantLoading && (
            <div>Loading id..</div>
          )}

          {grantsDetailLoading && (
            <div>Loading details..</div>
          )}

          <div>
            {grantsDetail && grantsDetail.map(function(grantDetail, i){
                return <div key={i}>
                    <h2>Grant detail</h2>
                    <p>{grantDetail.result}</p>
                </div>
            })}
            
          </div>


        </section>

        <h2>Dashboard</h2>
        <div>Owner: {owner?.toString()}</div>
        <div>Last ID: {lastGrantId?.toString()}</div>
    </div>
  );
};

export default Dashboard;
