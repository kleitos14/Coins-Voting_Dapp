import React, { useEffect, useState } from "react";
import "./Coin.css";
import { Button } from "web3uikit"
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis"

function Coin({ perc, setPerc, token, setModalToken, setVisible }) {

  const [color, setColor] = useState();
  const contractProcessor = useWeb3ExecuteFunction();
  const { isAuthenticated } = useMoralis();

  useEffect(() => {
    if (perc < 50) {
      setColor("red")
    } else {
      setColor("green")
    }
  }, [perc])

  async function vote(upDown) {
    let options = {
      contractAddress: "0xE0d5CAadf09A250CC808b7f387DB73ac720F178F",
      functionName: "vote",
      abi: [{
        "inputs":
          [
            {
              "internalType": "string",
              "name": "_ticker",
              "type": "string"
            },
            {
              "internalType":
                "bool",
              "name": "_vote",
              "type": "bool"
            }
          ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      params: {
        _ticker: token,
        _vote: upDown
      },
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Vote Successful!")
      },
      onError: (error) => {
        alert(error.data.message)
      }
    })
  }

  return (
    <>
      <div>
        <div class="token">
          {token}
        </div>
        <div class="circle" style={{ boxShadow: `0 0 20px ${color}` }}>
          <div
            class="wave"
            style={{
              marginTop: `${100 - perc}%`,
              boxShadow: `0 0 20px ${color}`,
              backgroundColor: color,
            }}
          >

          </div>
          <div class="percentage">
            {perc}%
          </div>
        </div>

        <div class="votes">
          <Button
            onClick={() => {
              if (isAuthenticated) {
                vote(true)
              } else {
                alert("You need to Connect your Wallet in order to Vote")
              }
            }}
            text="Up"
            theme="primary"
            type="button"
          />

          <Button
            onClick={() => {
              if (isAuthenticated) {
                vote(false)
              } else {
                alert("You need to Connect your Wallet in order to Vote")
              }
            }}
            color="red"
            text="Down"
            theme="colored"
            type="button"
          />
        </div>

        <div class="votes">
          <Button
            onClick={() => {
              setModalToken(token)
              setVisible(true)
            }}
            text="INFO"
            theme="translucent"
            type="button"
          />
        </div>
      </div>
    </>
  );
}

export default Coin;
