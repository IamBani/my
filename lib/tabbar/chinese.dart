import 'package:flutter/material.dart';
import '../page/index.dart';

class chinese extends StatefulWidget {
  chinese({Key key}) : super(key: key);

  @override
  _chineseState createState() => _chineseState();
}

class _chineseState extends State<chinese> {
  @override
  Widget build(BuildContext context) {
    return Center(
        child: GestureDetector(
      child: Text('点击'),
      onTap: () {
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => index()));
      },
      onVerticalDragDown: (details) {
        print('object');
        print(details);
      },
    ));
  }
}
