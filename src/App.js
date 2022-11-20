import './App.css';
import styled from 'styled-components';
import GetAccount from './demo/GetAccount';
import SendTransaction from './demo/SendTransaction';

const Wrapper = styled.div`
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
`;

function App() {
  return (
    <Wrapper>
      <GetAccount />
      <SendTransaction />
    </Wrapper>
  );
}

export default App;
