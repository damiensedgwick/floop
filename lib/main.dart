import 'package:flutter/material.dart';
import 'package:floop/firebase_options.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:floop/screens/authentication/register.dart';
import 'package:floop/screens/authentication/sign-in.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Floop',
      theme: ThemeData(
        primarySwatch: Colors.teal,
      ),
      home: const LoginPage(),
      routes: {
        '/login': (context) => const LoginPage(),
        '/register': (context) => const RegisterPage(),
      }
    );
  }
}