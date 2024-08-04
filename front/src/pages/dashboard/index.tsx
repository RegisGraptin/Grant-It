import type { NextPage } from 'next';
import { Header } from '../../components/header';

import { useReadContract } from 'wagmi'

import { abi } from "../../components/contract_abi.json";

// 0xBd99a2B0d57d34a246172032E4afFa112F9cf108

const Dashboard: NextPage = () => {


  const { data: owner } = useReadContract({
    abi,
    address: "0xBd99a2B0d57d34a246172032E4afFa112F9cf108",
    functionName: 'owner',
    args: [],
  })


  return (
    <div>
        <Header />
        <h2>Dashboard</h2>
        <div>Owner: {owner?.toString()}</div>
    </div>
  );
};

export default Dashboard;
