import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Content, Card, CardItem, Text} from 'native-base';
import Axios from 'axios';
import {withNavigation} from 'react-navigation';
import {UserKey} from '../utils/key';
class RestorantKota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datarestorant: [],
      id_kota: props.id_kota,
    };
  }
  getDetailRestorant = () => {
    Axios.get(
      `https://developers.zomato.com/api/v2.1/search?entity_id=${
        this.state.id_kota
      }&entity_type=city`,
      {
        headers: {'user-key': UserKey},
      },
    ).then(res => {
      this.setState({
        datarestorant: res.data.restaurants,
      });
    });
  };
  componentDidMount() {
    this.getDetailRestorant();
  }

  render() {
    return (
      <Content>
        {this.state.datarestorant.map((data, key) => {
          return (
            <View key={key}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Restaurant', {
                    name_restaorant: data.restaurant.name,
                    res_id: data.restaurant.R.res_id,
                  });
                }}>
                <Card>
                  <CardItem>
                    <Text>{data.restaurant.name} </Text>
                    <Text note>{this.props.name}</Text>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      style={{height: 250, width: null, flex: 1}}
                      source={{uri: data.restaurant.thumb}}
                    />
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </View>
          );
        })}
      </Content>
    );
  }
}
export default withNavigation(RestorantKota);
