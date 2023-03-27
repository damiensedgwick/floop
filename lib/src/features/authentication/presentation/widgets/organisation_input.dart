import 'package:flutter/material.dart';

class OrganisationInput extends StatelessWidget {
  final String value;
  final void Function(String) onChanged;

  const OrganisationInput({Key? key, required this.value, required this.onChanged})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      initialValue: value,
      onChanged: onChanged,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Please enter your organisation name';
        }

        return null;
      },
      decoration: const InputDecoration(
        border: OutlineInputBorder(),
        labelText: 'Organisation Name',
      ),
    );
  }
}
