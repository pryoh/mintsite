"use client";

import Image from "next/image";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, useCallback } from "react";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import "@solana/wallet-adapter-react-ui/styles.css";

import Link from "next/link";
import { AiOutlineTwitter } from "react-icons/ai";
import { SiDiscord } from "react-icons/si";
import { IoStorefrontSharp } from "react-icons/io5";

export default function Home() {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => process.env.NEXT_PUBLIC_RPC_URL, []);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter({ network })],
    [network]
  );

  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <main
          className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 md:p-8 lg:p-24"
          style={{ fontFamily: "MyUnderwood, sans-serif" }}
        >
          <h1 className="text-center text-4xl md:text-6xl font-bold mt-4">
            Welcome to <a className="text-[#512DA8]">Traders Anonymous</a>
          </h1>

          <div className="pt-2">
            <WalletMultiButtonDynamic />
          </div>

          <p className="text-center text-xl md:text-2xl mt-3">
            Join the community of expert traders.
          </p>

          <Link
            href="/mint"
            className="mt-4 px-6 py-2 border rounded-md text-white hover:bg-[#512DA8] transition duration-300"
          >
            MINT NOW
          </Link>

          <div className="flex flex-wrap justify-center items-center mt-6 gap-4">
            <a
              href="#"
              className="p-6 text-center border w-full md:w-96 rounded-xl hover:text-[#512DA8] focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Learn &rarr;</h3>
              <p className="mt-4 text-xl">
                Discover trading strategies and market insights.
              </p>
            </a>

            <a
              href="#"
              className="p-6 text-center border w-full md:w-96 rounded-xl hover:text-[#512DA8] focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Connect &rarr;</h3>
              <p className="mt-4 text-xl">
                Connect with fellow traders and share experiences.
              </p>
            </a>

            <a
              href="#"
              className="p-6 text-center border w-full md:w-96 rounded-xl hover:text-[#512DA8] focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Trade &rarr;</h3>
              <p className="mt-4 text-xl">
                Access tools and resources for trading.
              </p>
            </a>
          </div>

          <div className="flex justify-center gap-8 mt-6 text-2xl md:text-4xl">
            <a
              href="https://twitter.com/TradersAnonNFT"
              target="_blank"
              rel="noreferrer noopener"
            >
              <AiOutlineTwitter />
            </a>
            <a
              href="https://magiceden.io/marketplace/traders_anonymous_tickets"
              target="_blank"
              rel="noreferrer noopener"
            >
              <IoStorefrontSharp />
            </a>
            <a
              href="https://discord.gg/egcH4Gnn"
              target="_blank"
              rel="noreferrer noopener"
            >
              <SiDiscord />
            </a>
          </div>
        </main>
      </WalletModalProvider>
    </WalletProvider>
  );
}
