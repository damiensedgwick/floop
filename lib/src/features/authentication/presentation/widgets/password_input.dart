import 'package:flutter/material.dart';

class PasswordInput extends StatefulWidget {
  const PasswordInput({Key? key}) : super(key: key);

  @override
  State<PasswordInput> createState() => _PasswordInputState();
}

class _PasswordInputState extends State<PasswordInput> {
  late String _password;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
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
    );
  }
}
