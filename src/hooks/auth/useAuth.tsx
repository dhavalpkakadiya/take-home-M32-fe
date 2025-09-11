import React from 'react';
import { Alert } from 'react-native';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { StackActions, useNavigation } from '@react-navigation/native';

import { User } from '../../declarations';
import { createUser } from '../../firebase';
import { strings } from '../../helper/constants/strings';

type SignInParams = { email: string; password: string };
type SignUpParams = User & { password: string };
type AuthResult = { ok: true } | { ok: false; message: string };

export const useAuth = () => {
  const navigation = useNavigation();

  const signIn = React.useCallback(
    async ({ email, password }: SignInParams): Promise<AuthResult> => {
      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
        return { ok: true };
      } catch (error: any) {
        if (error?.code === 'auth/user-not-found') {
          return {
            ok: false,
            message: 'No user account exists for the provided email address.',
          };
        }
        if (error?.code === 'auth/invalid-credential') {
          return {
            ok: false,
            message: 'The provided credentials are invalid.',
          };
        }
        return { ok: false, message: 'Unable to sign in. Please try again.' };
      }
    },
    [],
  );

  const signUp = React.useCallback(
    async (user: SignUpParams): Promise<AuthResult> => {
      try {
        await createUserWithEmailAndPassword(
          getAuth(),
          user.email,
          user.password,
        );
        await getAuth().signOut();
        await createUser(user);
        return { ok: true };
      } catch (error: any) {
        if (error?.code === 'auth/email-already-in-use') {
          return {
            ok: false,
            message: 'That email address is already in use!',
          };
        }
        if (error?.code === 'auth/invalid-email') {
          return { ok: false, message: 'That email address is invalid!' };
        }
        return {
          ok: false,
          message:
            'There is some issue while creating the account. Please try again later!',
        };
      }
    },
    [],
  );

  const loginFormikValidation = useFormik<SignInParams>({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(strings.invalid_email)
        .required(strings.email_required),
      password: Yup.string()
        .min(6, strings.password_min)
        .required(strings.password_required),
    }),
    onSubmit: async values => {
      const result = await signIn(values);
      if (!result.ok) {
        Alert.alert('Login', result.message);
      }
    },
  });

  const signUpFormikValidation = useFormik<SignUpParams>({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, strings.name_min)
        .required(strings.name_required),
      email: Yup.string()
        .email(strings.invalid_email)
        .required(strings.email_required),
      password: Yup.string()
        .min(6, strings.password_min)
        .required(strings.password_required),
    }),
    onSubmit: async values => {
      const result = await signUp(values);
      if (result.ok) {
        Alert.alert('SignUp', 'Your account has been created successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert('SignUp', result.message);
      }
    },
  });

  const onSignupPress = React.useCallback(() => {
    navigation.dispatch(StackActions.replace('SignUp'));
  }, [navigation]);

  const onSigninPress = React.useCallback(() => {
    navigation.dispatch(StackActions.replace('Login'));
  }, [navigation]);

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    loginFormikValidation,
    signUpFormikValidation,
    onSignupPress,
    onSigninPress,
    goBack,
  };
};
