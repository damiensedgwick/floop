import 'package:flutter/material.dart';

class EmailInput extends StatelessWidget {
  final String value;
  final void Function(String) onChanged;

  const EmailInput({Key? key, required this.value, required this.onChanged})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      initialValue: value,
      onChanged: onChanged,
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
      decoration: const InputDecoration(
        border: OutlineInputBorder(),
        labelText: 'Email',
      ),
    );
  }
}
