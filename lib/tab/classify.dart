import 'package:flutter/material.dart';

import '../page/index.dart';

import '../tabbar/chinese.dart';
import '../tabbar/math.dart';
import '../tabbar/englist.dart';
import '../tabbar/pe.dart';
import '../tabbar/musice.dart';

class classify extends StatefulWidget {
  classify({Key key}) : super(key: key);

  @override
  _classifyState createState() => _classifyState();
}

class _classifyState extends State<classify>
    with SingleTickerProviderStateMixin {
  TabController _tabController;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    this._tabController = TabController(length: 6, vsync: this);
    this._tabController.addListener(() {
      print(this._tabController.toString());
      print(this._tabController.index);
      print(this._tabController.length);
      print(this._tabController.previousIndex);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text('分类'),
        actions: [
          Icon(Icons.add),
          PopupMenuButton<String>(
            onSelected: (value) => {print(value)},
            itemBuilder: (context) {
              return <PopupMenuEntry<String>>[
                PopupMenuItem<String>(
                  value: '语文',
                  child: Text('语文'),
                ),
                PopupMenuItem<String>(
                  value: '数学',
                  child: Text('数学'),
                ),
                PopupMenuItem<String>(
                  value: '英语',
                  child: Text('英语'),
                ),
                PopupMenuItem<String>(
                  value: '生物',
                  child: Text('生物'),
                ),
                PopupMenuItem<String>(
                  value: '化学',
                  child: Text('化学'),
                ),
              ];
            },
          )
        ],
        bottom: TabBar(
          tabs: [
            Text('语文'),
            Text('数学'),
            Text('英语'),
            Text('体育'),
            Text('音乐'),
            Text('跳转')
          ],
          controller: _tabController,
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: <Widget>[
          chinese(),
          math(),
          englist(),
          pe(),
          musice(),
          GestureDetector(
            child: Text('你好'),
            onTap: () {
              Navigator.push(
                  context, MaterialPageRoute(builder: (context) => index()));
            },
          )
        ],
      ),
      drawer: Drawer(
        child: ListView(
          // padding: EdgeInsets.all(10),
          children: [
            UserAccountsDrawerHeader(
              accountName: Text('熔岩巨兽'),
              accountEmail: Text('1024775516@qq.com'),
              currentAccountPicture: CircleAvatar(
                  backgroundImage:
                      ExactAssetImage("lib/assets/image/ferrilata.jpg")),
              decoration: BoxDecoration(
                  image: DecorationImage(
                      image: ExactAssetImage("lib/assets/image/bg.png"),
                      fit: BoxFit.cover)),
            ),
            ListTile(
              leading: Icon(Icons.arrow_drop_down_circle),
              title: Text('卡特琳娜'),
              trailing: Icon(Icons.keyboard_arrow_right),
              selected: false,
              onTap: () => {print('点击')},
              onLongPress: () => {print('长按')},
            ),
            Divider(),
            ListTile(
              leading: Icon(Icons.settings),
              title: Text('赏金猎人'),
              trailing: Icon(Icons.keyboard_arrow_right),
              onTap: () => {print('猎人')},
              onLongPress: () => {print('赏金')},
            )
          ],
        ),
      ),
    );
  }
}
