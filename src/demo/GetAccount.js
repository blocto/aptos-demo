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

const SignInOutButton = ({ user: { isLoggedIn }, handleUpdateUser }) => {
  const signInOrOut = async (event) => {
    event.preventDefault()

    if (isLoggedIn) {
      await bloctoSDK.aptos.disconnect()

      handleUpdateUser({
        isLoggedIn: false,
      })
    } else {
      const account = await bloctoSDK.aptos.connect()

      handleUpdateUser({
        isLoggedIn: true,
        ...account
      })
    }
  }

  return (
    <button onClick={signInOrOut}>
      {isLoggedIn ? 'Sign Out' : 'Sign In/Up'}
    </button>
  )
}

const CurrentUser = () => {
  const [user, setUser] = useState({ isLoggedIn: false })

  const handleUpdateUser = (user) => {
    setUser(user)
  }

  return (
    <Card>
      <SignInOutButton user={user} handleUpdateUser={handleUpdateUser} />

      {user && user.isLoggedIn && <Code>{JSON.stringify(user, null, 2)}</Code>}
    </Card>
  )
}

export default CurrentUser
