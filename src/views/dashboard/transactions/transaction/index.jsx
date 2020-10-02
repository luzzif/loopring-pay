import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Flex, Box } from "reflexbox";
import {
    OneLineText,
    AmountText,
    HoverableContainer,
    RightBlockFlex,
} from "./styled";
import { TransactionIcon } from "./icon";
import { FormattedMessage, useIntl } from "react-intl";
import { DateTime } from "luxon";
import { formatBigNumber } from "../../../../utils/conversion";
import { findTokenBySymbol } from "../../../../utils";

export const Transaction = ({
    balances,
    transaction,
    onClick,
    selectedFiat,
}) => {
    const { formatMessage } = useIntl();
    const {
        etherAmount,
        deposit,
        memo,
        sent,
        withdrawal,
        timestamp,
        progress,
        symbol,
    } = transaction;
    const [referenceColor, setReferenceColor] = useState("");
    const [fiatValue, setFiatValue] = useState("0");

    useEffect(() => {
        let referenceColor = "";
        if (deposit) {
            referenceColor = "#2E7D32";
        } else if (withdrawal) {
            referenceColor = "#C62828";
        } else if (sent) {
            referenceColor = "#D50000";
        } else {
            referenceColor = "#00C853";
        }
        setReferenceColor(referenceColor);
    }, [deposit, progress, sent, withdrawal]);

    useEffect(() => {
        if (balances && balances.length > 0) {
            const { fiatValue } = findTokenBySymbol(balances, symbol);
            setFiatValue(fiatValue);
        }
    }, [symbol, balances]);

    const getText = () => {
        if (deposit) {
            return <FormattedMessage id="dashboard.transactions.deposit" />;
        }
        if (withdrawal) {
            return <FormattedMessage id="dashboard.transactions.withdrawal" />;
        }
        return memo || "-";
    };

    const handleLocalClick = useCallback(() => {
        onClick(transaction);
    }, [onClick, transaction]);

    return (
        <HoverableContainer
            alignItems="center"
            pl={["16px", "20px"]}
            pr="24px"
            width="100%"
            height="100%"
            onClick={handleLocalClick}
        >
            <Box pr="16px" minWidth="auto">
                <TransactionIcon
                    deposit={deposit}
                    withdraw={withdrawal}
                    sent={sent}
                    color={referenceColor}
                />
            </Box>
            <Flex justifyContent="space-between" width="100%">
                <Flex flexDirection="column">
                    <Box mb="4px">
                        <OneLineText>
                            {getText()}{" "}
                            {progress &&
                                progress !== "100%" &&
                                `(${formatMessage({
                                    id: "dashboard.transactions.progress",
                                })})`}
                        </OneLineText>
                    </Box>
                    <Box>
                        <OneLineText fontSize={12}>
                            {DateTime.fromMillis(timestamp).toLocaleString(
                                DateTime.DATETIME_SHORT
                            )}
                        </OneLineText>
                    </Box>
                </Flex>
                <RightBlockFlex
                    pl="8px"
                    flexDirection="column"
                    alignItems="flex-end"
                    justifyContent="center"
                    minWidth="min-content"
                >
                    <Box color={referenceColor} mb="4px">
                        {(!withdrawal && (deposit || !sent) ? "+" : "-") +
                            formatBigNumber(etherAmount)}{" "}
                        {symbol}
                    </Box>
                    <Box fontSize={12}>
                        <AmountText color={referenceColor}>
                            {(!withdrawal && (deposit || !sent) ? "+" : "-") +
                                formatBigNumber(
                                    etherAmount.multipliedBy(fiatValue)
                                ) +
                                " " +
                                selectedFiat.symbol}
                        </AmountText>
                    </Box>
                </RightBlockFlex>
            </Flex>
        </HoverableContainer>
    );
};

Transaction.propTypes = {
    balances: PropTypes.array.isRequired,
    transaction: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    selectedFiat: PropTypes.object.isRequired,
};
