import 'package:flutter/material.dart';

class AuthenticationTypeButton extends StatelessWidget {
  final bool isRegistration;
  final void Function(bool) onPressed;

  const AuthenticationTypeButton({
    Key? key,
    required this.isRegistration,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () => onPressed(!isRegistration),
      child: Text(isRegistration
          ? 'Already have an account? Login'
          : 'Don\'t have an account? Register'),
    );
  }
}
