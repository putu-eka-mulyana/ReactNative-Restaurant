import React, {Component} from 'react';
import {View, Image} from 'react-native';

import Footers from './Footers';

import {Content, CardItem, Card, Left, Text, Icon, Right} from 'native-base';
import Axios from 'axios';
import {UserKey} from './utils/key';
var res_id = '';
export default class Restaurant extends Component {
  static navigationOptions = ({navigation}) => {
    res_id = navigation.getParam('res_id');
    return {
      title: navigation.getParam('name_restaorant'),
    };
  };
  constructor() {
    super();
    this.state = {
      DetailRestoran: [],
      res_id: '',
    };
  }
  getDetailRestorant = () => {
    Axios.get(
      `https://developers.zomato.com/api/v2.1/restaurant?res_id=${res_id}`,
      {
        headers: {'user-key': UserKey},
      },
    ).then(res => {
      this.setState({DetailRestoran: res.data});
    });
  };
  componentDidMount() {
    this.getDetailRestorant();
  }
  render() {
    let alamat = {...this.state.DetailRestoran.location};
    let rating = {...this.state.DetailRestoran.user_rating};
    return (
      <View style={{flex: 1}}>
        <Content>
          <Card>
            <CardItem cardBody>
              <Image
                style={{height: 240, width: null, flex: 1}}
                source={{
                  uri: this.state.DetailRestoran.featured_image,
                }}
              />
            </CardItem>
            <CardItem>
              <Left>
                <Text>Alamat Restoran : {alamat.address}</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name="star" style={{color: 'orange'}} />
                <Text>{rating.aggregate_rating}</Text>
              </Left>
              <Right>
                <Icon name="chatbubbles" />
                <Text>{this.state.DetailRestoran.all_reviews_count}</Text>
              </Right>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Left>
                <Text>Jenis Maskan : {this.state.DetailRestoran.cuisines}</Text>
              </Left>
            </CardItem>
          </Card>
        </Content>
        <Footers />
      </View>
    );
  }
}
