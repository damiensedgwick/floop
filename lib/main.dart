import 'package:firebase_core/firebase_core.dart';
import 'package:floop/firebase_options.dart';
import 'package:floop/screens/home.dart';
import 'package:floop/src/features/authentication/presentation/screens/authentication_screen.dart';
import 'package:flutter/material.dart';

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
        home: const AuthenticationPage(),
        routes: {
          '/dashboard': (context) => const Home(),
        });
  }
}
