import { useCallback, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { connector } from "../config/web3";

export default function Home() {
  const { active, error, account, chainId, activate, deactivate } =
    useWeb3React();

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", true);
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") {
      connect();
    }
  }, [connect]);

  if (error) {
    console.error(error);
    return <p>Se ha roto algo! 😱</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Web3 app</h1>
      {active ? (
        <>
          <button onClick={disconnect}>Disconnect Wallet</button>
          <p>
            You are connected to the network with ID: {chainId}.<br></br> Your
            account is: {account}
          </p>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
