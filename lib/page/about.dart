import 'package:flutter/material.dart';

class about extends StatefulWidget {
  about({Key key}) : super(key: key);

  @override
  _aboutState createState() => _aboutState();
}

class _aboutState extends State<about> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('about'),
        ),
        body: Center(
          child: Row(
            children: [
              IconButton(
                icon: Icon(Icons.add),
                onPressed: () => {Navigator.pop(context)},
              ),
              FloatingActionButton(
                  child: Icon(Icons.arrow_back),
                  onPressed: () {
                    Navigator.pop(context);
                  })
            ],
          ),
        ));
  }
}
