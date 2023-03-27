import 'package:flutter/material.dart';

class SubmitButton extends StatelessWidget {
  final bool isLoading;
  final bool isRegistration;
  final Function() onSubmit;

  const SubmitButton({
    Key? key,
    required this.onSubmit,
    required this.isLoading,
    required this.isRegistration,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        minimumSize: const Size(double.infinity, 50),
      ),
      onPressed: onSubmit,
      child: isLoading
          ? const SizedBox(
              height: 20,
              width: 20,
              child: CircularProgressIndicator(
                strokeWidth: 2,
                valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                // Changes the color
                backgroundColor: Colors.teal, // Changes the fill color
              ),
            )
          : Text(isRegistration ? 'Register' : 'Login'),
    );
  }
}
