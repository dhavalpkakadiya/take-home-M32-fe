import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../hooks';
import { colors, commonStyles, hp, strings } from '../../helper';
import { Button, Header, TextInput, Loader } from '../../components';

const Login = () => {
  const {
    isLoading,
    loginFormikValidation: formik,
    goBack,
    onSignupPress,
  } = useAuth();

  return (
    <SafeAreaView style={commonStyles.container}>
      <Loader visible={isLoading} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.flexGrow}
      >
        <Header title={strings.login} onLeftPress={goBack} />
        <View style={commonStyles.flex}>
          <TextInput
            allowMargin
            autoCapitalize="none"
            title={strings.email}
            value={formik.values.email}
            placeholder={strings.enter_email}
            errorMessage={
              formik.touched.email ? formik.errors.email : undefined
            }
            onBlur={formik.handleBlur('email')}
            onChangeText={formik.handleChange('email')}
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
            onSubmitEditing={formik.handleSubmit}
          />

          <Button
            container={styles.loginButton}
            text={strings.login}
            allowHMargin
            onPress={formik.handleSubmit}
          />
        </View>
        <View style={[commonStyles.allowMargin, commonStyles.rowCenter]}>
          <Text style={commonStyles.primaryText}>
            {strings.do_not_have_account}{' '}
          </Text>
          <TouchableOpacity
            style={[commonStyles.center]}
            onPress={onSignupPress}
          >
            <Text style={[commonStyles.primaryText, styles.signinText]}>
              {strings.signup}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  signinText: { fontWeight: '600', color: colors.primary },
  loginButton: { marginTop: hp(18) },
});

export default Login;
