import styled from "styled-components";
import { Box } from "reflexbox";
import { Button } from "../../components/button";

export const LoginIllustration = styled.img`
    width: 100%;
    height: 100%;
`;

export const WelcomeTextBox = styled(Box)`
    font-size: 20px;
    font-weight: 700;
    text-align: center;
`;

export const InvalidChainText = styled.span`
    color: ${(props) => props.theme.error};
`;

export const FullWidthButton = styled(Button)`
    width: 100%;
`;

export const LinkLikeButton = styled.button`
    border: none;
    outline: none;
    text-decoration: underline;
    background: transparent;
    color: ${({ theme }) => theme.text};
    font-family: Montserrat;
    font-size: 16px;
    cursor: pointer;
`;
