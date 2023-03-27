import 'package:flutter/material.dart';

class PasswordInput extends StatelessWidget {
  final String value;
  final void Function(String) onChanged;

  const PasswordInput({Key? key, required this.value, required this.onChanged})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      initialValue: value,
      onChanged: onChanged,
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
      obscureText: true,
      decoration: const InputDecoration(
        border: OutlineInputBorder(),
        labelText: 'Password',
      ),
    );
  }
}
