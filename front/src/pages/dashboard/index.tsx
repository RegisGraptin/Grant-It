import type { NextPage } from 'next';
import { Header } from '../../components/header';

import { useReadContract, useReadContracts } from 'wagmi'

import { abi, address } from "../../components/contract_abi.json";
import { Address } from 'viem';
import { GrantCard } from '../../components/grant_card';

const Dashboard: NextPage = () => {

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

        {lastGrantLoading && (
          <div>Loading id..</div>
        )}

        {grantsDetailLoading && (
          <div>Loading details..</div>
        )}

        <div>
          {grantsDetail && grantsDetail.map(function (grantDetail, i) {
            return <GrantCard key={i} grantDetail={grantDetail.result} />
          })}

        </div>


      </section>
    </div>
  );
};

export default Dashboard;
