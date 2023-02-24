import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
//import ConnectButton from './ConnectButton'
import { MetaMaskProvider } from 'metamask-react'

const DashLayout = () => {
    return (
        <>
            <DashHeader />
            
            <div className="dash-container">
                <Outlet />
            </div>
            <MetaMaskProvider><DashFooter /></MetaMaskProvider>
        </>
    )
}
export default DashLayout