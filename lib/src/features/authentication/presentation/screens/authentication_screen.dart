import 'package:floop/src/features/authentication/presentation/widgets/authentication_form.dart';
import 'package:flutter/material.dart';

class AuthenticationPage extends StatelessWidget {
  const AuthenticationPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: AuthenticationForm(),
      ),
    );
  }
}
