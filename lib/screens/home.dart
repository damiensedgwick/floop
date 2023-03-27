import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  int _selectedIndex = 2;

  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.teal);

  static const List<Widget> _widgetOptions = <Widget>[
    Text(
      'Index 0: Settings',
      style: optionStyle,
    ),
    Text(
      'Index 1: Users',
      style: optionStyle,
    ),
    Text(
      'Index 2: Home',
      style: optionStyle,
    ),
    Text(
      'Index 3: Feedback',
      style: optionStyle,
    ),
    Text(
      'Index 4: Issues',
      style: optionStyle,
    ),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: Container(
          decoration: BoxDecoration(
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.5),
                spreadRadius: 2.5,
                blurRadius: 5,
                offset: const Offset(0, 3), // changes position of shadow
              ),
            ],
          ),
          child: BottomNavigationBar(
            unselectedItemColor: Colors.grey,
            selectedIconTheme: const IconThemeData(color: Colors.teal),
            selectedItemColor: Colors.teal,
            type: BottomNavigationBarType.fixed,
            backgroundColor: const Color(0xFFF7F9FC),
            items: const <BottomNavigationBarItem>[
              BottomNavigationBarItem(
                icon: Icon(Icons.settings),
                label: 'Settings',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.people),
                label: 'Users',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.home),
                label: 'Home',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.feedback),
                label: 'Feedback',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.error),
                label: 'Issues',
              ),
            ],
            currentIndex: _selectedIndex,
            onTap: _onItemTapped,
          )),
    );
  }
}
