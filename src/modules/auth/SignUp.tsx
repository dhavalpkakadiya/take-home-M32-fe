import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions, useNavigation } from '@react-navigation/native';

import { colors, commonStyles, hp } from '../../helper';
import { strings } from '../../helper/constants/strings';
import { Button, Header, TextInput } from '../../components';

const SignUp = () => {
  const navigation = useNavigation();

  const onSigninPress = () => {
    navigation.dispatch(StackActions.replace('Login'));
  };

  const formik = useFormik({
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
    onSubmit: value => {
      console.log('value', value);
    },
  });

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.flexGrow}
      >
        <Header
          title={strings.create_account}
          onLeftPress={navigation.goBack}
        />
        <View style={commonStyles.flex}>
          <TextInput
            allowMargin
            title={strings.full_name}
            value={formik.values.name}
            placeholder={strings.enter_full_name}
            errorMessage={formik.touched.name ? formik.errors.name : undefined}
            onBlur={formik.handleBlur('name')}
            onChangeText={formik.handleChange('name')}
          />
          <TextInput
            allowMargin
            title={strings.email}
            value={formik.values.email}
            placeholder={strings.enter_email}
            onBlur={formik.handleBlur('email')}
            onChangeText={formik.handleChange('email')}
            errorMessage={
              formik.touched.email ? formik.errors.email : undefined
            }
          />
          <TextInput
            isPassword
            allowMargin
            secureTextEntry
            title={strings.password}
            value={formik.values.password}
            placeholder={strings.enter_password}
            errorMessage={
              formik.touched.password ? formik.errors.password : undefined
            }
            onBlur={formik.handleBlur('password')}
            onChangeText={formik.handleChange('password')}
          />
          <Button
            allowHMargin
            text={strings.signup}
            container={styles.signinButton}
            onPress={formik.handleSubmit}
          />
        </View>
        <View style={[commonStyles.allowMargin, commonStyles.rowCenter]}>
          <Text style={commonStyles.primaryText}>
            {strings.already_have_account}{' '}
          </Text>
          <TouchableOpacity
            style={[commonStyles.center]}
            onPress={onSigninPress}
          >
            <Text style={[commonStyles.primaryText, styles.signinText]}>
              {strings.signin}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signinText: { fontWeight: '600', color: colors.black },
  signinButton: { marginTop: hp(18) },
});

export default SignUp;
