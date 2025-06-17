import { MetaCoin, MetaCoin__factory } from '@mTypes/ethers-contracts';
import MetaCoinABI from '@abis/MetaCoin.json';
import { BrowserProvider } from 'ethers';
// import { Contract } from 'ethers';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}
const CONTRACT_ADDRESS = MetaCoinABI.networks['11155111'].address;
console.log('🌺🌺🌺🌺🌺🌺🌺🌺🌺 ', CONTRACT_ADDRESS);
const DappPage = () => {
  const [contract, setContract] = useState<MetaCoin | null>(null);
  // const contractInstance = new Contract(
  //   CONTRACT_ADDRESS,
  //   MetaCoinABI.abi,
  //   signer,
  // ) as unknown as MetaCoin;

  useEffect(() => {
    const provider = new BrowserProvider(window.ethereum);

    provider
      .getSigner()
      .then(signer => {
        const contractInstance = MetaCoin__factory.connect(CONTRACT_ADDRESS, signer);
        setContract(contractInstance);
      })
      .catch(error => {
        console.error('Error connecting to contract:', error);
      });
  }, []);

  useEffect(() => {
    const callSayHi = async () => {
      if (contract) {
        const result = await contract.getContractETHBalance();

        console.log(result, 111);
      }
    };
    callSayHi();
  }, [contract]);

  return (
    <>
      <h1>Dapptest</h1>
    </>
  );
};
export default DappPage;
