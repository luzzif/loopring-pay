import React from "react";
import PropTypes from "prop-types";
import { FlexContainer, Logo } from "./styled";
import { Box, Flex } from "reflexbox";
import { faMoon, faSun, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import darkLogo from "../../../images/logo-dark.svg";
import lightLogo from "../../../images/logo-light.svg";
import { ActionButton } from "../../action-button";

const ACTION_SIZES = [28, 32, 36];
const ACTION_ICON_SIZE = 14;

export const Toolbar = ({
    lightTheme,
    onThemeChange,
    fiat,
    onFiatClick,
    logged,
    onLogoutClick,
}) => (
    <FlexContainer
        px="20px"
        py="12px"
        alignItems="center"
        justifyContent="space-between"
        width="100vw"
    >
        <Box height={36}>
            {logged && <Logo src={lightTheme ? darkLogo : lightLogo} />}
        </Box>
        <Flex alignItems="center" height="100%">
            {fiat && (
                <Box minWidth="auto" mr={[2, 3]}>
                    <ActionButton
                        onClick={onFiatClick}
                        faIcon={fiat.faIcon}
                        size={ACTION_SIZES}
                        faIconSize={ACTION_ICON_SIZE}
                    />
                </Box>
            )}
            <Box minWidth="auto">
                <ActionButton
                    onClick={onThemeChange}
                    faIcon={lightTheme ? faMoon : faSun}
                    size={ACTION_SIZES}
                    faIconSize={ACTION_ICON_SIZE}
                />
            </Box>
            {logged && (
                <Box minWidth="auto" ml={[2, 3]}>
                    <ActionButton
                        onClick={onLogoutClick}
                        faIcon={faSignOutAlt}
                        size={ACTION_SIZES}
                        faIconSize={ACTION_ICON_SIZE}
                    />
                </Box>
            )}
        </Flex>
    </FlexContainer>
);

Toolbar.propTypes = {
    lightTheme: PropTypes.bool.isRequired,
    onThemeChange: PropTypes.func.isRequired,
    fiat: PropTypes.object,
    onFiatClick: PropTypes.func.isRequired,
    logged: PropTypes.bool.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
};
