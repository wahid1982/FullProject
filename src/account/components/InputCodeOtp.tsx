import React, { useCallback, Dispatch, SetStateAction, useRef } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import fillNumberLength from "utils/fillNumberLength";
import { Icon, useTheme } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
interface InputCodeOtpProps {
  style?: ViewStyle;
  autoFocus?: boolean;
  codeLength?: number;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}

const InputCodeOtp = ({
  style,
  codeLength = 5,
  code,
  autoFocus,
  setCode,
}: InputCodeOtpProps) => {
  const theme = useTheme();
  const { width } = useLayout();
  const _code = fillNumberLength(code, codeLength);
  const inputRef: any = useRef();
  const renderInputBox = useCallback(() => {
    let arrBox = [];
    for (let i = 0; i < _code.length; i++) {
      arrBox.push(
        <View
          key={i.toString()}
          style={[
            styles.box,
            { borderColor: theme["color-warning-100"] },
            i !== codeLength - 1 && styles.space,
            _code.charAt(i) !== "*" && {
              borderColor: theme["color-success-100"],
            },
          ]}
        >
          {_code.charAt(i) !== "#" && (
            <Text category="h1" mt={-2}>
              {_code.charAt(i)}
            </Text>
          )}
        </View>
      );
    }
    return arrBox;
  }, [_code]);

  const onPressInput = useCallback(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const onChangeText = useCallback(
    (text: string) => {
      let _text = text;
      if (text.length > codeLength) {
        _text = text.substring(0, codeLength);
      }
      setCode(_text);
    },
    [codeLength]
  );

  return (
    <>
      {code.length === codeLength && (
        <Icon pack="assets" name="radioActive" style={styles.iconAccept} />
      )}
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPressInput}
      >
        {renderInputBox()}

        <TextInput
          autoFocus={autoFocus}
          value={code}
          onChangeText={onChangeText}
          style={[styles.fakeInput, { right: -width * 2 }]}
          ref={inputRef}
          keyboardType="numeric"
          keyboardAppearance={"dark"}
        />
      </TouchableOpacity>
    </>
  );
};

export default InputCodeOtp;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  box: {
    width: 40,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  space: {
    marginRight: 8,
  },
  iconAccept: {
    position: "absolute",
    right: 16,
    width: 24,
    height: 24,
    top: 12,
  },
  fakeInput: {
    position: "absolute",
  },
});
