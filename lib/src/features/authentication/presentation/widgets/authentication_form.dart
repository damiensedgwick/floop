import 'package:floop/src/features/authentication/presentation/widgets/email_input.dart';
import 'package:floop/src/features/authentication/presentation/widgets/floop_logo.dart';
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
  String _error = '';

  bool _loading = false;

  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: const <Widget>[
            FloopLogo(),
            Spacer(),
            EmailInput(),
            // TODO: Pass in value and onChanged
            SizedBox(height: 20),
            PasswordInput(),
            // TODO: Pass in value and onChanged
            SizedBox(height: 20),
            SubmitButton(),
            // TODO: Pass in submit function
            SizedBox(height: 20),
            // TODO: Add error message logic and code here
            Spacer(),
            // TODO: Added need an account? Sign up here || have an account? Sign in here
          ],
        ),
      ),
    );
  }

  Future<void> _submit() async {
    setState(() {
      _loading = true;
      _error = '';
    });

    try {
      // TODO: Add authentication logic
    } catch (e) {
      setState(() {
        _loading = false;
        _error = 'Authentication failed. Please try again.';
      });
    }
  }
}
