import 'package:flutter/material.dart';

class FloopLogo extends StatelessWidget {
  const FloopLogo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Image(
      image: AssetImage('images/floop-logo.png'),
      height: 200,
      width: 200,
    );
  }
}
