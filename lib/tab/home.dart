import 'package:flutter/material.dart';

class home extends StatefulWidget {
  home({Key key}) : super(key: key);

  @override
  _homeState createState() => _homeState();
}

class _homeState extends State<home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('首页'),
      ),
      body: GridView(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3, mainAxisSpacing: 2, crossAxisSpacing: 2),
        children: [
          Column(
            children: [
              Image(
                height: 100,
                image: NetworkImage(
                    'https://qpic.y.qq.com/music_cover/NaYDCjF6oFDyCBFMbYpoK3SPnnoLyuprfwzrx9nibQZy1LLQvYXMlIA/600?n=1'),
                fit: BoxFit.fitWidth,
              ),
              Text('基础组件'),
            ],
          ),
          Column(
            children: [
              Image(
                image: NetworkImage(
                    'https://qpic.y.qq.com/music_cover/NaYDCjF6oFDyCBFMbYpoK3SPnnoLyuprfwzrx9nibQZy1LLQvYXMlIA/600?n=1'),
                fit: BoxFit.cover,
              ),
              Text('基础组件'),
            ],
          ),
          Column(
            children: [
              Image(
                image: NetworkImage(
                    'https://qpic.y.qq.com/music_cover/NaYDCjF6oFDyCBFMbYpoK3SPnnoLyuprfwzrx9nibQZy1LLQvYXMlIA/600?n=1'),
                fit: BoxFit.cover,
              ),
              Text('基础组件'),
            ],
          ),
          Column(
            children: [
              Image(
                image: NetworkImage(
                    'https://qpic.y.qq.com/music_cover/NaYDCjF6oFDyCBFMbYpoK3SPnnoLyuprfwzrx9nibQZy1LLQvYXMlIA/600?n=1'),
                fit: BoxFit.cover,
              ),
              Text('基础组件'),
            ],
          )
        ],
      ),
    );
  }
}
