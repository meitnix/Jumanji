// import { useState } from "react";
// import { useMetaMask } from "metamask-react";
// import { ethers } from "ethers";

// const provider = new ethers.providers.Web3Provider(window.ethereum)

// async function getAccount() {
//   const accounts = await window.ethereum.request({
//     method: "eth_requestAccounts",
//   });
//   const account = accounts[0];

//   return account;
// }

// export default function ConnectButton() {
//   const { status , account, chainID, connect, ethereum } = useMetaMask()  
//   const [accountAddress, setAccountAddress] = useState("");
//   const [accountChainID, setAccountChainID] = useState("");
//   const [accountBal, setAccountBal] = useState("");

//   const connectButtonOnClick = () => {
//     connect();
//     if(status === "connected"){
//         setAccountAddress(account)
//         setAccountChainID(chainID)
//         console.log(chainID)}
//     // console.log(window);
//     // if (
//     //   typeof window !== "undefined" &&
//     //   typeof window.ethereum !== "undefined"
//     // ) {
//     //   getAccount().then((response) => {
//     //     setAccountAddress(response);
//     //   });
//     // } else {
//     //   console.log("error");
//     // }
//     getBalOnClick()
//   };
//   const getBalOnClick = async () => {
//     let bprovider = new ethers.providers.EtherscanProvider(5,'NBXIU8MUSSCZJ3MECXENXC6GC9P956YH52');
//     let address =accountAddress
//     let bal=await provider.getBalance(address)
//     let tranum=await provider.getTransactionCount(address)
//     let chainId=await (await provider.getNetwork()).chainId
//     let history = await bprovider.getHistory(address)
//     console.log(history)
//     setAccountChainID(chainId)
//     console.log(tranum)
//     //console.log(ethers.utils.formatEther(bal))
//     setAccountBal(ethers.utils.formatEther(bal))
//     //console.log(address)
//   }

//   return (
//     <button variant="contained" className="dash-footer__button" onClick={connectButtonOnClick}>
//       {!!accountAddress ? "Wallet Address: "+accountAddress+'\t\tBal:'+accountBal: "Connect Wallet Button"}
//     </button>
//   );
// }