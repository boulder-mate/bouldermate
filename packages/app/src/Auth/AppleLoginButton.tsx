import React from "react";
import { Platform, StyleSheet } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

export const AppleLoginButton = ({}: AppleLoginButtonProps) => {
  if (Platform.OS !== "ios") return <></>;

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
      cornerRadius={5}
      style={styles.loginWithText}
      onPress={async () => {
        //setLoading(true);
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          // Signed in
          //setAppleResponse(credential);
        } catch (err: any) {
          //setLoading(false);
          if (err.code !== "ERR_CANCELED") {
            //setErrorMessage(err?.message);
          }
        }
      }}
    />
  );
};

type AppleLoginButtonProps = {
  setAppleResponse: any;
  setLoading: any;
  setErrorMessage: any;
};

export const styles = StyleSheet.create({
  loginWithText: {
    width: 350,
    height: 44,
    maxWidth: "100%",
  },
});
