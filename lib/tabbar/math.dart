import 'package:flutter/material.dart';

class math extends StatefulWidget {
  math({Key key}) : super(key: key);

  @override
  _mathState createState() => _mathState();
}

class _mathState extends State<math> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        onTap: () => {Navigator.pushNamed(context, '/about')},
        child: Center(child: Text("这是推荐的内容")));
  }
}
