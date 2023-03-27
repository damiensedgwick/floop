import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:floop/src/features/authentication/presentation/widgets/authentication_type_button.dart';
import 'package:floop/src/features/authentication/presentation/widgets/email_input.dart';
import 'package:floop/src/features/authentication/presentation/widgets/floop_logo.dart';
import 'package:floop/src/features/authentication/presentation/widgets/organisation_input.dart';
import 'package:floop/src/features/authentication/presentation/widgets/password_input.dart';
import 'package:floop/src/features/authentication/presentation/widgets/submit_button.dart';
import 'package:flutter/material.dart';

class AuthenticationForm extends StatefulWidget {
  const AuthenticationForm({Key? key}) : super(key: key);

  @override
  State<AuthenticationForm> createState() => _AuthenticationFormState();
}

class _AuthenticationFormState extends State<AuthenticationForm> {
  String _email = '';
  String _password = '';
  String _organisationName = '';
  String _error = '';

  bool _isRegistration = false;
  bool _loading = false;

  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    const logo = FloopLogo();
    const spacer = Spacer();
    const sizedBox = SizedBox(height: 20);

    final emailInput = EmailInput(value: _email, onChanged: _onEmailChanged);

    final passwordInput =
        PasswordInput(value: _password, onChanged: _onPasswordChanged);

    final organisationName = OrganisationInput(
        value: _organisationName, onChanged: _onOrganisationNameChanged);

    final submitButton = SubmitButton(
      onSubmit: _submit,
      isLoading: _loading,
      isRegistration: _isRegistration,
    );

    final authenticationTypeButton = AuthenticationTypeButton(
        isRegistration: _isRegistration,
        onPressed: _onAuthenticationTypeChanged);

    final errorText = Text(_error, style: const TextStyle(color: Colors.red));

    return Form(
      key: _formKey,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            spacer,
            logo,
            spacer,
            emailInput,
            sizedBox,
            passwordInput,
            sizedBox,
            if (_isRegistration) organisationName,
            sizedBox,
            submitButton,
            sizedBox,
            if (_error.isNotEmpty) errorText,
            spacer,
            authenticationTypeButton,
            sizedBox,
          ],
        ),
      ),
    );
  }

  Future<void> _submit() async {
    final form = _formKey.currentState;

    try {
      if (form!.validate()) {
        form.save();

        setState(() {
          _loading = true;
          _error = '';
        });

        if (_isRegistration) {
          await FirebaseAuth.instance.createUserWithEmailAndPassword(
            email: _email,
            password: _password,
          );

          // TODO: FINISH OFF THIS PART!
          await FirebaseFirestore.instance.collection('organisations').add({
            'name': _organisationName,
            'feedback': [],
            'issues': [],
            'users': [FirebaseAuth.instance.currentUser!.uid], // TODO: Make this user the organisation owner
            'created_at': Timestamp.now(),
            'updated_at': Timestamp.now(),
          });
        } else {
          await FirebaseAuth.instance.signInWithEmailAndPassword(
            email: _email,
            password: _password,
          );
        }
      }

      if (context.mounted) {
        Navigator.of(context)
            .pushNamedAndRemoveUntil("/dashboard", (route) => false);
      }
    } catch (e) {
      setState(() {
        _loading = false;
        _error = 'Authentication failed. Please try again.';
      });
    }
  }

  void _onEmailChanged(String email) {
    setState(() {
      _email = email;
    });
  }

  void _onPasswordChanged(String password) {
    setState(() {
      _password = password;
    });
  }

  void _onOrganisationNameChanged(String organisationName) {
    setState(() {
      _organisationName = organisationName;
    });
  }

  void _onAuthenticationTypeChanged(bool isRegistration) {
    setState(() {
      _isRegistration = isRegistration;
    });
  }
}
