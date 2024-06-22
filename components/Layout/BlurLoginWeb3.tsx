import NavBar from "./NavBar";
import React from 'react';
import { useAccount, useNetwork } from "wagmi";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import SignIn from "../SignIn/SignIn";
import { CryptoContext } from "../../pages/_app"; // Make sure to import the correct path to your context
import { useContext, useEffect } from "react";
import ChangeChain from "./ChangeChain";

export default function BlurLoginWeb3({ children }) {

    const { rsaKeys, setDecryptedPrivateRSAKey } = useContext(CryptoContext);
    const { chain } = useNetwork()
    const account = useAccount()

    // Effect that listens to changes in account status
    useEffect(() => {
        if (rsaKeys.decryptedPrivateRSAKey && setDecryptedPrivateRSAKey) {
            setDecryptedPrivateRSAKey(null);
        }
    }, [account.address]);

    return (
        <>
            <div style={{ 
                pointerEvents:  (account.isConnected || account.isReconnecting || account.isConnecting || rsaKeys?.decryptedPrivateRSAKey) ? 'all' : 'none', 
                filter: (account.isConnected || account.isReconnecting || account.isConnecting) ? 'blur(0px)' : 'blur(10px)' 
            }}>
                <div style={{ filter: rsaKeys?.decryptedPrivateRSAKey ? 'blur(0px)' : 'blur(10px)' }}>
                    {children}
                </div>
            </div>
            {!rsaKeys?.decryptedPrivateRSAKey && <SignIn />}
            {account.isConnected || account.isReconnecting || account.isConnecting ? "" : <ConnectWallet />}
            {chain?.name !== "Sepolia" && <ChangeChain/>}
        </>
    );
}
