"use client"
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { MetaplexProvider } from "../components/MetaplexProvider";
import { MintNFTs } from "../components/MintNFTs";
import "@solana/wallet-adapter-react-ui/styles.css";
import dynamic from 'next/dynamic';
import Link from "next/link";
import{
  AiOutlineTwitter,
} from 'react-icons/ai';
import {
  SiDiscord
} from 'react-icons/si';
import {
  IoStorefrontSharp
} from 'react-icons/io5';

export default function Home() {
  const network = useState(WalletAdapterNetwork.Mainnet);
  const endpoint = useMemo(() => process.env.NEXT_PUBLIC_RPC_URL, [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );


  const ButtonWrapper = dynamic(() =>
    import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton)
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white" style={{fontFamily: "MyUnderwood, sans-serif"}}>
      <h1 className="text-6xl font-bold">
          Welcome to <a className="text-purple-950">Traders Anonymous</a>
        </h1>

        <p className="mt-3 text-2xl">
          Join the community of expert traders.
        </p>

        <Link href="/mint" className="mt-4 px-6 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300">
          Mint Now
        </Link>

        <div className="mt-4 flex items-center justify-around w-full max-w-4xl">
          <a href="#" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold">Learn &rarr;</h3>
            <p className="mt-4 text-xl">
              Discover trading strategies and market insights.
            </p>
          </a>

          <a href="#" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold">Connect &rarr;</h3>
            <p className="mt-4 text-xl">
              Connect with fellow traders and share experiences.
            </p>
          </a>

          <a href="#" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold">Trade &rarr;</h3>
            <p className="mt-4 text-xl">
              Access tools and resources for trading.
            </p>
          </a>
        </div>
      <div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <MetaplexProvider>
              <div>
                <ButtonWrapper />
              </div>
            </MetaplexProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
    <div className="text-2xl lg:text-4xl flex justify-center gap-16 text-white">
      <a href="https://twitter.com/TradersAnonNFT" target="_blank" rel="noreferrer noopener">
        <AiOutlineTwitter/>
      </a>
      <a href="https://magiceden.io/marketplace/traders_anonymous_tickets" target="_blank" rel="noreferrer noopener">
        <IoStorefrontSharp />
      </a>
      <a href="https://discord.gg/egcH4Gnn" target="_blank" rel="noreferrer noopener">
        <SiDiscord />
      </a>
    </div>
    </main>
  );
}
