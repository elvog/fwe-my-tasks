import styled from "styled-components";

export const SmallButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  border: 0px;
  border-radius: 5px;
  color: #ffffff;
  line-height: 22.4px;
  padding: 13.2px 26.4px;
  text-align: center;
  width: 8rem;
  margin-right: 0.5rem;
  font-weight: 500;
  transition-duration: 250ms;
  outline: 0;
  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;
