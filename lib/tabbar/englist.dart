import 'package:flutter/material.dart';

import '../page/index.dart';

class englist extends StatefulWidget {
  englist({Key key}) : super(key: key);

  @override
  _englistState createState() => _englistState();
}

class _englistState extends State<englist> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
        child: Center(child: Text("这是关注的内容")),
        onTap: () {
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => index()));
        });
  }
}
