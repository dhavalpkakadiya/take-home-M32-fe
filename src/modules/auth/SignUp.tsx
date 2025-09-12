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

const SignUp = () => {
  const {
    isLoading,
    signUpFormikValidation: formik,
    goBack,
    onSigninPress,
  } = useAuth();

  return (
    <SafeAreaView style={commonStyles.container}>
      <Loader visible={isLoading} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.flexGrow}
      >
        <Header title={strings.create_account} onLeftPress={goBack} />
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
            autoCapitalize="none"
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
            onSubmitEditing={formik.handleSubmit}
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
