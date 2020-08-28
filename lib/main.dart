import 'package:dome/page/about.dart';
import 'package:flutter/material.dart';
import './page/about.dart';

import './tab/home.dart';
import './tab/classify.dart';
import './tab/personal.dart';

void main() => runApp(new MyApp());

class MyApp extends StatefulWidget {
  MyApp({Key key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int _currentIndex = 0;
  List tab = [home(), classify(), personal()];
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      routes: {
        "/about": (context) {
          return about();
        }
      },
      debugShowCheckedModeBanner: false,
      home: new Scaffold(
          bottomNavigationBar: BottomNavigationBar(
            onTap: (int index) {
              setState(() {
                _currentIndex = index;
              });
            },
            items: [
              BottomNavigationBarItem(
                  title: Text('首页'), icon: Icon(Icons.home)),
              BottomNavigationBarItem(
                  title: Text('分类'), icon: Icon(Icons.book)),
              BottomNavigationBarItem(
                  title: Text('我的'), icon: Icon(Icons.perm_identity)),
            ],
            currentIndex: _currentIndex,
          ),
          body: tab[_currentIndex]),
    );
  }
}
