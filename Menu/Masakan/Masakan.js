import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Footers from '../Footers';
import axios from 'axios';
import {
  Content,
  Button,
  Text,
  Card,
  CardItem,
  Left,
  Right,
  Icon,
} from 'native-base';
import {UserKey} from '../utils/key';
export default class Masakan extends Component {
  constructor() {
    super();
    this.state = {
      jenisMasakan: [],
      dataRestoran: [],
    };
  }
  getJenisMasakan = () => {
    axios
      .get('https://developers.zomato.com/api/v2.1/cuisines?city_id=170', {
        headers: {'user-key': UserKey},
      })
      .then(res => {
        this.setState({
          jenisMasakan: res.data.cuisines,
        });
      });
  };
  getRestoran = () => {
    axios
      .get('https://developers.zomato.com/api/v2.1/search?start=30&count=10', {
        headers: {'user-key': UserKey},
      })
      .then(res => {
        this.setState({
          dataRestoran: res.data.restaurants,
        });
      });
  };
  componentDidMount() {
    this.getJenisMasakan();
    this.getRestoran();
  }
  static navigationOptions = {header: null};
  render() {
    return (
      <View style={{flex: 1}}>
        <Content>
          <Text style={{marginTop: 20, marginLeft: 10}}>Jenis Masakan</Text>
          <Content horizontal style={{marginTop: 20, marginLeft: 10}}>
            {this.state.jenisMasakan.map((item, key) => {
              return (
                <View key={key}>
                  <Button style={{margin: 10}}>
                    <Text>{item.cuisine.cuisine_name}</Text>
                  </Button>
                </View>
              );
            })}
          </Content>
          <Text style={{marginTop: 20, marginLeft: 10}}>Restaurant</Text>
          <Content horizontal style={{marginTop: 20, marginLeft: 10}}>
            {this.state.dataRestoran.map((item, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    this.props.navigation.navigate('Restaurant', {
                      name_restaorant: item.restaurant.name,
                      res_id: item.restaurant.R.res_id,
                    });
                  }}>
                  <Card style={{width: 300}}>
                    <CardItem>
                      <Left>
                        <Text>{item.restaurant.name}</Text>
                      </Left>
                      <Right>
                        <Icon name="home" />
                      </Right>
                    </CardItem>
                    <CardItem>
                      <Image
                        style={{height: 200, width: null, flex: 1}}
                        source={{uri: item.restaurant.thumb}}
                      />
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Text>Jenis Makanan</Text>
                      </Left>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Text>{item.restaurant.cuisines}</Text>
                      </Left>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </Content>
        </Content>
        <Footers />
      </View>
    );
  }
}
