"use client";
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from "next/link";
import { useMemo, useState } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { MetaplexProvider } from '@/components/MetaplexProvider';
import { MintNFTs } from '@/components/MintNFTs';

// Dynamically import WalletMultiButton
const ButtonWrapper = dynamic(() => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton), { ssr: false });

export default function Mint() {
    const [network] = useState(WalletAdapterNetwork.Mainnet); // Fixed useState usage
    const endpoint = useMemo(() => process.env.NEXT_PUBLIC_RPC_URL, []);

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter({ network }),
        new TorusWalletAdapter(),
    ], [network]);

    return (
        <div className="flex flex-col h-screen text-white bg-black" style={{fontFamily: "MyUnderwood, sans-serif"}}>
            <Head>
                <title>Mint Ticket | Traders Anonymous</title>
            </Head>
            <header className="p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="text-lg font-bold">
                        Traders Anonymous
                    </Link>
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center bg-black" style={{fontFamily: "MyUnderwood, sans-serif"}}>
                <div className="text-center p-4">
                    <h1 className="text-2xl font-bold mb-4">Mint Your Access Ticket</h1>
                    <p>This page allows you to mint a new ticket giving access to the exclusive services provided by Traders Anonymous.</p>
                    <ConnectionProvider endpoint={endpoint}>
                        <WalletProvider wallets={wallets} autoConnect>
                            <WalletModalProvider>
                                <MetaplexProvider>
                                    <div className="flex flex-col items-center">
                                        <ButtonWrapper />
                                        <MintNFTs />
                                        <Link href="/" className="mt-8 px-6 py-2 border rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300">
                                            Return Home
                                        </Link>
                                    </div>
                                </MetaplexProvider>
                            </WalletModalProvider>
                        </WalletProvider>
                    </ConnectionProvider>
                </div>
            </main>
            <footer className="p-4 text-center bg-black" style={{fontFamily: "MyUnderwood, sans-serif"}}>
                <span>© 2024 Traders Anonymous. All rights reserved.</span>
            </footer>
        </div>
    );
}
