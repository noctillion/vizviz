import styled from 'styled-components';

const Wrapper = styled.footer`
  padding: 1rem 0;
  text-align: center;
  background-color:#e0e0e0;
`;

function Footer() {
  return (
    <Wrapper>
      <p>2020 &copy; Julian Martinez-H. All right reserved.</p>
    </Wrapper>
  );
}

export default Footer;
