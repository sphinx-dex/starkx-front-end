import type { NextPage } from 'next'
import {useState} from "react";
import { useContractRead,useAccount } from 'wagmi'
import ERC20Fake from "../../abi/ERC20Fake.json";

const renderToken = (name : string, amount: any) => {
    const logos = {

    }

    return(<div className="flex flex-row w-full justify-between border border-themeBorderGrey mt-2 items-center py-1 px-2">
        <div className="flex flex-row items-center">
            <img src={`/${name}.svg`} className="w-8"></img>
            <div className="ml-2">{name}</div>
        </div>
        <div className="flex flex-row">{Number(amount) / 1e18} {name === "ETHEREUM"? "ETH" : name}</div>
    </div>)
}

const Account: NextPage = () => {
    const { address = "", isConnected } = useAccount();
    const WETHBalance = useContractRead({
        address: "0x0e9A9Ac3Aaf264Af4F6716C2FC982CF58F3E591D",
        abi: ERC20Fake.abi,
        functionName: "balanceOf",
        args: [address],
    });
    const USDCBalance = useContractRead({
        address: "0x41FE9AC7a76D7a20794551a3E8Ba445c3C635106",
        abi: ERC20Fake.abi,
        functionName: "balanceOf",
        args: [address],
    });
    const DAIBalance = useContractRead({
        address: "0x45f2B2E318412d1f8102D1369B4C811421017a34",
        abi: ERC20Fake.abi,
        functionName: "balanceOf",
        args: [address],
    });
    console.log(address);
    console.log(WETHBalance.data);
   const [depositAmount, setDepositAmount] = useState(0);
   const [withdrawAmount, setWithdrawAmount] = useState(0);

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
        <div className="text-white max-w-7xl  flex flex-row w-full">
            <div className="w-full flex-col bg-themeDarkGrey p-5">
                <div className="text-lg">Virtual Deposits:</div>
                <select className="mt-3 bg-themeGreen w-full p-2.5 text-black rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                        <option selected disabled hidden>Select Chain</option>
                        <option>Ethereum</option>
                        <option>Polygon</option>
                        <option>Arbitrum</option>
                        <option>Optimism</option>
                </select>
                    <div className="mt-6">
                        {renderToken("ETHEREUM", WETHBalance.data)}
                        {renderToken("USDC", USDCBalance.data)}
                        {renderToken("DAI", DAIBalance.data)}
                    </div>
                    <div className="mt-10">Virtual Deposit From Ethereum to Starknet</div>
                    <div className="relative w-full lg:max-w-sm mt-3">
                    <select className="bg-themePurple w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                        <option selected disabled hidden>Select Token</option>
                        <option>Ethereum</option>
                        <option>DAI</option>
                        <option>USDC</option>
                    </select>
                    <div className="mt-3">Enter Amount</div>
                    <input
                            type="number"
                            name="depositAmount"
                            id="price"
                            value={depositAmount}
                            className="mt-1 block w-full h-6 pl-12 pr-12 bg-themeDarkGrey border border-themeBorderGrey rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="0.00"
                            onChange={(event) => setDepositAmount(Number(event.target.value))}
                            />
                    <button className="mt-3 p-2 w-36 bg-themeGreen text-black">Deposit</button>
                </div>
            </div>
            <div className="w-full flex-col ml-20 bg-themeDarkGrey p-5">
                <div className="text-lg">Starknet Account Balances:</div>
                <div className="mt-6">
                    {renderToken("ETHEREUM", 10)}
                    {renderToken("USDC", 10)}
                    {renderToken("DAI", 10)}
                </div>
                <div className="mt-6">Virtual Deposit From Ethereum to Starknet</div>
                <div className="relative w-full lg:max-w-sm">
                <select className="mt-2 bg-themeGreen w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option selected disabled hidden>Select Chain</option>
                    <option>Ethereum</option>
                    <option>Polygon</option>
                    <option>Arbitrum</option>
                    <option>Optimism</option>
                </select>
                <select className="mt-2 bg-themePurple w-full p-2.5 text-black  rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option selected disabled hidden>Select Token</option>
                    <option>Ethereum</option>
                    <option>DAI</option>
                    <option>USDC</option>
                </select>
                <div className="mt-3">Enter Amount</div>
                <input
                        type="number"
                        name="withdrawAmount"
                        id="price"
                        value={withdrawAmount}
                        className="mt-2 block w-full h-6 pl-12 pr-12 bg-themeDarkGrey border border-themeBorderGrey rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="0.00"
                        onChange={(event) => setWithdrawAmount(Number(event.target.value))}
                        />
                <div>
                    <div className="mt-2">
                        <button className="mt-2 p-2 w-36 bg-themeOrange text-black">Deposit</button>
                        <button className="mt-2 p-2 w-36 bg-themeBlue text-black m-4">Wtihdraw</button>
                    </div>
                </div>
            </div>
            </div>
    </div>
  </div>
  )
}

export default Account;
