import React, { useState } from 'react';
import styled from 'styled-components';
import bloctoSDK from '../services/blocto';

const Card = styled.div`
  margin: 10px 5px;
  padding: 10px;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
`;

const Code = styled.pre`
  background: #f0f0f0;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
  padding: 5px;
`;

const Error = styled(Code)`
  color: red;
`;

const SendTransactionButton = ({ setHash, setError }) => {
  const sendTransaction = async (event) => {
    event.preventDefault()

    const isConnected = await bloctoSDK.aptos.isConnected()

    if (!isConnected) {
      return;
    }

    const { address } = bloctoSDK.aptos.publicAccount

    const transaction = {
      arguments: [address, '1000'],
      function: '0x1::coin::transfer',
      type: 'entry_function_payload',
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
    }

    try {
      // sign and submit the transaction & get the tx hash
      const { hash } = await bloctoSDK.aptos.signAndSubmitTransaction(transaction)
      setHash(hash)
      setError(null)
    } catch (error) {
      setHash(null)
      setError(String(error))
    }
  }

  return (
    <button onClick={sendTransaction}>
      Send Transaction
    </button>
  )
}

const SendTransaction = () => {
  const [hash, setHash] = useState()
  const [error, setError] = useState()

  return (
    <Card>
      <SendTransactionButton setHash={setHash} setError={setError} />

      {hash && <Code><a href={`https://explorer.aptoslabs.com/txn/${hash}?network=testnet`} target="blank">{hash}</a></Code>}

      {error && <Error>{error}</Error>}
    </Card>
  )
}

export default SendTransaction
