import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Header } from '../components/header';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Header />

      <main className='lg:pt-40 lg:pb-20 xl:pt-40 xl:pb-32'>
        <div className="relative items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64">
          <div className="container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto -mt-32 lg:flex-row xl:px-0">
            <div className="z-30 flex flex-col items-center w-full max-w-xl pt-48 text-center lg:items-start lg:w-1/2 lg:pt-20 xl:pt-40 lg:text-left">
              <h1 className="relative mb-4 text-3xl font-black leading-tight text-gray-900 sm:text-6xl xl:mb-8">
                Grant It
              </h1>
              <p className="pr-0 mb-8 text-base text-gray-600 sm:text-lg xl:text-xl lg:pr-20">
                Decentralized Grant Management Dashboard
              </p>
              <p className="pr-0 mb-8 text-base text-gray-600 text-sm">
                ~ Built for Superhack 2024
              </p>
              <Link href="/dashboard" className="relative self-start inline-block w-auto px-8 py-4 mx-auto mt-0 text-base font-bold text-white bg-indigo-600 border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0">
                Go to Dashboard
              </Link>
              
            </div>
            <div className="relative z-50 flex flex-col items-end justify-center w-full h-full lg:w-1/2 ms:pl-10">
              <div className="container relative left-0 w-full max-w-4xl lg:absolute xl:max-w-6xl lg:w-screen">
                <img src="/images/mockup.png" className="w-full h-auto mt-20 mb-20 ml-0 lg:mt-24 xl:mt-40 lg:mb-0 lg:h-full lg:-ml-12" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <hr />


      <section className="bg-white lg:pt-40 lg:pb-20 xl:pt-40 xl:pb-32">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">

              <div className="grid mt-6">
                <img className='rounded-lg' src="/images/chart.jpg" alt="mockup" />
              </div>

              <div className="font-light text-gray-500 sm:text-lg">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                  Monitor your grant
                </h2>
                <p className="mb-4">
                  Grant owners can easily create and publish grants for specific projects. They define the project scope, set the desired number of teams, and announce the prize reward for successful project completion.
                </p>

                <hr />

                <p className="mb-4 pt-4">
                  Teams can apply for available grants by submitting their proposals and listing their team members. Grant owners can review these applications and conduct necessary verifications. If the number of qualified teams exceeds the desired number, the platform will randomly select the required number of teams.                  
                </p>
              </div>

            </div>
          </section>



          <section className="bg-white">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">

              <div className="font-light text-gray-500 sm:text-lg">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                  Transparancy
                </h2>
                <p className="mb-4">
                  Teams can browse through available grants, select ones that align with their skills, and submit their application, including the addresses of all team members ready to work on the project.
                </p>
                <hr />
                <p className="mb-4 pt-4">
                  Upon successful project completion and approval, teams receive the promised reward directly from the grant owner.
                </p>
                <hr />
                <p className="mb-4 pt-4">
                  Grant It ensures transparency, fairness, and efficiency by leveraging decentralization, breaking down barriers, and fostering collaboration for innovative projects.
                </p>
              </div>

              <div className="grid mt-6">
                <img className='rounded-lg' src="/images/team.jpg" alt="mockup" />
              </div>
            </div>
          </section>



    </div>
  );
};

export default Home;
