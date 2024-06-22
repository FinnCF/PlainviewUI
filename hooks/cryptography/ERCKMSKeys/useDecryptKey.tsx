import { useDecryptBytesWithAES256 } from '../AESKeys/useDecryptBytesWithAES256';
import useHexToBytes from '../../misc/useHexToBytes';
import { useSignMessageRaw } from '../Signing/useSignMessageRaw';
import useHashBytes from '../Hashing/useHashBytes';

export default function useDecryptKey(publicRSAKey: `0x${string}`, encryptedPrivateRSAKey: `0x${string}`, iv: `0x${string}`) {

  const publicRSAKeyBytes = useHexToBytes(publicRSAKey)
  const encryptedPrivateRSAKeyBytes = useHexToBytes(encryptedPrivateRSAKey)
  const ivBytes = useHexToBytes(iv)

  const signMessage = useSignMessageRaw(publicRSAKeyBytes);
  const hashedSignature = useHashBytes(signMessage.signature)

  const decryptedPrivateRSAKey = useDecryptBytesWithAES256(
    encryptedPrivateRSAKeyBytes,
    ivBytes,
    hashedSignature
  );

  const publicRSAKeyToBytes = useHexToBytes(publicRSAKey)

  return {
    signMessage,
    decryptedPrivateRSAKey,
    encryptedPrivateRSAKey: encryptedPrivateRSAKeyBytes,
    publicRSAKey: publicRSAKeyToBytes
  };
}
