import React, {Component} from 'react';
import {View, StatusBar, Image, TouchableOpacity} from 'react-native';
import {
  Button,
  Content,
  Text,
  Card,
  CardItem,
  Left,
  Icon,
  Right,
} from 'native-base';
import ImagaSlider from 'react-native-image-slider';
import axios from 'axios';

import Footers from '../Footers';
import {UserKey} from '../utils/key';

export default class Homes extends Component {
  constructor() {
    super();
    this.state = {
      image: [
        'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      ],
      DataCategory: [],
      DataRestoran: [],
    };
  }
  static navigationOptions = {header: null};

  getDataCategory = () => {
    axios
      .get('https://developers.zomato.com/api/v2.1/categories', {
        headers: {'user-key': UserKey},
      })
      .then(res => {
        this.setState({
          DataCategory: res.data.categories,
        });
      });
  };
  getRestoranTerbaik = () => {
    axios
      .get(
        'https://developers.zomato.com/api/v2.1/search?start=6&count=10&sort=rating&order=asc',
        {
          headers: {'user-key': UserKey},
        },
      )
      .then(res => {
        this.setState({
          DataRestoran: res.data.restaurants,
        });
      });
  };
  componentDidMount() {
    this.getDataCategory();
    this.getRestoranTerbaik();
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="blue" />
        <Content>
          <View style={{height: 150}}>
            <ImagaSlider
              images={this.state.image}
              autoPlayWithInterval={5000}
            />
          </View>
          <Text style={{marginTop: 20, marginLeft: 10}}>Pilih Kategory</Text>
          <Content horizontal style={{marginTop: 20}}>
            {this.state.DataCategory.map((item, key) => {
              return (
                <Button rounded key={key} style={{margin: 5}}>
                  <Text>{item.categories.name}</Text>
                </Button>
              );
            })}
          </Content>
          <Text style={{marginTop: 20, marginLeft: 10}}>
            Restaurant Terbaik
          </Text>
          {this.state.DataRestoran.map((item, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  this.props.navigation.navigate('Restaurant', {
                    name_restaorant: item.restaurant.name,
                    res_id: item.restaurant.R.res_id,
                  });
                }}>
                <Card>
                  <CardItem>
                    <Text>{item.restaurant.name}</Text>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      style={{height: 200, width: null, flex: 1}}
                      source={{uri: item.restaurant.thumb}}
                    />
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Icon name="star" style={{color: 'orange'}} />
                      <Text>
                        {item.restaurant.user_rating.aggregate_rating}
                      </Text>
                    </Left>
                    <Right>
                      <Text>{item.restaurant.user_rating.rating_text}</Text>
                    </Right>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            );
          })}
        </Content>
        <Footers />
      </View>
    );
  }
}
