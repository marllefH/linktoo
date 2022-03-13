import { InputHTMLAttributes, ReactNode, useEffect, useRef } from "react";
import {
  Box,
  Input as CKInput,
  InputAddon,
  InputGroup,
  InputProps,
  InputRightAddon,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { useField } from "@unform/core";
import styles from "./Input.module.css";

interface Props extends InputProps {
  label?: string;
  name: string;
  isLoading?: boolean;
  rightElement?: ReactNode;
}

export const Input = ({
  label,
  color,
  className,
  rightElement,
  isLoading,
  variant = "filled",
  name,
  ...rest
}: Props) => {
  const { fieldName, defaultValue, registerField } = useField(name);
  const inputRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <Box className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <InputGroup>
        <CKInput
          id={name}
          variant={variant}
          autoComplete="off"
          ref={inputRef}
          {...rest}
        />

        {isLoading ? (
          <InputRightElement>
            <Spinner color="sky.500" />
          </InputRightElement>
        ) : (
          <InputRightElement>{rightElement}</InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
};
