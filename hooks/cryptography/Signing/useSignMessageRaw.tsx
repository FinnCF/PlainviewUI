import { useCallback, useState } from 'react';
import { hexToBytes } from 'viem';
import { getWalletClient } from 'wagmi/actions';

type UseSignMessageHookReturnType = {
    signature: Uint8Array | null;
    sign: () => Promise<void>;
    reset: () => void; // Added reset function
};

type UseSignMessageHook = (data: Uint8Array) => UseSignMessageHookReturnType;

export const useSignMessageRaw: UseSignMessageHook = (data) => {

    const [signature, setSignature] = useState<Uint8Array | null>(null);

    const sign = useCallback(async (): Promise<void> => {
        try {
            const hexData = Buffer.from(data).toString('hex'); // Convert Uint8Array to hex string
            const walletClient = await getWalletClient();
            const response = await walletClient.signMessage({
                message: {
                    raw: hexData,
                },
            } as any);

            // Assuming the response contains the signed message as a hex string. Modify if the structure is different.
            // Convert the hex string to a Uint8Array using the hexToBytes function.
            const signedMessage = hexToBytes(response);
            setSignature(signedMessage);
        } catch (err) {
            console.error('Error while signing:', err);
        }
    }, [data]);

    // Reset function that sets the signature state back to null
    const reset = useCallback(() => {
        setSignature(null);
    }, []);

    return { signature, sign, reset };
}
