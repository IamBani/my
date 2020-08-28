import 'package:flutter/material.dart';
import '../page/index.dart';

class personal extends StatefulWidget {
  personal({Key key}) : super(key: key);

  @override
  _personalState createState() => _personalState();
}

class _personalState extends State<personal> {
  @override
  Widget build(BuildContext context) {
    return conster();
  }
}

class conster extends StatefulWidget {
  conster({Key key}) : super(key: key);

  @override
  _consterState createState() => _consterState();
}

class _consterState extends State<conster> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        children: [
          GestureDetector(
              onTap: () {
                Navigator.push(
                    context, MaterialPageRoute(builder: (context) => index()));
              },
              child: Center(
                  child: Container(
                child: Text(
                  ' 两者虽然都属于虚拟化的技术，目标都是为了将一套应用程序所需的执行环境打包起来，建立一个孤立环境，方便在不同的硬件中移动，但两者的运作思维截然不同',
                  textAlign: TextAlign.right,
                  overflow: TextOverflow.fade,
                  maxLines: 3,
                  textScaleFactor: 2,
                  style: TextStyle(
                      fontSize: 20,
                      color: Colors.red,
                      fontWeight: FontWeight.w600,
                      fontStyle: FontStyle.italic,
                      decoration: TextDecoration.underline,
                      decorationColor: Colors.white,
                      decorationStyle: TextDecorationStyle.dashed,
                      letterSpacing: 3),
                ),
                height: 300,
                width: 300,
                decoration: BoxDecoration(
                    borderRadius:
                        BorderRadius.only(topLeft: Radius.circular(5.0)),
                    color: Colors.pink,
                    border: Border.all(color: Colors.black, width: 3)),
              )))
        ],
      ),
    );
  }
}
