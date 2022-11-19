import React, { useState } from 'react';
import styled from 'styled-components';
import bloctoSDK from './services/blocto';

const Card = styled.div`
  margin: 10px 5px;
  padding: 10px;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
`

const Code = styled.pre`
  background: #f0f0f0;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
  padding: 5px;
`

const SignInOutButton = ({ user: { loggedIn }, handleUpdateUser }) => {
  const signInOrOut = async (event) => {
    event.preventDefault()

    if (loggedIn) {
      await bloctoSDK.aptos.disconnect()

      handleUpdateUser({
        loggedIn: false,
      })
    } else {
      const {
        address, // address of the connected account
        publicKey, // public keys (array) of the multi-sig account
        authKey, // authentication key
      } = await bloctoSDK.aptos.connect()

      handleUpdateUser({
        loggedIn: true,
        address,
        publicKey,
        authKey
      })
    }
  }

  return (
    <button onClick={signInOrOut}>
      {loggedIn ? 'Sign Out' : 'Sign In/Up'}
    </button>
  )
}

const CurrentUser = () => {
  const [user, setUser] = useState({ loggedIn: false })

  const handleUpdateUser = (user) => {
    setUser(user)
  }

  return (
    <Card>
      <SignInOutButton user={user} handleUpdateUser={handleUpdateUser} />

      {user && user.loggedIn && <Code>{JSON.stringify(user, null, 2)}</Code>}
    </Card>
  )
}

export default CurrentUser
