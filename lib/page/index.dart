import 'package:flutter/material.dart';

class index extends StatefulWidget {
  index({Key key}) : super(key: key);

  @override
  _indexState createState() => _indexState();
}

class _indexState extends State<index> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("我是子页面"),
      ),
    );
  }
}
