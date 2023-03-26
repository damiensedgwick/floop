import 'package:firebase_auth/firebase_auth.dart';
import 'package:floop/screens/authentication/sign-in.dart';
import 'package:floop/src/common_widgets/logo.dart';
import 'package:flutter/material.dart';

class AuthenticationForm extends StatefulWidget {
  const AuthenticationForm({Key? key}) : super(key: key);

  @override
  State<AuthenticationForm> createState() => _AuthenticationFormState();
}

class _AuthenticationFormState extends State<AuthenticationForm> {
  late String _email, _password;

  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Form(
        key: _formKey,
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(25.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const Logo(),
                const Spacer(),
                TextFormField(
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter a valid email address';
                    }

                    if (!RegExp(
                            r"^[a-zA-Z\d.a-zA-Z\d.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z\d]+\.[a-zA-Z]+")
                        .hasMatch(value)) {
                      return 'Please enter a valid email address';
                    }

                    return null;
                  },
                  onSaved: (value) => _email = value!,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Email',
                  ),
                ),
                const SizedBox(height: 20),
                TextFormField(
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Passwords must be at least 8 characters long and contain: \nat least one uppercase letter \nat least one lowercase letter \nat least one number \nand at least one special character';
                    }

                    if (!RegExp(
                            r"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!@#\$&*~]).{8,}$")
                        .hasMatch(value)) {
                      return 'Passwords must be at least 8 characters long and contain: \nat least one uppercase letter \nat least one lowercase letter \nat least one number \nand at least one special character';
                    }

                    return null;
                  },
                  onSaved: (value) => _password = value!,
                  obscureText: true,
                  enableSuggestions: false,
                  autocorrect: false,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Password',
                  ),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    minimumSize: const Size(double.infinity, 50),
                  ),
                  onPressed: () {
                    _handleSubmission(false);
                  },
                  child: const Text('Register'),
                ),
                const SizedBox(height: 20),
                const Spacer(),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    TextButton(
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (context) => const LoginPage(),
                          ),
                        );
                      },
                      child: const Text('Login to existing account'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _handleSubmission(bool isSigningIn) async {
    final form = _formKey.currentState;

    if (form!.validate()) {
      try {
        form.save();

        if (isSigningIn) {
          await FirebaseAuth.instance.signInWithEmailAndPassword(
            email: _email,
            password: _password,
          );
        } else {
          await FirebaseAuth.instance.createUserWithEmailAndPassword(
            email: _email,
            password: _password,
          );
        }

        if (context.mounted) {
          Navigator.of(context)
              .pushNamedAndRemoveUntil("/dashboard", (route) => false);
        }

        return;
      } catch (e) {
        // TODO: Set up error handling and return error to the user
        print(e);
      }
    }
  }
}
