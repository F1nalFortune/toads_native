import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import GallerySwiper from "react-native-gallery-swiper";
import LoadingScreen from '../LoadingScreen';
const { width, height } = Dimensions.get('window');
import firebase from 'react-native-firebase';

export default class PhotoGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  componentWillMount() {
    this.setState({
      images: [
        {
          source: require("../../../assets/images/Dance/IMG_2134.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1354.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1355.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1358.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1359.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1361.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1363.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1364.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1365.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1367.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1368.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1370.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1373.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1374.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1380.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1381.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1382.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1384.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1385.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1389.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1393.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1394.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1395.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1397.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1398.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1401.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1402.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1404.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1405.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1406.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1407.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1411.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1412.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1413.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1414.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1418.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1419.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1420.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1421.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1422.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1423.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1425.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1427.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1428.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1431.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1433.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1434.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1439.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1442.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1443.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1446.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1448.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1449.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1452.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1455.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1459.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1462.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1464.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1465.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1466.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1468.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1473.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1474.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1480.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1485.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1487.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1488.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1491.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1492.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1500.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1502.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1504.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1506.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1512.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1513.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1520.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1522.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1526.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1528.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1529.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1531.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1533.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1536.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1538.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1544.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1546.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1548.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1549.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1550.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1551.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1552.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1554.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1555.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1561.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1564.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1565.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1566.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1567.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1568.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1574.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1575.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1576.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1577.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1580.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1582.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1586.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1587.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1588.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1593.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1594.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1597.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1600.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1601.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1602.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1608.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1610.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1613.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1614.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1616.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1617.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1618.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1620.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1623.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1627.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1629.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1631.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1632.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1634.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1637.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1638.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1640.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1641.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1642.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1643.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1644.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1645.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1647.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1651.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1652.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1653.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1655.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1657.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1659.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1660.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1661.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1664.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1665.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1666.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1668.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1670.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1671.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1673.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1674.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1675.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1679.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1681.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1682.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1687.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1693.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1698.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1699.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1700.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1704.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1705.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1707.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1708.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1709.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1711.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1715.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1718.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1722.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1723.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1727.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1728.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1732.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1733.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1734.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1735.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1740.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1741.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1743.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1744.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1746.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1748.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1750.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1803.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1805.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1807.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1809.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1810.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1813.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1814.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1816.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1818.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1819.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1824.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1826.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1832.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1834.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1836.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1837.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1838.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1840.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1841.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1843.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1844.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1846.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1847.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1848.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1849.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1851.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1853.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1857.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1859.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1861.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1863.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1865.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1867.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1869.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1871.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1872.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1874.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1875.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1876.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1877.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1878.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1879.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1880.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1882.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1883.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1884.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1888.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1889.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1894.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1895.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1900.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1905.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1909.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1910.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1915.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1916.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1918.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1919.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1920.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1923.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1925.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1928.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1932.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1933.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1935.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1937.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1938.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1939.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1941.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1943.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1944.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1946.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1947.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1948.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1950.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1951.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1952.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1954.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1958.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1959.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1965.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1968.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1969.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1970.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1971.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1973.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1974.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1975.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1976.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1979.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1980.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1982.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1983.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1986.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1988.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1989.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1990.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1997.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_1998.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2001.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2002.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2007.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2013.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2015.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2017.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2018.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2019.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2021.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2023.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2025.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2026.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2027.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2030.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2031.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2034.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2036.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2037.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2038.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2045.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2049.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2052.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2053.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2056.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2057.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2058.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2059.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2067.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2070.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2071.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2073.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2074.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2075.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2079.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2080.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2081.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2084.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2086.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2087.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2088.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2096.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2098.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2104.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2105.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2106.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2108.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2111.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2113.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2114.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2115.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2121.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2123.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2129.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2130.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2137.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2138.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2141.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2144.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2146.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2151.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2152.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2154.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2156.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        },
        {
          source: require("../../../assets/images/Dance/IMG_2158.jpg"),
          dimensions: { width: Dimensions.get('window').width, height: Dimensions.get('window').height }
        }
      ],
      isLoading:false
    })
  }

  render() {
    firebase.analytics().setCurrentScreen('gallery');
    var shuffle = function (array) {

    	var currentIndex = array.length;
    	var temporaryValue, randomIndex;

    	// While there remain elements to shuffle...
    	while (0 !== currentIndex) {
    		// Pick a remaining element...
    		randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;
    		// And swap it with the current element.
    		temporaryValue = array[currentIndex];
    		array[currentIndex] = array[randomIndex];
    		array[randomIndex] = temporaryValue;
    	}

    	return array;

    };
    if (this.state.isLoading) {
      return <LoadingScreen />;
    }
    return (
      <GallerySwiper
        images = {shuffle(this.state.images)}
        loadMinimal={true}
        loadMinimalSize={2}
        resizeMode={"contain"}
        sensitiveScroll={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
