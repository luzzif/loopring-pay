import React from "react";
import styled, { css } from "styled-components";
import { UndecoratedLink } from "../undecorated-link";

const commonsStyles = css`
    display: flex;
    white-space: nowrap;
    padding: ${(props) => (props.secondary ? "9px 17px" : "12px 20px")};
    justify-content: center;
    font-size: 16px;
    font-family: "Montserrat";
    background: ${(props) => (props.secondary ? "none" : props.theme.primary)};
    color: ${(props) =>
        props.secondary ? props.theme.primary : props.theme.textInverted};
    border: ${(props) =>
        props.secondary ? `solid 3px ${props.theme.primary}` : "none"};
    border-radius: 24px;
    font-weight: 600;
    transition: all 0.3s ease;
    transform: scale(1);
    outline: none;
    cursor: pointer;
    text-decoration: none;
    :hover:not(:disabled) {
        ${(props) =>
            props.secondary &&
            css`
                background: ${props.theme.secondaryButtonBackground};
            `}
    }
    :active {
        transform: scale(0.95);
    }
    :disabled {
        cursor: not-allowed;
        background: ${(props) =>
            props.secondary ? "none" : props.theme.disabled};
        color: ${(props) => props.theme.textDisabled};
        ${(props) =>
            props.secondary &&
            css`
                border: solid 3px ${(props) => props.theme.textDisabled};
            `}
    }
`;

const StyledButton = styled.button`
    ${commonsStyles}
`;

const StyledLink = styled(UndecoratedLink)`
    ${commonsStyles}
`;

export const Button = ({ link, children, href, external, ...rest }) =>
    link ? (
        <StyledLink
            href={href}
            target={external ? "_blank" : ""}
            rel="noopener noreferrer"
            {...rest}
        >
            {children}
        </StyledLink>
    ) : (
        <StyledButton {...rest}>{children}</StyledButton>
    );
