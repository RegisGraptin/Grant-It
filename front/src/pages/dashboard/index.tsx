import type { NextPage } from 'next';
import { Header } from '../../components/header';

import { useReadContract, useReadContracts } from 'wagmi'

import { abi, address } from "../../components/contract_abi.json";
import { Address } from 'viem';
import { GrantCard } from '../../components/grant_card';

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

        <section className='container mx-auto px-4'>
          {/* <article fro */}

          {lastGrantLoading && (
            <div>Loading id..</div>
          )}

          {grantsDetailLoading && (
            <div>Loading details..</div>
          )}

          <div>
          {grantsDetail && grantsDetail.map(function(grantDetail, i){
              console.log("result");
              console.log(grantDetail.result);
                return <GrantCard key={i} grantDetail={grantDetail.result} />
            })}

{grantsDetail && grantsDetail.map(function(grantDetail, i){
              console.log("result");
              console.log(grantDetail.result);
                return <GrantCard key={i} grantDetail={grantDetail.result} />
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
