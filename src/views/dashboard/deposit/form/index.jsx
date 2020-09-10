import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Box } from "reflexbox";
import { Button } from "../../../../components/button";
import { FormattedMessage } from "react-intl";
import { Input } from "../../../../components/input";
import BigNumber from "bignumber.js";
import { weiToEther } from "../../../../utils/conversion";
import { getDepositBalance } from "../../../../actions/loopring";

export const Form = ({ onConfirm, asset, open }) => {
    const dispatch = useDispatch();
    const { ethereumAccount, supportedTokens, depositBalance } = useSelector(
        (state) => ({
            ethereumAccount: state.web3.selectedAccount,
            loopringAccount: state.loopring.account,
            supportedTokens: state.loopring.supportedTokens.data,
            depositBalance: state.loopring.depositBalance,
        })
    );

    const [parsedUserBalance, setParsedUserBalance] = useState(
        new BigNumber("0")
    );
    const [amount, setAmount] = useState("");

    // fetch updated asset's on-chain balance
    useEffect(() => {
        if (ethereumAccount && asset && asset.symbol && supportedTokens) {
            dispatch(
                getDepositBalance(
                    ethereumAccount,
                    asset.symbol,
                    supportedTokens
                )
            );
        }
    }, [asset, dispatch, ethereumAccount, supportedTokens]);

    useEffect(() => {
        if (depositBalance) {
            setParsedUserBalance(weiToEther(depositBalance, asset.decimals));
        }
    }, [asset, depositBalance, supportedTokens]);

    useEffect(() => {
        if (!open) {
            // reset the state on close
            setParsedUserBalance(new BigNumber("0"));
            setAmount("");
        }
    }, [open]);

    const handleAmountChange = useCallback(
        (event) => {
            let newAmount = event.target.value.replace(",", "");
            if (/^(\d+)?(\.\d*)?$/.test(newAmount)) {
                if (parsedUserBalance.isLessThan(newAmount)) {
                    newAmount = parsedUserBalance.decimalPlaces(4).toFixed();
                }
                setAmount(newAmount);
            } else {
                setAmount("");
            }
        },
        [parsedUserBalance]
    );

    const handleConfirm = useCallback(() => {
        onConfirm(amount);
    }, [amount, onConfirm]);

    return (
        <Flex
            width="100%"
            height="100%"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box mb="24px" width="100%">
                <Input
                    label={
                        <FormattedMessage id="deposit.form.placeholder.amount" />
                    }
                    placeholder="12.5"
                    value={amount}
                    onChange={handleAmountChange}
                    message={
                        <FormattedMessage
                            id="deposit.form.amount.maximum"
                            values={{
                                amount: parsedUserBalance
                                    .decimalPlaces(4)
                                    .toString(),
                            }}
                        />
                    }
                />
            </Box>
            <Box>
                <Button
                    disabled={
                        !amount ||
                        parseFloat(amount) === 0 ||
                        isNaN(parseFloat(amount))
                    }
                    onClick={handleConfirm}
                >
                    <FormattedMessage id="deposit.form.confirm" />
                </Button>
            </Box>
        </Flex>
    );
};

Form.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    asset: PropTypes.object.isRequired,
};