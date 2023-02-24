import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from "../hooks/useAuth"
import { useState } from "react";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum)

const DashFooter = () => {

    const { username, status } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }
  const { account, chainID, connect } = useMetaMask()  
  const [accountAddress, setAccountAddress] = useState("");
  const [accountChainID, setAccountChainID] = useState("");
  const [accountBal, setAccountBal] = useState("");

  const connectButtonOnClick = () => {
    
    if(connect()){
        setAccountAddress(account)
        setAccountChainID(chainID)
        console.log(accountChainID)}
    // console.log(window);
    // if (
    //   typeof window !== "undefined" &&
    //   typeof window.ethereum !== "undefined"
    // ) {
    //   getAccount().then((response) => {
    //     setAccountAddress(response);
    //   });
    // } else {
    //   console.log("error");
    // }
    getBalOnClick()
  };
  const getBalOnClick = async () => {
    let bprovider = new ethers.providers.EtherscanProvider(5,'NBXIU8MUSSCZJ3MECXENXC6GC9P956YH52');
    let address =accountAddress
    let bal=await provider.getBalance(address)
    let tranum=await provider.getTransactionCount(address)
    let chainId=(await provider.getNetwork()).chainId
    let history = await bprovider.getHistory(address)
    console.log(history)
    setAccountChainID(chainId)
    console.log(tranum)
    //console.log(ethers.utils.formatEther(bal))
    setAccountBal(ethers.utils.formatEther(bal))
    //console.log(address)
  }

    const content = (
        <footer className="dash-footer">
            {goHomeButton}
            <p>Current User: {username}</p>
            <p>Status: {status}</p>
            <button variant="contained" className="dash-footer__button" onClick={connectButtonOnClick}>
             {!!accountAddress ? "Wallet Address: "+accountAddress+'\t\tBal:'+accountBal: "Connect Wallet Button"}
             </button>
        </footer>
        
    )
    return content
}
export default DashFooter