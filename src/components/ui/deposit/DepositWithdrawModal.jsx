import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Modal from "../../../common/Modal";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import SelectAssetDropdown from "./SelectAssetDropdown";

import BUSDIcon from "@/assets/svg/BUSD.svg";
import USDTIcon from "@/assets/svg/usdt.svg";
import USDCIcon from "@/assets/svg/USDC.svg";

const validationSchema = Yup.object().shape({
  asset: Yup.string().required("Please select an asset"),
  depositQuantity: Yup.number()
    .required("Please enter a deposit quantity")
    .typeError("Deposit quantity must be a number"),
});

const DepositWithdrawModal = ({ isOpenDeposit, onClose }) => {
  const initialValues = {
    asset: hearAboutUs[0].value,
    depositQuantity: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("/api/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      // console.log("Deposit successful", await response.json());
      onClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={isOpenDeposit} onClose={onClose} heading="Deposit">
      <div className="space-y-3">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form autoComplete="off">
              <div className="mb-4">
                <SelectAssetDropdown
                  value={values.asset}
                  onChange={(option) => setFieldValue("asset", option.value)}
                  options={hearAboutUs}
                  label="Asset"
                />
                <ErrorMessage
                  name="asset"
                  component="div"
                  className="text-red-500 text-[13px] font-display mt-1"
                />
              </div>

              <div className="flex items-center gap-5 mb-6 mt-2">
                <h3 className="text-[#6D7A86] font-medium font-display leading-[20px] text-[15.5px]">
                  Withdrawable Balance
                </h3>
                <h3 className="flex items-center gap-1.5 font-semibold font-display leading-[20px] text-[16px]">
                  <BUSDIcon className="h-5 w-auto" /> 32,000 BUSD
                </h3>
              </div>

              <div className="mb-6">
                <Field
                  as={Input}
                  type="text"
                  name="depositQuantity"
                  id="depositQuantity"
                  placeholder="0,00"
                  label="Deposit Quantity"
                />
                <ErrorMessage
                  name="depositQuantity"
                  component="div"
                  className="text-red-500 font-display text-[13px] mt-1"
                />
              </div>

              <div className="border-b border-dark-300 my-3"></div>

              <div className="pt-5">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Confirm
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default DepositWithdrawModal;

const hearAboutUs = [
  { label: "BUSD", value: "BUSD", icon: <BUSDIcon className="h-5 w-auto" /> },
  { label: "USDT", value: "USDT", icon: <USDTIcon className="h-5 w-auto" /> },
  { label: "USDC", value: "USDC", icon: <USDCIcon className="h-5 w-auto" /> },
];
