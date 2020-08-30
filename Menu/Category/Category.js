import React, {Component} from 'react';
import axios from 'axios';
import {Image, View} from 'react-native';
import {
  Content,
  Card,
  CardItem,
  Body,
  Button,
  Text,
  Container,
} from 'native-base';
import Footer from '../Footers';
import {UserKey} from '../utils/key';
class Category extends Component {
  constructor() {
    super();
    this.state = {
      DataCategory: [],
      Datacollections: [],
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
  getDateCollection = () => {
    axios
      .get('https://developers.zomato.com/api/v2.1/collections?city_id=74', {
        headers: {'user-key': UserKey},
      })
      .then(res => {
        this.setState({
          Datacollections: res.data.collections,
        });
      });
  };
  componentDidMount() {
    this.getDataCategory();
    this.getDateCollection();
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Container style={{flex: 3}}>
          <Content>
            {this.state.Datacollections.map((data, key) => {
              return (
                <Card key={key}>
                  <CardItem cardBody>
                    <Image
                      style={{height: 200, width: null, flex: 1}}
                      source={{uri: data.collection.image_url}}
                    />
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{data.collection.title}</Text>
                      <Text note>{data.collection.description}</Text>
                    </Body>
                  </CardItem>
                </Card>
              );
            })}
          </Content>
        </Container>
        <Container style={{flex: 1}}>
          <Text style={{margin: 10}}>Category</Text>
          <Content horizontal>
            {this.state.DataCategory.map((data, key) => {
              return (
                <Button style={{margin: 10}} key={key}>
                  <Text>{data.categories.name}</Text>
                </Button>
              );
            })}
          </Content>
        </Container>
        <Footer />
      </View>
    );
  }
}
export default Category;
